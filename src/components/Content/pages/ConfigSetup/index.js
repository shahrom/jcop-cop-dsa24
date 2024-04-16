/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Tuesday, 6th July 2021 8:01:50 pm
 * Modified: Thursday, 8th July 2021 11:33:57 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import SideMenu from "./SideMenu/SideMenu";
import SubMenu from "./SubMenu/SubMenu";
import DetailDrawer from "./DetailDrawer";

export function ConfigSetup(props) {
  const [index, setIndex] = React.useState(1);
  const [drawer, setDrawer] = React.useState(0);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleSelection = (index) => {
    setIndex(index);
  };

  const detailDrawer = (index) => {
    setDrawer(index);
  };

  const initDrawer = () => {
    setDrawer(0);
  };

  return (
    <div style={{ margin: 20 }}>
      <div style={childrenSideBySideStyle}>
        <SideMenu
          handleSelection={handleSelection}
          setIndex={props.setIndex}
          color={props.theme === "lime" ? "#00D477" : props.theme}
        />
        <div>
          <SubMenu detailDrawer={detailDrawer} />
          <DetailDrawer setDrawer={drawer} initDrawer={initDrawer} />
        </div>
      </div>
    </div>
  );
}
