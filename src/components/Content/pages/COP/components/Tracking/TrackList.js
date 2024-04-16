/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Tracking.Content.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Wednesday, 16th March 2022 10:56:58 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";
import Button from "@material-ui/core/Button";

// components
import { getAuthToken, setMapTool } from "app/appSlice";
import { getCOPTrackingList, getOpsSelected } from "app/copSlice";
import { CircularCounter } from "components/Content/graphics";

// icons
import CloseIcon from "@material-ui/icons/Close";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";
import HistoryIcon from "@material-ui/icons/History";

export default function TrackList(props) {
  const dispatch = useDispatch();
  const list = useSelector(getCOPTrackingList);
  const opSelected = useSelector(getOpsSelected);
  const token = useSelector(getAuthToken);

  const [mainList, setMainList] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [filter, setFilter] = React.useState(false);
  const [value, setValue] = React.useState("interval1");

  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    UpdateBFTMarkers();
  }, [list]);

  useEffect(() => {
    setMainList([]);
  }, [opSelected]);

  const UpdateBFTMarkers = () => {
    if (list.data.length === 0) return;

    // Filter the list occording to the operation name and orgname
    var orgList = [];
    for (var i = 0; i < list.data.length; i++) {
      if (list.data[i].organization_name === opSelected.organization_name) {
        orgList.push(list.data[i]);
      }
    }

    // Do a deep copy of the list.
    var flist = orgList.map((item) => Object.assign({}, item, { selected: false }));

    // Check if image exist
    for (var i = 0; i < flist.length; i++) {
      checkImage(flist[i].marker, i, (exist, index) => {
        flist[index].isImageExist = exist;
      });
    }

    // Sort the list so that the item does not jump when updated
    flist.sort((a, b) => {
      let fa = a.user_label,
        fb = b.user_label;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    if (flist.length > 0) {
      setMainList(flist);
    }
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleSettings = () => {
    setFilter(!filter);
  };

  const handleLastKnownPosition = () => {
    dispatch(setMapTool("LAST_KNOWN_LOCATION"));
  };

  const checkImageXXX = (marker) => {
    var image = new Image();
    var url_image = `https://mabpoc.scs.my:${window.appConfig.mediaPort}/${marker}`;
    image.src = url_image;
    if (image.width == 0) {
      return false;
    } else {
      return true;
    }
  };

  const checkImage = (marker, index, callback) => {
    const img = new Image();
    var url_image = `https://mabpoc.scs.my:${window.appConfig.mediaPort}/${marker}`;
    img.src = url_image;

    if (img.complete) {
      callback(true, index);
    } else {
      img.onload = () => {
        callback(true, index);
      };

      img.onerror = () => {
        callback(false, index);
      };
    }
  };

  const handleZoom = (data) => {
    var param = {
      Receiver: "ARCGIS",
      Command: "ZOOM_TO_POINT",
      Data: {
        latitude: data.coordinates[1],
        longitude: data.coordinates[0],
        zoom: 20,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#1E49AC",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        ANGGOTA
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          {/* Refresh List (Disabled) ===================================== */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="LAST KNOWN LOCATION">
              <HistoryIcon
                onClick={() => handleLastKnownPosition()}
                style={{
                  color: "white",
                  fontSize: 24,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>

          <div style={{ width: 5 }} />

          {/* Close Drawer ====================================== */}
          <div
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
                onClick={() => handleClose()}
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
      </div>
    </div>
  );

  const ContentChart = (props) => (
    <div>
      <div style={{ textAlign: "center" }}>
        <CircularCounter
          value={props.value}
          max={props.max}
          color={props.color}
          label={<span>{props.label}</span>}
        />
        <div style={{ width: 150 }} />
      </div>
    </div>
  );

  const handleChange = (label, e, isExpanded) => {
    var newList = trackList;
    if (isExpanded) {
      newList.push(label);
      setTrackList(newList);
    } else {
      for (var i = 0; i < newList.length; i++) {
        if (newList[i] === label) {
          newList.splice(i, 1);
          setTrackList(newList);
        }
      }
    }
    forceUpdate();
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <ContentChart
        value={mainList.length}
        max={50}
        color={"cyan"}
        label={"TOTAL TRACKS"}
      />
      <div style={{ overflow: "auto", height: window.innerHeight - 330 }}>
        {mainList.map((row, index) => (
          <>
            <Accordion
              expanded={trackList.includes(row.user_label)}
              onChange={(e, x) => handleChange(row.user_label, e, x)}
              style={{
                margin: "auto",
              }}
            >
              <AccordionSummary
                style={{
                  backgroundColor: "rgba(0,0,0,1)",
                  height: 60,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      color: "white",
                      // width: 50,
                    }}
                  />
                }
              >
                <div>
                  <div style={childrenSideBySideStyle}>
                    <IconButton style={{ marginLeft: -20 }}>
                      <img
                        style={{
                          width: 50,
                          height: 50,
                          opacity: 0.7,
                        }}
                        src={`img/markers/agency/scs.png`}
                        // src={
                        //   row.isImageExist
                        //     ? `https://mabpoc.scs.my:${window.appConfig.mediaPort}/${row.marker}`
                        //     : `https://mabpoc.scs.my:${window.appConfig.mediaPort}/media/markers/default/${row.blue_track_type_id}.png`
                        // }
                      />
                    </IconButton>
                    <div style={{ marginTop: 27 }}>
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      >
                        {row.user_label}
                      </span>
                    </div>

                    {/* Arrow ---------------------------------- */}
                    {/* <div
                      style={{
                        textAlign: "center",
                        width: 30,
                        height: 20,
                        borderRadius: 30,
                        marginTop: 25,
                        marginLeft: 387,
                        position: "absolute",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    ></div> */}
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
                <div style={{ fontSize: 15 }}>
                  <div style={childrenSideBySideStyle}>
                    <div
                      style={{
                        borderLeft: "5px solid gray",
                        height: 230,
                        paddingRight: 10,
                        opacity: 0.2,
                      }}
                    />

                    {/* Table Content ------------------------------- */}
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Time Reported:&nbsp;
                              <span style={{ color: "orange" }}>
                                {new Date(row.time_of_validity).toLocaleDateString(
                                  "en-GB"
                                ) +
                                  " " +
                                  new Date(row.time_of_validity).toLocaleTimeString(
                                    "en-GB"
                                  )}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Time Received:&nbsp;
                              <span style={{ color: "orange" }}>
                                {new Date(row.time_of_receipt).toLocaleDateString(
                                  "en-GB"
                                ) +
                                  " " +
                                  new Date(row.time_of_receipt).toLocaleTimeString(
                                    "en-GB"
                                  )}
                              </span>
                            </td>
                          </tr>

                          <hr style={{ opacity: 0.2 }} />

                          <tr>
                            <td style={{ color: "gray" }}>
                              Battery %:&nbsp;
                              <span
                                style={{
                                  color:
                                    row.battery_percentage >= 50
                                      ? "lime"
                                      : row.battery_percentage >= 30
                                      ? "orange"
                                      : "red",
                                }}
                              >
                                {row.battery_percentage}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Network Type:&nbsp;
                              <span style={{ color: "white" }}>{row.network_type}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Transmit Interval:&nbsp;
                              <span style={{ color: "white" }}>
                                {row.transmit_interval}
                              </span>
                            </td>
                          </tr>

                          <hr style={{ opacity: 0.2 }} />

                          <tr>
                            <td style={{ color: "gray" }}>
                              Course:&nbsp;
                              <span style={{ color: "cyan" }}>{row.course}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Speed:&nbsp;
                              <span style={{ color: "cyan" }}>{row.speed + " km/h"}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Latitude:&nbsp;
                              <span style={{ color: "cyan" }}>
                                {Decimal2DMS(row.coordinates[1], "latitude")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Longitude:&nbsp;
                              <span style={{ color: "cyan" }}>
                                {Decimal2DMS(row.coordinates[0], "longitude")}
                              </span>
                            </td>
                          </tr>
                          <br />
                        </tbody>
                      </table>
                      <Button
                        onClick={() => handleZoom(row)}
                        style={{
                          textAlign: "center",
                          width: 180,
                          backgroundColor: "orange",
                        }}
                      >
                        ZOOM TO LOCATION
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </div>
    </div>
  );
}
