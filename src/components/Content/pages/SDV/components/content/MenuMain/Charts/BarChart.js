import React, { useState, useEffect } from "react";
import {
  BarChart,
  BarSeries,
  GridlineSeries,
  AreaSparklineChart,
  SparklineChart,
  BarSparklineChart,
} from "reaviz";

export function BarChart1() {
  const [data, setData] = useState([
    { key: "A", data: 21 },
    { key: "B", data: 34 },
    { key: "C", data: 17 },
    { key: "D", data: 30 },
    { key: "E", data: 21 },
    { key: "F", data: 27 },
  ]);

  useEffect(() => {
    iInterval();
  }, []);

  const iInterval = () => {
    var myVar = setInterval(myTimer, 5000);

    function myTimer() {
      setData([
        { key: "A", data: randomInteger(10, 50) },
        { key: "B", data: 34 },
        { key: "C", data: randomInteger(20, 50) },
        { key: "D", data: 30 },
        { key: "E", data: randomInteger(10, 50) },
        { key: "F", data: 27 },
      ]);
    }
  };

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <BarChart
        gridlines={<GridlineSeries line={null} />}
        padding={1.2}
        height={150}
        width={190}
        data={data}
        series={<BarSeries padding={0.5} />}
      />
    </div>
  );
}
