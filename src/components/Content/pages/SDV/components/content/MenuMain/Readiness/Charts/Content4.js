/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LeftDrawer.js
 * Created: Wednesday, 4th November 2020 2:08:25 pm
 * Modified: Thursday, 5th November 2020 1:32:22 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Reference for the scroll and highlight:
 * https://codepen.io/dbilanoski/pen/LabpzG?editors=1010
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

// component
import BoatReadinessChart from "./BoatReadinessChart";
import VesselReadiness from "./VesselReadiness";
import RadarChart from "./RadarChart";
import CircularStatic from "./CircularStatic";

export default function RadarReadiness(props) {
  const BorderBox = (props) => (
    <div style={{ textAlign: "center", margin: 3 }}>
      <Card
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          width: props.width,
          height: props.height,
          padding: 10,
          margin: 0,
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.8)" }}>{props.label}</p>
        {props.content}
      </Card>
    </div>
  );
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const RadarReadiness = () => (
    <div>
      <p style={{ color: "yellow", textAlign: "center" }}>
        % RADAR READINESS BY TYPE
      </p>
      <br />

      <div style={childrenSideBySideStyle}>
        <BorderBox width={350} height={420} content={<RadarChart />} />
        <Grid container spacing={5}>
          <Grid item>
            <BorderBox
              width={300}
              height={200}
              content={
                <CircularStatic
                  value={25}
                  max={100}
                  color={"red"}
                  label={"RADAR SPEXER"}
                />
              }
            />
            <BorderBox
              width={300}
              height={200}
              content={
                <CircularStatic
                  value={100}
                  max={100}
                  color={"#1BA716"}
                  label={"RADAR 1206"}
                />
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  return (
    <div
      style={{
        overflowY: "auto",
        height: window.innerHeight - 300,
        padding: 30,
        width: 800,
      }}
    >
      <RadarReadiness />
      <BoatReadinessChart />
      <VesselReadiness />
    </div>
  );
}
