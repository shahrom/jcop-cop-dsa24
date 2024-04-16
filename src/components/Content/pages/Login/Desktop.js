/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Login.index.js
 * Created: Wednesday, 16th March 2022 12:31:26 pm
 * Modified: Wednesday, 16th March 2022 8:43:11 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useReducer, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";

// components
import {
  setPage,
  setService,
  setUserProfile,
  setAuthToken,
} from "app/appSlice";

// icons
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  invalidPasswordPrompt: {
    backgroundColor: "red",
    color: "white",
  },
  select: {
    "&:before": {
      borderColor: "orange",
    },
    "&:after": {
      borderColor: "orange",
    },
  },
  icon: {
    fill: "orange",
  },
  label: {
    "&$focused": {
      color: "orange",
    },
    color: "orange",
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid orange",
    },
    color: "white",
  },
  textColor: { color: "yellow", fontSize: 22 },
  textPasswordColor: { color: "white", fontSize: 18 },
});

export default function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [values, setValues] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [startProgress, setStartProgress] = React.useState(false);

  const classes = useStyles();

  //
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
    // document.getElementById("myLoginInput").focus();
  };

  const handleChange = (e) => {
    setValues(e.target.value);
    setTimeout(() => {
      document.getElementById("myLoginInput").focus();
    }, 10);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      document.getElementById("myLoginInput").focus();
    }, 10);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     document.getElementById("myUsername").setAttribute("value", "ops1@5rs");
  //     document.getElementById("myLoginInput").setAttribute("value", "Scslima2023");
  //     // document.getElementById("myUsername").focus();
  //   }, 1000);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("myUsername").value = "ops1@scsrnd";
      document.getElementById("myLoginInput").value = "M@bscs2022";
      handleEnter();
    }, 1000);
  }, []);

  const handleUserNameChange = (e) => {
    var userName = e.target.value;
    if (userName.length === 0) {
      ChangeBackground(1);
    } else {
      ChangeBackground(3);
    }
  };

  const handleEnter = () => {
    if (document.getElementById("myUsername").value === "") {
      document.getElementById("myUsername").focus();
      setErrorMessage("PLEASE ENTER USERNAME");
      setOpen(true);
      return;
    }

    if (document.getElementById("myLoginInput").value === "") {
      document.getElementById("myLoginInput").focus();
      setErrorMessage("PLEASE ENTER PASSWORD");
      setOpen(true);
      return;
    }

    var url = `https://mabpoc.scs.my:${window.appConfig.authenPort}/api/auth/login`;
    var body = {
      UserID: document.getElementById("myUsername").value,
      Password: document.getElementById("myLoginInput").value,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((data) => {
        // Filter for any error when user logs in
        if (data.error === true) {
          setErrorMessage(data.message);
          setOpen(true);
          return;
        }

        // Filter for only portal users and NOT mobile users
        if (data.user.blue_track_type_id !== 0) {
          setErrorMessage("UNAUTHORIZED USER : ACCESS DENIED");
          setOpen(true);
          return;
        }

        if (data.access_token != undefined) {
          // Save authentication token & user info
          dispatch(setAuthToken(data.access_token));
          window.token = data.access_token;

          // Set meeting id for video call
          var userProfileData = data.user;
          userProfileData.meeting_id = userProfileData.user_id.replace("@", "");

          setUser(userProfileData);
          dispatch(setUserProfile(userProfileData));

          // Clear inputs
          document.getElementById("myUsername").value = "";
          document.getElementById("myLoginInput").value = "";

          // Display the prompt to Standby
          setTimeout(() => {
            dispatch(setPage("OVERVIEW"));
            dispatch(setService("ATB"));
          }, 2500);
        } else {
          setErrorMessage("INVALID USERNAME OR PASSWORD");
          setOpen(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const ChangeBackground = (index) => {
    setTimeout(function () {
      window.document.getElementById(
        "myBody"
      ).style.backgroundImage = `url('img/wallpaper/abc${index}.jpg')`;
      window.document.getElementById("myBody").style.transition = "all 1s";
    }, 100);
  };

  const DefaultProfile = () => (
    <div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 1,
        opacity: 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          padding: 5,
          textAlign: "center",
          marginTop: 0,
        }}
      >
        <span
          style={{
            textAlign: "center",
            fontFamily: "Michroma",
            color: "yellow",
            fontSize: 32,
            top: 70,
            position: "relative",
          }}
        >
          {/* {"JCOP"} */}
        </span>
        <span
          style={{
            textAlign: "center",
            fontFamily: "Michroma",
            color: "gray",
            fontSize: 32,
            top: 70,
            position: "relative",
            marginLeft: 10,
          }}
        >
          {/* {window.appConfig != undefined ? window.appConfig.appEnv : ""} */}
        </span>
        <div style={{ opacity: 0.8 }}>
          <img
            src={"img/logo/jcop-logo.png"}
            width="60%"
            height="auto"
            object-fit="contain"
          />
        </div>
        <p style={{ marginTop: 0, color: "white", fontSize: 28 }}>
          OPERATION-MAP
        </p>
        <p style={{ marginTop: 0, color: "gray" }}>Version: 2.1.27</p>
      </div>
    </div>
  );

  const UserProfile = () => {
    setStartProgress(true);
    return (
      <div>
        <div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 1,
            opacity: 1,
          }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center" }}
        >
          <br />
          <span
            style={{
              marginTop: 150,
              fontFamily: "Barlow",
              color: "yellow",
              fontSize: 26,
            }}
          >
            ACCESS GRANTED
          </span>

          <br />
          <br />
          <br />
          <br />

          <div>
            <img
              src={`img/logo/jcop-logo.png`}
              alt="Avatar"
              height={"180px"}
              width={"180px"}
            />
          </div>
          <br />
          <LinearProgress style={{ width: 200, marginLeft: 150 }} />

          <p
            style={{
              width: 150,
              padding: 3,
              fontFamily: "Arial",
              color: "white",
              fontSize: 12,
              borderRadius: 10,
              backgroundColor: "rgba(48,199,48,0.5)",
              marginLeft: 175,
            }}
          >
            <span
              style={{ marginLeft: 10, marginTop: 5, position: "absolute" }}
            >
              USER VALIDATED
            </span>
            <CheckCircleIcon
              style={{ marginLeft: 120, width: 20, height: 20 }}
            />
          </p>

          <span
            style={{
              margin: 0,
              fontFamily: "Arial",
              color: "gray",
              fontSize: 12,
            }}
          >
            Please Stanby...
          </span>
        </div>
      </div>
    );
  };

  const LoginInput = () => (
    <div>
      <hr style={{ opacity: 0.2 }} />
      <br />

      <TextField
        id="myLoginInput"
        variant="outlined"
        style={{
          width: 350,
          margin: 10,
          marginTop: -10,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
        onChange={(e) => handleChange(e)}
        margin="normal"
        value={values}
        type={showPassword ? "text" : "password"}
        InputLabelProps={{
          classes: {
            root: classes.label,
            focused: classes.focused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.textPasswordColor,
            focused: classes.focused,
            notchedOutline: classes.notchedOutline,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>

      <br />
      <Button
        id="myEnter"
        onClick={() => handleEnter()}
        variant="outlined"
        style={{
          fontSize: "14px",
          color: "white",
          margin: "5px",
          backgroundColor: "#2B3D49",
          width: "120px",
        }}
      >
        ENTER
      </Button>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        height: window.innerHeight - 80,
        width: window.innerWidth,
        marginTop: 90,
      }}
    >
      <div
        style={{
          marginTop: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: user != null ? 500 : 900,
          borderRadius: 10,
          padding: 20,
          borderColor: "rgba(255,255,255,0.2)",
          border: "1px solid gray",
        }}
      >
        <div style={childrenSideBySideStyle}>
          {/* // Left Panel ---------------------------------------- */}
          <div
            style={{
              width: 500,
              height: 530,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            {user != null ? <UserProfile /> : <DefaultProfile />}
          </div>

          {/* // Right Panel -------------------------------------------*/}

          <div>
            <div
              style={{
                display: user != null ? "none" : "block",
                paddingLeft: 30,
                textAlign: "center",
                color: "white",
                marginTop: 50,
                fontFamily: "Poppins",
                width: 400,
              }}
            >
              <div
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: "Michroma",
                  color: "white",
                  fontSize: 40,
                }}
              >
                <br />
                <span style={{ color: "white", fontSize: 14 }}>
                  Please Enter Username
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 16,
                }}
              ></p>
              <br />

              <TextField
                id="myUsername"
                variant="outlined"
                style={{
                  width: 350,
                  margin: 10,
                  marginTop: -10,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                onChange={(e) => handleUserNameChange(e)}
                margin="normal"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.textColor,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              ></TextField>
              <LoginInput />
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        key={"TransitionUp"}
      >
        <SnackbarContent
          className={classes.invalidPasswordPrompt}
          message={
            <div style={childrenSideBySideStyle}>
              <ErrorIcon />
              <span style={{ textAlign: "center", width: 300 }}>
                {errorMessage}
              </span>
            </div>
          }
        />
      </Snackbar>
    </div>
  );
}
