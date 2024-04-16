/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawPoint.js
 * Created: Saturday, 16th April 2022 7:35:57 am
 * Modified: Saturday, 16th April 2022 7:36:09 am
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
import { setPoint, getPoint } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */
export const DrawPointStartPoint = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/geometry/Circle",
  ]).then(([Draw, Graphic, geometryEngine, Circle]) => {
    // create a new instance of draw
    var draw = new Draw({
      view: gView,
    });

    // creates and returns an instance of PolyLineDrawAction
    const action = draw.create("point");

    // Give a visual feedback to users as they move the pointer over the view
    action.on("cursor-update", function (evt) {
      createStartMarker("UPDATE", evt.coordinates, gView, Graphic);
    });

    // Create a point when user clicks on the view or presses "C" key.
    action.on("draw-complete", function (evt) {
      createStartMarker("COMPLETE", evt.coordinates, gView, Graphic);
    });

    const createStartMarker = (mode, coordinates, gView, Graphic) => {
      gView.graphics.removeAll();

      // Geometry
      let p1 = {
        type: "point",
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: gView.spatialReference,
      };

      // Converts the geometry from Basemap to LatLng
      var point = new Circle({
        center: p1,
      });
      gDispatch(
        setPoint({
          lat: point.center.latitude,
          lng: point.center.longitude,
        })
      );

      var width = "48px";
      var height = "48px";
      if (gDataValues.type === "Stationary") {
        width = "40px";
        height = "40px";
      }
      if (gDataValues.type === "Friendly") {
        width = "52px";
        height = "52px";
      }
      if (gDataValues.type === "Enemy") {
        width = "52px";
        height = "52px";
      }

      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: gDataValues.icon,
        width: width,
        height: height,
        xoffset: "0px",
        yoffset: "0px",
      };

      var popupTemplate = {
        title: "Point Marker",
      };

      var attributes = {
        icon: gDataValues.icon,
        width: width,
        height: height,
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;
      graphic.popupTemplate = popupTemplate;
      graphic.attributes = attributes;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DrawPointLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawPoint(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getPoint);

  const handleSymbolSelection = (type, icon, label) => {
    gDispatch(setMapCommand("DRAW_POINT_START_POSITION"));
    gDispatch(setPoint({ type: type, icon: icon, label: label }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawPointLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Stationary",
      markers: [
        {
          icon: "img/markers/bft/hq-1.png",
          name: "Base 1",
        },
        {
          icon: "img/markers/bft/hq-2.png",
          name: "Base 2",
        },
        {
          icon: "img/markers/bft/hq-3.png",
          name: "Base 3",
        },
        {
          icon: "img/markers/bft/r-1.png",
          name: "Base 4",
        },
        {
          icon: "img/markers/bft/r-2.png",
          name: "Base 5",
        },
        {
          icon: "img/markers/bft/r-3.png",
          name: "Base 6",
        },
      ],
    },
    {
      category: "Friendly",
      markers: [
        {
          icon: "img/markers/bft/friendly-1.png",
          name: "",
        },
        {
          icon: "img/markers/bft/friendly-2.png",
          name: "",
        },
        {
          icon: "img/markers/bft/friendly-3.png",
          name: "",
        },
      ],
    },
    {
      category: "Enemy",
      markers: [
        {
          icon: "img/markers/bft/enemy-1.png",
          name: "",
        },
        {
          icon: "img/markers/bft/enemy-2.png",
          name: "",
        },
        {
          icon: "img/markers/bft/enemy-3.png",
          name: "",
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
                        onClick={() =>
                          handleSymbolSelection(row.category, marker.icon, marker.name)
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
          <p>Draw Point</p>
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
