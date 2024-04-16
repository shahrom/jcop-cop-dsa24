import React from "react";

// local
import StackBar from "./components/StackBar";
import ReportList from "./components/ReportList";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ reportData: newProps.reportData });
  }

  render() {
    return (
      <div>
        <StackBar />
        <ReportList reportData={this.state.reportData} />
      </div>
    );
  }
}
