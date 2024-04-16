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
import { useDispatch, useSelector } from "react-redux";

// components
import MenuMain from "./content/MenuMain";

export default function ContentLeft(props) {
  return (
    <div>
      <MenuMain handleSlideIndex={props.handleSlideIndex} />
    </div>
  );
}
