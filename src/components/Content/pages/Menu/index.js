/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Menu.js
 * Created: Wednesday, 2nd March 2022 11:17:54 pm
 * Modified: Saturday, 5th March 2022 12:28:42 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

// css
import "./overlayTitle.css";

// icons
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WebIcon from "@material-ui/icons/Web";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";

// components
import { setPage, setService } from "app/appSlice";

export function Menu() {
  const dispatch = useDispatch();

  const selectMenu = (service) => {
    dispatch(setService(service));
    dispatch(setPage("OVERVIEW"));
  };

  const MenuButton = (props) => (
    <div id="menuItem" className={"yellow"}>
      <div className="overlay" onClick={() => selectMenu(props.service)}>
        <div style={{ marginTop: -10 }}>{props.icon}</div>
        <p
          style={{
            marginTop: 20,
          }}
        >
          {props.label}
        </p>
      </div>
    </div>
  );

  const BGButton = (props) => (
    <div style={{ width: 30, height: 30, borderRadius: 50 }}>
      <div onClick={() => handleBackground(props.index)}>
        <div>{props.icon}</div>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleBackground = (index) => {
    setTimeout(function () {
      window.document.getElementById(
        "myBody"
      ).style.backgroundImage = `url('img/wallpaper/sc${index}.jpg')`;
      window.document.getElementById("myBody").style.transition = "all 1s";
    }, 100);
  };

  return (
    <div>
      {/* // Title */}
      <div>
        <div
          onClick={() => selectMenu("ATM")}
          style={{
            textAlign: "center",
            color: "white",
            marginTop: 200,
          }}
        >
          <img
            src={"img/logo/atm-logo.png"}
            width="350px"
            height="auto"
            object-fit="contain"
          />
          <p
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "Michroma",
              color: "white",
              fontSize: 35,
              marginTop: -50,
            }}
          >
            <span>
              <span style={{ color: "yellow" }}>MAFC2</span>
            </span>
          </p>
          <p
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "Michroma",
              color: "white",
              fontSize: 16,
            }}
          >
            <span>COMMAND AND CONTROL</span>
          </p>
        </div>
      </div>

      <br />

      {/* // Menu */}
      <div
        style={{
          textAlign: "center",
          width: 800,
          margin: "auto",
        }}
      >
        <div style={{ marginLeft: 110 }}>
          <div style={childrenSideBySideStyle}>
            <MenuButton
              service={"TD"}
              label={"DARAT"}
              icon={
                <img
                  src={"img/logo/td-logo.png"}
                  width="100px"
                  height="auto"
                  object-fit="contain"
                />
              }
              checked={true}
            />
            <MenuButton
              service={"TL"}
              label={"LAUT"}
              icon={
                <img
                  src={"img/logo/tl-logo.png"}
                  width="100px"
                  height="auto"
                  object-fit="contain"
                />
              }
              checked={true}
            />
            <MenuButton
              service={"TU"}
              label={"UDARA"}
              icon={
                <img
                  src={"img/logo/tu-logo.png"}
                  width="100px"
                  height="auto"
                  object-fit="contain"
                />
              }
              checked={true}
            />
            <MenuButton
              service={"ATB"}
              label={"BERSAMA"}
              icon={
                <img
                  src={"img/logo/atb-logo.png"}
                  width="100px"
                  height="auto"
                  object-fit="contain"
                />
              }
            />
          </div>
        </div>

        {/* // Wallpaper */}
        <div
          style={{
            display: "none",
            marginTop: 150, //window.innerHeight - 700,
            marginLeft: 800, //window.innerWidth - 920,
          }}
        >
          <div style={childrenSideBySideStyle}>
            <BGButton
              index={1}
              icon={<DashboardIcon style={{ color: "gray", width: 30, height: 30 }} />}
              checked={true}
            />
            <BGButton
              index={2}
              icon={<AssessmentIcon style={{ color: "gray", width: 30, height: 30 }} />}
              checked={true}
            />
            <BGButton
              index={3}
              icon={
                <PersonalVideoIcon style={{ color: "gray", width: 30, height: 30 }} />
              }
              checked={true}
            />
            <BGButton
              index={4}
              icon={<WebIcon style={{ color: "gray", width: 30, height: 30 }} />}
            />
            <BGButton
              index={5}
              icon={<WhatshotIcon style={{ color: "gray", width: 30, height: 30 }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
