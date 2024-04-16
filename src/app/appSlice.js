/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: appSlice.js
 * Created: Monday, 14th March 2022 6:02:48 pm
 * Modified: Thursday, 17th March 2022 9:56:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    month: "MAR",
    year: "2022",
    organizationID: 0,
    organizationName: "",
    environmentID: 0,
  },
  userProfile: {
    userId: "",
    userName: "",
    appointmentId: "",
  },
  zoom: {
    level: 6,
    lat: 2.5347405027815344,
    lng: 108.32490359781067,
  },
  goTo: {
    level: 6,
    lat: 2.5347405027815344,
    lng: 108.32490359781067,
  },
  selectedUnit: {
    trackId: "",
    userId: "",
  },
  mapGroupToolList: [],
  mapGroupTool: "",
  mapTool: "",
  mapCommand: "",
  measureTool: false,
  drawer: null,
  alert: null,
  alertList: [],
  service: "",
  page: "LOGIN", // Set the default page
  content: "MENU",
  subContent: "MAIN",
  progress: false,
  authToken: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    closeDrawer: (state) => {
      state.drawer = null;
      state.alert = null;
    },
    setMapTool: (state, action) => {
      state.mapTool = state.mapTool === action.payload ? "" : action.payload;
    },
    setMapCommand: (state, action) => {
      state.mapCommand = action.payload;
    },
    setMapGroupTool: (state, action) => {
      state.mapGroupTool = action.payload;
    },
    setMapGroupToolList: (state, action) => {
      state.mapGroupToolList = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setDrawer: (state, action) => {
      // Click once to open the drawer and click again to close the drawer except for ALERTS
      // ALERTS window will not function the same because new Alerts will make it close again
      if (action.payload !== "ALERTS") {
        if (action.payload !== "MARKER_VIDEO_CALL") {
          state.drawer = state.drawer === action.payload ? null : action.payload;
        } else {
          state.drawer = action.payload;
        }
      } else {
        state.drawer = action.payload;
      }
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setAlertList: (state, action) => {
      state.alertList = [...state.alertList, action.payload];
    },
    updateAlertList: (state, action) => {
      var newList = state.alertList.filter((item) => item !== action);
      state.alertList = newList;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setSubContent: (state, action) => {
      state.subContent = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    setZoom: (state, action) => {
      state.zoom = {
        ...state.zoom,
        ...action.payload,
      };
    },
    setGoTo: (state, action) => {
      state.goTo = {
        ...state.goTo,
        ...action.payload,
      };
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = {
        ...state.selectedUnit,
        ...action.payload,
      };
    },
    setMeasureTool: (state, action) => {
      state.measureTool = action.payload;
    },
  },
});

export const {
  closeDrawer,
  setPage,
  setContent,
  setSubContent,
  setDrawer,
  setProgress,
  setAlert,
  setAlertList,
  updateAlertList,
  setService,
  setFilter,
  setZoom,
  setGoTo,
  setMeasureTool,
  setSelectedUnit,
  setMapTool,
  setMapCommand,
  setMapGroupTool,
  setMapGroupToolList,
  setUserProfile,
  setAuthToken,
} = appSlice.actions;

export const getFilter = (state) => state.app.filter;
export const getDrawer = (state) => state.app.drawer;
export const getProgress = (state) => state.app.progress;
export const getAlert = (state) => state.app.alert;
export const getAlertList = (state) => state.app.alertList;
export const getService = (state) => state.app.service;
export const getContent = (state) => state.app.content;
export const getSubContent = (state) => state.app.subContent;
export const getPage = (state) => state.app.page;
export const getZoom = (state) => state.app.zoom;
export const getGoTo = (state) => state.app.goTo;
export const getMeasureTool = (state) => state.app.measureTool;
export const getSelectedUnit = (state) => state.app.selectedUnit;
export const getMapTool = (state) => state.app.mapTool;
export const getMapCommand = (state) => state.app.mapCommand;
export const getMapGroupTool = (state) => state.app.mapGroupTool;
export const getMapGroupToolList = (state) => state.app.mapGroupToolList;
export const getUserProfile = (state) => state.app.userProfile;
export const getAuthToken = (state) => state.app.authToken;

export default appSlice.reducer;
