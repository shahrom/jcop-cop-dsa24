/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content1.js
 * Created: Thursday, 1st April 2021 2:36:22 pm
 * Modified: Thursday, 1st April 2021 2:36:22 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIDrawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import { Content } from "./Content";
import { getDrawer, closeDrawer } from "app/appSlice";

export function Drawer() {
  const dispatch = useDispatch();
  const drawer = useSelector(getDrawer);
  const title = "VIDEO_CONF";
  const isTablet = useMediaQuery("(max-width:1300px)");

  const useStyles = makeStyles({
    paper: {
      marginTop: isTablet ? 94 : 133,
      width: 450,
      backgroundColor: "rgba(0,0,0,0)",
      border: "1px solid rgba(255,255,255,0)",
    },
  });
  const classes = useStyles();

  return (
    <MUIDrawer
      classes={{ paper: classes.paper }}
      anchor={"right"}
      open={drawer === title}
      variant={"persistent"}
      onClose={closeDrawer}
    >
      <div
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <Content handleClose={() => dispatch(closeDrawer())} />
      </div>
    </MUIDrawer>
  );
}
