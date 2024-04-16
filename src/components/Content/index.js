/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.index.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Wednesday, 16th March 2022 2:34:46 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";

// components
import { COP, Menu, SDV, Weather, OPLST, Login } from "./pages";
import { getPage, getProgress, setProgress } from "app/appSlice";

export function Content() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const progress = useSelector(getProgress);
  const [open, setOpen] = useState(true);

  const handleCloseDialog = () => {
    dispatch(setProgress(false));
    setOpen(false);
  };

  useEffect(() => {
    setOpen(progress);
  }, [progress]);

  return (
    <div>
      <div style={{ display: page === "LOGIN" ? "block" : "none" }}>
        <Login />
      </div>
      <div style={{ display: page === "OVERVIEW" ? "block" : "none" }}>
        <OPLST />
      </div>
      <div style={{ display: page === "STATUS" ? "block" : "none" }}>
        <SDV />
      </div>
      <div style={{ display: page === "MONITORING" ? "block" : "none" }}>
        <COP />
      </div>
      <div style={{ display: page === "WEATHER" ? "block" : "none" }}>
        <Weather />
      </div>

      <Dialog
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={handleCloseDialog}
        open={open}
      >
        <img
          style={{
            width: "50%",
            height: "auto",
            marginLeft: 150,
            marginTop: 50,
          }}
          src={"img/gif/progress3.gif"}
        />
      </Dialog>
    </div>
  );
}
