/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Gazetteer.js
 * Created: Monday, 18th April 2022 10:36:46 pm
 * Modified: Monday, 18th April 2022 10:37:25 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { loadModules } from "esri-loader";
import Button from "@material-ui/core/Button";
import ReactDOMServer from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";

// components
import { buildingTemplate } from "../PopUpTemplates";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LayersIcon from "@material-ui/icons/Layers";
import CloseIcon from "@material-ui/icons/Close";
import { FormatListBulleted } from "material-ui-icons";

var gMap = null;
var gView = null;
var gDispatch = null;

export default function ImportLayer(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();

  const [layerList, setLayerList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleClear = () => {
    setLayerList([]);
  };

  const handleSelectLayer = (data) => {
    if (!layerList.includes(data)) {
      setLayerList([...layerList, data.label]);
    }
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mainList = [
    {
      category: "INTELLIGENCE",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/r-1.png",
          label: "Incident Report",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/r-2.png",
          label: "Sighting Report",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/r-3.png",
          label: "Patrol Report",
          address: "",
        },
      ],
    },
    {
      category: "OPERATIONS",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/symbol-1.png",
          label: "Movement",
          address: "",
        },

        {
          id: "1",
          icon: "img/markers/bft/symbol-3.png",
          label: "Tasking",
          address: "",
        },
      ],
    },
    {
      category: "LOGISTICS",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/symbol-1.png",
          label: "Convoy 1",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/symbol-2.png",
          label: "Convoy 2",
          address: "",
        },
      ],
    },
    {
      category: "PLANNING",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/symbol-1.png",
          label: "Planning 1",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/symbol-2.png",
          label: "Planning 2",
          address: "",
        },
      ],
    },
    {
      category: "COMMUNICATIONS",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/symbol-1.png",
          label: "Radar",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/symbol-2.png",
          label: "Tower",
          address: "",
        },
        {
          id: "1",
          icon: "img/markers/bft/symbol-3.png",
          label: "Link",
          address: "",
        },
      ],
    },
    {
      category: "MEDICAL",
      icon: "img/markers/bft/r-2.png",
      markers: [
        {
          id: "1",
          icon: "img/markers/bft/symbol-1.png",
          label: "Hospitals",
          address: "",
        },
      ],
    },
  ];

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
          maxHeight: 600,
          backgroundColor: "#242424",
          color: "white",
          padding: "0px 15px 15px 15px",
        }}
      >
        <div>
          <p>Import Layers</p>
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

        <div style={{ overflow: "auto", maxHeight: 500 }}>
          {mainList.map((row, index) => (
            <Accordion
              expanded={expanded === row.category}
              onChange={handleChange(row.category)}
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                color: "orange",
                margin: 0,
                padding: 0,
                fontSize: 14,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      marginTop: 0,
                      color: "gray",
                    }}
                  />
                }
              >
                {row.category}
              </AccordionSummary>
              <AccordionDetails
                style={{
                  margin: 0,
                  padding: 10,
                  margintop: -10,
                  backgroundColor: "rgba(48,48,48,1)",
                }}
              >
                <div>
                  {row.markers.map((marker, index) => (
                    <div style={childrenSideBySideStyle}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectLayer(marker)}
                      >
                        <LayersIcon
                          style={{
                            color: "cyan",
                          }}
                        />

                        <p
                          key={index}
                          style={{
                            marginLeft: 30,
                            marginTop: -25,
                            color: "cyan",
                            fontSize: 14,
                          }}
                        >
                          {marker.label != null && marker.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <br />
        <Button
          onClick={() => handleClear()}
          style={{
            color: "#242424",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#ADADAD",
            fontSize: 12,
            borderRadius: 0,
          }}
        >
          <span>Clear</span>
        </Button>
      </div>
    </Draggable>
  );
}
