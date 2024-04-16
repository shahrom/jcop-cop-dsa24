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

import React from "react";
import GroupChat from "./GroupChat";
import Tooltip from "@material-ui/core/Tooltip";

// icons
import CloseIcon from "@material-ui/icons/Close";

export function Content(props) {
  const handleClose = () => {
    props.handleClose();
    // Clear any alerts when the window closes
    var param = {
      Receiver: "HEADER",
      Command: "CLEAR_ALERT",
      Data: "CHAT",
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#9C27B0",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        CHAT
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div
          onClick={() => handleClose()}
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
      <GroupChat />
    </div>
  );
}
