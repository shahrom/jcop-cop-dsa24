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
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import { setMapTool, getMapTool, closeDrawer } from "app/appSlice";

// icons
import AdjustIcon from "@material-ui/icons/Adjust";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import NatureIcon from "@material-ui/icons/Nature";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan";

export default function Calculate() {
  const dispatch = useDispatch();
  const mapTool = useSelector(getMapTool);
  const isTablet = useMediaQuery("(max-width:1300px)");

  const [selectedTool, setSelectedTool] = useState("");
  const localToolList = [
    "DEAD_RECKONING",
    "MEASURE_DISTANCE",
    "MEASURE_AREA",
    "DISTANCE_BEARING",
    "NEXT_POSITION",
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

    // Close all drawers
    dispatch(closeDrawer());
  };

  const ToolButton = (props) => {
    const Icon = () => {
      return React.createElement(props.icon, {
        fontSize: isTablet ? "medium" : "large",
      });
    };

    return (
      <div
        onClick={() => handleMapTools(props.id)}
        style={{
          width: isTablet ? 70 : 100,
          height: isTablet ? 70 : 100,
          borderRadius: 10,
          margin: isTablet ? 5 : 10,
          backgroundColor:
            selectedTool === props.id ? "rgba(255,165,0,0.7)" : "rgba(0,0,0,0.7)",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            padding: isTablet ? 5 : 20,
            color: selectedTool === props.id ? "black" : "rgba(255,165,0,0.8)",
          }}
        >
          <Icon />
        </div>
        <p
          style={{
            color: selectedTool === props.id ? "black" : "white",
            fontSize: isTablet ? 10 : 11,
            marginTop: isTablet ? 0 : -20,
          }}
        >
          {props.label}
        </p>
      </div>
    );
  };

  return (
    <div>
      <ToolButton
        id={"MEASURE_DISTANCE"}
        label={
          <>
            MEASURE <br /> DISTANCE
          </>
        }
        icon={SettingsEthernetIcon}
      />
      <ToolButton
        id={"MEASURE_AREA"}
        label={
          <>
            MEASURE <br /> AREA
          </>
        }
        icon={SettingsOverscanIcon}
      />
      <ToolButton
        id={"DISTANCE_BEARING"}
        label={
          <>
            DISTANCE <br /> BEARING
          </>
        }
        icon={DeviceHubIcon}
      />
      <ToolButton
        id={"NEXT_POSITION"}
        label={
          <>
            NEXT <br /> POSITION
          </>
        }
        icon={NatureIcon}
      />
      <ToolButton
        id={"DEAD_RECKONING"}
        label={
          <>
            DEAD <br /> RECKONING
          </>
        }
        icon={AdjustIcon}
      />
    </div>
  );
}
