/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: mapSlice.js
 * Created: Saturday, 9th April 2022 12:01:22 pm
 * Modified: Saturday, 9th April 2022 10:03:42 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  point: {
    id: 0,
    startPoint: [],
    label: "",
    type: "",
    icon: "",
  },
  polyline: {
    id: 0,
    paths: [],
    distance: 0,
    label: "",
    type: "",
    unit: "kilometer",
  },
  polygon: {
    id: 0,
    rings: [],
    distance: 0,
    area: 0,
    label: "",
    type: "",
    unit: "kilometer",
  },
  geofencing: {
    id: 0,
    rings: [],
    distance: 0,
    area: 0,
    label: "",
    type: "",
    shape: "",
    unit: "kilometer",
  },
  circle: {
    id: 0,
    startPoint: [],
    radius: 0,
    label: "",
    type: "",
    shape: "",
    unit: "kilometer",
  },
  rectangle: {
    id: 0,
    paths: [],
    distance: 0,
    label: "",
    type: "",
    unit: "kilometer",
  },
  ellipse: {
    id: 0,
    paths: [],
    label: "",
    type: "",
    unit: "kilometer",
  },
  arc: {
    id: 0,
    startPoint: [],
    radius: 0,
    startAngle: 0,
    endAngle: 90,
    arcAngle: 90,
    unit: "kilometer",
  },
  distanceBearing: {
    id: 0,
    startPoint: [],
    endPoint: [],
    distance: 0,
    bearing: 0,
    backbearing: 0,
    unit: "kilometer",
  },
  compass: {
    id: 0,
    startPoint: [],
    endPoint: [],
    distance: 0,
    bearing: 0,
    backbearing: 0,
    unit: "kilometer",
  },
  nextPosition: {
    id: 0,
    startPoint: [],
    endPoint: [],
    distance: 0,
    bearing: 0,
    unit: "kilometer",
  },
  deadReckoning: {
    id: 0,
    startPoint: [],
    endPoint: [],
    distance: 0,
    bearing: 0,
    backbearing: 0,
    speed: 0,
    time: 0,
    unit: "kilometer",
  },
  estimatedTime: {
    id: 0,
    startPoint: [],
    endPoint: [],
    distance: 0,
    bearing: 0,
    backbearing: 0,
    speed: 0,
    time: 0,
    unit: "kilometer",
  },
  calculatedDistance: 0,
  transparencySlider: false,
  geofencingAlert: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = {
        ...state.point,
        ...action.payload,
      };
    },
    setRectangle: (state, action) => {
      state.rectangle = {
        ...state.rectangle,
        ...action.payload,
      };
    },
    setPolyline: (state, action) => {
      state.polyline = {
        ...state.polyline,
        ...action.payload,
      };
    },
    setPolygon: (state, action) => {
      state.polygon = {
        ...state.polygon,
        ...action.payload,
      };
    },
    setGeofencing: (state, action) => {
      state.geofencing = {
        ...state.geofencing,
        ...action.payload,
      };
    },
    setCircle: (state, action) => {
      state.circle = {
        ...state.circle,
        ...action.payload,
      };
    },
    setEllipse: (state, action) => {
      state.ellipse = {
        ...state.ellipse,
        ...action.payload,
      };
    },
    setArc: (state, action) => {
      state.arc = {
        ...state.arc,
        ...action.payload,
      };
    },
    setDistanceBearing: (state, action) => {
      state.distanceBearing = {
        ...state.distanceBearing,
        ...action.payload,
      };
    },
    setCompass: (state, action) => {
      state.compass = {
        ...state.compass,
        ...action.payload,
      };
    },
    setNextPosition: (state, action) => {
      state.nextPosition = {
        ...state.nextPosition,
        ...action.payload,
      };
    },
    setDeadReckoning: (state, action) => {
      state.deadReckoning = {
        ...state.deadReckoning,
        ...action.payload,
      };
    },
    setEstimatedTime: (state, action) => {
      state.getEstimatedTime = {
        ...state.getEstimatedTime,
        ...action.payload,
      };
    },
    setCalculatedDistance: (state, action) => {
      state.calculatedDistance = action.payload;
    },
    setTransparencySlider: (state, action) => {
      state.transparencySlider = !action.payload;
    },
    setGeofencingAlert: (state, action) => {
      state.geofencingAlert = !action.payload;
    },
  },
});

export const {
  setPoint,
  setCircle,
  setArc,
  setPolyline,
  setFreehand,
  setPolygon,
  setGeofencing,
  setRectangle,
  setDistanceBearing,
  setCompass,
  setNextPosition,
  setDeadReckoning,
  setEstimatedTime,
  setTransparencySlider,
  setGeofencingAlert,
  setCalculatedDistance,
} = mapSlice.actions;

export const getPoint = (state) => state.map.point;
export const getCircle = (state) => state.map.circle;
export const getArc = (state) => state.map.arc;
export const getPolyline = (state) => state.map.polyline;
export const getPolygon = (state) => state.map.polygon;
export const getGeofencing = (state) => state.map.geofencing;
export const getRectangle = (state) => state.map.rectangle;
export const getDistanceBearing = (state) => state.map.distanceBearing;
export const getCompass = (state) => state.map.compass;
export const getNextPosition = (state) => state.map.nextPosition;
export const getDeadReckoning = (state) => state.map.deadReckoning;
export const getEstimatedTime = (state) => state.map.estimatedTime;
export const getTransparencySlider = (state) => state.map.transparencySlider;
export const getGeofencingAlert = (state) => state.map.geofencingAlert;
export const getCalculatedDistance = (state) => state.map.calculatedDistance;

export default mapSlice.reducer;
