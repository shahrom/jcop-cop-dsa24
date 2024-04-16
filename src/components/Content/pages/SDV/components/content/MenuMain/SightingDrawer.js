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
import { ChartBar, ChartPie } from "components/Content/graphics";
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
  const sightingChart = []; // useSelector(getSightingChart);
  const classes = useStyles();

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Drawer
        classes={{ paper: classes.paper }}
        anchor={"bottom"}
        open={drawer === "SIGHTING"}
        variant={"persistent"}
        onClose={closeDrawer}
      >
        <div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              height: 30,
              width: "100%",
            }}
            onClick={() => dispatch(closeDrawer())}
          >
            <p style={{ color: "orange", margin: 8, marginLeft: 40 }}>SIGHTING</p>
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
                  REPORTS BY ZONE
                </p>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <ChartBar
                    data={sightingChart.border}
                    valueName="CountryBorderDayCase"
                    categoryName="CountryBorderName"
                    colorName="CountryBorderHexColor"
                  />
                </Grid>
              </div>

              {/* ------------------------------------------------------ */}
              <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }} />

              <div style={{ flexGrow: 1, minWidth: 450 }}>
                <p style={{ marginLeft: 10, color: "orange", fontSize: 12 }}>
                  REPORTS BY CATEGORY
                </p>
                <ChartPie
                  data={sightingChart.threats}
                  valueName="CrossBorderCrimeTypeDayCase"
                  categoryName="CrossBorderCrimeTypeName"
                  colorName="CrossBorderCrimeTypeHexColor"
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
