import React from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export default class ScatterPointChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataScatter: [],
      dataLine: [],
    };
  }

  componentDidMount() {
    var self = this;
    fetch("data/District/Statistic/ScatterChart.json")
      .then((result) => result.json())
      .then((data) => {
        var data1 = [];
        for (var k = 0; k < data.length; k++) {
          data1.push({
            type: data[k].IncidentTypeName,
            time: self.getDispatchHour(data[k].DispatchTime),
            day: k,
          });
        }
        self.setState({
          dataScatter: data1,
        });
      })
      .catch(function (err) {
        console.log("GetDistrictPatrolData:" + err);
      });
  }

  getDispatchHour(time) {
    var d = new Date("July 21, 1983 " + time);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var hours = +(m / 60).toFixed(2);
    return h + hours;
  }

  render() {
    const COLORS = ["red", "#B200FF", "#005FAB", "orange", "#007F0E"];

    return (
      <div>
        <ScatterChart
          width={450}
          height={300}
          margin={{ top: 35, right: 5, bottom: 0, left: -20 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey={"time"}
            type="number"
            unit=""
            ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24]}
          />
          <YAxis
            dataKey={"day"}
            type="number"
            unit=""
            domain={[1, "dataMax"]}
          />
          <Scatter data={this.state.dataScatter} fill="#8884d8">
            {this.state.dataScatter.map((entry, index) => {
              switch (entry.type) {
                case "DISP":
                  return <Cell key="DISP" fill="red" />;
                case "CHECK":
                  return <Cell key="CHECK" fill="#B200FF" />;
                case "SNT":
                  return <Cell key="SNT" fill="#005FAB" />;
                case "INSP":
                  return <Cell key="INSP" fill="orange" />;
                case "MNG":
                  return <Cell key="MNG" fill="#007F0E" />;
              }
            })}
          </Scatter>
          <ReferenceLine x="7" stroke="blue" label="S1" />
          <ReferenceLine x="15" stroke="blue" label="S2" />
          <ReferenceLine x="22" stroke="blue" label="S3" />
        </ScatterChart>
      </div>
    );
  }
}

/*

const CustomTooltip  = React.createClass({
      
      propTypes: {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
      },

      render() {
        const { active } = this.props;

        if (active) {
          const { payload, label } = this.props;
          return (
            <div style={{backgroundColor:'white'}}>
              <p>Time: {label}</p>
              <p>Date: {label}</p>
            </div>
          );
        }

        return null;
      }
    });
*/
