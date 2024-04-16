import React from "react";

// components
import TimeScatterChart from "./components/TimeScatterChart";
import ReportList from "./components/ReportList";

export default function TimeLine() {
  return (
    <div>
      <TimeScatterChart />
      <ReportList />
      <br />
    </div>
  );
}
