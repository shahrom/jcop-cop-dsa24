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
import TimerIcon from "@material-ui/icons/Timer";
import SmartphoneIcon from "@material-ui/icons/Smartphone";

export default function Content() {
  const MyListItem = (props) => (
    <div style={{ marginTop: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 2 */}
        <div
          style={{
            width: "100%",
            padding: 20,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div style={{ paddingTop: 10, width: 100 }}>
                <img
                  src={props.logo}
                  alt=""
                  object-fit="contain"
                  width="70px"
                  height="auto"
                />
              </div>

              <div
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                  margin: "0px 20px 0px 20px",
                }}
              />

              <div style={{ widthX: 350 }}>
                <div style={childrenSideBySideStyle}>
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"AGENSI"}
                    </span>
                    <br />
                    <span style={{ fontSize: "16px", color: "cyan" }}>
                      {props.name}
                    </span>
                  </div>
                </div>
                <p />
                <div style={childrenSideBySideStyle}>
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"KESELURUHAN"}
                    </span>
                    <br />
                    <span style={{ fontSize: "16px", color: "lime" }}>
                      {props.rank}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ ...childrenSideBySideStyle, display: "none" }}>
                  <SmartphoneIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"H/PHONE"}
                    </span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.phone}</span>
                  </div>
                </div>
              </div>
            </div>
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
    <div>
      <div
        style={{
          height: window.innerHeight - 230,
          overflow: "auto",
          marginTop: -20,
          width: 370,
        }}
      >
        <MyListItem
          name={"ANGKATAN TENTERA MALAYSIA (ATM)"}
          rank={"81%"}
          logo={"img/logo/atm-logo2.png"}
        />
        <MyListItem
          name={"POLIS DIRAJA MALAYSIA (PDRM)"}
          rank={"96%"}
          logo={"img/logo/pdrm-logo.png"}
        />
        <MyListItem
          name={"BOMBA DAN PENYELAMAT"}
          rank={"89%"}
          logo={"img/logo/bomba-logo.png"}
        />
        <MyListItem
          name={"ANGKATAN PERTAHANAN AWAM MALAYSIA (APM)"}
          rank={"92%"}
          logo={"img/logo/apm-logo.png"}
        />
      </div>
    </div>
  );
}
