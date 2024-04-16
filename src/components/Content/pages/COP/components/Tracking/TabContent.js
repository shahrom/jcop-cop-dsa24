import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";

// components
import TrackList from "./TrackList";
import AgencyList from "./AgencyList";
import { getAuthToken, setMapTool } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";
import HistoryIcon from "@material-ui/icons/History";

export default function TabContent(props) {
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSlideIndex(newValue);
  };

  const handleLastKnownPosition = () => {
    dispatch(setMapTool("LAST_KNOWN_LOCATION"));
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
          backgroundColor: "#1E49AC",
          padding: 10,
          margin: 10,
          color: "white",
          fontSize: 18,
        }}
      >
        ANGGOTA
      </div>
      <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
        <div style={childrenSideBySideStyle}>
          {/* Refresh List (Disabled) ===================================== */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 50,
              width: 35,
              height: 35,
              cursor: "pointer",
            }}
          >
            <Tooltip title="LAST KNOWN LOCATION">
              <HistoryIcon
                onClick={() => handleLastKnownPosition()}
                style={{
                  color: "white",
                  fontSize: 24,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            </Tooltip>
          </div>

          <div style={{ width: 5 }} />

          {/* Close Drawer ====================================== */}
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
            label={<p style={{ marginTop: 5, color: "white" }}>JEJAK</p>}
            value={1}
          />
          <Tab
            style={{ minWidth: 120, outline: "none" }}
            label={<p style={{ marginTop: 5, color: "white" }}>AGENSI</p>}
            value={0}
          />
        </Tabs>
        <SwipeableViews
          className="SwipeableViews"
          index={slideIndex}
          onChangeIndex={handleChange}
          style={{ height: props.height - 400 }}
        >
          <div>
            <AgencyList height={props.height} />
          </div>
          <div>
            <TrackList height={props.height} />
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
}
