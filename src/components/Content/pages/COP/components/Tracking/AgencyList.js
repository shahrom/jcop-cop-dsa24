/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Tracking.Content.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Wednesday, 16th March 2022 10:56:58 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";

// components
import { CircularCounter } from "components/Content/graphics";

export default function AgencyList() {
  const ItemAgency = (props) => (
    <>
      <div style={childrenSideBySideStyle}>
        <div
          style={{
            width: 120,
          }}
        >
          <img
            style={{
              width: 60,
              marginTop: 25,
            }}
            src={"img/markers/agency/" + props.symbol + ".png"}
          />
        </div>
        <div style={{ width: 100, marginRight: 30 }}>
          <CircularCounter value={props.value} max={50} color={props.color} />
        </div>

        <div
          style={{
            borderLeft: "10px solid rgba(255,255,255,0.1)",
            height: 120,
            margin: 5,
          }}
        ></div>

        <>
          <div
            style={{
              width: 200,
            }}
          >
            <img
              style={{
                width: 70,
                marginTop: 20,
              }}
              src={props.icon}
            />
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              {props.name}
            </div>
          </div>
        </>
      </div>
      <hr style={{ opacity: 0.1, margin: 0, padding: 0 }} />
    </>
  );

  const AgencyList = () => (
    <div
      style={{
        overflow: "auto",
        height: window.innerHeight,
        textAlign: "center",
      }}
    >
      <div>
        <ItemAgency
          name={"ATM"}
          icon={"img/logo/atm-logo2.png"}
          value={3}
          color={"lime"}
          symbol={"atm"}
        />
        <ItemAgency
          name={"BOMBA"}
          icon={"img/logo/bomba-logo.png"}
          value={7}
          color={"red"}
          symbol={"bomba"}
        />
        <ItemAgency
          name={"PDRM"}
          icon={"img/logo/pdrm-logo.png"}
          value={3}
          color={"#2B68F5"}
          symbol={"pdrm"}
        />
        <ItemAgency
          name={"APM"}
          icon={"img/logo/apm-logo.png"}
          value={2}
          color={"orange"}
          symbol={"apm"}
        />
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <AgencyList />
    </div>
  );
}
