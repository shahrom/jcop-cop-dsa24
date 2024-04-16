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
import { useSelector, useDispatch } from "react-redux";

// components
import { getCOPUnitInfo } from "app/copSlice";
import { getSelectedUnit } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import CallIcon from "@material-ui/icons/Call";

export function Content(props) {
  const unitInfo = useSelector(getCOPUnitInfo);
  const selectedUnit = useSelector(getSelectedUnit);
  const [call, setCall] = React.useState(false);
  const [localUnitInfo, setLocalUnitInfo] = React.useState({
    Health: { heart_rate: 0, battery_percentage: 0, steps: 0 },
    Vehicle: { speed: 0, temperature: 0, rpm: 0, voltage: 0 },
  });

  useEffect(() => {
    // alert(
    //   "Health.userId : " +
    //     unitInfo.Health.user_id +
    //     " - " +
    //     "selectedUnit.userId: " +
    //     selectedUnit.userId
    // );
    if (unitInfo.Health.user_id === selectedUnit.userId) {
      setLocalUnitInfo(unitInfo);
    }
  }, [unitInfo]);

  // useEffect(() => {
  //   // if (unitInfo.Vehicle.user_id === selectedUnit.userId.toLowerCase()) {
  //   setLocalUnitInfo(unitInfo);
  //   // }
  // }, [unitInfo.Vehicle]);

  const handleStats = () => {
    setCall(!call);
  };

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
            onClick={handleStats}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="CALL">
              <CallIcon
                style={{
                  color: "white",
                  fontSize: 25,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>

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
            "https://mabvoip.scs.my:58080/?recipient=6022&caller=6001&callername=OPS1@MITEC1&recipientname=PERSONNEL01@MITEC2"
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
        <div style={{ display: call ? "block" : "none" }}>
          <MyCall label={"CALL"} />
        </div>
        <div>
          <p
            style={{ color: "#027DE9", fontSize: 28, marginTop: 0, textAlign: "center" }}
          >
            {call ? "" : selectedUnit.userId}
          </p>
          <hr style={{ opacity: 0.2 }} />
        </div>

        <div style={{ height: window.innerHeight - 190, overflow: "auto" }}>
          <MyDataPanel
            label={"MISSION"}
            content={<p style={{ color: "cyan" }}>Rondaan di sektor operasi</p>}
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
                        <span style={{ color: "cyan" }}>25/03/2022 16:35:12</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Latitude:&nbsp;
                        <span style={{ color: "cyan" }}>3.8587686</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>
                        Longitude:&nbsp;
                        <span style={{ color: "cyan" }}>101.7566548</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />

          <div style={childrenSideBySideStyle}>
            <MyDataPanel
              label={"STATUS"}
              content={
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ color: "orange" }}>
                          Battery %:&nbsp;
                          <span style={{ color: "cyan" }}>47</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "orange" }}>
                          Network Type:&nbsp;
                          <span style={{ color: "cyan" }}>4G</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "orange" }}>
                          Transmit Interval:&nbsp;
                          <span style={{ color: "cyan" }}>3</span>
                        </td>
                      </tr>
                      <hr style={{ opacity: 0.2, width: 200 }} />
                      <tr>
                        <td style={{ color: "orange" }}>
                          Heart-Rate:&nbsp;
                          <span style={{ color: "cyan" }}>
                            {localUnitInfo.Health.heart_rate}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "orange" }}>
                          Steps:&nbsp;
                          <span style={{ color: "cyan" }}>
                            {localUnitInfo.Health.steps}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "orange" }}>
                          Battery Percentage:&nbsp;
                          <span style={{ color: "cyan" }}>
                            {localUnitInfo.Health.battery_percentage}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              }
            />
          </div>

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
