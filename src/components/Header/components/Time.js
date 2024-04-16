/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Time.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Friday, 18th March 2022 7:39:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Button from "@material-ui/core/Button";

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      ellapsed: "",
      today: "",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({
      today: this.getToday(),
    });
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
    var sDisplay = s >= 0 ? s + (s == 1 ? "s" : "s") : "";

    return hDisplay + mDisplay + sDisplay;
  }

  calculateEllapsedTime() {
    var startTime, endTime;

    startTime = window.StartTime;
    endTime = new Date();

    var timeDiff = endTime - startTime; //in ms

    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);

    this.setState({
      ellapsed: this.secondsToHms(seconds),
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // Update current time
    this.setState({
      date: new Date(),
    });

    // Update ellapsed time
    this.calculateEllapsedTime();
  }

  getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (month.toString().length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length === 1) {
      second = "0" + second;
    }

    var dateTime = this.getDay() + ", " + this.getMonth() + " " + day + " " + year;

    return dateTime;
  }

  getDay() {
    var now = new Date();
    var days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    var day = days[now.getDay()];
    return day;
  }

  getMonth() {
    var now = new Date();
    var months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    var month = months[now.getMonth()];
    return month;
  }

  render() {
    return (
      <div>
        <div
          style={{
            fontSize: 14,
            // marginTop: 5,
            // marginRight: 10,
            textAlign: "right",
          }}
        >
          <div>
            <span style={{ color: "gray" }}>{this.state.today}</span>
            <br />
            <span style={{ color: "white" }}>
              {" "}
              {this.state.date.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
