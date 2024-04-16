/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MapTools.Search.js
 * Created: Monday, 18th April 2022 9:54:17 am
 * Modified: Monday, 18th April 2022 2:24:51 pm
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
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PinDropIcon from "@material-ui/icons/PinDrop";
import ExploreIcon from "@material-ui/icons/Explore";
import DnsIcon from "@material-ui/icons/Dns";

export default function Search() {
  const dispatch = useDispatch();
  const mapTool = useSelector(getMapTool);

  const [selectedTool, setSelectedTool] = useState("");
  const localToolList = [
    "LAST_KNOWN_LOCATION",
    "FIND_SYMBOL",
    "GAZETTEER",
    "FIND_ADDRESS_PLACE",
    "COMPASS",
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
        id={"LAST_KNOWN_LOCATION"}
        label={
          <>
            LAST KNOWN <br />
            LOCATION
          </>
        }
        icon={PinDropIcon}
      />
      <ToolButton
        id={"FIND_SYMBOL"}
        label={
          <>
            FIND <br /> SYMBOL
          </>
        }
        icon={SearchIcon}
      />
      <ToolButton
        id={"FIND_ADDRESS_PLACE"}
        label={
          <>
            FIND ADDRESS <br />
            OR PLACE
          </>
        }
        icon={BookmarkIcon}
      />
      <ToolButton
        id={"GAZETTEER"}
        label={
          <>
            GAZETTEER <br />
          </>
        }
        icon={DnsIcon}
      />
      <ToolButton
        id={"COMPASS"}
        label={
          <>
            COMPAS <br />
          </>
        }
        icon={ExploreIcon}
      />
    </div>
  );
}
