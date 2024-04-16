/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MapTools.Index.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Friday, 26th March 2021 10:34:26 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Search from "./Search";
import Filter from "./Filter";
import Calculate from "./Calculate";
import Create from "./Create";
import Others from "./Others";
import { setCOPTransparency, setCOPNightMode, setViewMode } from "app/copSlice";
import { getTransparencySlider } from "app/mapSlice";
import {
  setMapGroupTool,
  getMapGroupTool,
  setMapGroupToolList,
  getMapGroupToolList,
  setProgress,
  setPage,
  setContent,
  setSubContent,
} from "app/appSlice";
import { setOpsSelected, getOpsSelected } from "app/copSlice";

// icons
import Brightness7Icon from "@material-ui/icons/Brightness7";

export default function MapTools() {
  const dispatch = useDispatch();
  const groupToolList = useSelector(getMapGroupToolList);
  const transparencySlider = useSelector(getTransparencySlider);
  const opsSelected = useSelector(getOpsSelected);

  const [view2D, setView2D] = useState("block");
  const [view3D, setView3D] = useState("none");
  const [value, setValue] = useState(1);
  const [nightMode, setNightMode] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const isTablet = useMediaQuery("(max-width:1300px)");

  useEffect(() => {}, [multiSelect]);

  const refreshOps = (id) => {
    // Display the progress screen for a smooth transition
    dispatch(setProgress(true));

    // Set the selected operation
    // var ops = opList.filter((item) => item.operation_id === id);
    // setOps(opsSelected);
    dispatch(setOpsSelected(opsSelected));

    setTimeout(() => {
      dispatch(setPage("MONITORING"));
      dispatch(setContent("MONITORING"));
      dispatch(setSubContent("MAIN"));

      // // Set socket based on the organization name
      // connectToSocketServer(ops[0].organization_name);
    }, 1000);

    // Close progress screen
    setTimeout(() => {
      dispatch(setProgress(false));
    }, 4000);
  };

  const handleSetTools = (index) => {
    switch (index) {
      case "CLEAR":
        dispatch(setMapGroupTool(0));
        var newList = groupToolList.filter((item) => item === index);
        dispatch(setMapGroupToolList(newList));
        return; // Skip the statement below
        break;

      case "CLEAR_TRAIL":
        var param = {
          Receiver: "ARCGIS",
          Command: "CLEAR_TRAIL",
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);
        break;

      // case "EEZ":
      //   var param = {
      //     Receiver: "ARCGIS",
      //     Command: "DISPLAY_EEZ",
      //   };
      //   window.MessageDispatcher.TriggerMessageDispatcher(param);
      //   break;

      case "REFRESH_MAP":
        refreshOps();
        break;

      case "2D":
        setView2D("block");
        setView3D("none");
        dispatch(setViewMode("2D"));
        break;

      case "3D":
        setView3D("block");
        setView2D("none");
        dispatch(setViewMode("3D"));
        break;
    }

    if (multiSelect) {
      // Check if tool is in the list
      if (groupToolList.includes(index)) {
        // Remove tool from the list
        var newList = groupToolList.filter((item) => item !== index);
        dispatch(setMapGroupToolList(newList));
      } else {
        // Do a shallow copy of the array
        var newList = groupToolList.slice(0);
        // Add the latest index into the array
        newList.push(index);
        // Update the list
        dispatch(setMapGroupToolList(newList));
      }
    } else {
      if (groupToolList.includes(index)) {
        // Remove tool from the list
        var newList = groupToolList.filter((item) => item !== index);
        dispatch(setMapGroupToolList(newList));
      } else {
        var newList = [];
        newList.push(index);
        dispatch(setMapGroupToolList(newList));
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setCOPTransparency(newValue));
  };

  const handleNightMode = () => {
    setNightMode(!nightMode);
    dispatch(setCOPNightMode(!nightMode));
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          width: 0, // This needs to be here because there is an invisible area blocking the map
          backgroundColor: "lime",
        }}
      >
        <div style={childrenSideBySideStyle}>
          <div>
            <ButtonGroup disableElevation variant="contained">
              <Button
                style={{
                  width: 110,
                  fontSize: 12,
                  backgroundColor: groupToolList.includes("CALCULATE")
                    ? "rgba(48,154,255,0.5)"
                    : "rgba(0,0,0,0.5)",
                  color: groupToolList.includes("CALCULATE")
                    ? "white"
                    : "white",
                }}
                onClick={() => handleSetTools("CALCULATE")}
              >
                CALCULATE
              </Button>

              <Button
                style={{
                  width: 120,
                  fontSize: 12,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                }}
                onClick={() => handleSetTools("CLEAR_TRAIL")}
              >
                CLEAR TRAIL
              </Button>

              <Button
                style={{
                  width: 150,
                  fontSize: 12,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                }}
                onClick={() => handleSetTools("REFRESH_MAP")}
              >
                REFRESH MAP
              </Button>

              <Button
                style={{
                  backgroundColor:
                    view2D === "block"
                      ? "rgba(48,154,255,0.5)"
                      : "rgba(0,0,0,0.5)",
                  color: view2D === "block" ? "white" : "white",
                }}
                onClick={() => handleSetTools("2D")}
              >
                2D
              </Button>
              <Button
                style={{
                  backgroundColor:
                    view3D === "block"
                      ? "rgba(48,154,255,0.5)"
                      : "rgba(0,0,0,0.5)",
                  color: view3D === "block" ? "white" : "white",
                }}
                onClick={() => handleSetTools("3D")}
              >
                3D
              </Button>
            </ButtonGroup>
          </div>

          <div
            style={{
              // display: transparencySlider ? "block" : "none",
              marginLeft: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: 250,
              height: 17,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <div style={childrenSideBySideStyle}>
              <Slider
                style={{ width: 200, color: nightMode ? "gray" : "orange" }}
                step={0.1}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0.1}
                max={1}
              />
              <Avatar
                onClick={handleNightMode}
                style={{
                  backgroundColor: nightMode ? "gray" : "orange",
                  marginLeft: 25,
                  width: 25,
                  height: 25,
                  marginTop: -3,
                }}
              >
                <Brightness7Icon
                  style={{ width: 18, height: 18, marginTop: -1 }}
                />
              </Avatar>
            </div>
          </div>
        </div>

        <div style={{ ...childrenSideBySideStyle, backgroundColor: "green" }}>
          <div
            style={{
              display: groupToolList.includes("FILTER") ? "block" : "none",
            }}
          >
            {<Filter />}
          </div>
          <div
            style={{
              display: groupToolList.includes("SEARCH") ? "block" : "none",
            }}
          >
            {<Search />}
          </div>
          <div
            style={{
              display: groupToolList.includes("CALCULATE") ? "block" : "none",
            }}
          >
            {<Calculate />}
          </div>
          <div
            style={{
              display: groupToolList.includes("CREATE") ? "block" : "none",
            }}
          >
            {<Create />}
          </div>
          <div
            style={{
              display: groupToolList.includes("OTHERS") ? "block" : "none",
            }}
          >
            {<Others />}
          </div>
        </div>
      </div>
    </div>
  );
}
