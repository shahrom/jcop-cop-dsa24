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
import Content from "./Content";
import Content2 from "./Content2";

export default function OpMapMain(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

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
          CUACA
        </p>
        {/* <div style={childrenSideBySideStyle}>
          <Content2 />
          <Content />
        </div> */}
        <div
          style={{
            marginLeft: 10,
            marginTop: 0,
          }}
        >
          <iframe
            width="100%"
            height={window.innerHeight - 250}
            scrolling="no"
            src="https://embed.windy.com/embed2.html?lat=3.008&lon=101.772&zoom=5&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=3.008&detailLon=101.772&metricWind=default&metricTemp=default&radarRange=-1"
            frameborder="0"
          ></iframe>
          {/* <iframe
            src={"https://api.met.gov.my/static/images/satelit-latest.gif"}
            // src={"http://infobanjirjps.selangor.gov.my/index.html"}
            // src={"https://www.met.gov.my/forecast/weather/district/"}
            frameBorder="0"
            width="100%"
            height={window.innerHeight - 250}
            scrolling="no"
          /> */}
        </div>
      </div>
    </div>
  );
}
