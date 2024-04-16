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

// component
import ChartPie from "./ChartPie";

export default function VesselReadiness(props) {
  const MyListItem = (props) => (
    <div
      style={{
        margin: 10,
        textAlign: "center",
        width: 100,
      }}
    >
      <div style={{ backgroundColor: props.color }}>
        <p
          style={{
            fontSize: "14px",
            color: "white",
            padding: 5,
          }}
        >
          {props.label}
        </p>
      </div>
      <div style={{ marginTop: -20 }}>{props.content}</div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />

      <p style={{ color: "yellow", textAlign: "center" }}>KESIAGAAN BOT</p>

      <div style={{ marginLeft: 170 }}>
        <div style={{ marginLeft: 100 }}>
          <ChartPie />
        </div>
        <div>
          <div style={childrenSideBySideStyle}>
            <div style={{ width: 40 }} />
            <MyListItem
              label={"PATROL"}
              content={<p style={{ fontSize: 32, color: "white" }}>45</p>}
              color={"#0088FE"}
            />
            <MyListItem
              label={"SUPPORT"}
              content={<p style={{ fontSize: 32, color: "white" }}>67</p>}
              color={"#1BA716"}
            />
            <MyListItem
              label={"TRAINING"}
              content={<p style={{ fontSize: 32, color: "white" }}>12</p>}
              color={"orange"}
            />
            <MyListItem
              label={"STRIKE"}
              content={<p style={{ fontSize: 32, color: "white" }}>23</p>}
              color={"red"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
