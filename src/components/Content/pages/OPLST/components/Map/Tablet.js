/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Slide2.js
 * Created: Wednesday, 2nd March 2022 11:17:54 pm
 * Modified: Thursday, 3rd March 2022 11:37:39 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import ArcGIS from "./ArcGIS";
import { motion } from "framer-motion";

export default function Map() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: "rgba(17,21,30,0.7)",
        height: window.innerHeight - 145,
        width: window.innerWidth - 410,
        marginTop: -7,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 16,
            color: "gray",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          OVERVIEW MAP
        </p>
        <div style={{ padding: 0, marginTop: -20 }}>
          <ArcGIS
            mapId={"OverviewMap"}
            width={window.innerWidth - 410}
            height={window.innerHeight - 145}
          />
        </div>
      </div>
    </motion.div>
  );
}
