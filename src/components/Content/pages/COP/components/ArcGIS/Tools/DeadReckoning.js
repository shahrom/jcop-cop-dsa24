/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DeadReckoning.js
 * Created: Wednesday, 13th April 2022 9:43:59 pm
 * Modified: Wednesday, 13th April 2022 9:44:10 pm
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
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";
import Draggable from "react-draggable";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// components
import { setDeadReckoning, getDeadReckoning } from "app/mapSlice";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import RoomIcon from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    opacity: 0.9,
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 0,
  },
});

var gMap = null;
var gView = null;
var gDispatch = null;
var gDataValues = null;

export const DrawDeadReckoning = () => {
  loadModules([
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/geometry/support/geodesicUtils",
    "esri/geometry/Point",
    "esri/geometry/Circle",
  ]).then(([Graphic, geometryEngine, geodesicUtils, Point, Circle]) => {
    //
    const createPolyline = (vertices, view, Graphic) => {
      if (vertices.length === 1) return;

      const graphic = new Graphic({
        geometry: {
          type: "polyline",
          paths: vertices,
        },
        symbol: {
          type: "simple-line",
          color: [255, 255, 255, 0.5],
          width: 2,
          cap: "square",
          join: "miter",
          style: "short-dash",
        },
      });
      var lyr = gMap.findLayerById("DeadReckoningLayer");
      lyr.add(graphic);

      // Zoom to the extent of the polyline
      var ext = graphic.geometry.extent;
      gView.extent = ext;
      gView.zoom = gView.zoom - 1.2;
    };

    const createEndMarker = (point, view, Graphic) => {
      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/markers/bft/next-position2.png",
        width: "170px",
        height: "80px",
        xoffset: "64px",
        yoffset: "-11px",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      var lyr = gMap.findLayerById("DeadReckoningLayer");
      lyr.add(graphic);
    };

    const createLabel = (point, view, Graphic, distance, bearing, backbearing) => {
      // Symbol
      var textSymbol = {
        type: "text",
        color: "orange",
        haloColor: "black",
        haloSize: "1px",
        opacity: 0.2,
        text:
          "Distance: " +
          distance.toFixed(0) +
          " km\n" +
          "Bearing: " +
          bearing.toFixed(0) +
          "\u00B0\n" +
          "B-Bearing: " +
          backbearing.toFixed(0) +
          "\u00B0\n",
        xoffset: "35px",
        yoffset: "-3px",
        zoffset: "0px",
        horizontalAlignment: "left",
        font: {
          size: 10,
          family: "Arial",
        },
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = textSymbol;

      var lyr = gMap.findLayerById("DeadReckoningLayer");
      lyr.add(graphic);
    };

    const createStartMarker = (point, view, Graphic) => {
      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/markers/bft/start-point.png",
        width: "28px",
        height: "28px",
        xoffset: "0px",
        yoffset: "10px",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      var lyr = gMap.findLayerById("DeadReckoningLayer");
      lyr.add(graphic);
    };

    const createCircle = (view, Graphic, Circle, geometryEngine) => {
      let startPoint = {
        type: "point",
        x: gDataValues.startPoint[0],
        y: gDataValues.startPoint[1],
        // spatialReference: view.spatialReference, // There should not be a spatialReference if the value is already in LatLng
      };

      var circleGeometry = new Circle({
        center: startPoint,
        geodesic: true,
        numberOfPoints: 360,
        radius: gDataValues.distance,
        radiusUnit: "kilometers",
      });

      const graphic = new Graphic({
        geometry: circleGeometry,
        symbol: {
          type: "simple-line",
          color: [255, 255, 255, 0.5],
          width: 2,
          cap: "square",
          join: "miter",
          style: "dot",
          // style: "short-dash",
        },
      });

      var lyr = gMap.findLayerById("DeadReckoningLayer");
      lyr.add(graphic);
    };

    // Start the calculation and the plotting here ---------------------------------
    let startPoint = {
      type: "point",
      x: gDataValues.startPoint[0],
      y: gDataValues.startPoint[1],
    };
    createStartMarker(startPoint, gView, Graphic);

    // Calculate the next point based on distance and bearing
    const destination = geodesicUtils.pointFromDistance(
      new Point({ x: startPoint.x, y: startPoint.y }),
      gDataValues.distance * 1000,
      gDataValues.bearing
    );

    // Get the calculated coordinates and plot the calculated point
    const { latitude, longitude } = destination;
    let endPoint = {
      type: "point",
      x: longitude,
      y: latitude,
    };
    createEndMarker(endPoint, gView, Graphic);

    // Set the path of the line
    var path = [
      [startPoint.x, startPoint.y],
      [endPoint.x, endPoint.y],
    ];

    createPolyline(path, gView, Graphic);
    createLabel(
      endPoint,
      gView,
      Graphic,
      gDataValues.distance,
      gDataValues.bearing,
      gDataValues.backbearing
    );
    createCircle(gView, Graphic, Circle, geometryEngine);
  }, []);
};

/**
 * This is the tool that is used in the map to create the graphics. The
 * values of the circle are dispatched to mapslice and displayed on the UI
 */
export const DeadReckoningStartPoint = () => {
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
      createStartMarker("UPDATE", evt.coordinates, Graphic);
    });

    // Create a point when user clicks on the view or presses "C" key.
    action.on("draw-complete", function (evt) {
      createStartMarker("COMPLETE", evt.coordinates, Graphic);
      // createCircle(evt.coordinates, Graphic, Circle, geometryEngine);
    });

    const createStartMarker = (mode, coordinates, Graphic) => {
      gView.graphics.removeAll();

      // Geometry
      let p1 = {
        type: "point", // autocasts as /Point
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: gView.spatialReference,
      };

      // Converts the geometry from Basemap to LatLng
      var point = new Circle({
        center: p1,
      });
      gDispatch(
        setDeadReckoning({
          startPoint: [point.center.longitude, point.center.latitude],
        })
      );

      // Symbol
      var picSymbol = {
        type: "picture-marker",
        url: "img/markers/bft/start-point.png",
        width: "28px",
        height: "28px",
        xoffset: "0px",
        yoffset: "10px",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = picSymbol;

      // Save the graphics into the layer if in complete mode
      if (mode === "UPDATE") {
        gView.graphics.add(graphic);
      }
      if (mode === "COMPLETE") {
        var lyr = gMap.findLayerById("DeadReckoningLayer");
        lyr.add(graphic);
      }
    };
  }, []);
};

