/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SightingDrawer.js
 * Created: Friday, 7th January 2022 2:51:04 pm
 * Modified: Tuesday, 11th January 2022 7:43:15 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// components
import { ChartBar, ChartLine, ChartPie } from "components/Content/graphics";
import { getDrawer, closeDrawer } from "app/appSlice";

// icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  paper: {
    height: 350,
    backgroundColor: "rgba(0,0,0,0.8)",
    marginLeft: 630,
    width: 1230,
  },
});

export default function SightingDrawer() {
  const dispatch = useDispatch();
  const drawer = useSelector(getDrawer);
  const classes = useStyles();

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    // alert("fetch");
    fetch("data/CountryBorderTrend.json")
      .then((result) => result.json())
      .then((data) => {
        setData1(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // alert("fetch");
    fetch("data/CrossBorderCrime.json")
      .then((result) => result.json())
      .then((data) => {
        setData3(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Drawer
        classes={{ paper: classes.paper }}
        anchor={"bottom"}
        open={drawer === "INCIDENT"}
        variant={"persistent"}
        onClose={closeDrawer}
      >
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)", height: 30, width: "100%" }}
          onClick={() => dispatch(closeDrawer())}
        >
          <p style={{ color: "orange", margin: 8, marginLeft: 40 }}>INCIDENT</p>
          <ArrowDropDownIcon
            onClick={() => dispatch(closeDrawer())}
            style={{
              color: "orange",
              float: "left",
              marginTop: -43,
              fontSize: 48,
              cursor: "pointer",
            }}
          />
        </div>

        <div style={{ padding: 10, overflowX: "scroll", height: "100%" }}>
          <div style={{ ...childrenSideBySideStyle, height: "100%" }}>
            <div style={{ flexGrow: 1, minWidth: 450 }}>
              <p style={{ marginLeft: 10, color: "orange", fontSize: 12 }}>
                BORDER SITUATION
              </p>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <ChartLine
                  data={data1}
                  valueName={"CrossBorderCrimeTypeDayCase"}
                  categoryName={"CrossBorderCrimeTypeDayNo"}
                  colorName="CrossBorderCrimeTypeHexColor"
                  groupName="CrossBorderCrimeTypeName"
                />
              </Grid>
            </div>

            {/* ------------------------------------------------------ */}
            <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }} />

            <div style={{ flexGrow: 1, minWidth: 450 }}>
              <p style={{ marginLeft: 10, color: "orange", fontSize: 12 }}>
                POTENTIAL THREATS
              </p>
              <ChartPie
                data={data3}
                valueName="CrossBorderCrimeTypeDayCase"
                categoryName="CrossBorderCrimeTypeName"
                colorName="CrossBorderCrimeTypeHexColor"
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
