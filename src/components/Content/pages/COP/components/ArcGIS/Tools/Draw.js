/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Draw.js
 * Created: Thursday, 7th April 2022 10:11:36 pm
 * Modified: Thursday, 7th April 2022 10:14:25 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */
import React, { useEffect, useRef, useState, memo } from "react";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";

// components
import { setCircle, setArc, setPolyline, setPolygon } from "app/mapSlice";

var dispatch = null;

export default function Draw() {
  dispatch = useDispatch();
}

export const ClearDraw = (view) => {
  view.graphics.removeAll();
};

export const DrawPolyline = (view) => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(
    ([Draw, Graphic, Circle, geometryEngine]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: view,
      });

      view.graphics.removeAll();

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("polyline", { mode: "click" });

      // focus the view to activate keyboard shortcuts for sketching
      view.focus();

      action.on("cursor-update", function (evt) {
        createPolyline(evt.vertices, view, Graphic);
      });

      action.on("vertex-add", function (evt) {
        createPolyline(evt.vertices, view, Graphic);
      });

      action.on("draw-complete", function (evt) {
        createPolyline(evt.vertices, view, Graphic);
      });

      // action.on(["vertex-add", "draw-complete"], function (evt) {
      //   createPolyline(evt.vertices, view, Graphic);
      // });
    },
    []
  );
};

export const DrawPolygon = (view) => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(
    ([Draw, Graphic, Circle, geometryEngine]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: view,
      });

      view.graphics.removeAll();

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("polygon", { mode: "click" });

      // focus the view to activate keyboard shortcuts for sketching
      view.focus();

      action.on("cursor-update", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });

      action.on("vertex-add", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });

      action.on("draw-complete", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });
    },
    []
  );
};

export const DrawArrow = (view) => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(
    ([Draw, Graphic, Circle, geometryEngine]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: view,
      });

      view.graphics.removeAll();

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("arrow", { mode: "click" });

      // focus the view to activate keyboard shortcuts for sketching
      view.focus();

      action.on("cursor-update", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });

      action.on("vertex-add", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });

      action.on("draw-complete", function (evt) {
        createPolygon(evt.vertices, view, Graphic);
      });
    },
    []
  );
};

export const DrawCircle = (view) => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/Circle",
    "esri/geometry/geometryEngine",
  ]).then(([Draw, Graphic, Circle, geometryEngine]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: view,
    });

    view.graphics.removeAll();

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("circle");

    // focus the view to activate keyboard shortcuts for sketching
    view.focus();

    action.on("cursor-update", function (evt) {
      createCircle(evt.vertices, view, Graphic, Circle, geometryEngine);
    });

    action.on("draw-complete", function (evt) {
      createCircle(evt.vertices, view, Graphic, Circle, geometryEngine);
    });
  }, []);
};

const createPolyline = (vertices, view, Graphic) => {
  view.graphics.removeAll();

  const graphic = new Graphic({
    geometry: {
      type: "polyline",
      paths: vertices,
      spatialReference: view.spatialReference,
    },
    symbol: {
      type: "simple-line", // autocasts as new SimpleFillSymbol
      color: [255, 255, 255],
      width: 2,
      cap: "round",
      join: "round",
    },
  });
  view.graphics.add(graphic);
};

const createPolygon = (vertices, view, Graphic) => {
  view.graphics.removeAll();

  const graphic = new Graphic({
    geometry: {
      type: "polygon",
      rings: vertices,
      spatialReference: view.spatialReference,
    },
    symbol: {
      type: "simple-fill",
      color: [227, 139, 79, 0.2], // Orange, opacity 80%
      outline: {
        color: "yellow",
        width: 2,
      },
    },
  });
  view.graphics.add(graphic);
};

const createCircle = (vertices, view, Graphic, Circle, geometryEngine) => {
  if (vertices.length === 1) return;

  view.graphics.removeAll();

  let pointA = {
    type: "point", // autocasts as /Point
    x: vertices[0][0],
    y: vertices[0][1],
    spatialReference: view.spatialReference,
  };

  let pointB = {
    type: "point", // autocasts as /Point
    x: vertices[1][0],
    y: vertices[1][1],
    spatialReference: view.spatialReference,
  };

  var distance = geometryEngine.distance(pointA, pointB, "kilometers");
  dispatch(setCircle({ radius: distance }));

  var circleGeometry = new Circle({
    center: pointA,
    geodesic: true,
    numberOfPoints: 360,
    radius: distance,
    radiusUnit: "kilometers",
  });

  view.graphics.add(
    new Graphic({
      geometry: circleGeometry,
      symbol: {
        type: "simple-fill",
        style: "none",
        outline: {
          width: 2,
          color: "yellow",
        },
      },
    })
  );
};
