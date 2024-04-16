/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MonitoringMap.js
 * Created: Wednesday, 2nd March 2022 11:17:54 pm
 * Modified: Monday, 7th March 2022 1:28:37 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import ArcGIS from "./ArcGIS/ArcGIS";
import { getContent } from "app/appSlice";
import { getCOPTransparency, getCOPNightMode } from "app/copSlice";

export default function Map() {
  const content = useSelector(getContent);
  const transVal = useSelector(getCOPTransparency);
  const nightMode = useSelector(getCOPNightMode);
  const [refresh, setRefresh] = useState({
    height: window.innerHeight - 135,
    width: window.innerWidth,
  });

  const isTablet = useMediaQuery("(max-width:1300px)");

  const updateWindowDimensions = () => {
    setRefresh({
      height: isTablet ? window.innerHeight - 95 : window.innerHeight - 110,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: content === "MONITORING" ? 1 : 100,
          opacity: content === "MONITORING" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            backgroundColor: nightMode ? "black" : "white",
            width: window.innerWidth,
            height: window.innerHeight,
            marginTop: isTablet ? 10 : 0,
          }}
        >
          <ArcGIS
            mapId={"COPMap"}
            width={refresh.width}
            height={
              isTablet ? window.innerHeight - 95 : window.innerHeight - 70
            }
          />
        </div>
      </motion.div>
    </div>
  );
}
