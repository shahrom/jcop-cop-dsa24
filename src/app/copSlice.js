/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: copSlice.js
 * Created: Monday, 14th March 2022 5:26:43 pm
 * Modified: Thursday, 17th March 2022 9:56:42 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  COPReportList: { data: [] },
  COPReadinessList: { data: [] },
  COPTaskingList: { data: [] },
  COPTrackingList: { data: [] },
  COPAlertList: { data: [] },
  COPGeoMap: { data: [] },
  COPGeoZoom: {
    level: 5,
    lat: 2.9759559359438903,
    lng: 107.84179687497199,
  },
  COPUnitInfo: {
    General: {},
    Vehicle: {},
    Health: {},
  },
  COPNightMode: false,
  COPTransparency: 1,
  viewMode: "2D",
  opsSelected: {
    id: 0,
    operation_id: 0,
    service: "",
    orgName: "",
    organization_id: 0,
    organization_name: "",
    logo: "",
    title: "",
    area: "",
    location: "",
    aorZoom: {
      zoom: 12,
      centerX: 0,
      centerY: 0,
    },
    aor: [],
    duration: "",
    status: "",
    mission: "",
  },
};

export const copSlice = createSlice({
  name: "cop",
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setCOPNightMode: (state, action) => {
      state.COPNightMode = action.payload;
    },
    setCOPTransparency: (state, action) => {
      state.COPTransparency = action.payload;
    },
    setOpsSelected: (state, action) => {
      state.opsSelected = {
        ...state.opsSelected,
        ...action.payload,
      };
    },
    setCOPGeoZoom: (state, action) => {
      state.zoom = {
        ...state.zoom,
        ...action.payload,
      };
    },
    setCOPUnitInfo: (state, action) => {
      state.COPUnitInfo = {
        ...state.COPUnitInfo,
        ...action.payload,
      };
    },
    setCOPGeoMap: (state, action) => {
      state.COPGeoMap = {
        ...state.COPGeoMap,
        ...action.payload,
      };
    },
    setCOPReportList: (state, action) => {
      state.COPReportList = {
        ...state.COPReportList,
        ...action.payload,
      };
    },
    setCOPReadinessList: (state, action) => {
      state.COPReadinessList = {
        ...state.COPReadinessList,
        ...action.payload,
      };
    },
    setCOPTaskingList: (state, action) => {
      state.COPTaskingList = {
        ...state.COPTaskingList,
        ...action.payload,
      };
    },
    setCOPTrackingList: (state, action) => {
      state.COPTrackingList = {
        ...state.COPTrackingList,
        ...action.payload,
      };
    },
    setCOPAlertList: (state, action) => {
      state.COPAlertList = {
        ...state.COPAlertList,
        ...action.payload,
      };
    },
  },
});

export const {
  setPage,
  setContent,
  setSubContent,
  setDrawer,
  setFilter,
  setCOPGeoZoom,
  setCOPReportList,
  setCOPReadinessList,
  setCOPTaskingList,
  setCOPAlertList,
  setCOPTrackingList,
  setCOPGeoMap,
  setCOPUnitInfo,
  setCOPNightMode,
  setCOPTransparency,
  setViewMode,
  setOpsSelected,
} = copSlice.actions;

export const getDrawer = (state) => state.cop.drawer;
export const getContent = (state) => state.cop.content;
export const getSubContent = (state) => state.cop.subContent;
export const getPage = (state) => state.cop.page;
export const getCOPGeoZoom = (state) => state.cop.COPGeoZoom;
export const getCOPGeoMap = (state) => state.cop.SDAGeoMap;
export const getCOPReportList = (state) => state.cop.COPReportList;
export const getCOPReadinessList = (state) => state.cop.COPReadinessList;
export const getCOPTaskingList = (state) => state.cop.COPTaskingList;
export const getCOPAlertList = (state) => state.cop.COPTrackingChart;
export const getCOPTrackingList = (state) => state.cop.COPTrackingList;
export const getCOPUnitInfo = (state) => state.cop.COPUnitInfo;
export const getCOPNightMode = (state) => state.cop.COPNightMode;
export const getCOPTransparency = (state) => state.cop.COPTransparency;
export const getViewMode = (state) => state.cop.viewMode;
export const getOpsSelected = (state) => state.cop.opsSelected;

/**
 * Public function that gets the process running internally using the state
 * variables
 */
export const fetchCOPDrawerData = () => (dispatch, getState) => {
  if (getState().cop.opsSelected.organization_id === 0) return;

  const urls = [
    `https://mabpoc.scs.my:${window.appConfig.restPort}/reports/organization_id/${
      getState().cop.opsSelected.organization_id
    }`,
    // `data/COP/Operations/Ops-${getState().cop.opsSelected.operation_id}/Readiness.json`,
  ];

  Promise.all(
    urls.map((url) =>
      fetch(url, {
        headers: {
          Authorization: "Bearer " + window.token,
        },
      })
        .then((result) => result.json())
        .catch((error) => console.log("There was a problem!", error))
    )
  ).then((data) => {
    dispatch(setCOPReportList({ data: data[0] === undefined ? [] : data[0] }));
    // dispatch(setCOPReadinessList({ data: data[1] === undefined ? [] : data[1] }));
  });
};

/**
 * This function gets the new item and add it into the report list
 * The updated list will trigger the report component and visualize
 * the updated list
 */
export const updateReportList = (item) => (dispatch, getState) => {
  // Get the latest list
  var list = getState().cop.COPReportList.data;

  // Do a deep copy of the list. This needs to be done because the
  // existing list is not expandable. Push the new item to the copied list
  // Use unshift so that the latest item will appear at the top
  var updatedList = list.map((item) => Object.assign({}, item, { selected: false }));
  updatedList.unshift(item);

  // Updated the current list with the updated list
  dispatch(setCOPReportList({ data: updatedList }));
};

/**
 * This function gets the new item and add it into the readiness list
 * The updated list will trigger the readiness component and visualize
 * the updated list
 */
export const updateReadinessList = (item) => (dispatch, getState) => {
  // Get the latest list
  var list = getState().cop.COPReadinessList.data;

  // Do a deep copy of the list. This needs to be done because the
  // existing list is not expandable. Push the new item to the copied list
  var updatedList = list.map((item) => Object.assign({}, item, { selected: false }));
  updatedList.unshift(item);

  // Updated the current list with the updated list
  dispatch(setCOPReadinessList({ data: updatedList }));
};

export default copSlice.reducer;
