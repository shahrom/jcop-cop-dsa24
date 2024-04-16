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
        {/* Block 1 */}
        <div
          style={{
            textAlign: "left",
            width: 50,
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "white",
            paddingTop: 10,
          }}
        >
          <div>
            <span style={{ fontSize: "14px", color: "gray" }}>{"BIL."}</span>
          </div>
          <span style={{ fontSize: "34px" }}>{props.bil}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 2 */}
        <div
          style={{
            // display: "none",
            width: "100%",
            padding: 20,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div style={{ paddingTop: 10 }}>
                <img
                  src={"img/icons/weather.png"}
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

              <div style={{ width: 350 }}>
                <div style={childrenSideBySideStyle}>
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"NAMA"}</span>
                    <br />
                    <span style={{ fontSize: "16px", color: "cyan" }}>{props.name}</span>
                  </div>
                </div>
                <p />
                <div style={childrenSideBySideStyle}>
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"PANGKAT"}</span>
                    <br />
                    <span style={{ fontSize: "16px", color: "cyan" }}>{props.rank}</span>
                  </div>

                  <div
                    style={{
                      borderLeft: "1px solid rgba(255,255,255,0.2)",
                      margin: "0px 20px 0px 20px",
                    }}
                  />

                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"NO. TENTERA"}
                    </span>
                    <br />
                    <span style={{ fontSize: "16px", color: "cyan" }}>{props.no}</span>
                  </div>
                </div>
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
        }}
      >
        <MyListItem
          bil={"01"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"02"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"03"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"04"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"05"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"06"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"07"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"08"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
        <MyListItem
          bil={"09"}
          name={"SHAHROM AZMI BIN NAZEER"}
          rank={"SARJAN"}
          no={"8794501"}
          phone={"012-6453733"}
          duration={"03:23"}
          remarks={"Sila isi catatan anda di sini"}
        />
      </div>
    </div>
  );
}
