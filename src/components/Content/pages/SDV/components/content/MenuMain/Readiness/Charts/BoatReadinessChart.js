/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: BarChart.js
 * Created: Sunday, 21st February 2021 4:11:29 pm
 * Modified: Monday, 22nd February 2021 11:13:59 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function MyBarChart(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    var data = [
      { name: "ROVER", GREEN: 70.8 },
      { name: "BARRACUDA", GREEN: 77.8 },
      { name: "RHIB", GREEN: 60.0 },
      { name: "VIPER", GREEN: 50.0 },
      { name: "STINGRAY", GREEN: 92.0 },
      // { name: "BOSTON_WHALER", RED: 25.2 },
      // { name: "HAMMERHEAD", GREEN: 89.3 },
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
          y={y + 12}
          x={x + width + 30}
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
      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />

      <p style={{ color: "yellow", textAlign: "center" }}>
        KESIAGAAN BOT (JENIS)
      </p>

      <div style={{ marginLeft: 100 }}>
        <BarChart
          width={600}
          height={320}
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 200, bottom: 0 }}
        >
          <XAxis type="number" />
          <YAxis
            tickLine={{ stroke: "white" }}
            type="category"
            dataKey="name"
            tick={{
              fontSize: 16,
              color: "white",
              fill: "rgba(255,255,255,0.8)",
            }}
          />
          <Bar dataKey="GREEN" stackId="a" fill={"#0088FE"}>
            <LabelList dataKey="GREEN" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="ORANGE" stackId="a" fill={"orange"}>
            <LabelList dataKey="ORANGE" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="RED" stackId="a" fill="orange">
            <LabelList dataKey="RED" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}
