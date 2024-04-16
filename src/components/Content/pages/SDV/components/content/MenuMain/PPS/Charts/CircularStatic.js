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
            fontSize: 30,
            marginLeft: -100,
            marginTop: 43,
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
