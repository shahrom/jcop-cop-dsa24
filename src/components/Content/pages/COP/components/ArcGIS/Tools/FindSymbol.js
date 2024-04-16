/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: FindSymbol.js
 * Created: Monday, 18th April 2022 10:23:58 am
 * Modified: Monday, 18th April 2022 10:33:14 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";

// components
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gDispatch = null;

export default function FindSymbol(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  const [layerList, setLayerList] = useState([]);

  var searchList = [
    "Points",
    "Lines",
    "Areas",
    "Circles",
    "Ellipse",
    "Rectangles",
    "Arcs",
    "Stations",
    "Reports",
    "Alerts",
  ];

  useEffect(() => {
    // Get the layer list
    var lyrList = [];
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.type === "graphics") {
        if (searchList.includes(lyr.title)) {
          //   Get the graphics on every layer
          var graphicList = [];
          for (var g = 0; g < lyr.graphics.items.length; g++) {
            graphicList.push(lyr.graphics.items[g]);
          }

          if (graphicList.length > 0) {
            lyrList.push({ layerName: lyr.title, graphicList: graphicList });
          }
        }
      }
    }
    setLayerList(lyrList);
  }, [props.map]);

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClick = (layerName, id) => {
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.title === layerName) {
        for (var g = 0; g < lyr.graphics.items.length; g++) {
          var gpc = lyr.graphics.items[g];

          if (gpc.symbol.id === id) {
            if (gpc.geometry.extent === null) {
              gView.center = [gpc.geometry.longitude, gpc.geometry.latitude];
              gView.zoom = 20;
            } else {
              gView.extent = gpc.geometry.extent;
              gView.zoom = gView.zoom - 1.5;
            }
          }
        }
      }
    }
  };

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
          <p>Find Symbol</p>
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

        <div style={{ overflow: "auto", maxHeight: 500 }}>
          {layerList.map((row, index) => (
            <Accordion
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                color: "white",
                margin: 0,
                padding: 0,
                fontSize: 14,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      marginTop: 0,
                      color: "white",
                    }}
                  />
                }
              >
                {row.layerName +
                  (row.graphicList.length > 0 ? " (" + row.graphicList.length + ")" : "")}
              </AccordionSummary>
              <AccordionDetails
                style={{
                  margin: 0,
                  padding: 10,
                  margintop: -10,
                  backgroundColor: "rgba(48,48,48,1)",
                }}
              >
                <div>
                  {row.graphicList.map((marker, index) => (
                    <div style={childrenSideBySideStyle}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(row.layerName, marker.symbol.id)}
                      >
                        <img
                          style={{
                            width: 28,
                            height: 28,
                          }}
                          src={marker.symbol.url != null && marker.symbol.url}
                          alt={""}
                          object-fit="contain"
                        />
                        <p
                          key={index}
                          style={{
                            marginLeft: 30,
                            marginTop: -25,
                            color: "white",
                            fontSize: 14,
                          }}
                        >
                          {marker.popupTemplate.title != null &&
                            marker.popupTemplate.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </Draggable>
  );
}
