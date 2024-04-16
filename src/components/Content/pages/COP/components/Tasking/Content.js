/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Dashboard.js
 * Created: Saturday, 3rd October 2020 7:50:47 am
 * Modified: Sunday, 4th October 2020 2:33:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";

// components
import { CircularCounter } from "components/Content/graphics";

// icons
import CloseIcon from "@material-ui/icons/Close";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getCOPTaskingList } from "app/copSlice";

export function Content(props) {
  const list = useSelector(getCOPTaskingList);

  const handleClose = () => {
    props.handleClose();
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#AC9610",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        TASKING
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          <div
            onClick={handleClose}
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

  const ContentList = () => (
    <div style={{ overflow: "auto", height: window.innerHeight - 200 }}>
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
                    // width: 50,
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
                    <img
                      style={{
                        width: 50,
                        height: 50,
                        opacity: 0.7,
                      }}
                      src={`img/icons/tasking.png`}
                    />
                  </IconButton>
                  <div style={{ marginTop: 20 }}>
                    <span
                      style={{
                        color: "white",
                        fontSize: "16px",
                        marginTop: 25,
                      }}
                    >
                      {row.ReportedArea}
                    </span>
                    <br />
                    <span
                      style={{
                        color: "gray",
                        fontSize: "14px",
                        marginTop: 25,
                      }}
                    >
                      {row.ReportItem2}
                    </span>
                  </div>

                  {/* Arrow ---------------------------------- */}
                  <div
                    style={{
                      textAlign: "center",
                      width: 30,
                      height: 20,
                      borderRadius: 30,
                      marginTop: 25,
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
                            Date:&nbsp;
                            <span name={row.Id + "_course"} style={{ color: "cyan" }}>
                              {row.ReportedDate}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ color: "gray" }}>
                            Type:&nbsp;
                            <span name={row.Id + "_updatedAt"} style={{ color: "cyan" }}>
                              {row.ReportItem1}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ color: "gray" }}>
                            Organization:&nbsp;
                            <span name={row.Id + "_speed"} style={{ color: "cyan" }}>
                              {row.ReportedOrganization}
                            </span>
                            <span style={{ color: "cyan" }}> km/h</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ color: "gray" }}>
                            Coordinate:&nbsp;
                            <span style={{ color: "cyan" }}>{row.Coordinate}</span>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td style={{ color: "gray" }}>
                            Position (UTM):&nbsp;
                            <p
                              style={{
                                color: "orange",
                                marginTop: 5,
                              }}
                            >
                              {row.ReportedDescription}
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
