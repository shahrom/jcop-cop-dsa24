/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LeftDrawer.js
 * Created: Wednesday, 4th November 2020 2:08:25 pm
 * Modified: Thursday, 5th November 2020 1:32:22 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Grid from "@material-ui/core/Grid";

// component
import ReadinessTempur from "./ReadinessTempur";
import CircularStatic from "./CircularStatic";

export default function Summary(props) {
  return (
    <div
      style={{
        height: window.innerHeight - 300,
        padding: 30,
        marginLeft: 40,
      }}
    >
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <CircularStatic
            value={(79.1).toFixed(1)}
            max={100}
            color={"orange"}
            label={"CAPABILITY %"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={(88.9).toFixed(1)}
            max={100}
            color={"#1BA716"}
            label={"READINESS %"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={(72.7).toFixed(1)}
            max={100}
            color={"orange"}
            label={"SERVICEABILITY %"}
          />
        </Grid>
      </Grid>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />
      <p style={{ color: "yellow", textAlign: "center" }}>ANGGOTA</p>
      <ReadinessTempur />
      <br />
      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />
    </div>
  );
}
