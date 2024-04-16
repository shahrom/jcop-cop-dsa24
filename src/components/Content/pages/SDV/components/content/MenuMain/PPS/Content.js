/*
 * --------------------------------------------------------------------
 * File: index.js
 * Created: Friday, 21st October 2022 8:18:08 am
 * Modified: Friday, 21st October 2022 8:19:39 am
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import CircularStatic from "./Charts/CircularStatic";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactsIcon from "@material-ui/icons/Contacts";

// icons
import PhoneIcon from "@material-ui/icons/Phone";
import SmartphoneIcon from "@material-ui/icons/Smartphone";

export default function Content() {
  const MyListItem = (props) => (
    <div style={{ marginTop: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 1 */}
        <div
          style={{
            textAlign: "left",
            width: "30%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "lime",
          }}
        >
          <span style={{ fontSize: "14px", color: "gray" }}>{"LOKASI"}</span>
          <br />
          <span style={{ fontSize: "24px" }}>{props.appointment}</span>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 2 */}
        <div
          style={{
            width: "40%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
            padding: 20,
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div>
                <div style={childrenSideBySideStyle}>
                  <ContactsIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"MANGSA"}
                    </span>
                    <br />
                    <span style={{ fontSize: "32px" }}>{props.victims}</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderLeft: "1px solid gray",
                  margin: "0px 20px 0px 20px",
                }}
              />
              <div>
                <div style={childrenSideBySideStyle}>
                  <PeopleAltIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"KELUARGA"}
                    </span>
                    <br />
                    <span style={{ fontSize: "32px", color: "cyan" }}>
                      {props.family}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 3 */}
        <div
          style={{
            width: "30%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "yellow",
            padding: 30,
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div>
                <div style={childrenSideBySideStyle}>
                  <PhoneIcon style={{ color: "gray" }} />
                  <div style={{ marginLeft: 10 }}>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"PHONE/EXT"}
                    </span>
                    <br />
                    <span style={{ fontSize: "18px" }}>{props.phone1}</span>
                  </div>
                </div>
              </div>
            </div>
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
    <div style={childrenSideBySideStyle}>
      <div
        style={{
          width: "20%",
        }}
      >
        <CircularStatic
          value={37}
          max={300}
          color={"#1BA716"}
          label={"JUMLAH PPS"}
        />
        <br />
        <CircularStatic
          value={3723}
          max={5000}
          color={"orange"}
          label={"JUMLAH MANGSA"}
        />
        <br />
        <CircularStatic
          value={1510}
          max={5000}
          color={"cyan"}
          label={"JUMLAH KELUARGA"}
        />
      </div>

      <div
        style={{
          height: window.innerHeight - 230,
          overflow: "auto",
          marginTop: -20,
          width: "80%",
        }}
      >
        <MyListItem
          appointment={"SEK. RENDAH AGAMA SEK.24"}
          phone1={"03-52528573/23"}
          family={"124"}
          victims={"1256"}
        />
        <MyListItem
          appointment={"SJK(T) LADANG EMERALD"}
          phone1={"03-51287499/23"}
          family={"76"}
          victims={"478"}
        />
        <MyListItem
          appointment={"SMK SEK. 24"}
          phone1={"03-56638377/23"}
          family={"23"}
          victims={"361"}
        />
        <MyListItem
          appointment={"SJK (T) HICOM"}
          phone1={"03-51738833/23"}
          family={"34"}
          victims={"307"}
        />
        <MyListItem
          appointment={"SK HICOM"}
          phone1={"03-59684473/23"}
          family={"25"}
          victims={"488"}
        />
        <MyListItem
          appointment={"SMK ALAM MEGAH"}
          phone1={"03-52847744/23"}
          family={"34"}
          victims={"372"}
        />
        <MyListItem
          appointment={"SEK. RENDAH AGAMA SEK.23"}
          phone1={"03-52528573/23"}
          family={"113"}
          victims={"422"}
        />
        <MyListItem
          appointment={"SJK(T) LADANG EMERALD"}
          phone1={"03-51287499/23"}
          family={"76"}
          victims={"478"}
        />
        <MyListItem
          appointment={"SMK SEK. 24"}
          phone1={"03-56638377/23"}
          family={"23"}
          victims={"361"}
        />
        <MyListItem
          appointment={"SJK (T) HICOM"}
          phone1={"03-51738833/23"}
          family={"34"}
          victims={"307"}
        />
        <MyListItem
          appointment={"SK HICOM"}
          phone1={"03-59684473/23"}
          family={"25"}
          victims={"488"}
        />
        <MyListItem
          appointment={"SMK ALAM MEGAH"}
          phone1={"03-52847744/23"}
          family={"34"}
          victims={"372"}
        />
        <MyListItem
          appointment={"SEK. RENDAH AGAMA SEK.24"}
          phone1={"03-52528573/23"}
          family={"124"}
          victims={"1256"}
        />
        <MyListItem
          appointment={"SJK(T) LADANG EMERALD"}
          phone1={"03-51287499/23"}
          family={"76"}
          victims={"478"}
        />
        <MyListItem
          appointment={"SMK SEK. 24"}
          phone1={"03-56638377/23"}
          family={"23"}
          victims={"361"}
        />
        <MyListItem
          appointment={"SJK (T) HICOM"}
          phone1={"03-51738833/23"}
          family={"34"}
          victims={"307"}
        />
        <MyListItem
          appointment={"SK HICOM"}
          phone1={"03-59684473/23"}
          family={"25"}
          victims={"488"}
        />
        <MyListItem
          appointment={"SMK ALAM MEGAH"}
          phone1={"03-52847744/23"}
          family={"34"}
          victims={"372"}
        />
        <MyListItem
          appointment={"SEK. RENDAH AGAMA SEK.24"}
          phone1={"03-52528573/23"}
          family={"124"}
          victims={"1256"}
        />
        <MyListItem
          appointment={"SJK(T) LADANG EMERALD"}
          phone1={"03-51287499/23"}
          family={"76"}
          victims={"478"}
        />
        <MyListItem
          appointment={"SMK SEK. 24"}
          phone1={"03-56638377/23"}
          family={"23"}
          victims={"361"}
        />
        <MyListItem
          appointment={"SJK (T) HICOM"}
          phone1={"03-51738833/23"}
          family={"34"}
          victims={"307"}
        />
        <MyListItem
          appointment={"SK HICOM"}
          phone1={"03-59684473/23"}
          family={"25"}
          victims={"488"}
        />
        <MyListItem
          appointment={"SMK ALAM MEGAH"}
          phone1={"03-52847744/23"}
          family={"34"}
          victims={"372"}
        />
      </div>
    </div>
  );
}
