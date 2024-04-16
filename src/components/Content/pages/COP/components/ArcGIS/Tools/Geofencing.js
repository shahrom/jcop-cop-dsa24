/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Geofencing.js
 * Created: Tuesday, 19th April 2022 9:41:28 pm
 * Modified: Tuesday, 19th April 2022 9:42:30 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable"; // The default

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// components
import {
  setGeofencing,
  getGeofencing,
  setGeofencingAlert,
  getGeofencingAlert,
} from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;
var gTimer = null;
var gCount = 0;
var gCreated = true;

export const DrawGeofencingRoute = () => {
  loadModules([
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/geometryEngine",
    "esri/geometry/support/webMercatorUtils",
  ]).then(([Graphic, Point, geometryEngine, webMercatorUtils]) => {
    // alert("2");
    fetch(`data/COP/simTrack.json`)
      .then((result) => result.json())
      .then((data) => {
        createPolyline(data, Graphic);
      })
      .catch(function (err) {
        console.log(err);
      });

    const startSIM = (paths) => {
      gTimer = setInterval(function () {
        if (gCreated) {
          createPoint(paths[gCount]);
        } else {
          updatePoint(paths[gCount]);
        }

        // Detection
        var lyr = gMap.findLayerById("DrawGeofencingLayer");
        for (var i = 0; i < lyr.graphics.items.length; i++) {
          var detectionList = checkIsContain(lyr.graphics.items[i]);
          console.log(detectionList.length);
          if (detectionList.length > 0) {
            gDispatch(setGeofencingAlert(true));
          } else {
            gDispatch(setGeofencingAlert(false));
          }
        }

        if (gCount >= paths.length - 1) {
          gCount = 0;
        } else {
          gCount += 1;
        }
      }, 10);
    };

    const checkIsContain = (geoArea) => {
      // Check to see if there is any graphics 'contains' inside the area
      // Need to loop the graphics for the whole layer to check
      var detectionList = [];
      var lyr = gMap.findLayerById("SIMLayer");

      for (var i = 0; i < lyr.graphics.items.length; i++) {
        var g = lyr.graphics.items[i];

        let p1 = {
          type: "point",
          x: g.geometry.x,
          y: g.geometry.y,
          spatialReference: gView.spatialReference,
        };

        var pW84 = webMercatorUtils.webMercatorToGeographic(p1);

        var point = new Point(pW84.x, pW84.y);
        var graphic = new Graphic();
        graphic.geometry = point;

        const isWithin = geometryEngine.contains(
          geoArea.geometry,
          graphic.geometry
        );
        if (isWithin) {
          detectionList.push(g);
        }
      }
      return detectionList;
    };

    const createPoint = (point) => {
      gCreated = false;
      let p1 = {
        type: "point",
        x: point[0],
        y: point[1],
        spatialReference: gView.spatialReference,
      };

      var picSymbol = {
        type: "picture-marker",
        url: "img/markers/bft/r-1.png",
        width: 28,
        height: 28,
        xoffset: "0px",
        yoffset: "0px",
      };

      var attributes = {
        id: "sim_marker",
      };

      var graphic = new Graphic();
      graphic.geometry = p1;
      graphic.symbol = picSymbol;
      graphic.attributes = attributes;

      var lyr = gMap.findLayerById("SIMLayer");
      lyr.add(graphic);
    };

    const updatePoint = (point) => {
      let p1 = {
        type: "point",
        x: point[0],
        y: point[1],
        spatialReference: gView.spatialReference,
      };

      var lyr = gMap.findLayerById("SIMLayer");
      for (var i = 0; i < lyr.graphics.length; i++) {
        var g = lyr.graphics.items[i];
        if (g.attributes !== null) {
          if (g.attributes.id === "sim_marker") {
            var gClone = g.clone();
            lyr.remove(g);
            gClone.geometry = p1;
            lyr.add(gClone);
          }
        }
      }
    };

    const createPolyline = (paths, Graphic) => {
      const graphic = new Graphic({
        geometry: {
          type: "polyline",
          paths: paths,
          spatialReference: gView.spatialReference,
        },
        symbol: {
          type: "simple-line",
          color: [255, 255, 255, 0.2],
          width: 2,
          cap: "square",
          join: "miter",
          style: "solid",
        },
      });

      // var lyr = gMap.findLayerById("DrawGeofencingLayer");
      // lyr.add(graphic);

      setTimeout(() => {
        startSIM(graphic.geometry.paths[0]);
      }, 1000);
    };
  }, []);
};

