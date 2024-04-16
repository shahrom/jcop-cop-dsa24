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
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Desktop from "./Desktop";
import Tablet from "./Tablet";

export default function Map() {
  const isTablet = useMediaQuery("(max-width:1300px)");
  return <div>{isTablet ? <Tablet /> : <Desktop />}</div>;
}
