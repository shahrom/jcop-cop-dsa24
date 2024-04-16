/*
 * --------------------------------------------------------------------
 * File: Content.js
 * Created: Thursday, 3rd November 2022 4:56:22 pm
 * Modified: Thursday, 3rd November 2022 5:15:13 pm
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import CircularStatic from "./CircularStatic";

export default function Content2() {
  const CurrentRoute = (props) => (
    <div
      style={{
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.05)",
        color: "orange",
        padding: 30,
      }}
    >
      <div style={childrenSideBySideStyle}>
        <div>
          <span style={{ fontSize: "14px", color: "gray" }}>{"FROM"}</span>
          <br />
          <span style={{ fontSize: "20px" }}>{props.from}</span>
        </div>
        <div style={{ padding: "0px 50px 0px 50px" }}>
          <img src={"img/icons/arrow-2.png"} alt="" object-fit="contain" height="auto" />
        </div>
        <div>
          <span style={{ fontSize: "14px", color: "gray" }}>{"TO"}</span>
          <br />
          <span style={{ fontSize: "20px" }}>{props.to}</span>
        </div>
      </div>
    </div>
  );

  const MovementRoute = (props) => (
    <div styleX={{ backgroundColor: props.active ? "rgba(0,0,0,0.2)" : "none" }}>
      <br />
      <div
        style={{
          ...childrenSideBySideStyle,
          backgroundColor: props.active ? "rgba(0,0,0,0.5)" : "none",
          padding: 2,
        }}
      >
        <span
          style={{ fontSize: "24px", width: 100, color: props.active ? "cyan" : "gray" }}
        >
          {props.location}
        </span>
        <div
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            margin: "0px 20px 0px 20px",
          }}
        />
        <div>
          <div style={childrenSideBySideStyle}>
            <div style={{ marginLeft: 10 }}>
              <span style={{ fontSize: "14px", color: "gray" }}>{"TERKINI"}</span>
              <br />
              <span style={{ fontSize: "18px", color: props.color }}>{props.latest}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            margin: "0px 20px 0px 20px",
          }}
        />
        <div>
          <div style={childrenSideBySideStyle}>
            <div style={{ marginLeft: 10 }}>
              <span style={{ fontSize: "14px", color: "gray" }}>{"MASA"}</span>
              <br />
              <span style={{ fontSize: "18px", color: "cyan" }}>{props.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MyListItem = (props) => (
    <div style={{ marginTop: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 1 */}
        <div
          style={{
            width: "30%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "yellow",
          }}
        >
          <span style={{ fontSize: "14px", color: "gray" }}>{"RECALL PLAN"}</span>
          <br />
          <span style={{ fontSize: "24px", color: props.color }}>{props.plan}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 2 */}
        <div
          style={{
            width: "20%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "yellow",
          }}
        >
          <span style={{ fontSize: "14px", color: "gray" }}>{"MASA AKTIF"}</span>
          <br />
          <span style={{ fontSize: "24px", color: props.color }}>{props.time}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 3 */}
        <div
          style={{
            width: "20%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "yellow",
          }}
        >
          <span style={{ fontSize: "14px", color: "gray" }}>{"KEKUATAN SEBENAR"}</span>
          <br />
          <span style={{ fontSize: "24px", color: props.color }}>{props.strength}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 4 */}
        <div
          style={{
            width: "50%",
            padding: 20,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div stylex={childrenSideBySideStyle}>
            <MovementRoute location={"G+3"} latest={"KUNING"} time={"09:45"} />
            <MovementRoute location={"G+6"} latest={"KUNING"} time={"11:15"} />
            <MovementRoute location={"G+9"} latest={"KUNING"} time={"12:35"} />
            <MovementRoute location={"G+12"} latest={"KUNING"} time={"02:15"} />
          </div>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={childrenSideBySideStyle}>
      <div
        style={{
          width: "20%",
        }}
      >
        <CircularStatic
          value={98}
          max={300}
          color={"#1BA716"}
          label={"Total Serviceable"}
        />
        <CircularStatic
          value={98}
          max={300}
          color={"#1BA716"}
          label={"Total Serviceable"}
        />
        <CircularStatic
          value={98}
          max={300}
          color={"#1BA716"}
          label={"Total Serviceable"}
        />
      </div>
      <div
        style={{
          height: window.innerHeight - 230,
          overflow: "auto",
          marginTop: -20,
          width: "80%",
        }}
      >
        <MyListItem plan={"BOLA HIJAU"} color={"lime"} time={"02:15"} strength={"89%"} />
        <MyListItem
          plan={"TAHAN KUNING"}
          color={"yellow"}
          time={"03:30"}
          strength={"69%"}
        />
        <MyListItem plan={"PAGAR MERAH"} color={"red"} time={"05:30"} strength={"49%"} />
      </div>
    </div>
  );
}
