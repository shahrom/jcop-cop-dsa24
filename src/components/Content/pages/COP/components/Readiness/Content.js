/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Report.Content.js
 * Created: Saturday, 3rd October 2020 7:50:47 am
 * Modified: Sunday, 4th October 2020 2:33:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect, useMemo } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

// components
import { CircularCounter } from "components/Content/graphics";
import { getCOPReadinessList } from "app/copSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BuildIcon from "@material-ui/icons/Build";
import { RepeatRounded } from "@material-ui/icons";

export function Content(props) {
  const list = useSelector(getCOPReadinessList);

  const handleClose = () => {
    props.handleClose();
    // Clear any alerts when the window closes
    var param = {
      Receiver: "HEADER",
      Command: "CLEAR_ALERT",
      Data: "STATUS",
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Header = () => (
    <div onClick={() => handleClose()}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#d2691e",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        VEHICLE MOBILITY
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
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
    </div>
  );

  const ContentChart = (props) => (
    <div>
      <div style={{ textAlign: "center" }}>
        <CircularCounter
          value={props.value}
          max={props.max}
          color={props.color}
          label={<span>{props.label}</span>}
        />
        <div style={{ width: 150 }} />
      </div>
    </div>
  );

  const ContentList = () => {
    return (
      <div style={{ overflow: "auto", height: window.innerHeight - 330 }}>
        {list.data.map((row, index) => (
          <>
            <Accordion
              style={{
                margin: "auto",
              }}
            >
              <AccordionSummary
                style={{
                  backgroundColor: "rgba(0,0,0,1)",
                  height: 60,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      color: "white",
                    }}
                  />
                }
              >
                <div>
                  <div style={childrenSideBySideStyle}>
                    <IconButton
                      // onClick={(e) => handleZoomToTrack(e, row.Id)}
                      style={{ marginLeft: -20 }}
                    >
                      <div
                        style={{
                          backgroundColor: row.status === "TBG" ? "red" : "green",
                          padding: 5,
                          borderRadius: 10,
                          width: 60,
                          color: "white",
                        }}
                      >
                        {row.status}
                      </div>
                    </IconButton>
                    <div style={{ marginTop: 15 }}>
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      >
                        {row.vehicle_type}
                      </span>
                      <br />
                      <span
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          marginTop: 25,
                        }}
                      >
                        {new Date(row.report_time).toLocaleDateString("en-GB") +
                          " " +
                          new Date(row.report_time).toLocaleTimeString("en-GB")}
                      </span>
                    </div>

                    {/* Arrow ---------------------------------- */}
                    <div
                      style={{
                        textAlign: "center",
                        width: 30,
                        height: 20,
                        borderRadius: 30,
                        marginTop: 20,
                        marginLeft: 387,
                        position: "absolute",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    ></div>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
                <div style={{ fontSize: 15 }}>
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
                              Status:&nbsp;
                              <span style={{ color: "cyan" }}>{row.status}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Type:&nbsp;
                              <span style={{ color: "cyan" }}>{row.vehicle_type}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Location:&nbsp;
                              <span style={{ color: "cyan" }}>{row.location}</span>
                            </td>
                          </tr>
                          <hr style={{ opacity: 0.1, width: 400 }} />
                          <tr>
                            <td style={{ color: "gray" }}>
                              Summary:&nbsp;
                              <p
                                style={{
                                  color: "orange",
                                  marginTop: 5,
                                }}
                              >
                                {row.remark}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </div>
    );
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Header />
      <ContentChart
        value={list.data.length}
        max={50}
        color={"orange"}
        label={"TOTAL REPORTS"}
      />
      <ContentList />
    </div>
  );
}
