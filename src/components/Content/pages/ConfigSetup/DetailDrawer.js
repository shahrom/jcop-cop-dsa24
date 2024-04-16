/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ZoneInfoView.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Friday, 26th March 2021 10:34:26 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

// icons
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function DetailDrawer(props) {
  // 1
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    // alert(props.setDrawer);
    if (props.setDrawer != 0) setOpen(true);
    setLabel(props.setDrawer);
  }, [props.setDrawer]);

  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    marginLeft: open ? window.innerWidth - 810 : window.innerWidth,
    config: {
      duration: 300,
    },
  });

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const divStyle = {
    position: "absolute",
    marginTop: -665,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: window.innerHeight,
    backdropFilter: "blur(2px)",
    zIndex: 10,
  };

  const handleClose = () => {
    setOpen(false);
    props.initDrawer();
  };

  return (
    <animated.div style={animLayout}>
      <div style={divStyle}>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.7)", //"rgba(23,34,41,0.5)",
            padding: 10,
            borderRadius: 0,
          }}
        >
          <div style={childrenSideBySideStyle}>
            <p
              style={{
                fontSize: 14,
                color: "orange",
                width: 200,
              }}
            >
              {label}
            </p>

            <IconButton
              onClick={() => handleClose()}
              style={{ marginLeft: 240, marginTop: -5 }}
            >
              <HighlightOffIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
        <img
          src={`img/content/settings/${label}.png`}
          alt={""}
          object-fit="contain"
        />
      </div>
    </animated.div>
  );
}
