import React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";

// components
import Statistics from "./Statistics";
import PatrolTable from "./PatrolTable";
import MediaList from "./ReportList";

// icons
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";

export default function ReportContent(props) {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSlideIndex(newValue);
  };

  const handleClose = () => {
    props.handleClose();
    // Clear any alerts when the window closes
    var param = {
      Receiver: "HEADER",
      Command: "CLEAR_ALERT",
      Data: "REPORTS",
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Header = () => (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#4CAF50",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        LAPORAN
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="CLOSE">
              <CloseIcon
                onClick={() => handleClose()}
                style={{
                  color: "white",
                  fontSize: 24,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <Tabs
          centered
          onChange={handleChange}
          value={slideIndex}
          style={{
            backgroundColor: "rgba(36,118,159,0.5)",
            height: 50,
            outline: "none",
          }}
          TabIndicatorProps={{
            style: {
              background: "#2396C8",
              borderRadius: 5,
              height: 5,
              top: 38,
            },
          }}
        >
          <Tab
            style={{ minWidth: 120, outline: "none" }}
            label={<p style={{ marginTop: 5, color: "white" }}>STATISTIK</p>}
            value={0}
          />
          <Tab
            style={{ minWidth: 120, outline: "none" }}
            label={<p style={{ marginTop: 5, color: "white" }}>ANGGOTA</p>}
            value={1}
          />

          <Tab
            style={{ minWidth: 120, outline: "none" }}
            label={<p style={{ marginTop: 5, color: "white" }}>SITUASI</p>}
            value={2}
          />
        </Tabs>
        <SwipeableViews
          className="SwipeableViews"
          index={slideIndex}
          onChangeIndex={handleChange}
          style={{ height: props.height - 400 }}
        >
          <div>
            <Statistics height={props.height} />
          </div>
          <div>
            <PatrolTable height={props.height} />
          </div>
          <div>
            <MediaList height={props.height} />
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
}
