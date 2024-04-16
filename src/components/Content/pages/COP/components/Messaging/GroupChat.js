/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: GroupChat.js
 * Created: Tuesday, 17th May 2022 11:39:44 am
 * Modified: Tuesday, 31st May 2022 2:12:46 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
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
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (userProfile.blue_track_id === undefined) return;

    if (myLoaded === false) {
      var channel = new MessageChannel();
      // var iframe = document.querySelector("iframe");

      var iframe = document.getElementById("myIFrame");
      iframe.addEventListener("load", onLoad);

      const message = JSON.stringify({
        access_token: token,
      });

      // Wait for the iframe to load
      // iframe.addEventListener("load", onLoad);

      function onLoad() {
        setTimeout(() => {
          if (myLoaded === true) return;
          myLoaded = true;

          // Listen for messages on port1
          channel.port1.onmessage = onMessage;

          // Transfer port2 to the iframe
          iframe.contentWindow.postMessage("capturePort", "*", [channel.port2]);
        }, 1000);
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
      setDomain(window.appConfig.domainName);
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
          {/* <p
            style={{ color: "white" }}
          >{`${domain}:${chatPort}/nc2p.chat/?senderId=${userProfile.blue_track_id}`}</p> */}
          <iframe
            id={"myIFrame"}
            src={`${domain}:${chatPort}/nc2p.chat/?senderId=${userProfile.blue_track_id}`}
            // src={`https://www.nc2.mil/nc2p.chat/?senderId=${userProfile.blue_track_id}`}
            // src={`${domain}/nc2p.chat/?senderId=${userProfile.blue_track_id}`}

            frameBorder="0"
            width="430px"
            height={window.innerHeight - 195}
          />
        </div>
      </div>
    </div>
  );
}
