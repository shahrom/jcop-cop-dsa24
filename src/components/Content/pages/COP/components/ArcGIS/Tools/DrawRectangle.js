/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawRectangle.js
 * Created: Sunday, 17th April 2022 3:39:55 pm
 * Modified: Sunday, 17th April 2022 3:41:18 pm
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
import { setRectangle, getRectangle } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

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
export const DrawRectangleOnMap = () => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(([Draw, Graphic]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("rectangle");

    action.on("cursor-update", function (evt) {
      gView.graphics.removeAll();
      createRectangle("UPDATE", evt.vertices, Graphic);
      gView.surface.style.cursor = "crosshair";
    });

    action.on("draw-complete", function (evt) {
      gView.graphics.removeAll();
      createRectangle("COMPLETE", evt.vertices, Graphic);
      gView.surface.style.cursor = "default";
    });

    const createRectangle = (mode, vertices, Graphic) => {
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

      var rectanglePaths = [
        [pointA.x, pointA.y],
        [pointB.x, pointA.y],
        [pointB.x, pointB.y],
        [pointA.x, pointB.y],
      ];

      var colorSelection = "";
      switch (gDataValues.type) {
        case 1:
          colorSelection = "rgba(239, 0, 44, 0.2)";
          break;
        case 2:
          colorSelection = "rgba(0, 148, 255, 0.2)";
          break;
        case 3:
          colorSelection = "rgba(255, 106, 0, 0.2)";
          break;
        case 4:
          colorSelection = "rgba(239, 0, 44, 1)";
          break;
        case 5:
          colorSelection = "rgba(0, 148, 255, 1)";
          break;
        case 6:
          colorSelection = "rgba(255, 106, 0, 1)";
          break;
      }

      const graphic = new Graphic({
        geometry: {
          type: "polygon",
          rings: rectanglePaths,
          spatialReference: gView.spatialReference,
        },
        symbol: {
          type: "simple-fill",
          color: colorSelection,
          style: gDataValues.type < 4 ? "solid" : "none",
          outline: {
            width: 2,
            color: gDataValues.type < 4 ? "white" : colorSelection,
          },
        },
        popupTemplate: {
          title: "Rectangle",
        },
      });

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DrawRectangleLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawRectangle(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getRectangle);

  const classes = useStyles();

  const handleRectangleType = (type) => {
    gDispatch(setMapCommand("DRAW_RECTANGLE_ON_MAP"));
    gDispatch(setRectangle({ type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawRectangleLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Rectangle Area",
      markers: [
        {
          icon: "img/markers/bft/rectangle-1.png",
          name: "Type 1",
          type: 1,
        },
        {
          icon: "img/markers/bft/rectangle-2.png",
          name: "Type 2",
          type: 2,
        },
        {
          icon: "img/markers/bft/rectangle-3.png",
          name: "Type 3",
          type: 3,
        },
      ],
    },
    {
      category: "Rectangle Line",
      markers: [
        {
          icon: "img/markers/bft/rectangle-4.png",
          name: "Type 4",
          type: 4,
        },
        {
          icon: "img/markers/bft/rectangle-5.png",
          name: "Type 5",
          type: 5,
        },
        {
          icon: "img/markers/bft/rectangle-6.png",
          name: "Type 6",
          type: 6,
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
                        onClick={() => handleRectangleType(marker.type)}
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
          <p>Draw Rectangle</p>
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
