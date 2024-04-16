/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawPolygon.js
 * Created: Saturday, 16th April 2022 6:48:53 pm
 * Modified: Saturday, 16th April 2022 7:05:50 pm
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
import { setPolygon, getPolygon } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */
export const DrawPolygonOnMap = () => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(([Draw, Graphic]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolygonDrawAction
    const action = draw.create("polygon", { mode: "hybrid" });

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

    const createPolygon = (mode, vertices, Graphic) => {
      if (vertices.length === 1) return;

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
      }

      const graphic = new Graphic({
        geometry: {
          type: "polygon",
          rings: vertices,
          spatialReference: gView.spatialReference,
        },
        // symbol: {
        //   type: "picture-fill",
        //   url: "img/markers/bft/r-1.png",
        //   width: "24px",
        //   height: "24px",
        //   outline: {
        //     style: "solid",
        //   },
        // },
        symbol: {
          type: "simple-fill",
          color: colorSelection,
          outline: {
            color: "rgba(255,255,255,0.7)",
            width: 3,
          },
          style: "solid",
        },
        popupTemplate: {
          title: "Border Area",
        },
      });

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        console.log(graphic.geometry.rings);
        var lyr = gMap.findLayerById("DrawPolygonLayer");
        lyr.add(graphic);
        console.log("XXXXXX ->" + graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawPolygon(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getPolygon);

  const handlePolygonType = (type) => {
    gDispatch(setMapCommand("DRAW_POLYGON_ON_MAP"));
    gDispatch(setPolygon({ type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawPolygonLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Area Style",
      markers: [
        {
          icon: "img/markers/bft/area-1.png",
          name: "Style 1",
          type: 1,
        },
        {
          icon: "img/markers/bft/area-2.png",
          name: "Style 2",
          type: 2,
        },
        {
          icon: "img/markers/bft/area-3.png",
          name: "Style 3",
          type: 3,
        },
      ],
    },
  ];

  const ContentList = React.useCallback((props) => {
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
                        onClick={() => handlePolygonType(marker.type)}
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
          <p>Draw Area</p>
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
