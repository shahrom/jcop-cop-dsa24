/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MainMenu.Map.js
 * Created: Wednesday, 2nd March 2022 11:17:54 pm
 * Modified: Thursday, 3rd March 2022 11:37:39 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import Content from "./Content";

export default function OpMapMain(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(17,21,30,0.7)",
        height: window.innerHeight - 180,
        width: 1280,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "rgba(255,255,255,0.7)",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          LAPORAN
        </p>
        <Content />
      </div>
    </div>
  );
}