/**
 * This is the UI for the graphics and it will display all the values related to
 * the graphics
 */
export default function DeadReckoning(props) {
  gDispatch = useDispatch();
  gDataValues = useSelector(getDeadReckoning);
  gMap = props.map;
  gView = props.view;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(10);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [time, setTime] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [speedUnit, setSpeedUnit] = useState("km/h");

  const classes = useStyles();

  useEffect(() => {
    setBearing(gDataValues.bearing.toFixed(0));
    setDistance(gDataValues.distance.toFixed(0));
    setTime(gDataValues.time);
    setSpeed(gDataValues.speed);
  }, [gDataValues.bearing, gDataValues.distance, gDataValues.time, gDataValues.speed]);

  useEffect(() => {
    if (gDataValues.startPoint.length === 0) {
      setLng("");
      setLat("");
    } else {
      setLng(gDataValues.startPoint[0]);
      setLat(gDataValues.startPoint[1]);
    }
  }, [gDataValues.startPoint]);

  useEffect(() => {
    var lyr = gMap.findLayerById("DeadReckoningLayer");
    lyr.visible = true;
  }, []);

  const handleClose = () => {
    // Close tool and hide layer
    gDispatch(setMapTool(""));
    var lyr = gMap.findLayerById("DeadReckoningLayer");
    lyr.visible = false;
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUnit = (unit) => {
    setAnchorEl(null);
    setSpeedUnit(unit);
  };

  const handleSpeed = (event, newValue) => {
    setSpeed(newValue);
  };

  const handleTime = (event, newValue) => {
    setTime(newValue);
  };

  const handleBearing = (event, newValue) => {
    setBearing(newValue);
  };

  const handleClear = () => {
    // gDispatch(
    //   setDeadReckoning({
    //     startPoint: [],
    //     endPoint: [],
    //     distance: 0,
    //     bearing: 0,
    //     speed: 0,
    //     time: 0,
    //   })
    // );

    gView.graphics.removeAll();

    var lyr = gMap.findLayerById("DeadReckoningLayer");
    lyr.graphics.removeAll();
  };

  const handleCalculate = () => {
    // Distance = Speed / Time
    // 1 mile = 1.609 km
    // 1 knot = 1.852 km/h

    var convSpeed = 0;
    if (speedUnit === "km/h") convSpeed = speed * 1;
    if (speedUnit === "miles/h") convSpeed = speed * 1.609;
    if (speedUnit === "knot") convSpeed = speed * 1.852;

    var calcDistance = Number(convSpeed) * Number(time);
    var backbearing =
      Number(bearing) < 180 ? Number(bearing) + 180 : Number(bearing) - 180;

    gDispatch(
      setDeadReckoning({
        startPoint: [lng, lat],
        distance: Number(calcDistance),
        bearing: Number(bearing),
        backbearing: Number(backbearing),
        speed: Number(speed),
        time: Number(time),
      })
    );
    gDispatch(setMapCommand("CALCULATE_DEAD_RECKONING"));
  };

  const handleStartMarker = () => {
    gDispatch(setMapCommand("DEAD_RECKONING_START_POSITION"));
  };

  const handleLat = (e) => {
    gDispatch(
      setDeadReckoning({
        startPoint: [gDataValues.startPoint[0], Number(e.target.value)],
      })
    );
  };

  const handleLng = (e) => {
    gDispatch(
      setDeadReckoning({
        startPoint: [Number(e.target.value), gDataValues.startPoint[1]],
      })
    );
  };

  const options = ["km/h", "miles/h", "knot"];

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: window.innerWidth - 295,
        width: 250,
        height: 550,
        backgroundColor: "#242424",
        color: "white",
        padding: "0px 15px 15px 15px",
      }}
    >
      <div>
        <p>Dead Reckoning</p>
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

      <div style={{ padding: 0, textAlign: "center" }}>
        <Fab
          onClick={() => handleStartMarker()}
          size="small"
          style={{ backgroundColor: "black" }}
        >
          <RoomIcon color="secondary" />
        </Fab>
        <hr style={{ opacity: 0.1 }} />
      </div>

      <div style={childrenSideBySideStyle}>
        <div>
          <span style={{ opacity: 0.7, fontSize: 14 }}>Latitude</span>
          <TextField
            style={{
              width: "100%",
            }}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            variant="outlined"
          ></TextField>

          <br />
          <br />
          <span style={{ opacity: 0.7, fontSize: 14 }}>Longitude</span>
          <TextField
            style={{
              width: "100%",
            }}
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            variant="outlined"
          ></TextField>
        </div>
      </div>

      <br />
      <span style={{ opacity: 0.7, fontSize: 14 }}>Bearing (deg) </span>
      <TextField
        style={{
          width: "100%",
        }}
        S
        value={bearing}
        onChange={(e) => setBearing(e.target.value)}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
        variant="outlined"
      ></TextField>
      <Slider value={bearing} marks min={0} max={360} onChange={handleBearing} />

      <br />

      <span style={{ opacity: 0.7, fontSize: 14 }}>{"Speed (" + speedUnit + ")"} </span>
      <div style={childrenSideBySideStyle}>
        <TextField
          style={{
            width: "100%",
          }}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          InputProps={{
            classes: {
              root: classes.input,
            },
          }}
          variant="outlined"
        ></TextField>
        <MoreVertIcon
          onClick={handleOpenMenu}
          style={{ color: "white", cursor: "pointer" }}
        />
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        // onClose={handleCloseMenu}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "km/h"}
            onClick={() => handleSelectUnit(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Slider value={speed} marks min={1} max={200} onChange={handleSpeed} />

      <br />
      <span style={{ opacity: 0.7, fontSize: 14 }}>Time (hours) </span>
      <TextField
        style={{
          width: "100%",
        }}
        value={time}
        onChange={(e) => setTime(e.target.value)}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
        variant="outlined"
      ></TextField>
      <Slider
        value={time}
        // step={10}
        marks
        min={1}
        max={24}
        onChange={handleTime}
      />

      <br />
      <br />
      <div style={{ ...childrenSideBySideStyle, marginTop: -20 }}>
        <Button
          onClick={() => handleClear()}
          style={{
            color: "#242424",
            textAlign: "center",
            width: 150,
            backgroundColor: "#ADADAD",
            fontSize: 12,
            borderRadius: 0,
          }}
        >
          <span>Clear</span>
        </Button>
        <div style={{ width: 10 }} />
        <Button
          onClick={() => handleCalculate()}
          style={{
            color: "#242424",
            textAlign: "center",
            width: 150,
            backgroundColor: "#ADADAD",
            fontSize: 12,
            borderRadius: 0,
          }}
        >
          <span>Calculate</span>
        </Button>
      </div>
    </div>
  );
}
