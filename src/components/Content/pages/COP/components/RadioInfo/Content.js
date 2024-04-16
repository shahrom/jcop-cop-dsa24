/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: UnitInfo.Content.js
 * Created: Tuesday, 8th March 2022 11:40:49 pm
 * Modified: Friday, 18th March 2022 2:05:53 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";

// icons
import CloseIcon from "@material-ui/icons/Close";

export function Content(props) {
  const handleClose = () => {
    props.handleClose();
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "left",
          backgroundColor: "#1E49AC",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        UNIT INFORMATION
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 5 }} />
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

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const MyDataPanel = (props) => (
    <div>
      <div style={{ color: "white", padding: "20px 0px 10px 0px" }}>{props.label}</div>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div style={{ fontSize: 14, padding: 5 }}>{props.content}</div>
      </div>
    </div>
  );

  const MyCall = () => (
    <div>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <iframe
          allow="camera *;microphone *"
          style={{
            marginLeft: "-30px",
          }}
          src={
            "https://mabvoip.scs.my:58080/?caller=6001&callername=OPS1@MITEC1&recipient=6022&recipientname=PERSONNEL01@MITEC2"
          }
          frameBorder="0"
          width="490px"
          height="180px"
          scrolling="no"
        />
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <MyCall label={"CALL"} />

        <div style={{ height: window.innerHeight - 190, overflow: "auto" }}>
          <MyDataPanel
            label={"MISSION"}
            content={
              <p style={{ color: "cyan" }}>Patrolling the exhibition areas at MITEC</p>
            }
          />
          <MyDataPanel
            label={"LOCATION"}
            content={
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Update At:&nbsp;
                        <span style={{ color: "cyan" }}>
                          {" "}
                          {new Date("2022-03-28T08:48:09.439").toLocaleDateString(
                            "en-GB"
                          ) +
                            " " +
                            new Date("2022-03-28T08:48:09.439").toLocaleTimeString(
                              "en-GB"
                            )}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Latitude:&nbsp;
                        <span style={{ color: "cyan" }}>
                          {Decimal2DMS(3.179359960469249, "latitude")}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Longitude:&nbsp;
                        <span style={{ color: "cyan" }}>
                          {Decimal2DMS(101.66771144744547, "longitude")}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />

          <MyDataPanel
            label={"DURATION"}
            content={
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Time:&nbsp;
                        <span style={{ color: "cyan" }}>12:00H - 20:00H </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Duration In Patrol:&nbsp;
                        <span style={{ color: "cyan" }}>6H 23M</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Duration End:&nbsp;
                        <span style={{ color: "cyan" }}> 1H 37M</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
