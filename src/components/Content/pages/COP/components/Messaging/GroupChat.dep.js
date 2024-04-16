/*
 * --------------------------------------------------------------------
 * File: GroupChat1.js
 * Created: Monday, 15th May 2023 3:20:34 pm
 * Modified: Thursday, 18th May 2023 10:42:53 am
 *
 * Copyright (C) 2023 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import { getUserProfile, getAuthToken } from "app/appSlice";

var myLoaded = false;

export default function GroupChat() {
  const userProfile = useSelector(getUserProfile);
  const token = useSelector(getAuthToken);
  const isTablet = useMediaQuery("(max-width:1300px)");
  const [chatPort, setChatPort] = useState("");

  useEffect(() => {
    alert(token);

    if (userProfile.blue_track_id === undefined) return;

    if (myLoaded === false) {
      var channel = new MessageChannel();
      var iframe = document.querySelector("iframe");

      const message = JSON.stringify({
        access_token: token,
      });

      // Wait for the iframe to load
      iframe.addEventListener("load", onLoad);

      function onLoad() {
        if (myLoaded === true) return;
        myLoaded = true;

        // Listen for messages on port1
        channel.port1.onmessage = onMessage;

        // Transfer port2 to the iframe
        iframe.contentWindow.postMessage("capturePort", "*", [channel.port2]);
      }

      // Handle messages received on port1
      function onMessage(e) {
        if (e.data === "requestAccessToken") {
          console.debug("receive from iframe: " + e.data);
          channel.port1.postMessage(message);
        }
      }
    }
  }, [userProfile]);

  useEffect(() => {
    setTimeout(() => {
      if (window.appConfig != undefined) {
        setChatPort(window.appConfig.chatPort);
      }
    }, 1000);
  }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <div>
        <div
          style={{
            marginLeft: 10,
            marginTop: 0,
          }}
        >
          <iframe
            // src={`https://mabpoc.scs.my:${chatPort}/nc2p.chat/?senderId=${userProfile.blue_track_id}`}
            src={`https://mabpoc.scs.my:${chatPort}/nc2p.chat/?senderId=${19101}`}
            frameBorder="0"
            width="430px"
            height={window.innerHeight - 195}
          />
        </div>
      </div>
    </div>
  );
}
