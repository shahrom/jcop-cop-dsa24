/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: COP.index.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Monday, 21st March 2022 11:49:45 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Map from "./components/Map";
import MapTools from "./components/MapTools";
// import { ReportDrawer } from "./components/Reports";
import { ReportDrawer } from "./components/Report";
import { MessagingDrawer } from "./components/Messaging";
import { StreamingDrawer } from "./components/Streaming";
import { VCDrawer } from "./components/VConf";
import { AlertDrawer } from "./components/Alerts";
import { TrackingDrawer } from "./components/Tracking";
import { CameraDrawer } from "./components/Camera";
import { UAVDrawer } from "./components/UAV";
import LastKnownPositionDrawer from "./components/LastKnownPosition/LastKnownPosition";

import { fetchCOPDrawerData, getOpsSelected } from "app/copSlice";

export function COP() {
  const dispatch = useDispatch();
  const opsSelected = useSelector(getOpsSelected);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  /**
   * Fetch the data at the page level. By this time the operation has already been selected
   * and the COP will load all the related data based on the operation. No need to pass any
   * parameters because the operation data is already in the copSlice
   */
  useEffect(() => {
    dispatch(fetchCOPDrawerData());
  }, [opsSelected]);

  return (
    <div>
      <div style={childrenSideBySideStyle}>
        <Map />
        <MapTools />
        {/* <ReportDrawer /> */}
        <MessagingDrawer />
        <StreamingDrawer />
        <AlertDrawer />
        <TrackingDrawer />
        <VCDrawer />
        <LastKnownPositionDrawer />
        <ReportDrawer />
        <CameraDrawer />
        <UAVDrawer />
      </div>
    </div>
  );
}
