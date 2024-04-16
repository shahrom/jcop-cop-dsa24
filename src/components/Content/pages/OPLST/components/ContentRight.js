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

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPage } from "app/appSlice";
import { useSelector } from "react-redux";

// components
import Map from "./Map";

export default function Content(props) {
  const page = useSelector(getPage);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: page === "OVERVIEW" ? 1 : -100,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
    >
      <Map />
    </motion.div>
  );
}
