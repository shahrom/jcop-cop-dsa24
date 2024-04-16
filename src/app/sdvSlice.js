/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: sdvSlice.js
 * Created: Monday, 14th March 2022 5:26:57 pm
 * Modified: Thursday, 17th March 2022 9:56:48 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SDVDataFilter: {
    month: "MAR",
    year: "2022",
  },
  analysisView: { id: 1, name: "" },

  SDVIntelligenceList: { data: [], status: "idle" },
  SDVIntelligenceStat: { data: [], status: "idle" },
  SDVIntelligenceChart1: { data: [], status: "idle" },
  SDVIntelligenceChart2: { data: [], status: "idle" },

  SDVPlanningList: { data: [], status: "idle" },
  SDVReadinessList: { data: [], status: "idle" },
  SDVAssetList: { data: [], status: "idle" },
  SDVTaskingList: { data: [], status: "idle" },
  SDVReportList: { data: [], status: "idle" },
  SDVGeoMap: { data: [], status: "idle" },
};

export const sdvSlice = createSlice({
  name: "sdv",
  initialState,
  reducers: {
    setAnalysisView: (state, action) => {
      state.analysisView = {
        ...state.analysisView,
        ...action.payload,
      };
    },
    setSDVDataFilter: (state, action) => {
      state.SDVDataFilter = {
        ...state.SDVDataFilter,
        ...action.payload,
      };
    },
    setSDVIntelligenceList: (state, action) => {
      state.SDVIntelligenceList = {
        ...state.SDVIntelligenceList,
        ...action.payload,
      };
    },
    setSDVIntelligenceStat: (state, action) => {
      state.SDVIntelligenceStat = {
        ...state.SDVIntelligenceStat,
        ...action.payload,
      };
    },
    setSDVIntelligenceChart1: (state, action) => {
      state.SDVIntelligenceChart1 = {
        ...state.SDVIntelligenceChart1,
        ...action.payload,
      };
    },
    setSDVIntelligenceChart2: (state, action) => {
      state.SDVIntelligenceChart2 = {
        ...state.SDVIntelligenceChart2,
        ...action.payload,
      };
    },

    setSDVPlanningList: (state, action) => {
      state.SDVPlanningList = {
        ...state.SDVPlanningList,
        ...action.payload,
      };
    },
    setSDVReadinessList: (state, action) => {
      state.SDVReadinessList = {
        ...state.SDVReadinessList,
        ...action.payload,
      };
    },
    setSDVAssetList: (state, action) => {
      state.SDVAssetList = {
        ...state.SDVAssetList,
        ...action.payload,
      };
    },
    setSDVTaskingList: (state, action) => {
      state.SDVReportList = {
        ...state.SDVReportList,
        ...action.payload,
      };
    },
    setSDVReportList: (state, action) => {
      state.SDVReportList = {
        ...state.SDVReportList,
        ...action.payload,
      };
    },
    setSDVGeoMap: (state, action) => {
      state.SDVGeoMap = {
        ...state.SDVGeoMap,
        ...action.payload,
      };
    },
  },
});

export const {
  setAnalysisView,
  setSDVDataFilter,
  setSDVIntelligenceList,
  setSDVIntelligenceStat,
  setSDVIntelligenceChart1,
  setSDVIntelligenceChart2,
  setSDVPlanningList,
  setSDVReadinessList,
  setSDVAssetList,
  setSDVTaskingList,
  setSDVReportList,
  setSDVGeoMap,
} = sdvSlice.actions;

export const getAnalysisView = (state) => state.sdv.analysisView;
export const getSDVDataFilter = (state) => state.sdv.SDVDataFilter;
export const getSDVIntelligenceList = (state) => state.sdv.SDVIntelligenceList;
export const getSDVIntelligenceStat = (state) => state.sdv.SDVIntelligenceStat;
export const getSDVIntelligenceChart1 = (state) =>
  state.sdv.SDVIntelligenceChart1;
export const getSDVIntelligenceChart2 = (state) =>
  state.sdv.SDVIntelligenceChart2;
export const getSDVPlanningList = (state) => state.sdv.SDVPlanningList;
export const getSDVReadinessList = (state) => state.sdv.SDVReadinessList;
export const getSDVAssetList = (state) => state.sdv.SDVAssetList;
export const getSDVTaskingList = (state) => state.sdv.SDVTaskingList;
export const getSDVReportList = (state) => state.sdv.SDVReportList;
export const getSDVGeoMap = (state) => state.sdv.SDVGeoMap;

export const fetchSDVData = () => (dispatch, getState) => {
  const urls = [
    `data/OpRepo/Intelligence/${
      getState().sdv.SDVDataFilter.month + getState().sdv.SDVDataFilter.year
    }List.json`,
    `data/OpRepo/Intelligence/${
      getState().sdv.SDVDataFilter.month + getState().sdv.SDVDataFilter.year
    }Stat.json`,
    `data/OpRepo/Intelligence/${
      getState().sdv.SDVDataFilter.month + getState().sdv.SDVDataFilter.year
    }BorderChart.json`,
    `data/OpRepo/Intelligence/${
      getState().sdv.SDVDataFilter.month + getState().sdv.SDVDataFilter.year
    }ThreatChart.json`,
    `data/OpRepo/Intelligence/${
      getState().sdv.SDVDataFilter.month + getState().sdv.SDVDataFilter.year
    }GeoMap.json`,
  ];

  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((result) => result.json())
        .catch((error) => console.log("There was a problem!", error))
    )
  ).then((data) => {
    dispatch(setSDVIntelligenceList({ data: data[0] }));
    dispatch(setSDVIntelligenceStat({ data: data[1] }));
    dispatch(setSDVIntelligenceChart1({ data: data[2] }));
    dispatch(setSDVIntelligenceChart2({ data: data[3] }));
    dispatch(setSDVGeoMap({ data: data[4] }));
  });
};

export default sdvSlice.reducer;
