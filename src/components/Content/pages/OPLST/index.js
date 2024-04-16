/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Overview.js
 * Created: Wednesday, 9th March 2022 10:16:32 am
 * Modified: Wednesday, 9th March 2022 10:17:15 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";

// components
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";

export function OPLST() {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div style={childrenSideBySideStyle}>
        <ContentLeft />
        <ContentRight />
      </div>
    </div>
  );
}
