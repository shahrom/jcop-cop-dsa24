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

import { motion } from "framer-motion";

// components
import { Content } from "./Content";
import { getDrawer, closeDrawer } from "app/appSlice";

export function Drawer() {
  const dispatch = useDispatch();
  const drawer = useSelector(getDrawer);
  const title = "UAV";

  return (
    <motion.div
      initial={{ x: 600, opacity: 1 }}
      animate={{
        x: drawer === title ? 0 : 600,
        opacity: drawer === title ? 1 : 1,
        transition: { duration: 0.5 },
      }}
      style={{
        position: "absolute",
        width: 600,
        // height: window.innerHeight,
        marginLeft: window.innerWidth - 600,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Content open={drawer === title} handleClose={() => dispatch(closeDrawer())} />
    </motion.div>
  );
}
