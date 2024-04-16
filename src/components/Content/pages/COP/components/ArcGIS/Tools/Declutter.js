/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Declutter.js
 * Created: Monday, 18th April 2022 10:23:58 am
 * Modified: Monday, 18th April 2022 10:33:14 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { loadModules } from "esri-loader";
import Button from "@material-ui/core/Button";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

// components
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gPointList = [];
var gDispatch = null;

const drawPolylineOnMap = (data) => {
  loadModules(["esri/views/draw/Draw", "esri/Graphic", "esri/core/watchUtils"]).then(
    ([Draw, Graphic, watchUtils]) => {
      // Check if tool is in the list
      if (gPointList.some((item) => item.id === data.id)) {
        // Remove tool from the list
        var newList = gPointList.filter((item) => item.id !== data.id);
        gPointList = newList;
      } else {
        // Add tool into the list
        var newList = gPointList;
        newList.push(data);
        gPointList = newList;
      }

      // Draw line
      const drawLine = (data) => {
        const scrScreen = { x: data.screenXY.x, y: data.screenXY.y };
        const scrPoint = gView.toMap(scrScreen);

        var path = [];
        if (data.symGeometry.center !== undefined) {
          path = [
            [data.symGeometry.center.longitude, data.symGeometry.center.latitude],
            [scrPoint.longitude, scrPoint.latitude],
          ];
        } else {
          path = [
            [data.symGeometry.longitude, data.symGeometry.latitude],
            [scrPoint.longitude, scrPoint.latitude],
          ];
        }

        const graphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: path,
          },
          symbol: {
            type: "simple-line",
            color: "rgba(255,255,255,0.6)",
            width: 2,
            style: "solid",
          },
        });

        gView.graphics.add(graphic);
      };

      watchUtils.whenTrue(gView, "stationary", () => {
        gView.graphics.removeAll();

        if (gView.extent) {
          for (var i = 0; i < gPointList.length; i++) {
            drawLine(gPointList[i]);
          }
        }
      });
    },
    []
  );
};

export function UnDeclutter(map) {
  return;
  var searchList = ["Points", "Stations", "Reports"];

  for (var i = 0; i < map.allLayers.items.length; i++) {
    var lyr = map.allLayers.items[i];
    if (lyr.type === "graphics") {
      if (searchList.includes(lyr.title)) {
        for (var j = 0; j < lyr.graphics.items.length; j++) {
          // Graphic
          var gpc = lyr.graphics.items[j];

          var picSymbol = {
            type: "picture-marker",
            url: gpc.attributes != null ? gpc.attributes.icon : "",
            width: gpc.attributes.width,
            height: gpc.attributes.height,
            xoffset: "0px",
            yoffset: "0px",
          };
          gpc.symbol = picSymbol;
        }
      }
    }
  }
}

export default function Declutter(props) {
  return;
  gMap = props.map;
  gView = props.view;

  gDispatch = useDispatch();
  const [layerList, setLayerList] = useState([]);
  const [x, setX] = useState();
  const [y, setY] = useState();

  var searchList = ["Points", "Stations", "Reports"];

  useEffect(() => {
    // Get the layer list
    var lyrList = [];
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.type === "graphics") {
        if (searchList.includes(lyr.title)) {
          //   Get the graphics on every layer
          var graphicList = [];
          for (var j = 0; j < lyr.graphics.items.length; j++) {
            // Graphic
            var gpc = lyr.graphics.items[j];

            var picSymbol = {
              type: "picture-marker",
              url: "img/markers/bft/r-4.png",
              width: 10,
              height: 10,
              xoffset: "0px",
              yoffset: "0px",
            };
            gpc.symbol = picSymbol;

            // Add the graphic to the list
            graphicList.push(gpc);
          }

          if (graphicList.length > 0) {
            lyrList.push({ layerName: lyr.title, graphicList: graphicList });

            graphicList.sort(function (a, b) {
              return b.geometry.latitude - a.geometry.latitude;
            });
          }
        }
      }
    }
    setLayerList(lyrList);
  }, [props.map]);

  useEffect(() => {
    window.addEventListener("mousemove", function (e) {
      setX(e.x);
      setY(e.y);
    });
  }, []);

  const handleClear = () => {
    gView.graphics.removeAll();
    gPointList = [];

    var lyr = gMap.findLayerById("DeclutterLayer");
    lyr.graphics.removeAll();
  };

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
            drawPolylineOnMap({
              id: id,
              symGeometry: gpc.geometry,
              screenXY: { x: x, y: y - 120 },
            });
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
          maxHeight: 560,
          // backgroundColor: "#242424",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "0px 15px 15px 15px",
        }}
      >
        <div>
          <p>Declutter</p>
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
                backgroundColor: "rgba(0,0,0,0.5)",
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
                  marginLeft: -18,
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
                          src={marker.attributes != null && marker.attributes.icon}
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
