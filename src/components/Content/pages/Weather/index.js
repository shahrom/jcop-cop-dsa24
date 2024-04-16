/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Weather.index.js
 * Created: Tuesday, 24th May 2022 3:36:23 pm
 * Modified: Tuesday, 24th May 2022 4:45:13 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpsSelected } from "app/copSlice";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function Weather() {
  const opsSelected = useSelector(getOpsSelected);
  const [path, setPath] = useState("");
  const isTablet = useMediaQuery("(max-width:1300px)");

  useEffect(() => {
    if (opsSelected.windy_url === undefined) return;

    setTimeout(() => {
      var splitText = opsSelected.windy_url.split("?");
      var pos = splitText[1].split(",");
      var path = `https://embed.windy.com/embed2.html?lat=${pos[0]}&lon=${pos[1]}&zoom=${pos[2]}&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1`;
      setPath(path);
    }, 100);
  }, [opsSelected]);

  return (
    <div style={{ marginTop: isTablet ? 10 : 0 }}>
      <iframe
        id="iframeid"
        width="100%"
        height={isTablet ? window.innerHeight - 95 : window.innerHeight - 135}
        src={path}
        frameborder="0"
      ></iframe>
    </div>
  );
}
