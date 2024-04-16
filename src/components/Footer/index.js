/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Footer.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:34:20 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";

export function Footer() {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        bottom: 10,
        width: "100%",
        position: "fixed",
        right: 10,
      }}
    >
      <div style={{ float: "right" }}>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 20 }} />
          <img
            src={"img/logo/atm-logo.png"}
            width="80px"
            height="auto"
            object-fit="contain"
          />
          <div style={{ width: 20 }} />
          <div>
            <p style={{ color: "yellow", fontSize: 16, marginTop: 10 }}>MAFC2</p>
            <p style={{ color: "gray", fontSize: 12, marginTop: -10 }}>
              COMMAND AND CONTROL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
