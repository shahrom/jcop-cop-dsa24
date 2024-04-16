/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Alerts.Content.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Friday, 11th March 2022 3:21:30 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";

// components
import { CircularCounter } from "components/Content/graphics/Counters/CircularCounter";
import { setDrawer } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

var gAlertTimer = null;

export function Content(props) {
  const dispatch = useDispatch();
  const [distressList, setDistressList] = useState([]);
  const [audio] = useState(new Audio("/sound/alert.wav"));
  const [playing, setPlaying] = useState(false);

  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    var counter = 0;
    if (playing === false) return;
    gAlertTimer = setInterval(function () {
      audio.currentTime = 0;
      audio.play();
      if (counter > 3) {
        audio.pause();
        audio.currentTime = 0;

        clearInterval(gAlertTimer);
        setPlaying(false);
      }
      counter += 1;
    }, 1000);
  }, [playing]);

  useEffect(() => {
    setTimeout(() => {
      window.MessageDispatcher.SubscribeDispatcher("ALERT_DRAWER", (param) => {
        switch (param.Command) {
          case "ACTIVATE_DISTRESS_ALERT":
            var list = distressList;
            list.push(param.Data);
            setDistressList(list);
            forceUpdate();
            setPlaying(true);
            break;
        }
      });
    }, 1000);
  }, []);

  const handleClearList = () => {
    var list = distressList;
    for (var i = 0; i < list.length; i++) {
      // Remove item from map
      var param = {
        Receiver: "ARCGIS",
        Command: "CLEAR_ALERT",
        Data: list[i].distress_call_id,
      };
      window.MessageDispatcher.TriggerMessageDispatcher(param);
    }

    // Remove all items from list
    list.splice(0, list.length);
    setDistressList(list);
    forceUpdate();
  };

  const handleVideoCall = (data) => {
    // Dispatch the data to the component
    var param = {
      Receiver: "UNIT_INFO",
      Command: "SET_VIDEO_CALL",
      Data: data.is_called_by.blue_track_id,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);

    dispatch(setDrawer("VIDEO_CALL"));
  };

  const handleZoom = (data) => {
    var param = {
      Receiver: "ARCGIS",
      Command: "ZOOM_TO_POINT",
      Data: {
        latitude: data.geometry.coordinates[1],
        longitude: data.geometry.coordinates[0],
        zoom: 20,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const handleClearAlert = (id) => {
    // Remove item from list
    var list = distressList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].distress_call_id === id) {
        list.splice(i, 1);
      }
    }
    setDistressList(list);
    forceUpdate();

    // Remove item form map
    var param = {
      Receiver: "ARCGIS",
      Command: "CLEAR_ALERT",
      Data: id,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const handleClose = () => {
    props.handleClose();

    // Clear any alerts when the window closes
    var param = {
      Receiver: "HEADER",
      Command: "CLEAR_ALERT",
      Data: "ALERTS",
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Header = () => (
    <div onClick={() => handleClose()}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#7F0000",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        SOS
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            width: 35,
            height: 35,
            cursor: "pointer",
          }}
        >
          <Tooltip title="CLOSE">
            <CloseIcon
              style={{
                color: "white",
                fontSize: 24,
                marginLeft: 5,
                marginTop: 5,
              }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );

  const ContentList = () => (
    <div style={{ height: window.innerHeight - 190, overflow: "auto" }}>
      <List>
        {distressList.map((row, index) => (
          <Accordion style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
            <AccordionSummary
              style={{ backgroundColor: "rgba(255,1,0,0.3)" }}
              expandIcon={<ExpandMoreIcon style={{ color: "gray" }} />}
            >
              <Avatar
                alt=""
                src={"img/icons/sos.png"}
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  marginLeft: 20,
                  marginTop: 10,
                  cursor: "pointer",
                  borderRadius: 0,
                  padding: 2,
                  width: 60,
                  height: 60,
                }}
              />
              <div>
                <p
                  style={{
                    color: "yellow",
                    marginLeft: 20,
                    marginTop: 15,
                    fontSize: 18,
                  }}
                >
                  {row.predefined_message}
                </p>
                <p
                  style={{
                    color: "white",
                    marginLeft: 20,
                    marginTop: -15,
                    fontSize: 14,
                  }}
                >
                  {row.is_called_by.user_label}
                </p>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <div>
                <div
                  style={{
                    padding: 10,
                    fontSize: 14,
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ color: "gray" }}>Time:</td>
                        <td style={{ color: "orange" }}>
                          &nbsp;
                          {new Date(row.is_called_at).toLocaleDateString("en-GB") +
                            " " +
                            new Date(row.is_called_at).toLocaleTimeString("en-GB")}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "gray" }}>Lat:</td>
                        <td>
                          {" "}
                          &nbsp;
                          {row != null &&
                            Decimal2DMS(row.geometry.coordinates[1], "latitude")}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "gray" }}>Long:</td>
                        <td>
                          {" "}
                          &nbsp;
                          {row != null &&
                            Decimal2DMS(row.geometry.coordinates[0], "longitude")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr
                  style={{
                    opacity: 0.2,
                    padding: 0,
                    margin: 10,
                  }}
                />

                <Button
                  onClick={() => handleVideoCall(row)}
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: 120,
                    backgroundColor: "#027DE9",
                    marginLeft: 10,
                  }}
                >
                  VIDEO CALL
                </Button>
                <Button
                  onClick={() => handleZoom(row)}
                  style={{
                    textAlign: "center",
                    width: 180,
                    backgroundColor: "orange",
                    marginLeft: 10,
                  }}
                >
                  ZOOM TO LOCATION
                </Button>
                <Button
                  onClick={() => handleClearAlert(row.distress_call_id)}
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: 80,
                    backgroundColor: "gray",
                    marginLeft: 10,
                  }}
                >
                  CLEAR
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>

      <div style={{ bottom: 10, position: "absolute" }}>
        <hr style={{ opacity: 0.2, width: 540 }} />
        <Button
          onClick={() => handleClearList()}
          style={{
            textAlign: "center",
            width: 150,
            backgroundColor: "orange",
            marginLeft: 10,
          }}
        >
          CLEAR LIST
        </Button>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Header />
      <ContentList />
    </div>
  );
}
