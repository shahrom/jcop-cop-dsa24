/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MessageDispatcher.js
 * Created: Friday, 27th March 2020 11:50:13 am
 * Modified: Monday, 30th March 2020 8:47:38 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

let instance = null;
export default class MessageDispatcher {
  constructor() {
    if (!instance) {
      this.callbackMessageDispatcher = [];
      instance = this;
    }
    return instance;
  }

  SubscribeDispatcher(id, callback) {
    if (callback !== undefined) {
      var found = this.callbackMessageDispatcher.some((obj) =>
        obj.id === id ? true : false
      );

      // Remove the existing object and replacing it with the latest one
      // This will make sure that the link is not broken
      // https://love2dev.com/blog/javascript-remove-from-array/
      if (found === true) {
        var filtered = this.callbackMessageDispatcher.filter(function (
          value,
          index,
          arr
        ) {
          return value.id != id;
        });
        this.callbackMessageDispatcher = filtered;
      }

      this.callbackMessageDispatcher.push({ id: id, func: callback });
    }
  }

  TriggerMessageDispatcher(param) {
    for (var i = 0, l = this.callbackMessageDispatcher.length; i < l; i++) {
      var obj = this.callbackMessageDispatcher[i];
      if (obj !== null) {
        obj.func(param);
      }
    }
  }

  SendMessageParam(receiver, command, data) {
    var param = {
      Receiver: receiver,
      Command: command,
      Data: data,
    };
    for (var i = 0, l = this.callbackMessageDispatcher.length; i < l; i++) {
      var obj = this.callbackMessageDispatcher[i];
      if (obj !== null) {
        obj.func(param);
      }
    }
  }

  SendMessage(receiver, data) {
    var param = {
      Receiver: receiver,
      Data: data,
    };
    for (var i = 0, l = this.callbackMessageDispatcher.length; i < l; i++) {
      var obj = this.callbackMessageDispatcher[i];
      if (obj !== null) {
        obj.func(param);
      }
    }
  }
}
