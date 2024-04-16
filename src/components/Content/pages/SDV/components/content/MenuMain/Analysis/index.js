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

import React, { useEffect } from "react";

// components
import MenuList from "./MenuList";
import ImageList from "./ImageList";

export default function Analysis() {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(17,21,30,0.7)",
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
            color: "gray",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          ANALISIS
        </p>

        <div style={childrenSideBySideStyle}>
          <div style={{ width: "30%" }}>
            <MenuList />
          </div>
          <div
            style={{
              width: "70%",
              height: window.innerHeight - 250,
            }}
          >
            <ImageList />
          </div>
        </div>
      </div>
    </div>
  );
}
