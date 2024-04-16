import React, { useState, useEffect } from "react";
import {
  RadialGauge,
  RadialGaugeSeries,
  RadialGaugeLabel,
  RadialGaugeValueLabel,
  RadialGaugeArc,
} from "reaviz";

export function CircularGauge() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");

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
    var val = Math.floor(Math.random() * (max - min + 1)) + min;
    return val;
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div style={{ height: 140 }}>
        <RadialGauge
          height={200}
          startAngle={-90 * (Math.PI / 180)}
          endAngle={90 * (Math.PI / 180)}
          data={[{ key: "", data: randomInteger(0, 90) }]}
          series={
            <RadialGaugeSeries
              colorScheme={["orange"]}
              label={
                <RadialGaugeLabel style={{ color: "white", fontSize: 45 }} />
              }
              valueLabel={
                <RadialGaugeValueLabel
                  color={"green"}
                  style={{ color: "white", fontSize: 45 }}
                  className={"iw-subTitle"}
                />
              }
              innerArc={<RadialGaugeArc width={10} animated={true} />}
              outerArc={<RadialGaugeArc width={10} color={"rgba(0,0,0,0.5)"} />}
            />
          }
        />
      </div>
      <div style={childrenSideBySideStyle}>
        <div style={{ marginTop: -35 }}>
          <p style={{ color: "white", fontSize: 14, marginLeft: 20 }}>6.43%</p>
          <p
            style={{
              color: "gray",
              fontSize: 12,
              marginLeft: 20,
              marginTop: -15,
            }}
          >
            Min
          </p>
        </div>
        <div style={{ marginTop: -35 }}>
          <p style={{ color: "white", fontSize: 14, marginLeft: 120 }}>9.12%</p>
          <p
            style={{
              color: "gray",
              fontSize: 12,
              marginLeft: 120,
              marginTop: -15,
            }}
          >
            Max
          </p>
        </div>
      </div>
    </div>
  );
}
