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
import MoreIcon from "@material-ui/icons/More";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MapIcon from "@material-ui/icons/Map";
import LayersIcon from "@material-ui/icons/Layers";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";

export default function Others() {
  const dispatch = useDispatch();
  const mapTool = useSelector(getMapTool);

  const [selectedTool, setSelectedTool] = useState("");
  const localToolList = [
    "MINI_MAP",
    "MULTI_MAP",
    "COORDINATE_CONVERTER",
    "PRINT_MAP",
    "IMPORT_LAYERS",
    "CHANGE_BASEMAP",
    "DGIM_LAYERS",
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
              ? "rgba(255,165,0,0.7)"
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
      <ToolButton
        id={"MINI_MAP"}
        label={
          <>
            MINI <br /> MAP
          </>
        }
        icon={PhotoSizeSelectSmallIcon}
      />
      <ToolButton
        id={"MULTI_MAP"}
        label={
          <>
            MULTI <br /> MAP
          </>
        }
        icon={PictureInPictureAltIcon}
      />
      {/* <ToolButton
        id={"COORDINATE_CONVERTER"}
        label={
          <>
            COORDINATE <br /> CONVERTER
          </>
        }
        icon={MoreIcon}
      /> */}
      <ToolButton
        id={"IMPORT_LAYERS"}
        label={
          <>
            IMPORT <br /> LAYERS
          </>
        }
        icon={LayersIcon}
      />
      <ToolButton
        id={"PRINT_MAP"}
        label={
          <>
            PRINT <br /> MAP
          </>
        }
        icon={PrintIcon}
      />
      {/* <ToolButton
        id={"SAVE_PROFILE"}
        label={
          <>
            SAVE <br /> PROFILE
          </>
        }
        icon={SaveIcon}
      /> */}
      {/* <ToolButton
        id={"BASEMAP_TRANSPARENCY"}
        label={
          <>
            BASEMAP <br /> TRANSPARENCY
          </>
        }
        icon={Brightness7Icon}
      /> */}
      <ToolButton
        id={"CHANGE_BASEMAP"}
        label={
          <>
            CHANGE <br /> BASEMAP
          </>
        }
        icon={MapIcon}
      />
      <ToolButton
        id={"DGIM_LAYERS"}
        label={
          <>
            DGIM <br /> LAYERS
          </>
        }
        icon={LayersIcon}
      />
    </div>
  );
}
