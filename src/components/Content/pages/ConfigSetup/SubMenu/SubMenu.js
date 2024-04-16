/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Tuesday, 6th July 2021 8:01:50 pm
 * Modified: Thursday, 8th July 2021 11:33:57 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Chart Reference:
 * https://multipurposethemes.com/blog/bootstrap-admin-templates-ekan-dark/
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

// icons
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WebIcon from "@material-ui/icons/Web";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import TimelineIcon from "@material-ui/icons/Timeline";
import MemoryIcon from "@material-ui/icons/Memory";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DnsIcon from "@material-ui/icons/Dns";
import StorageIcon from "@material-ui/icons/Storage";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

export default function SubMenu(props) {
  const [theme, setTheme] = React.useState("orange");

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleClick = (label) => {
    props.detailDrawer(label);
  };

  const ItemPanel = (props) => (
    <div style={{ margin: 5 }}>
      <div
        style={{
          width: 255,
          backgroundColor: "#172229",
          padding: "10px 20px 20px",
          borderRadius: 0,
          height: 5,
        }}
      >
        <div style={childrenSideBySideStyle}>
          <Avatar
            style={{
              width: 15,
              height: 15,
              backgroundColor: props.color,
              marginLeft: -10,
            }}
          ></Avatar>
          <span
            style={{
              fontSize: 14,
              color: "#D77610",
              marginLeft: 10,
            }}
          >
            {props.label}
          </span>
        </div>
      </div>

      <div
        style={{
          width: 255,
          height: 50,
          backgroundColor: "#1C2932",
          padding: 20,
          borderRadius: 0,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "lime",
            marginTop: -5,
          }}
        >
          {props.content}
        </p>
      </div>
    </div>
  );

  const ItemPanelChart = (props) => (
    <div style={{ margin: 5 }}>
      <div
        style={{
          width: 255,
          backgroundColor: "rgba(0,0,0,0.7)", //"rgba(23,34,41,0.5)",
          padding: 20,
          borderRadius: 0,
        }}
      >
        <div style={childrenSideBySideStyle}>
          <Avatar
            style={{
              width: 15,
              height: 15,
              backgroundColor: props.color,
              marginLeft: -10,
            }}
          >
            {" "}
          </Avatar>
          <span
            style={{
              fontSize: 14,
              color: "#D77610",
              marginLeft: 10,
            }}
          >
            {props.label}
          </span>
          <div style={{ position: "absolute", marginTop: -15, marginLeft: 230 }}>
            <IconButton onClick={() => handleClick(props.label)}>
              <InfoIcon style={{ color: "gray" }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div
        style={{
          width: 255,
          height: 200,
          // backgroundColor: "#1C2932",
          background:
            "linear-gradient(148deg, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.56) 50%)",
          padding: 20,
          borderRadius: 2,
          marginTop: 0,
          textAlign: "center",
        }}
      >
        <div style={{ padding: 10 }}>{props.icon}</div>
      </div>
      <div style={{ padding: 10, marginTop: -130 }}>
        <p
          style={{
            fontSize: 14,
          }}
        >
          {props.content}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* // Menu */}
      <div
        style={{
          marginTop: 0,
          marginLeft: 10,
        }}
      >
        <div style={childrenSideBySideStyle}>
          <ItemPanelChart
            index={1}
            label={"Gateways"}
            color={"green"}
            icon={<StorageIcon style={{ color: "orange", width: 70, height: 70 }} />}
            content={
              <div>
                <table>
                  <tr>
                    <td style={{ color: "gray" }}>RTT:</td>
                    <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;0.2 ms</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>RTTd:</td>
                    <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;0.2 ms</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Loss:</td>
                    <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;0.0 %</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Status:</td>
                    <td style={{ color: "lime" }}>&nbsp;&nbsp;&nbsp;&nbsp;Online</td>
                  </tr>
                </table>
              </div>
            }
          />
          <ItemPanelChart
            index={2}
            label={"Interfaces"}
            color={"green"}
            icon={<DnsIcon style={{ color: "orange", width: 70, height: 70 }} />}
            content={
              <div>
                <table>
                  <tr>
                    <td style={{ color: "gray" }}>LAN:</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;Ethernet autoselect
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>WAN1:</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1000baseT [full-duplex]
                    </td>
                  </tr>
                </table>
              </div>
            }
          />
          <ItemPanelChart
            index={3}
            label={"Network Time"}
            color={"green"}
            icon={<ScheduleIcon style={{ color: "orange", width: 70, height: 70 }} />}
            content={
              <div>
                <table>
                  <tr>
                    <td style={{ color: "gray" }}>Server Time</td>
                    <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;14:03:15</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Sync Source</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;52.148.114.188 (stratum 3)
                    </td>
                  </tr>
                </table>
              </div>
            }
          />
          <ItemPanelChart
            index={4}
            label={"Monit"}
            color={"red"}
            icon={<FolderOpenIcon style={{ color: "orange", width: 70, height: 70 }} />}
            content={
              <div>
                <table>
                  <tr>
                    <td style={{ color: "gray" }}>System</td>
                    <td style={{ color: "lime" }}>&nbsp;&nbsp;&nbsp;&nbsp;OK</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Filesystem</td>
                    <td style={{ color: "red" }}>&nbsp;&nbsp;&nbsp;&nbsp;FAIL</td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Custom</td>
                    <td style={{ color: "lime" }}>&nbsp;&nbsp;&nbsp;&nbsp;OK</td>
                  </tr>
                </table>
              </div>
            }
          />
          {/* <ItemPanelChart
            index={5}
            label={"Interface Statistics"}
            color={"green"}
            icon={
              <SettingsInputComponentIcon
                style={{ color: "orange", width: 70, height: 70 }}
              />
            }
            content={
              <div>
                <table>
                  <tr>
                    <td style={{ color: "gray" }}>Errors In</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;LAN: 4
                      &nbsp;&nbsp;&nbsp;&nbsp;WAN1: 0
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Errors Out</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;LAN: 0
                      &nbsp;&nbsp;&nbsp;&nbsp;WAN1: 0
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "gray" }}>Collisions</td>
                    <td style={{ color: "white" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;LAN: 0
                      &nbsp;&nbsp;&nbsp;&nbsp;WAN1: 0
                    </td>
                  </tr>
                </table>
              </div>
            }
          /> */}
        </div>

        <div>
          <div style={childrenSideBySideStyle}>
            <ItemPanelChart
              index={6}
              label={"Traffic Graph"}
              icon={<TimelineIcon style={{ color: "orange", width: 70, height: 70 }} />}
              color={"red"}
              content={
                <div>
                  <table>
                    <tr>
                      <td style={{ color: "gray" }}>In (bps)</td>
                      <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;10,245</td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Out (bps)</td>
                      <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;9,7763</td>
                    </tr>
                  </table>
                </div>
              }
            />
            <ItemPanelChart
              index={10}
              label={"System Information"}
              icon={<MemoryIcon style={{ color: "orange", width: 70, height: 70 }} />}
              color={"red"}
              content={
                <div>
                  <table>
                    <tr>
                      <td style={{ color: "gray" }}>CPU Usage:</td>
                      <td style={{ color: "red" }}>&nbsp;&nbsp;&nbsp;&nbsp;94%</td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Memory Usage:</td>
                      <td style={{ color: "red" }}>&nbsp;&nbsp;&nbsp;&nbsp;92%</td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Disk Usage:</td>
                      <td style={{ color: "orange" }}>&nbsp;&nbsp;&nbsp;&nbsp;88%</td>
                    </tr>
                  </table>
                </div>
              }
            />
            <ItemPanelChart
              index={7}
              label={"Services"}
              icon={<SettingsIcon style={{ color: "orange", width: 70, height: 70 }} />}
              color={"green"}
              content={
                <div>
                  <table>
                    <tr>
                      <td style={{ color: "gray" }}>Services Running:</td>
                      <td style={{ color: "lime" }}>&nbsp;&nbsp;&nbsp;&nbsp;8</td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Services Restart:</td>
                      <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;0</td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Services Stop</td>
                      <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;0</td>
                    </tr>
                  </table>
                </div>
              }
            />
            <ItemPanelChart
              index={8}
              label={"Firewall Log"}
              icon={<WhatshotIcon style={{ color: "orange", width: 70, height: 70 }} />}
              color={"green"}
              content={
                <div>
                  <table>
                    <tr>
                      <td style={{ color: "gray" }}>Number of logs:</td>
                      <td style={{ color: "white" }}>&nbsp;&nbsp;&nbsp;&nbsp;2</td>
                    </tr>
                  </table>
                </div>
              }
            />
            {/* <ItemPanelChart
              index={9}
              label={"OpenVPN"}
              icon={
                <VpnLockIcon
                  style={{ color: "orange", width: 70, height: 70 }}
                />
              }
              color={"green"}
              content={
                <div>
                  <table>
                    <tr>
                      <td style={{ color: "gray" }}>Client Conenctions:</td>
                      <td style={{ color: "white" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;1
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "gray" }}>Peer to Peer:</td>
                      <td style={{ color: "white" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;1
                      </td>
                    </tr>
                  </table>
                </div>
              }
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
