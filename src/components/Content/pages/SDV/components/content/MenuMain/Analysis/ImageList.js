/*
 * --------------------------------------------------------------------
 * File: ImageList.js
 * Created: Thursday, 25th May 2023 12:05:00 pm
 * Modified: Thursday, 25th May 2023 12:05:25 pm
 *
 * Copyright (C) 2023 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

export default function MenuList() {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div
        style={{
          height: window.innerHeight - 230,
          overflow: "auto",
          marginTop: -20,
          padding: 10,
        }}
      >
        <img
          style={{
            width: "50%",
            height: "auto",
            marginLeft: 150,
            marginTop: 50,
          }}
          src={"img/map/terrain-1.png"}
        />
        <img
          style={{
            width: "50%",
            height: "auto",
            marginLeft: 150,
            marginTop: 50,
          }}
          src={"img/map/terrain-2.png"}
        />
        <img
          style={{
            width: "50%",
            height: "auto",
            marginLeft: 150,
            marginTop: 50,
          }}
          src={"img/map/terrain-3.png"}
        />
        <img
          style={{
            width: "50%",
            height: "auto",
            marginLeft: 150,
            marginTop: 50,
          }}
          src={"img/map/terrain-4.png"}
        />
        <br />
        <br />
      </div>
    </div>
  );
}