export const DrawGeofencingOnMap = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/geometry/Circle",
    "esri/geometry/SpatialReference",
    "esri/geometry/support/webMercatorUtils",
    "esri/geometry/Point",
  ]).then(
    ([
      Draw,
      Graphic,
      geometryEngine,
      Circle,
      SpatialReference,
      webMercatorUtils,
      Point,
    ]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: gView,
      });

      const action = draw.create("polygon", { mode: "click" });

      if (gDataValues.shape === "polygon") {
        action.on("cursor-update", function (evt) {
          gView.graphics.removeAll();
          createPolygon("UPDATE", evt.vertices, Graphic);
          gView.surface.style.cursor = "crosshair";
        });

        action.on("draw-complete", function (evt) {
          gView.graphics.removeAll();
          createPolygon("COMPLETE", evt.vertices, Graphic);
          gView.surface.style.cursor = "default";
        });
      }

      if (gDataValues.shape === "polyline") {
        action.on("cursor-update", function (evt) {
          gView.graphics.removeAll();
          createPolyline("UPDATE", evt.vertices, Graphic);
          gView.surface.style.cursor = "crosshair";
        });

        action.on("draw-complete", function (evt) {
          gView.graphics.removeAll();
          createPolyline("COMPLETE", evt.vertices, Graphic);
          gView.surface.style.cursor = "default";
        });
      }

      const createPolygon = (mode, vertices, Graphic) => {
        if (vertices.length === 1) return;

        var colorFill = "";
        switch (gDataValues.type) {
          case 1:
            colorFill = "rgba(206,12,18, 0.2)";
            break;
          case 2:
            colorFill = "rgba(48,154,255, 0.2)";
            break;
        }

        // Convert the Mercator points to WGS84
        const g1 = new Graphic({
          geometry: {
            type: "polygon",
            rings: vertices,
            spatialReference: gView.spatialReference,
          },
        });
        var gp = webMercatorUtils.webMercatorToGeographic(g1.geometry);

        // Create the polygon area with the converted geometry
        const graphic = new Graphic({
          geometry: gp,
          symbol: {
            type: "simple-fill",
            color: colorFill,
            outline: {
              color: "white",
              width: 2,
            },
            style: "solid",
          },
        });

        // Save the graphics into the layer if in complete mode
        if (mode === "UPDATE") {
          gView.graphics.add(graphic);
        }
        if (mode === "COMPLETE") {
          console.log(graphic.geometry.rings);
          var lyr = gMap.findLayerById("DrawGeofencingLayer");
          lyr.add(graphic);
        }
      };

      const createPolyline = (mode, vertices, Graphic) => {
        var colorOutline = "";
        switch (gDataValues.type) {
          case 3:
            colorOutline = "rgba(206,12,18, 0.2)";
            break;
          case 4:
            colorOutline = "rgba(48,154,255, 0.2)";
            break;
        }

        // Convert the Mercator points to WGS84
        const g1 = new Graphic({
          geometry: {
            type: "polyline",
            paths: vertices,
            spatialReference: gView.spatialReference,
          },
        });
        var gp = webMercatorUtils.webMercatorToGeographic(g1.geometry);
        var buffer = geometryEngine.geodesicBuffer(gp, 0.01, "kilometers");

        const gBuffer = new Graphic({
          geometry: buffer,
          symbol: {
            type: "simple-fill",
            color: colorOutline,
            outline: {
              color: "white",
              width: 2,
            },
            style: "solid",
          },
        });

        // Save the graphics into the layer if in complete mode
        if (mode === "UPDATE") {
          gView.graphics.add(gBuffer);
        }
        if (mode === "COMPLETE") {
          var lyr = gMap.findLayerById("DrawGeofencingLayer");
          lyr.add(gBuffer);
        }
      };

      const checkIsContain = (geoArea) => {
        // Check to see if there is any graphics 'contains' inside the area
        // Need to loop the graphics for the whole layer to check
        var detectionList = [];
        var lyr = gMap.findLayerById("SIMLayer");

        for (var i = 0; i < lyr.graphics.items.length; i++) {
          var g = lyr.graphics.items[i];

          var point = new Point(g.geometry.x, g.geometry.y);
          var graphic = new Graphic();
          graphic.geometry = point;

          const isWithin = geometryEngine.contains(
            geoArea.geometry,
            graphic.geometry
          );
          if (isWithin) {
            detectionList.push(g);
          }
        }
        return detectionList;
      };
    },
    []
  );
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawGeofencing(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getGeofencing);
  const geofencingAlert = useSelector(getGeofencingAlert);

  useEffect(() => {
    gDispatch(setMapCommand("DRAW_GEOFENCING_SIM_ROUTE"));
  }, []);

  const handleGeofencingType = (shape, type) => {
    gDispatch(setMapCommand("DRAW_GEOFENCING_ON_MAP"));
    gDispatch(setGeofencing({ shape: shape, type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
    gCreated = true;
    gCount = 0;
    clearInterval(gTimer);
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawGeofencingLayer");
    lyr.graphics.removeAll();
    var lyr = gMap.findLayerById("SIMLayer");
    lyr.graphics.removeAll();
    gCreated = true;
    gCount = 0;
    clearInterval(gTimer);
  };

  const mainList = [
    {
      category: "Area",
      markers: [
        {
          icon: "img/markers/bft/hq-1.png",
          name: "Inner Alert",
          type: 1,
          shape: "polygon",
        },
        {
          icon: "img/markers/bft/hq-2.png",
          name: "Outer Alert",
          type: 2,
          shape: "polygon",
        },
      ],
    },
    {
      category: "Buffer Line",
      markers: [
        {
          icon: "img/markers/bft/hq-1.png",
          name: "Inner Alert (100m)",
          type: 3,
          shape: "polyline",
        },
        {
          icon: "img/markers/bft/hq-2.png",
          name: "Outer Alert (100m)",
          type: 4,
          shape: "polyline",
        },
      ],
    },
  ];

  const ContentList = React.memo((props) => {
    return (
      <div style={{ overflow: "auto", maxHeight: 500 }}>
        {mainList.map((row, index) => (
          <>
            <Accordion
              style={{
                margin: "auto",
              }}
            >
              <AccordionSummary
                style={{
                  backgroundColor: "rgba(0,0,0,1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      color: "white",
                    }}
                  />
                }
              >
                <div>
                  <span
                    style={{
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {row.category}
                  </span>
                </div>
              </AccordionSummary>

              <AccordionDetails style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
                <div>
                  {row.markers.map((marker, index) => (
                    <List style={{ padding: 0 }}>
                      <ListItem
                        button
                        onClick={() =>
                          handleGeofencingType(marker.shape, marker.type)
                        }
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon>
                          <img
                            style={{
                              width: 35,
                              height: 35,
                            }}
                            src={marker.icon}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <span
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: 14,
                              }}
                            >
                              {marker.name}
                            </span>
                          }
                        />
                      </ListItem>
                    </List>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </div>
    );
  });

  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: window.innerWidth - 295,
          width: 250,
          maxHeight: 550,
          backgroundColor: "#242424",
          color: "white",
          padding: "0px 15px 15px 15px",
        }}
      >
        <div>
          <p>
            Geofencing{" "}
            <span
              style={{
                color: "red",
                display: geofencingAlert ? "none" : "block",
              }}
            >
              ALERT
            </span>
          </p>
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

        <ContentList />

        <br />
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
    </Draggable>
  );
}
