/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ReadinessDrawer.js
 * Created: Sunday, 11th April 2021 11:31:15 pm
 * Modified: Sunday, 11th April 2021 11:54:46 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";

export default function SVC(props) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <div
          style={{
            marginLeft: 10,
            marginTop: 0,
          }}
        >
          <img
            style={{
              display: props.room === "" ? "block" : "none",
              width: "70%",
              height: "auto",
              marginLeft: 55,
              marginTop: 100,
              opacity: 0.3,
            }}
            src={"img/icons/video-call.png"}
          />
          <iframe
            allow="camera *;microphone *"
            src={`${props.room}`}
            frameBorder="0"
            width="430px"
            height={window.innerHeight - 250}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
