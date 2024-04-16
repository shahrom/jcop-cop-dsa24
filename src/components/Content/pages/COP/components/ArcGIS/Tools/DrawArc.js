/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DrawArc.js
 * Created: Sunday, 10th April 2022 4:04:48 am
 * Modified: Sunday, 17th April 2022 10:25:05 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

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
import { setArc, getArc } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

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
export const DrawArcOnMap = () => {
  loadModules([
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/Circle",
    "esri/geometry/geometryEngine",
    "esri/geometry/coordinateFormatter",
    "esri/geometry/SpatialReference",
  ]).then(
    ([Draw, Graphic, Circle, geometryEngine, coordinateFormatter, SpatialReference]) => {
      // create a new instance of draw
      var draw = new Draw({
        view: gView,
      });

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("circle");

      action.on("cursor-update", function (evt) {
        gView.graphics.removeAll();
        createCircleGuide(evt.vertices, Graphic, Circle, geometryEngine);
        createSector("UPDATE", evt.vertices, Graphic, Circle, geometryEngine);
        createPolylineGuide(evt.vertices, Graphic);
        gView.surface.style.cursor = "crosshair";
      });

      action.on("draw-complete", function (evt) {
        gView.graphics.removeAll();
        createSector("COMPLETE", evt.vertices, Graphic, Circle, geometryEngine);
        gView.surface.style.cursor = "default";
      });

      const createSector = (mode, vertices, Graphic) => {
        if (vertices.length === 1) return;

        let pointA = {
          type: "point",
          x: vertices[0][0],
          y: vertices[0][1],
          spatialReference: gView.spatialReference,
        };

        var path = [
          [vertices[0][0], vertices[0][1]],
          [vertices[1][0], vertices[1][1]],
        ];

        // Start Angle
        const startAngleGraphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: path,
            spatialReference: gView.spatialReference,
          },
          symbol: {
            type: "simple-line",
            color: [242, 161, 24, 0.8],
            width: 2,
            cap: "square",
            join: "miter",
            style: "solid",
          },
        });
        var geoRotate = geometryEngine.rotate(
          startAngleGraphic.geometry,
          gDataValues.arcAngle / 2, // Angle of Arc
          pointA
        );
        startAngleGraphic.geometry = geoRotate;

        // End Angle
        const endAngleGraphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: path,
            spatialReference: gView.spatialReference,
          },
          symbol: {
            type: "simple-line",
            color: [242, 161, 24, 0.8],
            width: 2,
            cap: "square",
            join: "miter",
            style: "solid",
          },
        });
        var geoRotate = geometryEngine.rotate(
          endAngleGraphic.geometry,
          (gDataValues.arcAngle / 2) * -1, // Angle of Arc
          pointA
        );
        endAngleGraphic.geometry = geoRotate;

        // Arc
        var arcGeometry = createArc(vertices, Graphic, Circle, geometryEngine);

        var rings = [];
        if (gDataValues.arcAngle !== 360) {
          let startPoint = {
            type: "point",
            x: startAngleGraphic.geometry.paths[0][1][0],
            y: startAngleGraphic.geometry.paths[0][1][1],
            spatialReference: gView.spatialReference,
          };
          var { vertexIndex } = geometryEngine.nearestVertex(arcGeometry, startPoint);
          var startIndex = vertexIndex;

          let endPoint = {
            type: "point",
            x: endAngleGraphic.geometry.paths[0][1][0],
            y: endAngleGraphic.geometry.paths[0][1][1],
            spatialReference: gView.spatialReference,
          };
          var { vertexIndex } = geometryEngine.nearestVertex(arcGeometry, endPoint);
          var endIndex = vertexIndex;

          rings.push([vertices[0][0], vertices[0][1]]);

          if (startIndex > endIndex) {
            for (var i = startIndex; i <= 360; i++) {
              rings.push(arcGeometry.rings[0][i]);
            }
            for (var i = 0; i <= endIndex; i++) {
              rings.push(arcGeometry.rings[0][i]);
            }
          } else {
            for (var i = startIndex; i <= endIndex; i++) {
              rings.push(arcGeometry.rings[0][i]);
            }
          }
        } else {
          rings = arcGeometry.rings;
        }

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
            rings: rings,
            spatialReference: gView.spatialReference,
          },
          symbol: {
            type: "simple-fill",
            color: colorSelection,
            style: "solid",
            outline: {
              width: 2,
              color: "white",
            },
          },
          popupTemplate: {
            title: "Arc",
          },
        });

        // Save the graphics into the layer if in complete mode
        if (mode === "UPDATE") {
          gView.graphics.add(graphic);
        }
        if (mode === "COMPLETE") {
          var lyr = gMap.findLayerById("DrawArcLayer");
          lyr.add(graphic);
        }
      };

      const createPolylineGuide = (paths, Graphic) => {
        const graphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: paths,
            spatialReference: gView.spatialReference,
          },
          symbol: {
            type: "simple-line",
            color: [255, 255, 255, 0.8],
            width: 2,
            cap: "square",
            join: "miter",
            style: "short-dash", //short-dot,
          },
        });
        gView.graphics.add(graphic);
      };

      const createCircleGuide = (vertices, Graphic, Circle, geometryEngine) => {
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

        // Update values
        gDispatch(
          setArc({
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

        gView.graphics.add(
          new Graphic({
            geometry: circleGeometry,
            symbol: {
              type: "simple-fill",
              style: "none",
              outline: {
                width: 2,
                color: [255, 255, 255, 0.8],
                style: "dot",
              },
            },
          })
        );
      };

      const createArc = (vertices, Graphic, Circle, geometryEngine) => {
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
          setArc({
            radius: distance,
            lat: pointA.x,
            lng: pointA.y,
          })
        );

        var circleGeometry = new Circle({
          center: pointA,
          geodesic: true,
          numberOfPoints: 360,
          radius: distance,
          radiusUnit: "kilometers",
        });

        return circleGeometry;
      };
    },
    []
  );
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DrawArc(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();
  gDataValues = useSelector(getArc);

  const [arcAngle, setArcAngle] = useState(90);

  const classes = useStyles();

  const handleCircleType = (type) => {
    gDispatch(setMapCommand("DRAW_ARC_ON_MAP"));
    gDispatch(setArc({ type: type }));
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleArcAngle = (angle) => {
    setArcAngle(angle);
    gDispatch(setArc({ arcAngle: angle }));
  };

  const handleSliderArcAngle = (event, newValue) => {
    event.preventDefault();
    setArcAngle(newValue);
    gDispatch(setArc({ arcAngle: newValue }));
  };

  const handleClear = () => {
    gView.graphics.removeAll();
    var lyr = gMap.findLayerById("DrawArcLayer");
    lyr.graphics.removeAll();
  };

  const mainList = [
    {
      category: "Arc Type",
      markers: [
        {
          icon: "img/markers/bft/arc-1.png",
          name: "Type 1",
          type: 1,
        },
        {
          icon: "img/markers/bft/arc-2.png",
          name: "Type 2",
          type: 2,
        },
        {
          icon: "img/markers/bft/arc-3.png",
          name: "Type 3",
          type: 3,
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
                        onClick={() => handleCircleType(marker.type)}
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
          <p>Draw Arc</p>
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
        <span style={{ opacity: 0.7, fontSize: 14 }}>Angle of Arc</span>
        <TextField
          style={{
            width: "100%",
          }}
          value={arcAngle}
          onChange={(e) => handleArcAngle(e.target.value)}
          InputProps={{
            classes: {
              root: classes.input,
            },
          }}
          variant="outlined"
        ></TextField>
        <Slider
          value={arcAngle}
          marks
          min={0}
          max={360}
          onChange={handleSliderArcAngle}
        />

        <br />
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
