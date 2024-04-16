import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";

export function ChartPie1() {
  const [data, setData] = useState([
    { key: "RECEIVED", data: 22 },
    { key: "VERIFIED", data: 26 },
    { key: "PROCESSED", data: 45 },
    { key: "COMPLETED", data: 8 },
  ]);

  useEffect(() => {
    // iInterval();
  }, []);

  const iInterval = () => {
    var myVar = setInterval(myTimer, 3000);

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
    <div style={{ marginLeft: 170 }}>
      <PieChart
        height={200}
        width={350}
        data={data}
        displayAllLabels={false}
        series={
          <PieArcSeries
            cornerRadius={14}
            padAngle={0.02}
            padRadius={10}
            doughnut={true}
            colorScheme={["#942B2C", "#1BA716", "orange", "#0088FE"]}
          />
        }
      />
    </div>
  );
}
