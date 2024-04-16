/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Header.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:34:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useSpring, animated } from "react-spring";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ScrollMenu from "react-horizontal-scrolling-menu";

// icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ViewListIcon from "@material-ui/icons/ViewList";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Mobile() {
  // 1
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("DASHBOARD");
  const [selected, setSelected] = React.useState(null);
  const [items, setItems] = React.useState([]);
  // 2
  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    from: { transform: "translateY(-100px)" },
    to: { transform: "translateY(0px)" },
    config: {
      duration: 500,
    },
  });

  React.useEffect(() => {
    setOpen(true);
  }, []);

  React.useEffect(() => {
    setItems(Menu(list, "item1"));
  }, []);

  React.useEffect(() => {
    try {
      var goFS = document.getElementById("goFS");
      goFS.addEventListener(
        "click",
        function () {
          document.body.requestFullscreen();
        },
        false
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const list = [
    { name: "READINESS" },
    { name: "INTELLIGENCE" },
    { name: "PLANNING" },
    { name: "COMMAND" },
  ];

  const handleSelect = (key) => {
    setSelected(key);
    window.ContentAction.SetContent(key);
  };

  const handleFullScreen = () => {
    document.body.requestFullscreen();
  };

  const MenuItem = ({ text, selected }) => {
    return (
      <Tab
        style={{ outline: "none", marginTop: -15 }}
        label={
          <p
            style={{
              marginTop: 5,
              fontSize: 16,
              color: selected ? "cyan" : "#008b8b",
            }}
          >
            {text}
          </p>
        }
        value={text}
      />
    );
  };

  const Menu = (list, selected) =>
    list.map((el) => {
      const { name } = el;
      return <MenuItem text={name} key={name} selected={selected} />;
    });

  const Arrow = ({ text }) => {
    return <div style={{ color: "orange" }}>{text}</div>;
  };
  const ArrowLeft = Arrow({ text: "" });
  const ArrowRight = Arrow({ text: "" });

  return (
    <animated.div style={animLayout}>
      <div>
        <span
          style={{
            fontFamily: "Michroma",
            color: "gray",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          <span onClick={() => handleFullScreen()} style={{ display: "block" }}>
            <span style={{ color: "white" }}>DELTA</span> MOBILE
          </span>
        </span>

        <div style={{ float: "right", marginTop: -38 }}>
          <div style={childrenSideBySideStyle}>
            <AccountCircleIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
            <SearchIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
            <ViewListIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 5,
          marginTop: 10,
          height: 20,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "block",
        }}
      >
        <ScrollMenu
          data={items}
          // arrowLeft={ArrowLeft}
          // arrowRight={ArrowRight}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    </animated.div>
  );
}
