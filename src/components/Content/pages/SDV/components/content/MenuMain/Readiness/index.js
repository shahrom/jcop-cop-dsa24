/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MainMenu.Map.js
 * Created: Wednesday, 2nd March 2022 11:17:54 pm
 * Modified: Thursday, 3rd March 2022 11:37:39 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ListItemText from "@material-ui/core/ListItemText";

// components
import { getSubContent } from "app/appSlice";
import { getSDVGeoMap, setSDVGeoMap } from "app/sdvSlice";
import RadarChart from "./Charts/RadarChart";
import CircularStatic from "./Charts/CircularStatic";
import BoatReadinessChart from "./Charts/BoatReadinessChart";
import VesselReadiness from "./Charts/VesselReadiness";
import SFS from "./Charts/SFS";
import Content from "./Content";

export default function OpMapMain(props) {
  const dispatch = useDispatch();
  const subContent = useSelector(getSubContent);
  const SDAGeoMap = useSelector(getSDVGeoMap);

  const BorderBox = (props) => (
    <div style={{ textAlign: "center", margin: 3 }}>
      <Card
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          width: props.width,
          height: props.height,
          padding: 10,
          margin: 0,
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.8)" }}>{props.label}</p>
        {props.content}
      </Card>
    </div>
  );

  const MyLabelCounter = (props) => (
    <div style={{ width: 100, marginTop: 20 }}>
      <div style={childrenSideBySideStyle}>
        <div
          style={{
            display: props.leftLine ? "block" : "none",
            borderLeft: "1px solid #C8C8C8",
            height: "70px",
            marginRight: 20,
          }}
        ></div>
        <ListItemText
          primary={
            <span style={{ fontSize: 40, color: props.color }}>
              {props.counter}
            </span>
          }
          secondary={
            <span style={{ fontSize: 14, color: "gray", marginLeft: 5 }}>
              {props.label}
            </span>
          }
        />
      </div>
    </div>
  );

  const AirCraftReadiness = () => (
    <div style={{ marginLeft: 140 }}>
      <p style={{ color: "yellow", textAlign: "center", marginLeft: -100 }}>
        STATUS KESELURUHAN
      </p>
      <br />
      <div style={childrenSideBySideStyle}>
        <div>
          <p style={{ color: "white", textAlign: "center" }}>Keseluruhan</p>
          <div style={childrenSideBySideStyle}>
            <MyLabelCounter label={"Inv"} counter={"185"} color={"white"} />
            <MyLabelCounter
              label={"1st Line"}
              counter={"165"}
              color={"white"}
              leftLine={true}
            />
          </div>
        </div>

        <div style={{ width: 50 }} />

        <CircularStatic value={98} max={300} color={"#1BA716"} label={""} />

        <div style={{ width: 50 }} />

        <div>
          <p style={{ color: "white", textAlign: "center" }}>% Keseluruhan</p>
          <div style={childrenSideBySideStyle}>
            <MyLabelCounter label={"Inv"} counter={"53%"} color={"red"} />
            <MyLabelCounter
              label={"1st Line"}
              counter={"59.4%"}
              color={"red"}
              leftLine={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const RadarReadiness = () => (
    <div>
      <p style={{ color: "yellow", textAlign: "center", marginLeft: -80 }}>
        KESIAGAAN MENGIKUT ZON
      </p>
      <div style={childrenSideBySideStyle}>
        <BorderBox width={500} height={420} content={<RadarChart />} />
        <Grid container spacing={5}>
          <Grid item>
            <BorderBox
              width={300}
              height={200}
              content={
                <CircularStatic
                  value={25}
                  max={100}
                  color={"#1BA716"}
                  label={"% GUNA"}
                />
              }
            />
            <BorderBox
              width={300}
              height={200}
              content={
                <CircularStatic
                  value={86}
                  max={100}
                  color={"orange"}
                  label={"% SIMPANAN"}
                />
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(17,21,30,0.7)",
        height: window.innerHeight - 180,
        width: 1280,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "gray",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          KESIAPSIAGAAN
        </p>
      </div>

      <div style={childrenSideBySideStyle}>
        <Content />
        <div
          style={{
            overflowY: "auto",
            height: window.innerHeight - 320,
            padding: 20,
            width: "100%",
          }}
        >
          <RadarReadiness />
          <BoatReadinessChart />
          <VesselReadiness />
          <SFS />
          <AirCraftReadiness />
        </div>
      </div>
    </div>
  );
}
