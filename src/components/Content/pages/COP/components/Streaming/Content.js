/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Streaming.Content.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Thursday, 17th March 2022 2:30:26 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import SVC from "./SVC";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";

// components
import { getUserProfile, getAuthToken } from "app/appSlice";
import { getOpsSelected } from "app/copSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  inputRoot: {
    paddingLeft: 10,
    height: 37,
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(255,128,0,0.8)",
  },
  option: {
    fontSize: 16,
  },
});

export function Content(props) {
  const classes = useStyles();
  const userProfile = useSelector(getUserProfile);
  const opsSelected = useSelector(getOpsSelected);
  const token = useSelector(getAuthToken);

  const [searchList, setSearchList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [caller, setCaller] = React.useState({
    user_id: "",
    blue_track_id: 0,
    meeting_id: "",
  });
  const [recepient, setRecepient] = React.useState(null);
  const [room, setRoom] = React.useState("");
  const [activateCall, setActivateCall] = React.useState(false);

  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const statList = useRef();
  statList.current = userList;

  useEffect(() => {
    setCaller({
      user_id: userProfile.user_id,
      blue_track_id: userProfile.blue_track_id,
      meeting_id: userProfile.meeting_id,
    });
  }, [userProfile]);

  useEffect(() => {
    setTimeout(() => {
      window.MessageDispatcher.SubscribeDispatcher("UNIT_INFO", (param) => {
        switch (param.Command) {
          case "SET_VIDEO_CALL":
            var resultList = statList.current.filter(
              (data) => data.blue_track_id === Number(param.Data)
            );
            setRecepient(resultList[0]);
            forceUpdate();
            break;
        }
      });
    }, 1000);
  }, []);

  // List the user according to the oragnization_id selected during the operation list
  useEffect(() => {
    if (opsSelected.organization_id === 0) return;

    // var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/user/blue_track_type_id/1/organization_id/${opsSelected.organization_id}`;
    var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/user/blue_track_type_id/-1/organization_id/${opsSelected.organization_id}`;

    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        // As a default both the search and userlist is the same
        // because all of the item in list will be displayed
        setUserList(data);
        setSearchList(data);
      })
      .catch(function (err) {
        console.log("UserList:" + err);
      });
  }, [opsSelected]);

  const handleClose = () => {
    props.handleClose();
  };

  // This is when the list gets filteres according to the change
  // of the text input. The Search list will be updated and displayed
  const handleOnChangeText = (value) => {
    setRoom("");
    if (value === null) {
      setSearchList(userList);
      setRecepient(value);
    } else {
      var resultList = userList.filter(
        (data) => data.blue_track_id === value.blue_track_id
      );
      setRecepient(resultList[0]);
    }
  };

  // Send the call message to socketio
  const handleStartCall = () => {
    // Guard Clause
    if (recepient === null) return;

    setActivateCall(true);

    var data = {
      caller_user_id: caller.user_id,
      caller_blue_track_id: caller.blue_track_id,
      recipient_user_id: recepient.user_id,
      recipient_blue_track_id: recepient.blue_track_id,
      url: `https://vc.sdev.my/${caller.meeting_id}-${recepient.user_id.replace(
        "@",
        ""
      )}#userInfo.displayName=%22${caller.user_id}%22`,
      meeting_id: `${caller.meeting_id}-${recepient.user_id.replace("@", "")}`,
      status: "start_call",
      status_time: new Date().toISOString(),
    };

    setRoom(
      `https://vc.sdev.my/${caller.meeting_id}-${recepient.user_id.replace(
        "@",
        ""
      )}#userInfo.displayName=%22${caller.user_id}%22`
    );

    window.SocketIO.SendMessage("video_call", JSON.stringify(data));
  };

  const handleEndCall = () => {
    // Guard Clause
    if (recepient === null) return;

    setActivateCall(false);

    var data = {
      caller_user_id: caller.user_id,
      caller_blue_track_id: caller.blue_track_id,
      recipient_user_id: recepient.user_id,
      recipient_blue_track_id: recepient.blue_track_id,
      url: `https://vc.sdev.my/${caller.meeting_id}-${recepient.user_id.replace(
        "@",
        ""
      )}#userInfo.displayName=%22${caller.user_id}%22`,
      meeting_id: `${caller.meeting_id}-${recepient.user_id.replace("@", "")}`,
      status: "end_call",
      status_time: new Date().toISOString(),
    };
    window.SocketIO.SendMessage("video_call", JSON.stringify(data));

    // Clear user selection
    handleOnChangeText(null);
  };

  const UserList = () => (
    <div style={{ marginLeft: 0, paddingBottom: 5, marginLeft: 10, width: 430 }}>
      <div style={childrenSideBySideStyle}>
        <Autocomplete
          value={recepient}
          style={{ width: 300 }}
          classes={{
            // option: classes.option,
            inputRoot: classes.inputRoot,
          }}
          defaultValue={"Select User"}
          onChange={(event, value) => handleOnChangeText(value)}
          options={searchList}
          getOptionLabel={(option) => option.user_label}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          style={{
            display: activateCall ? "none" : "block",
            width: 120,
            height: 37,
            backgroundColor: recepient === null ? "gray" : "green",
            color: "white",
            marginLeft: 5,
          }}
          onClick={() => handleStartCall()}
        >
          START
        </Button>
        <Button
          style={{
            display: activateCall ? "block" : "none",
            width: 120,
            height: 37,
            backgroundColor: "red",
            color: "white",
            marginLeft: 5,
          }}
          onClick={() => handleEndCall()}
        >
          END
        </Button>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#0074E0",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        VIDEO CALL
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
      <UserList />
      <SVC room={room} />
    </div>
  );
}
