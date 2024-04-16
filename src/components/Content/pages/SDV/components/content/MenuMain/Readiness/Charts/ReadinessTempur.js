/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: InspectionBarChart.js
 * Created: Wednesday, 24th February 2021 2:01:07 pm
 * Modified: Wednesday, 24th February 2021 2:02:09 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import Grid from "@material-ui/core/Grid";

export default function InspectionBarChart(props) {
  const [data, setData] = React.useState([]);
  const [width, setWidth] = React.useState(0);

  const COLORS = ["#00c0ff", "#1ba716", "#FF8042", "#ff0000", "#7c26cb"];

  React.useEffect(() => {
    var data = [
      {
        name: "HR",
        patrol: 100,
        inspection: 100,
        arrest: 12,
      },
      {
        name: "COMMS",
        patrol: 35,
        inspection: 100,
        arrest: 37,
      },
      {
        name: "MOBILITY ",
        patrol: 41,
        inspection: 100,
        arrest: 23,
      },
      {
        name: "LOGISTIC",
        patrol: 92,
        inspection: 100,
        arrest: 88,
      },
      {
        name: "FIRE POWER",
        patrol: 92,
        inspection: 87,
        arrest: 81,
      },
      {
        name: "TRAINING ",
        patrol: 41,
        inspection: 100,
        arrest: 85,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  React.useEffect(() => {
    var data = [
      {
        name: "HR",
        patrol: 100,
        inspection: 100,
        arrest: 12,
      },
      {
        name: "COM",
        patrol: 35,
        inspection: 100,
        arrest: 37,
      },
      {
        name: "MOB ",
        patrol: 41,
        inspection: 100,
        arrest: 23,
      },
      {
        name: "LGS",
        patrol: 92,
        inspection: 100,
        arrest: 88,
      },
      {
        name: "FPR",
        patrol: 92,
        inspection: 87,
        arrest: 81,
      },
      {
        name: "TRN ",
        patrol: 41,
        inspection: 100,
        arrest: 85,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.updateData]);

  return (
    <Grid container justify={"center"}>
      <BarChart
        width={700}
        height={280}
        data={data}
        margin={{ top: 55, right: 20, left: 0, bottom: 50 }}
      >
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 14,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <YAxis
          tick={{
            fontSize: 14,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <Bar dataKey="patrol" fill={COLORS[0]} />
        <Bar dataKey="inspection" fill={COLORS[1]} />
        <Bar dataKey="arrest" fill={COLORS[3]} />
      </BarChart>
    </Grid>
  );
}
