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
import { useDispatch, useSelector } from "react-redux";

// components
import { getSubContent } from "app/appSlice";
import { getSDVGeoMap, setSDVGeoMap } from "app/sdvSlice";

export default function OpMapMain(props) {
  const dispatch = useDispatch();
  const subContent = useSelector(getSubContent);
  const SDAGeoMap = useSelector(getSDVGeoMap);

  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.2)",
        height: 780,
        width: 1250,
        marginTop: 30,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "gray",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          ORBAT
        </p>

        <div style={{ overflow: "auto", height: window.innerHeight - 330 }}>
          <div style={{ marginLeft: 200 }}>
            <img
              src={"img/content/orbat.png"}
              width="900px"
              height="auto"
              object-fit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
