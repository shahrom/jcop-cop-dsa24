/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: index.js
 * Created: Saturday, 2nd July 2022 9:13:25 pm
 * Modified: Wednesday, 6th July 2022 11:06:11 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 *
 *
 * Jerungemas2022
 * --------------------------------------------------------------------
 */

import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Desktop from "./Desktop";
import Tablet from "./Tablet";

export function Login() {
  const isTablet = useMediaQuery("(max-width:1300px)");
  return <div>{isTablet ? <Tablet /> : <Desktop />}</div>;
}
