/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: MediaList.MainView.js
 * Created: Wednesday, 18th November 2020 11:10:24 am
 * Modified: Wednesday, 18th November 2020 11:50:21 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
// import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";

// icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideocamIcon from "@material-ui/icons/Videocam";

let instance = null;
export default class MediaList extends React.Component {
  constructor(props) {
    if (!instance) {
      super(props);
      this.state = {
        userId: "",
        listOfReports: [],
        tilesData: [],
        reportData: [],
        progressStatus: "hide",
        displayAudio: "none",
        displayVideo: "none",
        displayImage: "none",
        title: "",
        currentImageURL: "",
        open: false,
      };

      instance = this;
    }

    return instance;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.reportList !== prevProps.reportList) {
      if (this.props.reportList != undefined) {
        this.populateData(this.props.reportList);
      }
    }
  }

  componentDidMount() {
    var self = this;
    fetch("data/District/Zone/Zone5/Report.json")
      .then((result) => result.json())
      .then((data) => {
        this.populateData(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  populateData(data) {
    var sortedList = [];

    // DataAdater ===================================
    for (var i = 0; i < data.length; i++) {
      // data[i].CurrentImage = this.globals.config.photoPath + data[i].ActualName;
      // data[i].ReportColor = "gray";
      // // var time = data[i].CreatedDateTime.replace("T", " @ ");
      // data[i].UpdatedDateTime = data[i].CreatedDateTime.substring(0, 19).replace(
      //   "T",
      //   " @ "
      // );
      // sortedList.unshift(data[i]);
      sortedList.push(data[i]);
    }
    // =============================================

    this.setState({ listOfReports: sortedList });
  }

  handleTouchTap = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleImageLoaded() {
    this.setState({ progressStatus: "hide" });
    this.setState({ imageMarginTop: "-50px" });
  }

  handleImageErrored() {
    this.setState({ progressStatus: "failed to load" });
  }

  handleRefreshList = () => {
    var self = this;
    self.loadMedia();
  };

  loadMedia() {
    this.dataService.GetMediaList(this.props.eventId, function (data) {
      this.populateData(data);
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "", height: window.innerHeight - 200 }}>
        <List>
          {this.state.listOfReports.map((row, index) => (
            <div>
              <ListItem>
                {/* // Left Icon */}
                <ListItemIcon>
                  <Avatar
                    style={{
                      backgroundColor: "#0088FE",
                    }}
                  >
                    <IconButton>
                      <div style={{ marginTop: "8px" }}>
                        {(() => {
                          switch (row.MediaTypeName.toUpperCase()) {
                            case "PHOTO":
                              return (
                                <PhotoCameraIcon
                                  style={{ marginTop: -10, color: "white" }}
                                />
                              );
                              break;
                            case "VIDEO":
                              return <VideocamIcon fontSize="small" />;
                              break;
                            case "AUDIO":
                              return <VolumeUpIcon fontSize="small" />;
                              break;
                          }
                        })()}
                      </div>
                    </IconButton>
                  </Avatar>
                </ListItemIcon>

                {/* // Title */}
                <ListItemText
                  primary={
                    <span style={{ color: "white" }}>
                      {row.ReportTypeName.toUpperCase()}
                    </span>
                  }
                  secondary={
                    <span style={{ color: "white", fontSize: "12px" }}>
                      {row.UpdatedDateTime.substring(0, 16).replace("T", " @ ")}
                    </span>
                  }
                  style={{ color: "gray", fontSize: "16px", opacity: 0.8 }}
                />
              </ListItem>

              <Divider />

              <Collapse in={true} timeout="auto" unmountOnExit>
                <div>
                  <div style={{ padding: "10px" }}>
                    <Card
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: "10px",
                      }}
                    >
                      <CardMedia>
                        <div>
                          <div>
                            {row.ReportFeeds.map((tile) => (
                              <div key={tile.ActualName}>
                                <img
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                  }}
                                  src={tile.ActualName}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <br />
                        <p style={{ fontSize: 18, color: "#0088FE" }}>
                          {row.CreatedByFullName.toUpperCase()}
                        </p>
                        <Divider
                          style={{
                            marginTop: -10,
                            // color: "gray",
                            backgroundColor: "rgba(255,255,255,0.2)",
                          }}
                        />
                        <p style={{ fontSize: 14, color: "gray" }}>
                          {row.Description}
                        </p>
                      </CardMedia>
                    </Card>
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    );
  }
}
