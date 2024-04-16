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
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1 }}
      style={{
        backgroundColor: "rgba(17,21,30,0.7)",
        height: 780,
        width: 1290,
        marginTop: -10,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "gray",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          OVERVIEW MAP
        </p>
        <div style={{ padding: 10, marginTop: -30 }}>
          <ArcGIS mapId={"OverviewMap"} width={1270} height={730} />
        </div>
      </div>
    </div>
  );
}
