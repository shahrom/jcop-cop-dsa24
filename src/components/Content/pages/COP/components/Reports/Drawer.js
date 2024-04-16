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

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { motion } from "framer-motion";

// components
import { Content } from "./Content";
import { getDrawer, closeDrawer } from "app/appSlice";

export function Drawer() {
  const dispatch = useDispatch();
  const drawer = useSelector(getDrawer);
  const title = "REPORTS";
  const isTablet = useMediaQuery("(max-width:1300px)");

  return (
    <motion.div
      initial={{ x: 500, opacity: 0 }}
      animate={{
        x: drawer === title ? 0 : 500,
        opacity: drawer === title ? 1 : 0,
        transition: { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        width: 450,
        marginTop: isTablet ? 10 : 0,
        height: window.innerHeight,
        marginLeft: window.innerWidth - 450,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Content handleClose={() => dispatch(closeDrawer())} />
    </motion.div>
  );
}
