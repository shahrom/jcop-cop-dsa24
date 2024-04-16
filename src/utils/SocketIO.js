/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Socket_IO.js
 * Created: Thursday, 29th April 2021 8:48:02 pm
 * Modified: Friday, 30th April 2021 8:13:28 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Reference SocketClient:
 * https://mabpoc.scs.my:45443/nc2p.socket.io.client/index.html?endPoint=mabpoc.scs.my:45410
 * https://mabpoc.scs.my:55443/nc2p.socket.io.client/index.html?endPoint=mabpoc.scs.my:55410
 *
 * Path to dev server: \\192.168.189.24\d$
 * Path to deploy server: \\192.168.189.14\d$
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 *
 *
 * 2022-07-14@17:05:33.046 blue_track.scsrnd> {"blue_track_id":20407,"appointment_id":2407,"blue_track_source_id":3,"blue_track_type_id":1,
 * "createdAt":"2022-06-14T03:38:21.964Z","device_status":{"battery_charger":"plugged","battery_percentage":93,"network_type":"Wifi/Others",
 * "signal_strength":"null","transmit_interval":3},"is_offtrack":false,"organization_id":2003,"spatial":{"altitude":70.0999984741211,
 * "course":108.7729263305664,"speed":5.204065275192261,"geometry":{"coordinates":[101.7457617,3.1997653],"type":"Point"}},
 * "time_of_receipt":"2022-07-14T09:05:33.144Z","time_of_transmit":"2022-07-14T09:05:33.108Z","time_of_validity":"2022-07-14T09:05:33.108Z",
 * "unit_id":0,"updatedAt":"2022-07-14T09:05:33.157Z","appointment_long_name":"Dev 07 - Amirul","appointment_name":"dev07","blue_track_source_name":"GPS",
 * "blue_track_type_name":"Personnel","organization_long_name":"SCS R&D","organization_name":"scsrnd","marker":"media/markers/m/a.hq.png",
 * "unit_name":"TIDAK BERKENAAN","user_id":"dev07@scsrnd","user_label":"DEV07@SCSRND"}
 * --------------------------------------------------------------------
 */

import io from "socket.io-client";

let instance = null;

export default class SocketIO {
  constructor(orgName) {
    if (!instance) {
      this.socket = io.connect("https://mabpoc.scs.my:" + window.appConfig.socketPort);
      this.callbackSocketList = [];
      this._connectSocketServer(orgName);
    }
    return instance;
  }

  /*
  [Desc]
  Subscribe to the socket with a callback function and the id. The function will be added
  into the callbackSocketList list. It will first be filtered and the latest id will be added
  into any existing id in the list to make sure that the id is not broken
  [Param]
  id: The id of the callback function. This is used to check if the id already exist in the list
  callback: The callback function that is called when a message is received and broadcasted
  */
  SubscribeSocketEvent(id, callback) {
    if (callback !== undefined) {
      var found = this.callbackSocketList.some((obj) => (obj.id === id ? true : false));
      if (found === true) {
        for (var i = 0, l = this.callbackSocketList.length; i < l; i++) {
          if (this.callbackSocketList[i].id === id) {
            this.callbackSocketList.splice(i, 1);
            this.callbackSocketList.push({ id: id, func: callback });
          }
        }
      }
      if (found === false) {
        this.callbackSocketList.push({ id: id, func: callback });
      }
    }
  }

  /*
  [Desc]
  This is a function that is called when the modules needs to send a message to
  the websocket. 
  */
  SendMessage(id, message) {
    this.socket.emit(id, message);
  }

  /*
  [Desc]
  This is the first function that is called when the class is constructed. This function
  will initiate and starts the listener to the websocket server
  */
  ConnectSocketServer(orgName) {
    this._connectSocketServer(orgName);
  }

  DisconnectSocketServer() {
    this.socket.disconnect();
  }

  _connectSocketServer(orgName) {
    var self = this;

    // [Blue Track]
    this.socket.on("blue_track." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Chat]
    // this.socket.on("chat." + orgName, function (msg) {
    this.socket.on("chat", function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Distress Call]
    this.socket.on("distress_call." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Video Call]
    this.socket.on("video_call." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Report]
    this.socket.on("report." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Readiness]
    this.socket.on("readiness." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Vehicle]
    this.socket.on("vehicle." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // [Health]
    this.socket.on("health." + orgName, function (msg) {
      if (msg !== undefined) {
        for (var i = 0, l = self.callbackSocketList.length; i < l; i++) {
          var obj = self.callbackSocketList[i];
          if (obj != null) {
            obj.func(msg);
          }
        }
      }
    });

    // this.socket.on("connect", function () {
    //   var param = {
    //     Receiver: "ALL",
    //     Command: "SOCKET_STATUS",
    //     Data: "Connected to Server IO",
    //   };
    //   window.MessageDispatcher.TriggerMessageDispatcher(param);
    // });

    this.socket.on("disconnect", function () {
      console.log("Disconnect to Socket IO");
    });

    this.socket.on("connect_error", (error) => {
      console.log("connect_error");
    });

    this.socket.on("connect_timeout", (timeout) => {
      console.log("connect_timeout");
    });

    this.socket.on("error", (error) => {
      console.log("error");
    });

    // Reconnect =================================

    // [8]
    this.socket.on("reconnect", (attemptNumber) => {
      console.log("reconnect");
    });

    // [9]
    this.socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("reconnect_attempt");
    });

    // [10]
    this.socket.on("reconnecting", (attemptNumber) => {
      console.log("reconnecting");
    });

    // [11]
    this.socket.on("reconnect_error", (error) => {
      console.log("reconnect_error");
    });

    // [12]
    this.socket.on("reconnect_failed", () => {
      console.log("reconnect_failed");
    });
  }
}
