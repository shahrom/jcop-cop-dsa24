/*
 * --------------------------------------------------------------------
 * File: index.js
 * Created: Tuesday, 25th October 2022 11:59:33 am
 * Modified: Tuesday, 25th October 2022 12:06:27 pm
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import CircularStatic from "./CircularStatic";

export default function Content(props) {
  const MyListItem = (props) => (
    <div style={{ marginTop: 5 }}>
      <div style={childrenSideBySideStyle}>
        {/* Block 1 */}
        <div
          style={{
            width: "20%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "cyan",
          }}
        >
          <span style={{ fontSize: "14px", color: "gray" }}>{"LOKASI"}</span>
          <br />
          <span style={{ fontSize: "22px" }}>{props.radio}</span>
          <div style={childrenSideBySideStyle}>
            <span style={{ fontSize: "14px", color: "orange" }}>
              {props.cell1}
            </span>
            <div style={{ margin: "0px 10px 0px 10px" }} />
            <span style={{ fontSize: "14px", color: "orange" }}>
              {props.cell2}
            </span>
          </div>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Block 2 */}
        <div
          style={{
            width: "80%",
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "orange",
          }}
        >
          <div>
            <div style={childrenSideBySideStyle}>
              <div style={{ width: 300 }}>
                <span style={{ fontSize: "14px", color: "gray" }}>
                  {"JENIS"}
                </span>
                <br />
                <span
                  style={{
                    fontSize: "18px",
                    color:
                      props.status === "RONDAAN"
                        ? "#2D7FC7"
                        : props.status === "KEJADIAN"
                        ? "#1BA716"
                        : "orange",
                  }}
                >
                  {props.status}
                </span>
              </div>

              <div
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  margin: "0px 10px 0px 50px",
                }}
              />

              <div>
                <span style={{ fontSize: "14px", color: "gray" }}>
                  {"MASA"}
                </span>
                <br />
                <span style={{ fontSize: "18px", color: "white" }}>
                  {props.dateUS}
                </span>
              </div>

              <div
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  margin: "0px 10px 0px 50px",
                }}
              />

              <div styleX={{ width: 300 }}>
                <span style={{ fontSize: "14px", color: "gray" }}>
                  {"TARIKH"}
                </span>
                <br />
                <span style={{ fontSize: "18px" }}>{props.estSvc}</span>
              </div>

              <div
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                  margin: "0px 20px 0px 20px",
                }}
              />

              <div>
                <div style={childrenSideBySideStyle}>
                  <div>
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {"CATATAN"}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "16px",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {props.remarks}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />
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
          value={321}
          max={600}
          color={"#1BA716"}
          label={"KEJADIAN"}
        />
        <br />
        <CircularStatic
          value={112}
          max={300}
          color={"#2D7FC7"}
          label={"RONDAAN"}
        />
        <br />
        <CircularStatic
          value={98}
          max={300}
          color={"orange"}
          label={"MENYELAMAT"}
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
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Jiran 25/57"}
          status={"MENYELAMAT"}
          dateUS={"09:23 AM"}
          estSvc={"12/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"11:04 AM"}
          estSvc={"15/12/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/31"}
          status={"MENYELAMAT"}
          dateUS={"02:45 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Teraju 25/26"}
          status={"MENYELAMAT"}
          dateUS={"03:10 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tenang 25/36"}
          status={"RONDAAN"}
          dateUS={"09:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Aman 25/16"}
          status={"KEJADIAN"}
          dateUS={"10:11 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Makmur 25/32"}
          status={"RONDAAN"}
          dateUS={"04:23 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Nikmat 25/42"}
          status={"RONDAAN"}
          dateUS={"02:45 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Iklas 25/31"}
          status={"RONDAAN"}
          dateUS={"06:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Abadi 25/58"}
          status={"KEJADIAN"}
          dateUS={"04:12 PM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Gigih 25/14"}
          status={"KEJADIAN"}
          dateUS={"06:44 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
        <MyListItem
          radio={"Jalan Tekun 25/51"}
          status={"KEJADIAN"}
          dateUS={"07:21 AM"}
          estSvc={"02/11/2022"}
          remarks={""}
        />
      </div>
    </div>
  );
}
