/*
 * --------------------------------------------------------------------
 * File: CircularStatic.js
 * Created: Thursday, 3rd November 2022 5:07:09 pm
 * Modified: Thursday, 3rd November 2022 5:07:09 pm
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          style={{ color: "rgba(255,255,255,0.2)" }}
        />
      </Box>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={(props.value / props.max) * 100}
          size={120}
          style={{ color: props.color, marginLeft: -120 }}
        />
        <p
          style={{
            color: props.color,
            fontSize: 40,
            marginLeft: -100,
            marginTop: 38,
            width: 80,
          }}
        >
          {props.value}
        </p>
      </Box>
      <p style={{ color: "rgba(255,255,255,0.8)" }}>{props.label}</p>
    </div>
  );
}

export default function CircularStatic(props) {
  return (
    <CircularProgressWithLabel
      value={props.value}
      color={props.color}
      label={props.label}
      max={props.max}
    />
  );
}
