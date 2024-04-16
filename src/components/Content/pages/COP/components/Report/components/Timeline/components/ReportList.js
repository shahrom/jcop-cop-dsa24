/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: ReportList.js
 * Created: Wednesday, 18th November 2020 1:24:10 pm
 * Modified: Wednesday, 18th November 2020 1:24:10 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

export default class ReportList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countStopNTalk: 24,
      countMeetNGreet: 36,
      countRespond: 12,
      countInspection: 22,
      countConferencePoint: 26,

      stopntalkColor: "#0375ED",
      meetngreetColor: "#1A911A",
      inspectionColor: "#E88F06",
      conferenceColor: "#993299",
      respondColor: "red",
    };
  }

  render() {
    const childrenSideBySideStyle = {
      display: "flex",
      flexDirection: "row",
    };

    const MyLabelCounter = (props) => (
      <ListItem>
        <ListItemText
          primary={
            <span style={{ fontSize: 16, color: "white" }}>{props.label}</span>
          }
        />

        {props.time === "S1" ? (
          <div style={childrenSideBySideStyle}>
            <Avatar
              style={{ backgroundColor: "#FF5E13", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>8</span>
            </Avatar>
            <div style={{ width: 10 }} />
            <Avatar
              style={{ backgroundColor: "#005FAB", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>1</span>
            </Avatar>
          </div>
        ) : (
          <div />
        )}

        {props.time === "S2" ? (
          <div style={childrenSideBySideStyle}>
            <Avatar
              style={{ backgroundColor: "#005FAB", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>16</span>
            </Avatar>
            <div style={{ width: 10 }} />
            <Avatar
              style={{ backgroundColor: "#B200FF", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>5</span>
            </Avatar>
            <div style={{ width: 10 }} />
            <Avatar
              style={{ backgroundColor: "#FF0000", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>1</span>
            </Avatar>
            <div style={{ width: 10 }} />
            <Avatar
              style={{ backgroundColor: "#007F0E", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>5</span>
            </Avatar>
          </div>
        ) : (
          <div />
        )}

        {props.time === "S3" ? (
          <div style={childrenSideBySideStyle}>
            <Avatar
              style={{ backgroundColor: "#007F0E", height: 30, width: 30 }}
            >
              <span style={{ fontSize: 16 }}>5</span>
            </Avatar>
          </div>
        ) : (
          <div />
        )}
      </ListItem>
    );

    return (
      <div>
        <br />

        <List style={{ padding: "10px" }}>
          <MyLabelCounter
            time={"S1"}
            label={"S1: 11:00 PM - 7:00 AM"}
            counter={this.state.countStopNTalk}
          />
          <Divider />
          <MyLabelCounter
            time={"S2"}
            label={"S2: 7:00 AM - 3:00 PM"}
            counter={this.state.countMeetNGreet}
          />
          <Divider />
          <MyLabelCounter
            time={"S3"}
            label={"S3: 3:00 PM - 10:00 PM"}
            counter={this.state.countInspection}
          />
          <Divider />
        </List>
      </div>
    );
  }
}
