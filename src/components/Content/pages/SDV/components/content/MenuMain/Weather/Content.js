/*
 * --------------------------------------------------------------------
 * File: Content.js
 * Created: Thursday, 3rd November 2022 4:11:45 pm
 * Modified: Thursday, 3rd November 2022 4:16:06 pm
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// icons
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import WavesIcon from "@material-ui/icons/Waves";

export default function Content() {
  const MyListItem = (props) => (
    <div style={{ marginBottom: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 1 */}
        <div
          style={{
            textAlign: "left",
            width: "30%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", padding: 2 }}>
            <img
              src={"img/icons/weather.png"}
              alt=""
              object-fit="contain"
              width="150px"
              height="auto"
            />
          </div>

          <p />
          <span style={{ fontSize: "14px", color: "gray" }}>{"WEATHER"}</span>
          <br />
          <span style={{ fontSize: "16px" }}>{props.weather}</span>
          <p />
          <span style={{ fontSize: "14px", color: "gray" }}>{"CLOUD"}</span>
          <br />
          <span style={{ fontSize: "16px" }}>{props.cloud}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 2 */}
        <div
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
            padding: 30,
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div>
                <span style={{ fontSize: "14px", color: "gray" }}>{"LOCATION"}</span>
                <br />
                <span style={{ fontSize: "40px", color: "cyan" }}>{props.location}</span>
                <p />
              </div>

              <div
                style={{
                  borderLeft: "1px solid gray",
                  margin: "0px 20px 0px 120px",
                  opacity: 0.4,
                }}
              />

              <div>
                <span style={{ fontSize: "14px", color: "gray" }}>{"SURFACE WIND"}</span>
                <br />
                <span style={{ fontSize: "16px" }}>{props.wind}</span>
                <p />
                <span style={{ fontSize: "14px", color: "gray" }}>{"VISIBILITY"}</span>
                <br />
                <span style={{ fontSize: "16px" }}>{props.visibility}</span>
                <p />
                <span style={{ fontSize: "14px", color: "gray" }}>{"TEMPERATURE"}</span>
                <br />
                <span style={{ fontSize: "16px" }}>{props.temperature}</span>
                <p />
                <span style={{ fontSize: "14px", color: "gray" }}>{"RUNWAY IN USE"}</span>
                <br />
                <span style={{ fontSize: "16px" }}>{props.runway}</span>
              </div>
            </div>

            <br />
            <hr style={{ opacity: 0.2 }} />
            <div style={childrenSideBySideStyle}>
              <div>
                <div style={childrenSideBySideStyle}>
                  <BrightnessHighIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"FEW"}</span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.few}</span>
                  </div>
                </div>
              </div>
              <div
                style={{ borderLeft: "1px solid gray", margin: "0px 20px 0px 20px" }}
              />
              <div>
                <div style={childrenSideBySideStyle}>
                  <BrightnessMediumIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"SCT"}</span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.sct}</span>
                  </div>
                </div>
              </div>
              <div
                style={{ borderLeft: "1px solid gray", margin: "0px 20px 0px 20px" }}
              />
              <div>
                <div style={childrenSideBySideStyle}>
                  <InvertColorsIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"BKN"}</span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.bkn}</span>
                  </div>
                </div>
              </div>
              <div
                style={{ borderLeft: "1px solid gray", margin: "0px 20px 0px 20px" }}
              />
              <div>
                <div style={childrenSideBySideStyle}>
                  <WavesIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>{"TNH"}</span>
                    <br />
                    <span style={{ fontSize: "16px" }}>{props.tnh}</span>
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
          // backgroundColor: "red",
          width: "120%",
          marginTop: -20,
        }}
      >
        <MyListItem
          location={"WMSA"}
          wind={"CALM"}
          visibility={"> 10 KM"}
          weather={"FINE"}
          cloud={"MODERATE"}
          few={"2500 FT"}
          sct={"-"}
          bkn={"-"}
          tnh={"1010"}
          temperature={"24 ℃"}
          runway={"15 VMC"}
        />
        <MyListItem
          location={"WMKD"}
          wind={"VRB/03KT"}
          visibility={"> 8 KM"}
          weather={"FINE"}
          cloud={"MODERATE"}
          few={"2500 FT"}
          sct={"-"}
          bkn={"-"}
          tnh={"1011"}
          temperature={"24 ℃"}
          runway={"36 VMC"}
        />
        <MyListItem
          location={"WMKB"}
          wind={"CALM"}
          visibility={"6 KM"}
          weather={"FINE"}
          cloud={"MODERATE"}
          few={"2400 FT"}
          sct={"-"}
          bkn={"-"}
          tnh={"1009"}
          temperature={"22 ℃"}
          runway={"36 VMC"}
        />
        <MyListItem
          location={"WMGK"}
          wind={"VRB/02KT"}
          visibility={"> 10 KM"}
          weather={"FINE"}
          cloud={"MODERATE"}
          few={"2200 FT"}
          sct={"-"}
          bkn={"-"}
          tnh={"1011"}
          temperature={"22 ℃"}
          runway={"08 VMC"}
        />
      </div>
    </div>
  );
}
