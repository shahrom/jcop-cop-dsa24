/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: UAV.Content.js
 * Created: Saturday, 26th March 2022 9:09:30 am
 * Modified: Saturday, 26th March 2022 10:43:28 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";

// components
import { getSelectedUnit } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import LaunchIcon from "@material-ui/icons/Launch";
import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";
import { AreaChart } from "recharts";

export function Content(props) {
  const [path, setPath] = useState("");
  const [camMode, setCamMode] = useState(false);
  const selectedUnit = useSelector(getSelectedUnit);

  useEffect(() => {
    if (props.open) {
      switch (selectedUnit.userId) {
        case "UAV-01":
          setCamMode(true);
          setPath("video/Drone-01.mp4");
          break;
        case "UAV-02":
          setCamMode(true);
          setPath("video/Drone-02.mp4");
          break;
        case "UAV-03":
          setCamMode(true);
          setPath("video/Drone-03.mp4");
          break;
        default:
          setCamMode(false);
          setPath(window.appConfig !== undefined && window.appConfig.uavURL);
          break;
      }
    }
  }, [props.open]);

  const handleClose = () => {
    setPath("");
    props.handleClose();
  };

  const handleLaunch = () => {
    window.open(path);
  };

  const handleSwitch = () => {
    setCamMode(!camMode);
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "left",
          backgroundColor: "#1E49AC",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        UAV VIDEO
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          <div
            onClick={() => handleLaunch()}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="LAUNCH NEW TAB">
              <LaunchIcon
                style={{
                  color: "white",
                  fontSize: 24,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>
          <div style={{ width: 10 }} />
          <div
            onClick={() => handleClose()}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="CLOSE">
              <CloseIcon
                style={{
                  color: "white",
                  fontSize: 24,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <p style={{ paddingLeft: 10, color: "gray", fontSize: 12 }}>{path}</p>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        {/* // Stream  */}
        <div style={{ display: camMode === true ? "block" : "none" }}>
          <ReactPlayer
            width={580}
            height={"auto"}
            url={path}
            playing={true}
            loop={true}
            muted={true}
            autoPlay={true}
            volume={0}
            controls={true}
          />
        </div>

        {/* // webm */}
        <div style={{ display: camMode === false ? "block" : "none" }}>
          <div
            style={{
              marginLeft: 0,
              marginTop: 0,
            }}
          >
            <iframe
              src={path}
              frameBorder="0"
              width="580px"
              height="350px"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
