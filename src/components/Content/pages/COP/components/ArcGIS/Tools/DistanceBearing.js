/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DistanceBearing.js
 * Created: Monday, 11th April 2022 9:12:53 pm
 * Modified: Thursday, 14th April 2022 10:00:21 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Draggable from "react-draggable";

// components
import { setMapTool, setMapCommand } from "app/appSlice";
import { setDistanceBearing, getDistanceBearing } from "app/mapSlice";

// icons
import RoomIcon from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */
export const DrawDistanceBearing = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/symbols/CIMSymbol",
    "esri/geometry/support/webMercatorUtils",
  ]).then(([Draw, Graphic, geometryEngine, CIMSymbol, webMercatorUtils]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("circle", { mode: "click" });

    action.on("cursor-update", function (evt) {
      gView.graphics.removeAll();
      createStartMarker("UPDATE", evt.vertices, Graphic);
      createPolyline("UPDATE", evt.vertices, Graphic);
      gView.surface.style.cursor = "crosshair";
    });

    action.on("draw-complete", function (evt) {
      gView.graphics.removeAll();
      createStartMarker("COMPLETE", evt.vertices, Graphic);
      createPolyline("COMPLETE", evt.vertices, Graphic);
      gView.surface.style.cursor = "default";
    });

    const calAngle = (cx, cy, ex, ey) => {
      var dy = ey - cy;
      var dx = ex - cx;
      var theta = Math.atan2(dy, dx);
      theta *= -180 / Math.PI; // Clockwise
      if (theta === 0) return (theta = 90);
      if (theta > 0) return (theta += 90);
      if (theta < -90) return (theta += 450);
      if (theta < 0) return (theta += 90);
    };

    const createPolyline = (mode, vertices, Graphic) => {
      if (vertices.length === 1) return;

      let pointA = {
        type: "point",
        x: vertices[0][0],
        y: vertices[0][1],
        spatialReference: gView.spatialReference,
      };

      let pointB = {
        type: "point",
        x: vertices[1][0],
        y: vertices[1][1],
        spatialReference: gView.spatialReference,
      };

      var distance = geometryEngine.distance(pointA, pointB, "kilometers");
      gDispatch(
        setDistanceBearing({
          distance: distance,
        })
      );

      var bearing = calAngle(pointA.x, pointA.y, pointB.x, pointB.y);
      var backbearing = bearing < 180 ? bearing + 180 : bearing - 180;

      gDispatch(
        setDistanceBearing({
          bearing: bearing,
          backbearing: backbearing,
        })
      );

      const symbolX2 = new CIMSymbol({
        data: {
          type: "CIMSymbolReference",
          symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
              {
                // black 1px line symbol
                type: "CIMSolidStroke",
                enable: true,
                width: 1,
                color: [0, 0, 0, 255],
              },
              {
                // arrow symbol
                type: "CIMVectorMarker",
                enable: true,
                size: 5,
                markerPlacement: {
                  // places same size markers along the line
                  type: "CIMMarkerPlacementAlongLineSameSize",
                  endings: "WithMarkers",
                  placementTemplate: [19.5], // determines space between each arrow
                },
                frame: {
                  xmin: -5,
                  ymin: -5,
                  xmax: 5,
                  ymax: 5,
                },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                    geometry: {
                      rings: [
                        [
                          [-8, -5.47],
                          [-8, 5.6],
                          [1.96, -0.03],
                          [-8, -5.47],
                        ],
                      ],
                    },
                    symbol: {
                      // black fill for the arrow symbol
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: [255, 106, 0, 255],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      });

      const graphic = new Graphic({
        geometry: {
          type: "polyline",
          paths: vertices,
          spatialReference: gView.spatialReference,
        },

        // symbol: symbolX2,
        symbol: {
          type: "simple-line",
          color: "white",
          width: 2,
          marker: {
            style: "arrow",
            color: "orange",
            placement: "end",
          },
          style: "short-dash",
        },
      });

      createLabel(mode, vertices, Graphic, distance, bearing, backbearing);

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DistanceBearingLayer");
        lyr.add(graphic);
      }
    };

    const createStartMarker = (mode, vertices, Graphic) => {
      // Geometry
      let point = {
        type: "point",
        x: vertices[0][0],
        y: vertices[0][1],
        spatialReference: gView.spatialReference,
      };

      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/markers/bft/start-point.png",
        width: "28px",
        height: "28px",
        xoffset: "0px",
        yoffset: "10px",
      };

      // var picSymbol = {
      //   type: "picture-marker",
      //   url: "img/markers/bft/start-point.png",
      //   // url: "img/map/compass2.png",
      //   width: "400px",
      //   height: "400px",
      // };

      // var picSymbol = {
      //   type: "CIMPictureMarker",
      //   enable: true,
      //   anchorPoint: {
      //     x: 0,
      //     y: 0,
      //   },
      //   size: 140,
      //   scaleX: 1,
      //   // tintColor: [255, 255, 255, 255],
      //   url: "img/map/compass10.png",
      // };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") gView.graphics.add(graphic);
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DistanceBearingLayer");
        lyr.add(graphic);
      }
    };

    const createEndMarker = (mode, vertices, gView, Graphic) => {
      // Geometry
      let point = {
        type: "point",
        x: vertices[1][0],
        y: vertices[1][1],
        spatialReference: gView.spatialReference,
      };

      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/map/black-bg.png",
        width: "120px",
        height: "50px",
        xoffset: "0px",
        yoffset: "-30px",
      };

      // Convert the Mercator points to WGS84
      var pW84 = webMercatorUtils.webMercatorToGeographic(point);

      var popupTemplate = {
        title: "Calculated Position",
        content:
          "<div style='padding:10px;'>" +
          "<table><tr>" +
          "<td>Latitude:</td>" +
          "<td>" +
          pW84.y +
          "</td>" +
          "</tr>" +
          "<td>Longitude:</td>" +
          "<td>" +
          pW84.x +
          "</td>" +
          "</span></table></div>",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;
      graphic.popupTemplate = popupTemplate;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DistanceBearingLayer");
        lyr.add(graphic);
      }
    };

    const createLabel = (mode, vertices, Graphic, distance, bearing, backbearing) => {
      // Geometry
      let point = {
        type: "point",
        x: vertices[1][0],
        y: vertices[1][1],
        spatialReference: gView.spatialReference,
      };

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
          "F-Bearing: " +
          bearing.toFixed(0) +
          "\u00B0\n" +
          "B-Bearing: " +
          backbearing.toFixed(0) +
          "\u00B0\n",
        xoffset: "-50px",
        yoffset: "-20px",
        zoffset: "0px",
        horizontalAlignment: "left",
        font: {
          size: 10,
          family: "Arial",
          // weight: "bold",
        },
      };

      createEndMarker(mode, vertices, gView, Graphic);

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = textSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DistanceBearingLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DistanceBearing(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getDistanceBearing);

  useEffect(() => {
    var lyr = gMap.findLayerById("DistanceBearingLayer");
    lyr.visible = true;
  }, []);

  const handleClose = () => {
    // Close tool and hide layer
    gDispatch(setMapTool(""));
    var lyr = gMap.findLayerById("DistanceBearingLayer");
    lyr.visible = false;
  };

  const handleStartMarker = () => {
    gDispatch(setMapCommand("DISTANCE_BEARING_START_POSITION"));
  };

  const handleClear = () => {
    // Initialize tool and clear graphics
    gDispatch(
      setDistanceBearing({
        distance: 0,
        bearing: 0,
        startPoint: [],
      })
    );

    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DistanceBearingLayer");
    lyr.graphics.removeAll();
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: window.innerWidth - 295,
        width: 250,
        height: 320,
        backgroundColor: "#242424",
        color: "white",
        padding: "0px 15px 15px 15px",
      }}
    >
      <div>
        <p>Distance Bearing</p>
        <CloseIcon
          onClick={() => handleClose()}
          style={{
            color: "gray",
            fontSize: 24,
            float: "right",
            marginTop: -35,
            cursor: "pointer",
          }}
        />
      </div>

      <div style={{ padding: 0, textAlign: "center" }}>
        <Fab
          onClick={() => handleStartMarker()}
          size="small"
          style={{ backgroundColor: "black" }}
        >
          <RoomIcon color="secondary" />
        </Fab>
        <br />
        <br />
      </div>

      <div
        style={{
          marginLeft: -15,
          fontSize: 14,
          fontWeight: "bold",
          backgroundColor: "#303030",
          padding: 20,
          width: 240,
        }}
      >
        <span style={{ opacity: 0.7, fontWeight: "normal", fontSize: 14 }}>
          Forward-Bearing
        </span>
        <br />
        <span>{gDataValues.bearing.toFixed(0) + "\u00B0"}</span>

        <br />
        <br />
        <span style={{ opacity: 0.7, fontWeight: "normal", fontSize: 14 }}>
          Back-Bearing
        </span>
        <br />
        <span>{gDataValues.backbearing.toFixed(0) + "\u00B0"}</span>

        <br />
        <br />
        <span style={{ opacity: 0.7, fontWeight: "normal", fontSize: 14 }}>Distance</span>
        <br />
        <span>{gDataValues.distance.toFixed(2) + " km"}</span>
      </div>

      <br />
      <br />
      <div style={{ ...childrenSideBySideStyle, marginTop: -20 }}>
        <Button
          onClick={() => handleClear()}
          style={{
            color: "#242424",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#ADADAD",
            fontSize: 12,
            borderRadius: 0,
          }}
        >
          <span>Clear</span>
        </Button>
      </div>
    </div>
  );
}
