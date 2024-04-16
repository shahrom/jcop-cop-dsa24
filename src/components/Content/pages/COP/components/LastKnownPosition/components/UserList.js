/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LastKnownPosition.UserList.js
 * Created: Monday, 18th April 2022 10:18:14 am
 * Modified: Monday, 18th April 2022 4:01:21 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useRef, useEffect } from "react";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  inputRoot: {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "orange",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "orange",
    },
  },
  option: {
    fontSize: 15,
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
  agencyColor: { color: "white" },
});

export function UserList(props) {
  const [user, setUser] = React.useState({});
  const [userList, setUserList] = React.useState([]);
  const [rawList, setRawList] = React.useState([]);
  const [resultList, setResultList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  const [trackId, setTrackId] = React.useState();
  const [inputText, setInputText] = React.useState();

  const { classes } = props;

  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    if (props.data != null) {
      var data = props.data;

      for (var i = 0; i < data.length; i++) {
        // Set Date & Time
        var d = new Date(data[i].updatedAt);
        d.toLocaleDateString("en-GB"); // dd/mm/yyyy
        data[i].dateTime = d.toString();
      }

      // Get existing list and add the latest item into the list
      setUserList(data);
      setSearchList(data);
      setResultList(data);
      forceUpdate();
    }
  }, [props.data]);

  const selectedText = (value) => {
    setInputText(value);

    if (value === null) {
      setResultList(userList);
    } else {
      var resultList = userList.filter(
        (data) => data.blue_track_id === value.blue_track_id
      );
      setResultList(resultList);
    }
  };

  const handleClearMarkers = () => {
    setInputText("14@AB");
    setResultList([]);
    forceUpdate();

    setTimeout(() => {
      setResultList(userList);
      var param = {
        Receiver: "ARCGIS",
        Command: "CLEAR_TARGET_MARKER",
      };
      window.MessageDispatcher.TriggerMessageDispatcher(param);
    }, 100);
  };

  const handleZoom = (data) => {
    var param = {
      Receiver: "ARCGIS",
      Command: "PLOT_TARGET_MARKER",
      Data: {
        label: data.user_label,
        latitude: data.spatial.geometry.coordinates[1],
        longitude: data.spatial.geometry.coordinates[0],
        zoom: 18,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);

    var param = {
      Receiver: "ARCGIS",
      Command: "ZOOM_TO_POINT",
      Data: {
        latitude: data.spatial.geometry.coordinates[1],
        longitude: data.spatial.geometry.coordinates[0],
        zoom: 18,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
        <div style={childrenSideBySideStyle}>
          <Autocomplete
            // disableClearable
            // freeSolo={true}
            clearOnBlur={true}
            classes={{
              option: classes.option,
              inputRoot: classes.inputRoot,
            }}
            value={inputText}
            onChange={(event, value) => selectedText(value)}
            options={searchList}
            getOptionLabel={(option) =>
              option.appointment_name === undefined
                ? "Please Enter UserId"
                : option.user_label.toUpperCase()
            }
            style={{ width: 300, margin: 10 }}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
          <Button
            onClick={() => handleClearMarkers()}
            style={{
              outline: "none",
              color: "orange",
              borderColor: "gray",
              width: 120,
              height: 54,
              marginTop: 10,
            }}
            variant="outlined"
          >
            CLEAR
          </Button>
        </div>
      </div>

      <div style={{ height: window.innerHeight - 270, overflow: "auto" }}>
        <List>
          {resultList.map((row, index) => (
            <Accordion style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <AccordionSummary
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                expandIcon={<ExpandMoreIcon style={{ color: "gray" }} />}
              >
                {/* <Avatar
                  alt=""
                  src={row.icon}
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    marginLeft: 20,
                    marginTop: 10,
                    cursor: "pointer",
                    borderRadius: 0,
                    padding: 2,
                  }}
                /> */}
                <span style={{ color: "white", marginLeft: 20, marginTop: 15 }}>
                  {row.user_label}
                </span>
              </AccordionSummary>

              <AccordionDetails>
                <div>
                  <div
                    style={{
                      width: "100%",
                      fontSize: 14,
                      textAlign: "left",
                      color: "white",
                    }}
                  >
                    <p style={{ color: "orange" }}>LAST KNOWN INFORMATION</p>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ color: "gray" }}>Time:</td>
                          <td>{row.dateTime}</td>
                        </tr>
                        <tr>
                          <td style={{ color: "gray" }}>Lat:</td>
                          <td>
                            {row != null &&
                              Decimal2DMS(
                                row.spatial.geometry.coordinates[1],
                                "latitude"
                              )}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ color: "gray" }}>Long:</td>
                          <td>
                            {row != null &&
                              Decimal2DMS(
                                row.spatial.geometry.coordinates[0],
                                "longitude"
                              )}
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={{ color: "gray" }}>UTM:</td>
                          <td>{row != null && row.utm}</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>

                  <hr
                    style={{
                      opacity: 0.2,
                      padding: 0,
                      margin: 10,
                    }}
                  />

                  <Button
                    onClick={() => handleZoom(row)}
                    style={{
                      textAlign: "center",
                      width: 170,
                      backgroundColor: "orange",
                      marginLeft: 10,
                    }}
                  >
                    ZOOM TO LOCATION
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </div>
    </div>
  );
}

export default withStyles(styles)(UserList);
