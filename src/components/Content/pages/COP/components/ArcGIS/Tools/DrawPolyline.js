/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawPolyline.js
 * Created: Saturday, 16th April 2022 6:34:41 pm
 * Modified: Saturday, 16th April 2022 7:05:58 pm
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
import { setPolyline, getPolyline } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";
import {
  lineBorder,
  lineZigZag,
  lineArrow,
  lineDashes,
  lineBuffer,
  lineSymbolBlock,
  lineSymbolArrow,
  lineMarkerPlacementVertices,
  lineMarkerPlacement,
} from "./CIMLineStyle";

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
export const DrawPolylineOnMap = () => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic", "esri/symbols/CIMSymbol"]).then(
    ([Draw, Graphic, CIMSymbol]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: gView,
      });

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("polyline", { mode: "hybrid" });

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

      const createPolyline = (mode, vertices, Graphic) => {
        const lineSymbol = new CIMSymbol();

        switch (gDataValues.type) {
          case 1:
            lineSymbol.data = lineBorder();
            break;
          case 2:
            lineSymbol.data = lineZigZag();
            break;
          case 3:
            lineSymbol.data = lineArrow();
            break;
          case 4:
            lineSymbol.data = lineDashes();
            break;
          case 5:
            lineSymbol.data = lineBuffer();
            break;
          case 6:
            lineSymbol.data = lineSymbolBlock();
            break;
          case 7:
            lineSymbol.data = lineSymbolArrow();
            break;
          case 8:
            lineSymbol.data = lineMarkerPlacementVertices();
            break;
          case 9:
            lineSymbol.data = lineMarkerPlacement();
            break;
          case 10:
            lineSymbol.data = lineSymbolArrow();
            break;
        }

        const graphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: vertices,
            spatialReference: gView.spatialReference,
          },
          symbol: lineSymbol,
          popupTemplate: {
            title: "Border Line",
          },
        });

        // Save the graphics into the layer if in complete mode
        if (mode === "UPDATE") {
          gView.graphics.add(graphic);
        }
        if (mode === "COMPLETE") {
          var lyr = gMap.findLayerById("DrawPolylineLayer");
          lyr.add(graphic);
          console.log(graphic);
        }
      };
    },
    []
  );
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawPolyline(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getPolyline);

  const handlePolylineType = (type) => {
    gDispatch(setMapCommand("DRAW_POLYLINE_ON_MAP"));
    gDispatch(setPolyline({ type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClear = () => {
    gView.graphics.removeAll();

    var lyr = gMap.findLayerById("DrawPolylineLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Line Style",
      markers: [
        {
          type: 1,
          icon: "img/markers/bft/line-1.png",
          name: "Type 1",
        },
        {
          type: 2,
          icon: "img/markers/bft/line-2.png",
          name: "Type 2",
        },
        {
          type: 3,
          icon: "img/markers/bft/line-3.png",
          name: "Type 3",
        },
        {
          type: 4,
          icon: "img/markers/bft/line-4.png",
          name: "Type 4",
        },
        {
          type: 5,
          icon: "img/markers/bft/line-5.png",
          name: "Type 5",
        },
        {
          type: 6,
          icon: "img/markers/bft/line-6.png",
          name: "Type 6",
        },
        {
          type: 7,
          icon: "img/markers/bft/line-7.png",
          name: "Type 7",
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
                        onClick={() => handlePolylineType(marker.type)}
                        style={{ padding: 0 }}
                      >
                        <ListItemIcon>
                          <img
                            style={{
                              width: 60,
                              height: 30,
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
          <p>Draw Line</p>
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
