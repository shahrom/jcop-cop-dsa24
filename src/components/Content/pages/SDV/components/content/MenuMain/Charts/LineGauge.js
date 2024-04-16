import React, { useState, useEffect } from "react";
import { LinearGauge } from "reaviz";

export function LineGauge() {
  const [data, setData] = useState([]);

  useEffect(() => {
    iInterval();
  }, []);

  const iInterval = () => {
    var myVar = setInterval(myTimer, 2000);

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
      <LinearGauge
        height={5}
        width={190}
        data={{ key: "Risk Score", data: randomInteger(10, 50) }}
      />
      <br />
      <LinearGauge
        height={5}
        width={190}
        data={{ key: "Risk Score", data: randomInteger(10, 50) }}
      />
      <br />
      <LinearGauge
        height={5}
        width={190}
        data={{ key: "Risk Score", data: randomInteger(10, 50) }}
      />
      <br />
      <LinearGauge
        height={5}
        width={190}
        data={{ key: "Risk Score", data: randomInteger(10, 50) }}
      />
      <br />
      <LinearGauge
        height={5}
        width={190}
        data={{ key: "Risk Score", data: randomInteger(10, 50) }}
      />
      <br />
    </div>
  );
}
