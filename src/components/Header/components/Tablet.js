/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Header.Desktop.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Wednesday, 9th March 2022 12:03:06 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { motion } from "framer-motion";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

// components
import {
  setDrawer,
  setContent,
  setSubContent,
  setPage,
  getPage,
  getDrawer,
  getAlert,
  setAlert,
  getService,
  getUserProfile,
  getAuthToken,
} from "app/appSlice";
import { getOpsSelected } from "app/copSlice";

// icons
import WebIcon from "@material-ui/icons/Web";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import VideocamIcon from "@material-ui/icons/Videocam";
import MessageIcon from "@material-ui/icons/Message";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";
import ViewListIcon from "@material-ui/icons/ViewList";

// css
import "./headerCSS.css";

var gTimeout;

export default function Desktop() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const drawer = useSelector(getDrawer);
  const alertTrigger = useSelector(getAlert);
  const service = useSelector(getService);
  const opSelected = useSelector(getOpsSelected);
  const userProfile = useSelector(getUserProfile);
  const token = useSelector(getAuthToken);

  const [alertList, setAlertList] = useState([]);
  const [update, setUpdate] = useState("");
  const [logoutPrompt, setLogoutPrompt] = useState("Are you sure you want to logout?");
  const [logoutState, setLogoutState] = useState(false);

  const [open, setOpen] = useState(false);

  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  var statAlertList = useRef();
  statAlertList.current = alertList;

  const handleLogout = (mode) => {
    if (mode) {
      var url = `https://mabpoc.scs.my:${window.appConfig.authenPort}/api/auth/logout`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => {
          window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      setOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      window.MessageDispatcher.SubscribeDispatcher("HEADER", (param) => {
        switch (param.Command) {
          case "CLEAR_ALERT":
            // Clear the item in the list
            var newList = statAlertList.current.filter((item) => item !== param.Data);
            setAlertList(newList);
            forceUpdate();
            break;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    // Guard Clause
    if (alertTrigger === null) return;
    if (alertTrigger === "") return;

    var newList = alertList;
    newList.push(alertTrigger);

    setUpdate(new Date()); // Trigger this to rerender

    // Clear the current timeout and wait for 10 sec for the blinking
    // and reset the alertTrigger and stop the yoyo
    clearTimeout(gTimeout);
    gTimeout = setTimeout(() => {
      // Need to clear Alert because the array dependencies will not
      // change if the alert is the same
      dispatch(setAlert(""));
    }, 5000);
  }, [alertTrigger]);

  const handleOpList = () => {
    dispatch(setPage("OVERVIEW"));
  };

  // const handleDisplayMainMenu = () => {
  //   dispatch(setPage("MENU"));
  // };

  // const handleTrackHistory = () => {
  //   dispatch(setPage("TRACK_HISTORY"));
  // };

  const handleSDA = () => {
    dispatch(setPage("OPERATION"));
    dispatch(setContent("OPERATION"));
    dispatch(setSubContent("MAIN"));
  };

  const handleWeather = () => {
    dispatch(setPage("WEATHER"));

    // Refresh the iframe do so that the windy map will be in full screen
    setTimeout(() => {
      document.getElementById("iframeid").src += "";
    }, 100);
  };

  const handleCOP = () => {
    dispatch(setPage("MONITORING"));
    dispatch(setContent("MONITORING"));
  };

  const GroupButton = () => (
    <div
      style={{
        textAlign: "center",
        border: "1px solid gray",
        borderRadius: 50,
        width: 220,
        height: 35,
        margin: 5,
        marginTop: -10,
        fontSize: 14,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div style={childrenSideBySideStyle}>
        <div
          style={{
            height: 25,
            padding: 5,
            opacity: 0.2,
          }}
        />
        <Tooltip title="COMMON OPERATIONAL PICTURE">
          <p
            onClick={() => handleCOP()}
            style={{
              color: page === "MONITORING" ? "cyan" : "gray",
              paddingLeft: 5,
              paddingRight: 5,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            {"COP"}
          </p>
        </Tooltip>

        <div
          style={{
            borderLeft: "2px solid gray",
            height: 25,
            padding: 5,
            opacity: 0.2,
            marginTop: 0,
          }}
        />
        <Tooltip title="WEATHER">
          <p
            onClick={() => handleWeather()}
            style={{
              color: page === "WEATHER" ? "cyan" : "gray",
              paddingLeft: 0,
              paddingRight: 5,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            {"WEATHER"}
          </p>
        </Tooltip>

        <div
          style={{
            borderLeft: "2px solid gray",
            height: 25,
            padding: 5,
            opacity: 0.2,
            marginTop: 0,
          }}
        />
        <Tooltip title="HISTORY">
          <p
            onClick={() => handleSDA()}
            style={{
              color: page === "OPERATION" ? "cyan" : "gray",
              paddingLeft: 0,
              paddingRight: 5,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            {"HISTORY"}
          </p>
        </Tooltip>
      </div>
    </div>
  );

  const handleMenu = (val) => {
    dispatch(setDrawer(val));

    // Clear the item in the list
    var newList = alertList.filter((item) => item !== val);
    setAlertList(newList);
  };

  const MenuButton = (props) => (
    <div
      onClick={() => handleMenu(props.value)}
      id="menuItem"
      value={props.value}
      style={{
        textAlign: "center",
        border: "1px solid gray",
        backgroundColor: drawer === props.value && props.color,
        borderRadius: 10,
        width: 100,
        height: 35,
        margin: 5,
        marginTop: -10,
        cursor: "pointer",
      }}
    >
      <div>
        <div style={childrenSideBySideStyle}>
          <div
            style={{
              borderLeft: "2px solid gray",
              height: 40,
              padding: 2,
              opacity: 0.2,
              marginTop: 0,
              cursor: "pointer",
            }}
          />

          <div>
            <p
              style={{
                fontSize: 12,
                width: 90,
                color: "white",
                textAlign: "center",
              }}
            >
              <span>{props.label}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div>
        <div>
          {/* 
          ------------------------------------------------- 
          Left Logo & Title
          -------------------------------------------------
          */}

          <div style={childrenSideBySideStyle}>
            <div style={childrenSideBySideStyle}>
              <div style={{ marginLeft: 10 }} />
              <div style={{ padding: 5, marginRight: 10, marginTop: 5 }}>
                <img
                  // onClick={handleDisplayMainMenu}
                  src={`img/logo/${service}-logo.png`}
                  width="45px"
                  height="auto"
                  object-fit="contain"
                />
              </div>

              <div>
                <span
                  style={{
                    marginLeft: 0,
                    marginTop: 10,
                    fontFamily: "Michroma",
                    color: "orange",
                    fontSize: 14,
                    position: "absolute",
                  }}
                >
                  {page === "OVERVIEW"
                    ? service === "TD"
                      ? "ANGKATAN TENTERA DARAT"
                      : service === "TL"
                      ? "ANGKATAN TENTERA LAUT"
                      : service === "TU"
                      ? "ANGKATAN TENTERA UDARA"
                      : service === "ATB"
                      ? "MARKAS ANGKATAN BERSAMA"
                      : service === "ATM"
                      ? "ANGKATAN TENTERA MALAYSIA"
                      : ""
                    : opSelected.operation_name}
                </span>
                <br />
                <span
                  style={{
                    marginLeft: 0,
                    marginTop: 15,
                    fontFamily: "Michroma",
                    color: "olive",
                    fontSize: 12,
                    position: "absolute",
                  }}
                >
                  MAFC2<span style={{ color: "#af6eeb" }}> - MAB</span>
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "none",
              float: "right",
              marginTop: 15,
              marginRight: 10,
              fontFamily: "Michroma",
            }}
          >
            <div style={childrenSideBySideStyle}>
              {page === "MONITORING" ? (
                <motion.div
                  initial={{
                    opacity: 0.3,
                  }}
                  animate={{
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 2,
                    yoyo: Infinity,
                  }}
                  style={{
                    color: "white",
                    borderRadius: 5,
                    backgroundColor: "rgba(255,0,0,0.8)",
                    textAlign: "center",
                    width: 80,
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  LIVE
                </motion.div>
              ) : (
                <div
                  style={{
                    width: 110,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* 
        ------------------------------------------------- 
        Right icons User Profile and Logout
        -------------------------------------------------
        */}

        <div style={{ float: "right", marginRight: 0, marginTop: -70 }}>
          <div style={childrenSideBySideStyle}>
            <div
              style={{
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: 50,
                width: 120,
                height: 20,
                marginRight: 10,
                marginTop: 20,
                fontSize: 14,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "cyan",
                padding: 5,
                paddingTop: 5,
                opacity: 0.5,
              }}
            >
              {userProfile.user_id}
            </div>
            <IconButton onClick={() => setOpen(true)}>
              <Tooltip title="LOGOUT">
                <SettingsPowerIcon
                  style={{
                    color: "gray",
                    fontSize: 30,
                    marginTop: 8,
                  }}
                />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>

      {/* 
      ------------------------------------------------- 
      Alert and Selection buttons - Operation, COP, Reports, etc...
      -------------------------------------------------
      */}

      <div
        style={{
          marginTop: 0,
          height: 20,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.05) 30%, rgba(0,0,0,0.3) 30%)",
          boxShadow: "0px 0px 30px -20px #000 inset, 0px 0px",
        }}
      >
        <div>
          <div style={{ display: page === "OVERVIEW" ? "none" : "block" }}>
            <div style={childrenSideBySideStyle}>
              <div
                style={{
                  padding: "15px 5px 0px 5px",
                  cursor: "pointer",
                  marginTop: -25,
                }}
              >
                <Tooltip title="OPERATION LIST">
                  <Avatar
                    onClick={handleOpList}
                    style={{
                      backgroundColor: "rgba(0,255,255, 0)",
                    }}
                  >
                    <ViewListIcon style={{ color: "orange" }} />
                  </Avatar>
                </Tooltip>
              </div>

              <GroupButton />
              <div style={{ display: page === "MONITORING" ? "block" : "none" }}>
                <motion.div
                  initial={{ x: 200 }}
                  animate={{
                    x: page === "MONITORING" ? 1 : 200,
                    transition: { duration: 0.3, delay: 0.1 },
                  }}
                  style={childrenSideBySideStyle}
                >
                  <MenuButton
                    label={"LOCSTAT"}
                    value={"BFT"}
                    icon={<WebIcon />}
                    color={"#1E49AC"}
                  />
                  <MenuButton
                    label={"REPORTS"}
                    value={"REPORTS"}
                    icon={<AssignmentIcon />}
                    color={"#4CAF50"}
                  />
                  <MenuButton
                    label={"SITREP"}
                    value={"CHAT"}
                    icon={<MessageIcon />}
                    color={"#9C27B0"}
                  />
                  <MenuButton
                    label={"VIDEO CALL"}
                    value={"VIDEO_CALL"}
                    icon={<VideocamIcon />}
                    color={"#0074E0"}
                  />
                  <MenuButton
                    label={"VIDEO CONF"}
                    value={"VIDEO_CONF"}
                    icon={<VideocamIcon />}
                    color={"rgba(0,0,0,0)"}
                  />
                  <MenuButton
                    label={"SOS"}
                    value={"ALERTS"}
                    icon={<NotificationsActiveIcon />}
                    color={"#7F0000"}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={handleCloseDialog}
        open={open}
      >
        <div
          style={{
            textAlign: "center",
            padding: 20,
            borderRadius: 10,
            backgroundColor: "white",
            width: 300,
            // height: 90,
          }}
        >
          <p>{logoutPrompt}</p>
          <div style={{ display: logoutState ? "none" : "block" }}>
            <br />
            <div style={{ ...childrenSideBySideStyle, marginTop: -20 }}>
              <Button
                onClick={() => handleLogout(true)}
                style={{
                  color: "white",
                  textAlign: "center",
                  width: 150,
                  backgroundColor: "#318ADE",
                  fontSize: 12,
                  borderRadius: 0,
                }}
              >
                <span>Yes</span>
              </Button>
              <div style={{ width: 10 }} />
              <Button
                onClick={() => handleLogout(false)}
                style={{
                  color: "#242424",
                  textAlign: "center",
                  width: 150,
                  backgroundColor: "#ADADAD",
                  fontSize: 12,
                  borderRadius: 0,
                }}
              >
                <span>No</span>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
