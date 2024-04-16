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
import { getContent, getSubContent } from "app/appSlice";
import { useSelector } from "react-redux";

// components
import Analysis from "./content/MenuMain/Analysis";
import PPS from "./content/MenuMain/PPS";
import Readiness from "./content/MenuMain/Readiness";
import Reports from "./content/MenuMain/Reports";
import Weather from "./content/MenuMain/Weather";
import Sensors from "./content/MenuMain/Sensors";

export default function Content(props) {
  const content = useSelector(getContent);
  const subContent = useSelector(getSubContent);

  const [showMap, setShowMap] = useState("block");
  const [showPPS, setShowPPS] = useState("none");
  const [showChart, setShowChart] = useState("none");
  const [showReport, setShowReport] = useState("none");
  const [showWeather, setShowWeather] = useState("none");
  const [showSensor, setShowSensor] = useState("none");

  useEffect(() => {
    setShowMap("none");
    setShowPPS("none");
    setShowChart("none");
    setShowReport("none");
    setShowWeather("none");
    setShowSensor("none");

    switch (subContent) {
      case "WEATHER":
        setShowWeather("block");
        break;
      case "SENSOR":
        setShowSensor("block");
        break;
      case "LAYER":
        setShowMap("block");
        break;
      case "PPS":
        setShowPPS("block");
        break;
      case "READINESS":
        setShowChart("block");
        break;
      case "REPORT":
        setShowReport("block");
        break;
    }
  }, [subContent]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: content === "STATUS" ? 1 : -100,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 200, duration: 0.2 }}
    >
      <div style={{ display: showMap }}>
        <Analysis />
      </div>
      <div style={{ display: showSensor }}>
        <Sensors />
      </div>
      <div style={{ display: showPPS }}>
        <PPS />
      </div>
      <div style={{ display: showChart }}>
        <Readiness />
      </div>
      <div style={{ display: showReport }}>
        <Reports />
      </div>
      <div style={{ display: showWeather }}>
        <Weather />
      </div>
    </motion.div>
  );
}
