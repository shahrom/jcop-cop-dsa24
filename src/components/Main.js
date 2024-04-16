/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Main.js
 * Created: Monday, 14th March 2022 12:04:46 pm
 * Modified: Thursday, 17th March 2022 9:15:07 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

// components
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Content } from "./Content";

import MessageDispatcher from "utils/MessageDispatcher";
import { getPage, setDrawer, setAlert } from "app/appSlice";
import { getOpsSelected } from "app/copSlice";

const styles = {
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.1)",
      // outline: "1px solid slategrey",
    },
  },
};

var opsSelected = {};

function Main() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  opsSelected = useSelector(getOpsSelected);

  useEffect(() => {
    readConfig();
    window.MessageDispatcher = new MessageDispatcher();
  }, []);

  const readConfig = () => {
    const initState = window.__INITIAL_STATE__;
    if (initState.mode === "deploy") {
      window.appConfig = initState.deployConfig;
    }
    if (initState.mode === "dev") {
      window.appConfig = initState.devConfig;
    }
    if (initState.mode === "stage") {
      window.appConfig = initState.stageConfig;
    }
    window.appDisplay = initState.displayConfig;
    window.autoRefresh = initState.autoRefresh;
  };

  return (
    <div>
      <div
        style={{
          display: page !== "LOGIN" && page !== "MENU" ? "block" : "none",
        }}
      >
        <Header />
      </div>
      <Content />
    </div>
  );
}

export default withStyles(styles)(Main);
