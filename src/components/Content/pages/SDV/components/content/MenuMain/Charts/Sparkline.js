import React, { useState, useEffect } from "react";
import {
  AreaSparklineChart,
  SparklineChart,
  BarSparklineChart,
  BarSeries,
  LineChart,
  LineSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
} from "reaviz";

export function Sparkline() {
  const [data, setData] = useState([{ key: 0, data: 0 }]);
  const [dataLine, setDataLine] = useState([{ key: 0, data: 0 }]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(() => {
    iInterval();
  }, []);

  const iInterval = () => {
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
      var incData = data;
      incData.push({ key: incData.length, data: randomInteger(5, 100) });

      if (data.length < 15) {
        var sliced = incData.slice(0, incData.length);
      } else {
        var sliced = incData.slice(incData.length - 15, incData.length);
      }

      var slicedLine = [];
      var index = 0;
      sliced.forEach((element) => {
        slicedLine.push({ key: index, data: element.data });
        index++;
      });

      setData(sliced);
      setDataLine(slicedLine);
    }
  };

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginLeft: -20 }}>
        {/* <AreaSparklineChart height={85} data={data} /> */}
      </div>

      <br />
      {/* <div style={{ marginLeft: -20 }}>
        <SparklineChart height={85} width={225} data={dataLine} />
      </div> */}

      <LineChart
        width={200}
        height={100}
        data={dataLine}
        series={
          <LineSeries
            colorScheme={(_data, _index, active) => {
              return _data[_data.length - 1].value > 40 ? "#418AD7" : "#e0122a";
            }}
          />
        }
      />

      <br />

      {/* <BarSparklineChart
        height={85}
        data={data}
        series={
          <BarSeries
            padding={0.1}
            animated={false}
            colorScheme={(_data, _index) => {
              // console.log(_data.value);
              return _data.value > 40 ? "#418AD7" : "#e0122a";
            }}
          />
        }
      /> */}
    </div>
  );
}
