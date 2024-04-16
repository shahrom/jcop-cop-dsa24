/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Report.Content.js
 * Created: Saturday, 3rd October 2020 7:50:47 am
 * Modified: Sunday, 4th October 2020 2:33:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect, useMemo } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// components
import { CircularCounter } from "components/Content/graphics";
import { getCOPReportList } from "app/copSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export function Content(props) {
  const list = useSelector(getCOPReportList);
  const [filteredList, setFilteredList] = useState([]);
  const [open, setOpen] = useState(false);
  const [fullImage, setFullImage] = useState("");
  const [value, setValue] = React.useState("filter1");
  const [filter, setFilter] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCurrentFilter(value);
    }, 100);
  }, [list]);

  const plotMarkers = (data) => {
    if (window.MessageDispatcher === undefined) return;
    var param = {
      Receiver: "ARCGIS",
      Command: "PLOT_REPORT",
      Data: data,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const setCurrentFilter = (filter) => {
    switch (filter) {
      case "filter1":
        // Filter today's report
        var today = new Date();
        var fullDate1 =
          today.getDate() +
          "." +
          today.getMonth() +
          1 +
          "." +
          today.getFullYear() +
          ".";

        var resultProductData = list.data.filter((a) => {
          var date = new Date(a.report_date);
          var fullDate2 =
            date.getDate() +
            "." +
            date.getMonth() +
            1 +
            "." +
            date.getFullYear() +
            ".";

          return fullDate1 === fullDate2;
        });
        setFilteredList(resultProductData);
        plotMarkers(resultProductData);

        break;

      case "filter2":
        // Filter report from the last 3 days
        var today = new Date();
        var delayDate = new Date().setDate(today.getDate() - 3);
        var startDate = new Date(delayDate);

        var resultProductData = list.data.filter((a) => {
          var date = new Date(a.report_date);
          return date >= startDate;
        });
        setFilteredList(resultProductData);
        plotMarkers(resultProductData);
        break;

      case "filter3":
        // Filter report from the last 7 days
        var today = new Date();
        var delayDate = new Date().setDate(today.getDate() - 7);
        var startDate = new Date(delayDate);

        var resultProductData = list.data.filter((a) => {
          var date = new Date(a.report_date);
          return date >= startDate;
        });
        setFilteredList(resultProductData);
        plotMarkers(resultProductData);
        break;

      default:
        var resultProductData = list.data;
        setFilteredList(resultProductData);
        plotMarkers(resultProductData);
        break;
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setCurrentFilter(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = (imageUrl) => {
    if (checkImage(imageUrl)) {
      setOpen(true);
      setFullImage(imageUrl);
    }
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleClose = () => {
    props.handleClose();
    // Clear any alerts when the window closes
    var param = {
      Receiver: "HEADER",
      Command: "CLEAR_ALERT",
      Data: "REPORTS",
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const handleZoom = (data) => {
    var param = {};
    if (data.geometry != undefined) {
      param = {
        Receiver: "ARCGIS",
        Command: "ZOOM_TO_POINT",
        Data: {
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0],
          zoom: 21,
        },
      };
    } else {
      param = {
        Receiver: "ARCGIS",
        Command: "ZOOM_TO_POINT",
        Data: {
          latitude: data.latitude,
          longitude: data.longitude,
          zoom: 21,
        },
      };
    }
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#4CAF50",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        LAPORAN
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="FILTER LIST">
              <FilterListIcon
                onClick={() => handleFilter()}
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

  const ListFilter = () => (
    <div>
      <div
        style={{
          display: filter ? "block" : "none",
          textAlign: "left",
          color: "white",
          padding: 10,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="filter1"
              control={<Radio />}
              label="Today"
            />
            <FormControlLabel
              value="filter2"
              control={<Radio />}
              label="Last 3 Days"
            />
            <FormControlLabel
              value="filter3"
              control={<Radio />}
              label="Last 1 Week"
            />
            <FormControlLabel
              value="filter4"
              control={<Radio />}
              label="All Reports"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );

  const checkImage = (imageUrl) => {
    var image = new Image();
    var url_image = imageUrl;
    image.src = url_image;
    if (image.width == 0) {
      return false;
    } else {
      return true;
    }
  };

  const ContentList = () => {
    // Set Date & Time
    // var isoDate = new Date();
    // var d = new Date(isoDate);
    // d.toLocaleDateString("en-GB"); // dd/mm/yyyy
    // data.dateTime = d.toString();

    return (
      <div style={{ overflow: "auto", height: window.innerHeight - 330 }}>
        {filteredList.map((row, index) => (
          <>
            <Accordion
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
                    }}
                  />
                }
              >
                <div>
                  <div style={childrenSideBySideStyle}>
                    <IconButton style={{ marginLeft: -20 }}>
                      <img
                        style={{
                          width: 35,
                          height: 35,
                          opacity: 0.7,
                        }}
                        src={`img/markers/bft/${row.report_type}.png`}
                      />
                    </IconButton>
                    <div style={{ marginTop: 15 }}>
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                        }}
                      >
                        {row.report_name}
                      </span>
                      <br />
                      <span
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          marginTop: 25,
                        }}
                      >
                        {row.user_label}
                      </span>
                    </div>

                    {/* Arrow ---------------------------------- */}
                    <div
                      style={{
                        textAlign: "center",
                        width: 30,
                        height: 20,
                        borderRadius: 30,
                        marginTop: 17,
                        marginLeft: 387,
                        position: "absolute",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    ></div>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
                <div style={{ fontSize: 15 }}>
                  <div style={childrenSideBySideStyle}>
                    <div
                      style={{
                        borderLeft: "5px solid gray",
                        height: 90,
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
                              <span
                                name={row.Id + "_course"}
                                style={{ color: "cyan" }}
                              >
                                {new Date(
                                  row.time_of_validity
                                ).toLocaleDateString("en-GB") +
                                  " " +
                                  new Date(
                                    row.time_of_validity
                                  ).toLocaleTimeString("en-GB")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Time Received:&nbsp;
                              <span
                                name={row.Id + "_course"}
                                style={{ color: "cyan" }}
                              >
                                {new Date(
                                  row.time_of_receipt
                                ).toLocaleDateString("en-GB") +
                                  " " +
                                  new Date(
                                    row.time_of_receipt
                                  ).toLocaleTimeString("en-GB")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "gray" }}>
                              Report Type:&nbsp;
                              <span
                                name={row.Id + "_updatedAt"}
                                style={{ color: "cyan" }}
                              >
                                {row.report_type}
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td style={{ color: "gray" }}>
                              Location:&nbsp;
                              <span style={{ color: "cyan" }}>
                                {row.location}
                              </span>
                            </td>
                          </tr>

                          <hr style={{ opacity: 0.1 }} />

                          <div
                            style={{
                              display: checkImage(row.attachment)
                                ? "block"
                                : "none",
                            }}
                          >
                            <img
                              onClick={() => handleOpenDialog(row.attachment)}
                              style={{
                                width: "40%",
                                height: "auto",
                                cursor: "pointer",
                              }}
                              src={row.attachment}
                            />
                          </div>

                          <div
                            style={{
                              display: checkImage(row.attachment)
                                ? "none"
                                : "block",
                            }}
                          >
                            <p style={{ color: "gray" }}>
                              [ NO IMAGE PROVIDED ]{" "}
                            </p>
                          </div>

                          <div
                            style={{
                              display:
                                row.attachment ===
                                "https://mabpoc.scs.my:" +
                                  window.appConfig.restPort +
                                  "/media/chat/"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <p style={{ color: "gray" }}>
                              [ - NO IMAGE PROVIDED - ]
                            </p>
                            <hr style={{ opacity: 0.1 }} />
                          </div>

                          <tr>
                            <td style={{ color: "gray" }}>
                              Description:&nbsp;
                              <p
                                style={{
                                  color: "orange",
                                  marginTop: 5,
                                }}
                              >
                                {row.description}
                              </p>
                            </td>
                          </tr>
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
    );
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Header />
      <ListFilter />
      <ContentChart
        value={filteredList.length}
        max={
          value === "filter1"
            ? 50
            : value === "filter2"
            ? 150
            : value === "filter3"
            ? 350
            : 500
        }
        color={"green"}
        label={"TOTAL REPORTS"}
      />
      <ContentList />
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <>
          <img
            style={{
              width: "100%",
              height: "auto",
            }}
            src={fullImage}
          />
        </>
      </Dialog>
    </div>
  );
}
