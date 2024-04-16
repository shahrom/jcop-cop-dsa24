/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: OperationList.js
 * Created: Wednesday, 9th March 2022 10:21:32 am
 * Modified: Monday, 21st March 2022 1:30:24 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// components
import {
  getPage,
  setPage,
  setContent,
  setSubContent,
  setZoom,
  setGoTo,
  getService,
  setAlert,
  setDrawer,
  setProgress,
  getUserProfile,
  getAuthToken,
} from "app/appSlice";

import {
  updateReportList,
  updateReadinessList,
  setCOPUnitInfo,
  getOpsSelected,
  setOpsSelected,
  fetchCOPDrawerData,
} from "app/copSlice";

import SocketIO from "utils/SocketIO";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function OperationList(props) {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const service = useSelector(getService);
  const opsSelected = useSelector(getOpsSelected);
  const userProfile = useSelector(getUserProfile);
  const token = useSelector(getAuthToken);

  const [opList, setOpList] = useState([]);
  const [opListMeta, setOpListMeta] = useState([]);
  const [ops, setOps] = useState({});
  const [expandId, setExpandId] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      fetchOpList();
    }, 1000);
  }, [service]);

  const fetchOpList = () => {
    // Guard statement
    if (userProfile.blue_track_id === undefined) return;

    var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/operations/blue_track_id/${userProfile.blue_track_id}`;

    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => result.json())
      .then((a1) => {
        // Get the fixed-site list
        for (var i = 0; i < a1.length; i++) {
          var lst = [];
          if (a1[i].sites != undefined) {
            for (var j = 0; j < a1[i].sites.length; j++) {
              lst.push(a1[i].sites[j].name);
            }
            a1[i].site_list = lst.toString();
          }
        }
        setOpList(a1);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleChange = (id) => (event, isExpanded) => {
    setExpandId(isExpanded ? id : 0);
  };

  const handleLocate = (e, id, aor) => {
    // Disabling collapse or expand in accordion of material-ui
    e.stopPropagation();

    // Zoom to the AOR of the operation
    var data = {
      level: aor.zoom_level,
      lat: aor.geometry.coordinates[1],
      lng: aor.geometry.coordinates[0],
    };
    // dispatch(setZoom(data));
    dispatch(setGoTo(data));

    // Set the operation selected
    var ops = opList.filter((item) => item.operation_id === id);
    setOps(ops[0]);
  };

  const handleAOR = (id) => {
    // Display the progress screen for a smooth transition
    dispatch(setProgress(true));

    // Set the selected operation
    var ops = opList.filter((item) => item.operation_id === id);
    setOps(ops[0]);
    dispatch(setOpsSelected(ops[0]));

    setTimeout(() => {
      dispatch(setPage("MONITORING"));
      dispatch(setContent("MONITORING"));
      dispatch(setSubContent("MAIN"));

      // Set socket based on the organization name
      connectToSocketServer(ops[0].organization_name);
    }, 1000);

    // Close progress screen
    setTimeout(() => {
      dispatch(setProgress(false));
    }, 4000);
  };

  const connectToSocketServer = (orgName) => {
    if (window.SocketIO != null) window.SocketIO.DisconnectSocketServer();
    window.SocketIO = null;
    window.SocketIO = new SocketIO(orgName);
    window.SocketIO.SubscribeSocketEvent("Main", (msg) => {
      var p = JSON.parse(msg);
      var obj = p;

      if (obj === undefined) return;

      /**
       * Report Alert:
       * 1. Gets the data and dispatch the data to the report slice
       * 2. The report list will get updated once the slice is updated thru redux
       * 3. Need to get the alert button activated
       */
      if (obj.report_type !== undefined) {
        // dispatch(updateReportList(obj));
        dispatch(fetchCOPDrawerData());
        dispatch(setAlert("REPORTS"));
      }

      /**
       * Readiness Alert:
       * 1. This code checks for incoming socket messages for Readiness
       * and then sends out the alert and add the item into the readiness list
       */
      if (obj.vehicle_type !== undefined) {
        dispatch(updateReadinessList(obj));
        dispatch(setAlert("STATUS"));
      }

      /**
       * Health:
       * 1. Updates the value according to the user_id
       */
      if (obj.heart_rate !== undefined) {
        dispatch(setCOPUnitInfo({ Health: obj }));
      }

      /**
       * Vehicle:
       * 1. Updates the value according to the user_id
       */
      if (obj.speed !== undefined) {
        dispatch(setCOPUnitInfo({ Vehicle: obj }));
      }

      /**
       * Distress Alert: This code checks for incoming socket messages for Distress Alerts
       * and then sends out the alert and add the item into the distress list
       */
      if (obj.length > 0) {
        if (obj[0].distress_call_id !== undefined) {
          var param = {
            Receiver: "ALERT_DRAWER",
            Command: "ACTIVATE_DISTRESS_ALERT",
            Data: obj[0],
          };
          window.MessageDispatcher.TriggerMessageDispatcher(param);

          // Dispatch the data to the map component
          var param = {
            Receiver: "ARCGIS",
            Command: "UPDATE_ALERTS",
            Data: obj[0],
          };
          window.MessageDispatcher.TriggerMessageDispatcher(param);

          // Open the drawer automatically
          dispatch(setAlert("ALERTS"));
          dispatch(setDrawer("ALERTS"));
          return;
        }
      }

      /**
       * Chat Messages: This code checks for incoming socket messages for Chat messages
       * and then sends out the alert and add the item into the chat list
       */
      if (obj.length > 0) {
        if (obj[0].chat_id !== undefined) {
          dispatch(setAlert("CHAT"));
          return;
        }
      }

      /**
       * BFT Messages: This code checks for incoming socket messages for BFT
       * and then updates the marker on the map
       */
      if (obj.blue_track_type_id !== undefined) {
        // Guard Clause
        if (obj.blue_track_source_name === undefined) return;
        // if (obj.organization_name !== opsSelected.orgName) return;

        // Dispatch the data to the map component
        var param = {
          Receiver: "ARCGIS",
          Command: "UPDATE_TRACK",
          Data: obj,
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);
      }
    });
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "center",
          color: "gray",
          padding: 20,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.3) 50%)",
          boxShadow: "0px 0px 30px -20px #000 inset, 0px 0px",
        }}
      >
        <span style={{ color: "gray", fontSize: 18 }}>OPERATION LIST</span>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={{ padding: "0px 10px 0px 10px", marginTop: -100 }}>
      <Header />
      <div style={{ overflow: "auto", height: window.innerHeight - 155 }}>
        {opList.map((row, index) => (
          <>
            <Accordion
              expanded={expandId === row.operation_id}
              onChange={handleChange(row.operation_id)}
              style={{
                margin: "auto",
              }}
            >
              <AccordionSummary
                style={{
                  backgroundColor: "#080f16",
                  height: 100,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  <div style={childrenSideBySideStyle}>
                    <IconButton style={{ marginLeft: -20 }}>
                      <img
                        style={{
                          marginTop: 10,
                          width: 70,
                          height: "auto",
                          opacity: 0.7,
                        }}
                        src={`https://mabpoc.scs.my:${window.appConfig.mediaPort}/${row.logo}`}
                      />
                    </IconButton>
                    <div style={{ marginTop: 20 }}>
                      <span
                        style={{
                          color: "#8A2BE2", // row.color,
                          fontSize: 18,
                          marginTop: 25,
                        }}
                      >
                        {row.operation_name}
                      </span>
                      <br />
                      <span
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginTop: 25,
                        }}
                      >
                        {row.location}
                      </span>
                      <br />
                      <span
                        style={{
                          color: row.operation_type === "Global" ? "cyan" : "#01B0F1",
                          fontSize: "14px",
                          marginTop: 25,
                        }}
                      >
                        {row.operation_type}
                      </span>
                    </div>

                    <div
                      onClick={(e) => handleLocate(e, row.id, row)}
                      style={{
                        position: "absolute",
                        borderRadius: 10,
                        backgroundColor: "rgba(255,165,0,0.8)",
                        width: 60,
                        marginTop: 25,
                        marginLeft: 450,
                        color: "black",
                        fontSize: 12,
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      VIEW
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "#0E1C29" }}>
                <div style={{ fontSize: 14 }}>
                  <div style={childrenSideBySideStyle}>
                    <div
                      style={{
                        borderLeft: "5px solid gray",
                        height: 90,
                        paddingRight: 10,
                        opacity: 0.2,
                      }}
                    />
                    {/* Table Content ------------------------------- */}
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Location:&nbsp;
                              <span style={{ color: "cyan" }}>{row.location}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Duration:&nbsp;
                              <span style={{ color: "cyan" }}>{row.duration}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Fixed Site:&nbsp;
                              <span style={{ color: "yellow" }}>{row.site_list}</span>
                              <span style={{ color: "cyan" }}> </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Status:&nbsp;
                              <span style={{ color: "lime" }}>{row.status}</span>
                              <span style={{ color: "cyan" }}> </span>
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td style={{ color: "gray" }}>
                              Mission:&nbsp;
                              <p
                                style={{
                                  color: "orange",
                                  marginTop: 5,
                                }}
                              >
                                {row.mission}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        style={{
                          width: 120,
                          backgroundColor: "#309AFF",
                          color: "white",
                        }}
                        onClick={() => handleAOR(row.operation_id)}
                      >
                        VIEW AOR
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </div>
    </div>
  );
}
