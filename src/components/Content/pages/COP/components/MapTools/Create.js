/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Create.js
 * Created: Wednesday, 6th April 2022 10:09:26 am
 * Modified: Thursday, 7th April 2022 4:03:33 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { setMapTool, getMapTool } from "app/appSlice";

// icons
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import Crop32Icon from "@material-ui/icons/Crop32";
import TimelineIcon from "@material-ui/icons/Timeline";
import RoomIcon from "@material-ui/icons/Room";
import GestureIcon from "@material-ui/icons/Gesture";
import NavigationIcon from "@material-ui/icons/Navigation";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";

export default function Create(props) {
  const dispatch = useDispatch();
  const mapTool = useSelector(getMapTool);

  const [selectedTool, setSelectedTool] = useState("");
  const localToolList = [
    "DRAW_POINT",
    "DRAW_LINE",
    "DRAW_AREA",
    "DRAW_CIRCLE",
    "DRAW_RECTANGLE",
    "DRAW_ARC",
  ];

  useEffect(() => {
    setSelectedTool(mapTool);
    if (!localToolList.includes(mapTool)) {
      setSelectedTool("");
    }
  }, [mapTool]);

  const handleMapTools = (id) => {
    setSelectedTool(id);
    dispatch(setMapTool(id));
  };

  const ToolButton = (props) => {
    const Icon = () => {
      return React.createElement(props.icon, { fontSize: "large" });
    };

    return (
      <div
        onClick={() => handleMapTools(props.id)}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          margin: 10,
          backgroundColor:
            selectedTool === props.id
              ? "rgba(255,165,0,0.9)"
              : "rgba(0,0,0,0.7)",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            padding: 20,
            color: selectedTool === props.id ? "black" : "rgba(255,165,0,0.8)",
          }}
        >
          <Icon />
        </div>
        <p
          style={{
            color: selectedTool === props.id ? "black" : "white",
            fontSize: 11,
            marginTop: -20,
          }}
        >
          {props.label}
        </p>
      </div>
    );
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <ToolButton id={"DRAW_POINT"} label={<>POINT</>} icon={RoomIcon} />
      <ToolButton id={"DRAW_LINE"} label={<>LINE</>} icon={TimelineIcon} />
      <ToolButton id={"DRAW_AREA"} label={<>AREA</>} icon={Crop32Icon} />
      <ToolButton
        id={"DRAW_CIRCLE"}
        label={<>CIRCLE</>}
        icon={RadioButtonUncheckedIcon}
      />
      <ToolButton
        id={"DRAW_RECTANGLE"}
        label={<>RECTANGLE</>}
        icon={Crop32Icon}
      />
      <ToolButton id={"DRAW_ARC"} label={<>ARC</>} icon={SignalWifi4BarIcon} />
    </div>
  );
}
