/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Tools.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Tuesday, 15th March 2022 6:13:35 pm
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
import FlipToBackIcon from "@material-ui/icons/FlipToBack";
import LayersIcon from "@material-ui/icons/Layers";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ShuffleIcon from "@material-ui/icons/Shuffle";

export default function Filter() {
  const dispatch = useDispatch();
  const mapTool = useSelector(getMapTool);

  const [selectedTool, setSelectedTool] = useState("");
  const localToolList = [
    "LAYER_CONTROL",
    "TIME_SLIDER",
    "SYMBOL_DECLUTTER",
    "GEOFENCING",
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
            selectedTool === props.id ? "rgba(255,165,0,0.7)" : "rgba(0,0,0,0.7)",
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
      <ToolButton
        id={"LAYER_CONTROL"}
        label={
          <>
            LAYER <br /> CONTROL
          </>
        }
        icon={LayersIcon}
      />
      {/* <ToolButton
        id={"TIME_SLIDER"}
        label={
          <>
            TIME <br /> SLIDER
          </>
        }
        icon={WatchLaterIcon}
      /> */}

      {/* <ToolButton
        id={"TRACK_HISTORY"}
        label={
          <>
            TRACK <br />
            HISTORY
          </>
        }
        icon={TimelineIcon}
      /> */}
      <ToolButton
        id={"SYMBOL_DECLUTTER"}
        label={
          <>
            SYMBOL <br /> DECLUTTER
          </>
        }
        icon={ShuffleIcon}
      />
      <ToolButton id={"GEOFENCING"} label={<>GEOFENCING</>} icon={FlipToBackIcon} />
    </div>
  );
}
