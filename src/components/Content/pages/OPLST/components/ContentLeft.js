/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SideMenu.js
 * Created: Thursday, 1st April 2021 2:11:56 pm
 * Modified: Friday, 2nd April 2021 3:02:27 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Desktop from "./OperationList/Desktop";
import Tablet from "./OperationList/Tablet";

export default function ContentLeft() {
  const isTablet = useMediaQuery("(max-width:1300px)");

  return (
    <div
      style={{
        width: isTablet ? 400 : 600,
        marginTop: isTablet ? 110 : 90,
      }}
    >
      {isTablet ? <Tablet /> : <Desktop />};
    </div>
  );
}
