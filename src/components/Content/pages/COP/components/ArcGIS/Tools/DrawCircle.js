/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawCircle.js
 * Created: Thursday, 7th April 2022 9:48:28 pm
 * Modified: Saturday, 9th April 2022 9:59:39 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Draggable from "react-draggable";

import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// components
import { setMapTool, setMapCommand } from "app/appSlice";
import { setCircle, getCircle } from "app/mapSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    color: "white",
    fontSize: 14,
    height: 15,
    padding: 10,
    opacity: 0.7,
    border: "1px solid rgba(255,255,255,0.3)",
  },
  input: {
    color: "orange",
    fontSize: 14,
    height: 30,
    padding: 0,
    opacity: 0.7,
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 0,
  },
});

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */
export const DrawCircleOnMap = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/Circle",
    "esri/geometry/geometryEngine",
  ]).then(([Draw, Graphic, Circle, geometryEngine]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("circle");

    // focus the view to activate keyboard shortcuts for sketching
    gView.focus();

    if (gDataValues.shape === "circle") {
      action.on("cursor-update", function (evt) {
        gView.graphics.removeAll();
        createCircle("UPDATE", evt.vertices, Graphic, Circle, geometryEngine);
        gView.surface.style.cursor = "crosshair";
      });

      action.on("draw-complete", function (evt) {
        gView.graphics.removeAll();
        createCircle("COMPLETE", evt.vertices, Graphic, Circle, geometryEngine);
        gView.surface.style.cursor = "default";
      });
    }

    if (gDataValues.shape === "ellipse") {
      action.on("cursor-update", function (evt) {
        gView.graphics.removeAll();
        createEllipse("UPDATE", evt.vertices, Graphic);
        gView.surface.style.cursor = "crosshair";
      });

      action.on("draw-complete", function (evt) {
        gView.graphics.removeAll();
        createEllipse("COMPLETE", evt.vertices, Graphic);
        gView.surface.style.cursor = "default";
      });
    }

    const createCircle = (mode, vertices, Graphic, Circle, geometryEngine) => {
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
        setCircle({
          radius: distance,
          lat: pointA.y,
          lng: pointA.x,
        })
      );

      var circleGeometry = new Circle({
        center: pointA,
        geodesic: true,
        numberOfPoints: 360,
        radius: distance,
        radiusUnit: "kilometers",
      });

      var colorFill = "";
      var colorOutline = "";
      switch (gDataValues.type) {
        case 1:
          colorFill = "rgba(239, 0, 44, 0.2)";
          break;
        case 2:
          colorFill = "rgba(0, 148, 255, 0.2)";
          break;
        case 3:
          colorFill = "rgba(255, 106, 0, 0.2)";
          break;
        case 4:
          colorOutline = "rgba(239, 0, 44, 1)";
          break;
        case 5:
          colorOutline = "rgba(0, 148, 255, 1)";
          break;
        case 6:
          colorOutline = "rgba(255, 106, 0, 1)";
          break;
      }

      const graphic = new Graphic({
        geometry: circleGeometry,
        symbol: {
          type: "simple-fill",
          color: colorFill,
          style: colorFill === "" ? "none" : "solid",
          outline: {
            width: 2,
            color: colorFill === "" ? colorOutline : "white",
          },
          cap: "round",
          join: "round",
        },
        popupTemplate: {
          title: "Circle",
        },
      });

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DrawCircleLayer");
        lyr.add(graphic);
      }
    };

    const createEllipse = (mode, vertices, Graphic) => {
      if (vertices.length === 1) return;

      var vs = vertices;
      var ring = [];
      var maxX, maxY, minX, minY;
      maxX = Math.max(vs[0][0], vs[1][0]);
      maxY = Math.max(vs[0][1], vs[1][1]);
      minX = Math.min(vs[0][0], vs[1][0]);
      minY = Math.min(vs[0][1], vs[1][1]);
      var width = maxX - minX;
      var height = maxY - minY;
      var cX = maxX - width / 2;
      var cY = maxY - height / 2;
      for (var i = 0; i < 360; i++) {
        var t = (i * Math.PI) / 180;
        var x = cX - (width / 2) * Math.cos(t);
        var y = cY + (height / 2) * Math.sin(t);
        ring.push([x, y]);
      }
      ring.push(ring[0]);

      var colorFill = "";
      var colorOutline = "";
      switch (gDataValues.type) {
        case 1:
          colorFill = "rgba(239, 0, 44, 0.2)";
          break;
        case 2:
          colorFill = "rgba(0, 148, 255, 0.2)";
          break;
        case 3:
          colorFill = "rgba(255, 106, 0, 0.2)";
          break;
        case 4:
          colorOutline = "rgba(239, 0, 44, 1)";
          break;
        case 5:
          colorOutline = "rgba(0, 148, 255, 1)";
          break;
        case 6:
          colorOutline = "rgba(255, 106, 0, 1)";
          break;
      }

      const graphic = new Graphic({
        geometry: {
          type: "polygon",
          rings: [ring],
          spatialReference: gView.spatialReference,
        },
        symbol: {
          type: "simple-fill",
          color: colorFill,
          style: colorFill === "" ? "none" : "solid",
          outline: {
            width: 2,
            color: colorFill === "" ? colorOutline : "white",
          },
          cap: "round",
          join: "round",
        },
        popupTemplate: {
          title: "Ellipse",
        },
      });

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DrawEllipseLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawCircle(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getCircle);

  const classes = useStyles();

  const handleCircleType = (shape, type) => {
    gDispatch(setMapCommand("DRAW_CIRCLE_ON_MAP"));
    gDispatch(setCircle({ shape: shape, type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawCircleLayer");
    lyr.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawEllipseLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Circle Area",
      markers: [
        {
          icon: "img/markers/bft/circle-1.png",
          name: "Type 1",
          type: 1,
          shape: "circle",
        },
        {
          icon: "img/markers/bft/circle-2.png",
          name: "Type 2",
          type: 2,
          shape: "circle",
        },
        {
          icon: "img/markers/bft/circle-3.png",
          name: "Type 3",
          type: 3,
          shape: "circle",
        },
      ],
    },
    {
      category: "Circle Line",
      markers: [
        {
          icon: "img/markers/bft/circle-4.png",
          name: "Type 4",
          type: 4,
          shape: "circle",
        },
        {
          icon: "img/markers/bft/circle-5.png",
          name: "Type 5",
          type: 5,
          shape: "circle",
        },
        {
          icon: "img/markers/bft/circle-6.png",
          name: "Type 6",
          type: 6,
          shape: "circle",
        },
      ],
    },
    {
      category: "Ellipse Area",
      markers: [
        {
          icon: "img/markers/bft/ellipse-1.png",
          name: "Type 1",
          type: 1,
          shape: "ellipse",
        },
        {
          icon: "img/markers/bft/ellipse-2.png",
          name: "Type 2",
          type: 2,
          shape: "ellipse",
        },
        {
          icon: "img/markers/bft/ellipse-3.png",
          name: "Type 3",
          type: 3,
          shape: "ellipse",
        },
      ],
    },
    {
      category: "Ellipse Line",
      markers: [
        {
          icon: "img/markers/bft/ellipse-4.png",
          name: "Type 4",
          type: 4,
          shape: "ellipse",
        },
        {
          icon: "img/markers/bft/ellipse-5.png",
          name: "Type 5",
          type: 5,
          shape: "ellipse",
        },
        {
          icon: "img/markers/bft/ellipse-6.png",
          name: "Type 6",
          type: 6,
          shape: "ellipse",
        },
      ],
    },
  ];

  const ContentList = React.useCallback(() => {
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
                        onClick={() => handleCircleType(marker.shape, marker.type)}
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon>
                          <img
                            style={{
                              width: 35,
                              height: 33,
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
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

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
          <p>Draw Circle</p>
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
    </Draggable>
  );
}
