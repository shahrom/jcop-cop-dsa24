/*
 * --------------------------------------------------------------------
 * File: index.js
 * Created: Friday, 21st October 2022 10:53:40 am
 * Modified: Friday, 21st October 2022 10:56:19 am
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// icons
// import TimerIcon from "@material-ui/icons/Timer";
import SmartphoneIcon from "@material-ui/icons/Smartphone";

export default function MenuList() {
  const MyListItem = (props) => (
    <div style={{ marginTop: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 2 */}
        <div
          style={{
            width: "100%",
            padding: 5,
            marginLeft: 5,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div style={{ padding: "10px 0px 0px 10px" }}>
                <img
                  src={"img/icons/layer.png"}
                  alt=""
                  object-fit="contain"
                  width="40px"
                  height="auto"
                />
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
                    <span style={{ fontSize: "12px", color: "gray" }}> </span>
                    <br />
                    <span style={{ fontSize: "14px", color: "orange" }}>
                      {props.name}
                    </span>
                  </div>
                </div>
                <p />
              </div>

              <div>
                <div style={{ ...childrenSideBySideStyle, display: "none" }}>
                  <SmartphoneIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"H/PHONE"}</span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div
        style={{
          height: window.innerHeight - 230,
          overflow: "auto",
          marginTop: -20,
          padding: 10,
        }}
      >
        <MyListItem name={"TERRAIN ANALYSIS"} />
        <MyListItem name={"TOPOGRAHIC ANALYSIS"} />
        <MyListItem name={"SLOPE ANALYSIS"} />
        <MyListItem name={"ERROSION MODELING"} />
      </div>
    </div>
  );
}
