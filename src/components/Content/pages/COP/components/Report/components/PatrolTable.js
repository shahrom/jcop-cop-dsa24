/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: PatrolTable.js
 * Created: Tuesday, 9th February 2021 11:29:02 am
 * Modified: Friday, 12th February 2021 4:11:28 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

// icons
import MOBIcon from "@material-ui/icons/DirectionsWalk";
import MPVIcon from "@material-ui/icons/LocalTaxi";
import PBSIcon from "@material-ui/icons/DirectionsBike";

export default class PatrolTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneList: [],
      totalCount: 0,
      carCount: 0,
      bikeCount: 0,
      footCount: 0,
    };
  }

  componentDidMount() {
    var self = this;
    fetch("data/District/Patrol/Patrol.json")
      .then((result) => result.json())
      .then((data) => {
        self.setState({
          zoneList: data,
        });
      })
      .catch(function (err) {
        console.log("GetDistrictPatrolData:" + err);
      });
  }

  populateZone(groups) {
    var name = "";
    var entityId = "";
    var carCount = 0;
    var bikeCount = 0;
    var footCount = 0;
    var totalCount = 0;
    var data = {};
    var list = [];

    for (var key in groups) {
      if (groups.hasOwnProperty(key)) {
        for (var i = 0; i < groups[key].length; i++) {
          name = groups[key][i].ZoneCodeName;
          entityId = groups[key][i].ZoneId;

          if (groups[key][i].PatrolTypeId != 1) {
            if (groups[key][i].VehicleInfo.VehicleTypeId == 3) {
              carCount++;
            }
            if (groups[key][i].VehicleInfo.VehicleTypeId == 2) {
              bikeCount++;
            }
          } else {
            footCount++;
          }
          totalCount = carCount + bikeCount + footCount;
        }

        data = {
          name: name,
          entityId: entityId,
          personnel: totalCount,
          mpv: carCount,
          urb: bikeCount,
          mob: footCount,
        };
        list.push(data);
        name = "";
        entityId = "";
        carCount = 0;
        bikeCount = 0;
        footCount = 0;
        totalCount = 0;
      }
    }

    this.setState({
      zoneList: list,
    });
  }

  handleRowSelection = (index) => {
    // Zoom on map to zone boundary
    var param = {
      Receiver: "MAP_FUNCTIONS",
      Command: "PLOT_ZONE_BOUNDARY",
      Data: index + 1,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  onClickZone(id) {
    var lat = 0;
    var lng = 0;

    switch (id) {
      case 1:
        lat = 3.0332153177477608;
        lng = 101.53057047729493;
        break;
      case 2:
        lat = 3.0248270608166767;
        lng = 101.53388041006488;
        break;
      case 3:
        lng = 101.53931992994706;
        lat = 3.026755558986094;
        break;
      case 4:
        lng = 101.53842138992717;
        lat = 3.0340811422610146;
        break;
      case 5:
        lng = 101.54423373686244;
        lat = 3.0286197706208426;
        break;
    }

    // Zoom to zone location
    var param = {
      Receiver: "ARCGIS",
      Command: "ZOOM_TO_POINT",
      Data: {
        latitude: lat,
        longitude: lng,
        zoom: 18,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  }

  render() {
    const childrenSideBySideStyle = {
      display: "flex",
      flexDirection: "row",
    };

    const MyLabelCounterHeader = (props) => (
      <div
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <ListItemText
          primary={
            <span style={{ fontSize: 38, color: "orange" }}>
              {props.counter}
            </span>
          }
          secondary={
            <span style={{ fontSize: 14, color: "white" }}>{props.label}</span>
          }
        />
      </div>
    );

    const MyLabelCounter = (props) => (
      <ListItemText
        primary={
          <span style={{ fontSize: 32, color: "white" }}>{props.counter}</span>
        }
        secondary={
          <span style={{ fontSize: 14, color: props.color }}>
            {props.label}
          </span>
        }
        style={{ padding: 0, margin: 0, width: 30 }}
      />
    );

    const handleClearMap = () => {
      window.ViewStateManager.clearMap();
    };

    return (
      <div style={{ padding: "20px" }}>
        <div>
          <div style={{ textAlign: "center", color: "white" }}>
            <MyLabelCounterHeader label={"JUMLAH PENYELAMAT"} counter={"11"} />
            <div style={childrenSideBySideStyle}>
              <MyLabelCounter label={"BOMBA"} counter={"7"} color={"red"} />
              <div
                style={{ borderLeft: "1px solid #C8C8C8", height: "50px" }}
              ></div>
              <MyLabelCounter label={"APM"} counter={"2"} color={"#00A2E8"} />
              <div
                style={{ borderLeft: "1px solid #C8C8C8", height: "50px" }}
              ></div>
              <MyLabelCounter label={"ATM"} counter={"2"} color={"lime"} />
            </div>
          </div>
          <br />
          <Table style={{ color: "black" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ width: "150px", padding: "0px", color: "gray" }}
                ></TableCell>
                <TableCell style={{ color: "white" }}>TOTAL</TableCell>
                <TableCell style={{}}>
                  <MOBIcon style={{ color: "white" }} />
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <MOBIcon />
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <MOBIcon />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.zoneList.map((row, index) => (
                <TableRow
                  hover
                  // onClick={() => this.handleRowSelection(index)}
                  key={index}
                >
                  <TableCell
                    style={{ width: "150px", padding: "0px", fontSize: "9px" }}
                  >
                    <Button
                      style={{
                        color: "orange",
                        outline: "none",
                        backgroundColor: "rgba(35,150,200,0.1)",
                      }}
                      onClick={() => this.onClickZone(row.EntityId)}
                    >
                      {row.Name}
                    </Button>
                  </TableCell>
                  {row.Personnel > 0 ? (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "rgba(0,0,0,0)",
                        }}
                      >
                        <span style={{ fontSize: 24 }}>{row.Personnel}</span>
                      </Avatar>
                    </TableCell>
                  ) : (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        0
                      </Avatar>
                    </TableCell>
                  )}
                  {row.MPV > 0 ? (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "red",
                        }}
                      >
                        {row.MPV}
                      </Avatar>
                    </TableCell>
                  ) : (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "#BEBEBE",
                        }}
                      >
                        0
                      </Avatar>
                    </TableCell>
                  )}
                  {row.URB > 0 ? (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "#2193D3",
                        }}
                      >
                        {row.URB}
                      </Avatar>
                    </TableCell>
                  ) : (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "#BEBEBE",
                        }}
                      >
                        0
                      </Avatar>
                    </TableCell>
                  )}
                  {row.MOB > 0 ? (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "#265728",
                        }}
                      >
                        {row.MOB}
                      </Avatar>
                    </TableCell>
                  ) : (
                    <TableCell style={{ widthx: "20px" }}>
                      <Avatar
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: "#BEBEBE",
                        }}
                      >
                        0
                      </Avatar>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

/*


*/
