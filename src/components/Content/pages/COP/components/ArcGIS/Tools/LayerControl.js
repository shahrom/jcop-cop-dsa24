/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LayerControl.js
 * Created: Wednesday, 13th April 2022 11:33:46 am
 * Modified: Wednesday, 13th April 2022 11:52:43 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

// components
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import LayersIcon from "@material-ui/icons/Layers";
import CloseIcon from "@material-ui/icons/Close";

var gDispatch = null;

export default function LayerControl(props) {
  gDispatch = useDispatch();
  const [layerList, setLayerList] = useState([]);
  const [visible, setVisible] = useState(true);

  // List all the graphics layers
  useEffect(() => {
    var list = [];
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.type === "graphics") {
        //Filter only the graphic layers with titles
        if (lyr.title !== "" && lyr.title !== null) {
          list.push(lyr);
        }
      }
    }
    setLayerList(list);
  }, [props.map]);

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleClick = (id) => {
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.id === id) {
        lyr.visible = !lyr.visible;
        setVisible(lyr.visible);
      }
    }

    var list = [];
    for (var i = 0; i < props.map.allLayers.items.length; i++) {
      var lyr = props.map.allLayers.items[i];
      if (lyr.type === "graphics") {
        //Filter only the graphic layers with titles
        if (lyr.title !== "" && lyr.title !== null) {
          list.push(lyr);
        }
      }
    }
    setLayerList(list);
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: window.innerWidth - 295,
          width: 250,
          height: 430,
          backgroundColor: "#242424",
          color: "white",
          padding: "0px 15px 15px 15px",
        }}
      >
        <div>
          <p>Layer Control</p>
          <CloseIcon
            onClick={() => handleClose()}
            style={{
              color: "gray",
              fontSize: 24,
              float: "right",
              marginTop: -35,
              cursor: "pointer",
            }}
          />
        </div>

        <div style={{ overflow: "auto", height: 380 }}>
          {layerList.map((row, index) => (
            <div style={childrenSideBySideStyle}>
              <div style={{ height: 30 }}>
                <LayersIcon
                  onClick={() => handleClick(row.id)}
                  style={{
                    color: row.visible ? "orange" : "gray",
                    cursor: "pointer",
                  }}
                />
                <p
                  key={index}
                  style={{
                    marginLeft: 30,
                    marginTop: -25,
                    color: "yellow",
                    fontSize: 14,
                  }}
                >
                  {row.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}
