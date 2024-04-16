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

import React from "react";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";

export default function ACCBarChart(props) {
  const [data, setData] = React.useState([]);

  const COLORS = ["#00c0ff", "#1ba716", "#FF8042", "#ff0000", "#7c26cb"];

  React.useEffect(() => {
    var data = [
      {
        name: "ZON 1",
        op: 25,
        nop: 45,
      },
      {
        name: "ZON 2",
        op: 23,
        nop: 70,
      },
      {
        name: "ZON 3",
        op: 12,
        nop: 66,
      },
      {
        name: "ZON 4",
        op: 18,
        nop: 56,
      },
      {
        name: "ZON 5",
        op: 21,
        nop: 87,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <text
          y={y - 10}
          x={x + width / 2}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value != undefined ? value + "%" : ""}
        </text>
      </g>
    );
  };

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 80, right: 30, left: 0, bottom: 0 }}
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
        <Bar dataKey="op" fill={"green"}>
          <LabelList dataKey="patrol" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="nop" fill={"orange"}>
          <LabelList dataKey="inspection" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </div>
  );
}
