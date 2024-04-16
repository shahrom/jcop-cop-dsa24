/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: CircularStatic.js
 * Created: Monday, 8th November 2021 11:19:26 am
 * Modified: Monday, 8th November 2021 11:19:26 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  const handleClick = (id) => {
    // props.handleClick(props.label);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <br />

      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          style={{
            color: "rgba(255,255,255,0.2)",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: 50,
          }}
        />
      </Box>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          onClick={() => handleClick(props.label)}
          variant="determinate"
          value={(props.value / props.max) * 100}
          size={80}
          style={{ color: props.color, marginLeft: -80, cursor: "pointer" }}
        />
        <p
          onClick={() => handleClick(props.label)}
          style={{
            color: props.color,
            fontSize: 30,
            marginLeft: -70,
            marginTop: 25,
            width: 60,
          }}
        >
          {props.value}
        </p>
      </Box>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 0 }}>
        {props.label}
      </p>
    </div>
  );
}

export function CircularCounter(props) {
  return (
    <CircularProgressWithLabel
      value={props.value}
      color={props.color}
      label={props.label}
      max={props.max}
      handleClick={props.handleClick}
    />
  );
}
