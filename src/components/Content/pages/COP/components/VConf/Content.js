/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: VConf.Content.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Thursday, 17th March 2022 2:30:26 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
// import SVC from "./SVC";
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
    fontSize: 16,
    backgroundColor: "rgba(255,128,0,0.8)",
  },
  option: {
    fontSize: 14,
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

  useEffect(() => {
    if (opsSelected.organization_id === 0) return;

    var vcList = [];
    vcList = opsSelected.vc_rooms;

    setUserList(vcList);
    setSearchList(vcList);
  }, [opsSelected]);

  const handleClose = () => {
    props.handleClose();
  };

  // This is when the list gets filteres according to the change
  // of the text input. The Search list will be updated and displayed
  const handleOnChangeText = (value) => {
    if (value === null) {
      setSearchList(userList);
      setRecepient(value);
    } else {
      var resultList = userList.filter((data) => data.name === value.name);
      setRecepient(resultList[0]);
    }
  };

  // Send the call message to socketio
  const handleStartCall = () => {
    if (recepient === null) return;
    setTimeout(() => {
      var url = `${recepient.url}#userInfo.displayName="${userProfile.user_id}"`;
      window.open(url);
      setRecepient(null);
      handleClose();
    }, 500);
  };

  const VCList = () => (
    <div style={{ marginLeft: 0, paddingBottom: 5, marginLeft: 10, width: 430 }}>
      <div style={childrenSideBySideStyle}>
        <Autocomplete
          value={recepient}
          style={{ width: 300 }}
          classes={{
            inputRoot: classes.inputRoot,
          }}
          defaultValue={"Select Room"}
          onChange={(event, value) => handleOnChangeText(value)}
          options={searchList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          style={{
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
        VIDEO CONFERENCE
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
      <VCList />
    </div>
  );
}
