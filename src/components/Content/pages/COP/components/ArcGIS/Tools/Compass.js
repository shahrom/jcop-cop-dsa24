/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Compass.js
 * Created: Tuesday, 19th April 2022 3:58:07 pm
 * Modified: Tuesday, 19th April 2022 3:58:27 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";

// components
import { setMapCommand, getMapTool, setMapTool } from "app/appSlice";
import { setCompass, getCompass } from "app/mapSlice";

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;
var gMapTool = null;

export const ResetCompass = () => {
  loadModules(["esri/views/draw/Draw"]).then(([Draw]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    if (gDispatch === null) return;

    gDispatch(
      setCompass({
        startPoint: [],
      })
    );

    var lyr = gMap.findLayerById("CompassLayer");
    lyr.graphics.removeAll();

    gView.surface.style.cursor = "default";

    const action = draw.reset();
  }, []);
};

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */

const drawMultiline = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/symbols/CIMSymbol",
  ]).then(([Draw, Graphic, geometryEngine, CIMSymbol]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("multipoint", { mode: "click" });

    action.on("cursor-update", function (evt) {
      gView.graphics.removeAll();
      createPolyline("UPDATE", evt.vertices, Graphic);
      createStartMarker("UPDATE", evt.vertices, Graphic);
      gView.surface.style.cursor = "crosshair";
    });

    // Can also fire when the "R" key is pressed to redo.
    action.on("vertex-add", function (evt) {
      createPolyline("COMPLETE", evt.vertices, Graphic);
    });

    action.on("draw-complete", function (evt) {
      gView.graphics.removeAll();
      createPolyline("COMPLETE", evt.vertices, Graphic);
      gView.surface.style.cursor = "default";
    });

    const calAngle = (cx, cy, ex, ey) => {
      var dy = ey - cy;
      var dx = ex - cx;
      var theta = Math.atan2(dy, dx);
      theta *= -180 / Math.PI; // Clockwise
      if (theta > 0) theta += 90;
      if (theta < -90) theta += 449;
      if (theta < 0) theta += 90;

      return theta;
    };

    const createPolyline = (mode, vertices, Graphic) => {
      if (gDataValues.startPoint.length === 0) return;

      let pointA = {
        type: "point",
        x: gDataValues.startPoint[0],
        y: gDataValues.startPoint[1],
        spatialReference: gView.spatialReference,
      };

      let pointB = {
        type: "point",
        x: vertices[vertices.length - 1][0],
        y: vertices[vertices.length - 1][1],
        spatialReference: gView.spatialReference,
      };

      var distance = geometryEngine.distance(pointA, pointB, "kilometers");
      gDispatch(
        setCompass({
          distance: distance,
        })
      );

      var angle = calAngle(pointA.x, pointA.y, pointB.x, pointB.y);
      gDispatch(
        setCompass({
          bearing: angle,
          backbearing: 180 - angle,
        })
      );

      var paths = [
        [pointA.x, pointA.y],
        [pointB.x, pointB.y],
      ];
      const graphic = new Graphic({
        geometry: {
          type: "polyline",
          paths: paths,
          spatialReference: gView.spatialReference,
        },
        symbol: {
          type: "simple-line",
          color: "rgba(255,255,255,0.5)",
          width: 2,
          marker: {
            style: "circle",
            color: "orange",
            placement: "end",
          },
          style: "short-dash",
        },
      });

      createLabel(mode, pointB, Graphic, distance, angle);

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };

    const createStartMarker = (mode, coordinates, Graphic) => {
      // Geometry
      let point = {
        type: "point",
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: gView.spatialReference,
      };

      if (gDataValues.startPoint.length === 2) {
        point = {
          type: "point",
          x: gDataValues.startPoint[0],
          y: gDataValues.startPoint[1],
          spatialReference: gView.spatialReference,
        };
      }

      // Symbol
      // if (mode === "UPDATE") {
      var picSymbol = {
        type: "picture-marker",
        url: "img/map/compass21.png",
        width: "350px",
        height: "350px",
        xoffset: "0px",
        yoffset: "0px",
      };
      // }
      // if (mode === "COMPLETE") {
      //   var picSymbol = {
      //     type: "picture-marker",
      //     url: "img/map/compass5.png",
      //     width: "150px",
      //     height: "150px",
      //     xoffset: "0px",
      //     yoffset: "0px",
      //   };
      // }

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") gView.graphics.add(graphic);
      if (mode === "COMPLETE") {
        gView.graphics.add(graphic);
        // var lyr = gMap.findLayerById("CompassLayer");
        // lyr.add(graphic);

        if (gDataValues.startPoint.length === 0) {
          gDispatch(
            setCompass({
              startPoint: coordinates,
            })
          );
        }
      }
    };

    const createEndMarker = (mode, point, gView, Graphic) => {
      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/map/black-bg.png",
        width: "130px",
        height: "45px",
        xoffset: "0px",
        yoffset: "-30px",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };

    const createLabel = (mode, point, Graphic, distance, angle) => {
      if (distance === 0) return;
      // Symbol
      var textSymbol = {
        type: "text",
        color: "yellow",
        haloColor: "black",
        haloSize: "1px",
        text:
          "Distance: " +
          distance.toFixed(2) +
          " km\n" +
          "Bearing: " +
          angle.toFixed(0) +
          "\u00B0\n",
        xoffset: "-60px",
        yoffset: "-30px",
        zoffset: "0px",
        horizontalAlignment: "left",
        font: {
          size: 10,
          family: "Arial",
          // weight: "bold",
        },
      };

      createEndMarker(mode, point, gView, Graphic);

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = textSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

export const DrawCompass = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/symbols/CIMSymbol",
  ]).then(([Draw, Graphic, geometryEngine, CIMSymbol]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("point", { mode: "click" });

    action.on("cursor-update", function (evt) {
      gView.graphics.removeAll();
      createStartMarker("UPDATE", evt.coordinates, Graphic);
      gView.surface.style.cursor = "crosshair";
    });

    action.on("draw-complete", function (evt) {
      gView.graphics.removeAll();
      createStartMarker("COMPLETE", evt.coordinates, Graphic);
      drawMultiline();
    });

    const calAngle = (cx, cy, ex, ey) => {
      var dy = ey - cy;
      var dx = ex - cx;
      var theta = Math.atan2(dy, dx);
      theta *= -180 / Math.PI; // Clockwise
      if (theta > 0) theta += 90;
      if (theta < -90) theta += 449;
      if (theta < 0) theta += 90;

      return theta;
    };

    const createPolyline = (mode, coordinates, Graphic) => {
      if (gDataValues.startPoint.length === 0) return;

      let pointA = {
        type: "point",
        x: gDataValues.startPoint[0],
        y: gDataValues.startPoint[1],
        spatialReference: gView.spatialReference,
      };

      let pointB = {
        type: "point",
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: gView.spatialReference,
      };

      var distance = geometryEngine.distance(pointA, pointB, "kilometers");
      gDispatch(
        setCompass({
          distance: distance,
        })
      );

      var angle = calAngle(pointA.x, pointA.y, pointB.x, pointB.y);
      gDispatch(
        setCompass({
          bearing: angle,
          backbearing: 180 - angle,
        })
      );

      var paths = [
        [pointA.x, pointA.y],
        [pointB.x, pointB.y],
      ];
      const graphic = new Graphic({
        geometry: {
          type: "polyline",
          paths: paths,
          spatialReference: gView.spatialReference,
        },
        symbol: {
          type: "simple-line",
          color: "rgba(255,255,255,0.5)",
          width: 2,
          marker: {
            style: "circle",
            color: "orange",
            placement: "end",
          },
          style: "short-dash",
        },
      });

      createLabel(mode, pointB, Graphic, distance, angle);

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };

    const createStartMarker = (mode, coordinates, Graphic) => {
      // Geometry
      let point = {
        type: "point",
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: gView.spatialReference,
      };

      if (gDataValues.startPoint.length === 2) {
        point = {
          type: "point",
          x: gDataValues.startPoint[0],
          y: gDataValues.startPoint[1],
          spatialReference: gView.spatialReference,
        };
      }

      // Symbol
      // if (mode === "UPDATE") {
      var picSymbol = {
        type: "picture-marker",
        url: "img/map/compass21.png",
        width: "350px",
        height: "350px",
        xoffset: "0px",
        yoffset: "0px",
      };
      // }
      // if (mode === "COMPLETE") {
      //   var picSymbol = {
      //     type: "picture-marker",
      //     url: "img/map/compass5.png",
      //     width: "150px",
      //     height: "150px",
      //     xoffset: "0px",
      //     yoffset: "0px",
      //   };
      // }

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") gView.graphics.add(graphic);
      if (mode === "COMPLETE") {
        gView.graphics.add(graphic);
        // var lyr = gMap.findLayerById("CompassLayer");
        // lyr.add(graphic);

        if (gDataValues.startPoint.length === 0) {
          gDispatch(
            setCompass({
              startPoint: coordinates,
            })
          );
        }
      }
    };

    const createEndMarker = (mode, point, gView, Graphic) => {
      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/map/black-bg.png",
        width: "130px",
        height: "45px",
        xoffset: "0px",
        yoffset: "-30px",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };

    const createLabel = (mode, point, Graphic, distance, angle) => {
      if (distance === 0) return;
      // Symbol
      var textSymbol = {
        type: "text",
        color: "yellow",
        haloColor: "black",
        haloSize: "1px",
        text:
          "Distance: " +
          distance.toFixed(2) +
          " km\n" +
          "Bearing: " +
          angle.toFixed(0) +
          "\u00B0\n",
        xoffset: "-60px",
        yoffset: "-30px",
        zoffset: "0px",
        horizontalAlignment: "left",
        font: {
          size: 10,
          family: "Arial",
          // weight: "bold",
        },
      };

      createEndMarker(mode, point, gView, Graphic);

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = textSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("CompassLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function Compass(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getCompass);
  gMapTool = useSelector(getMapTool);

  useEffect(() => {
    gDispatch(setMapCommand("COMPASS_START_POSITION"));
  }, []);

  return <div></div>;
}
