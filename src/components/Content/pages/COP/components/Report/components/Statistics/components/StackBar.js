import React from "react";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#1ba716",
  "#ffa500",
  "#ff0000",
  "#7c26cb",
  "gray",
  "brown",
  "olive",
];

export default class StackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countStopNTalk: 0,
      countMeetNGreet: 0,
      countRespond: 0,
      countInspection: 0,
      countConferencePoint: 0,
      totalReports: 0,
      data: [],
    };
  }

  componentDidMount() {
    var self = this;
    fetch("data/District/Report/Report.json")
      .then((result) => result.json())
      .then((data) => {
        self.setState({
          data: data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const MyLabelCounterHeader = (props) => (
      <div
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <ListItemText
          primary={<span style={{ fontSize: 38, color: "orange" }}>{props.counter}</span>}
          secondary={<span style={{ fontSize: 14, color: "white" }}>{props.label}</span>}
        />
      </div>
    );

    const renderCustomizedLabel = (props) => {
      const { x, y, width, height, value } = props;
      const radius = 10;

      return (
        <g>
          <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
          <text
            x={x + width / 2}
            y={y - radius}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {value.split(" ")[1]}
          </text>
        </g>
      );
    };

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <MyLabelCounterHeader label={"JUMLAH LAPORAN"} counter={"62"} />
        </div>
        <BarChart
          style={{ fontSize: "12px" }}
          width={370}
          height={250}
          data={this.state.data}
          layout="vertical"
          margin={{ top: 10, right: 0, left: 25, bottom: 0 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="Name" />
          <Tooltip />
          <Bar dataKey="Compound" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="Notice" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="Operation" stackId="a" fill={COLORS[2]} />
          <Bar dataKey="Traffic" stackId="a" fill={COLORS[4]} />
          <Bar dataKey="Dispatch" stackId="a" fill={COLORS[3]} />
        </BarChart>
      </div>
    );
  }
}
