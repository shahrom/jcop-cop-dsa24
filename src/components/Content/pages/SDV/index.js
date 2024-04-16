/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SDV.Index.js
 * Created: Thursday, 1st April 2021 2:06:06 pm
 * Modified: Thursday, 1st April 2021 2:06:41 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import { fetchSDVData } from "app/sdvSlice";

export function SDV() {
  const dispatch = useDispatch();
  const [sliderIndex, setSliderIndex] = useState(1);

  // Fetch the data at the page level
  useEffect(() => {
    dispatch(fetchSDVData());
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleSlideIndex = (index) => {
    setSliderIndex(index);
  };

  return (
    <div
      style={{
        marginTop: 0,
        marginLeft: 0,
      }}
    >
      <div style={childrenSideBySideStyle}>
        <ContentLeft handleSlideIndex={handleSlideIndex} />
        <ContentRight sliderIndex={sliderIndex} />
      </div>
    </div>
  );
}
