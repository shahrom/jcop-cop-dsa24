/*
 * --------------------------------------------------------------------
 * File: MenuMain.js
 * Created: Wednesday, 2nd November 2022 12:37:19 pm
 * Modified: Thursday, 3rd November 2022 1:19:40 pm
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

// css
import "./subMenuCSS.css";

// components
import { getContent, setContent, setSubContent, setPage } from "app/appSlice";
import { getOpsSelected } from "app/copSlice";

export default function MenuMain(props) {
  const [theme, setTheme] = React.useState("subMenu");
  const content = useSelector(getContent);
  const opsSelected = useSelector(getOpsSelected);
  const dispatch = useDispatch();

  // const handleBack = () => {
  //   dispatch(setPage("OVERVIEW"));
  //   dispatch(setContent(""));
  // };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const selectMenu = (id) => {
    dispatch(setSubContent(id));
  };

  const ItemPanelChart = (props) => (
    <div id="menuItem" className={theme} onClick={() => selectMenu(props.id)}>
      <div style={{ padding: 0, marginTop: -10 }}>
        <p style={{ fontSize: 18 }}>{props.label}</p>
      </div>
      <div className="overlay">
        <div style={{ padding: 0 }}>
          <div>{props.icon}</div>
        </div>
      </div>
      <div style={{ padding: 20, marginTop: 0, textAlign: "left" }}>
        <p
          style={{
            fontSize: 13,
          }}
        >
          {props.content}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{
          y: content === "STATUS" ? 1 : -200,
          opacity: content === "STATUS" ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            textAlign: "center",
            color: "gray",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.3) 50%)",
            boxShadow: "0px 0px 30px -20px #000 inset, 0px 0px",
          }}
        >
          <p
            style={{
              margin: 0,
              padding: 0,
              color: "yellow",
              fontSize: 24,
              padding: 20,
            }}
          >
            <div style={childrenSideBySideStyle}>
              <span
                style={{
                  color: "orange",
                  fontSize: 28,
                  marginLeftx: 90,
                  marginTop: 3,
                }}
              >
                MAKLUMAT BERSEPADU OPERASI
              </span>
            </div>
          </p>
        </div>

        <br />

        <div
          style={{
            fontSize: 17,
          }}
        >
          <table>
            <tr>
              <td style={{ color: "gray" }}>NAMA:&nbsp;</td>
              <td style={{ color: "white" }}>&nbsp;OPS LIMA 2023</td>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>DURASI:&nbsp;</td>
              <td style={{ color: "white" }}>&nbsp;22 - 27 MAY 2023</td>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>STATUS:&nbsp;</td>
              <td style={{ color: "lime" }}>&nbsp;{opsSelected.status}</td>
            </tr>
          </table>
        </div>
      </motion.div>

      <hr style={{ opacity: 0.2 }} />

      <motion.div
        // onAnimationStart{animStart}
        // onAnimationComplete={animEnd}
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: content === "STATUS" ? 1 : 100,
          opacity: content === "STATUS" ? 1 : 0,
        }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        // transition={{ duration: 0.5 }}
        // transition={{ ease: "backInOut", duration: 0.5, repeat: Infinity }}
        // transition={{ duration: 0.5, type: "tween" }}
        // transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
      >
        <div
          style={{
            marginTop: 0,
            marginLeft: 0,
          }}
        >
          <div style={childrenSideBySideStyle}>
            <ItemPanelChart
              id={"WEATHER"}
              label={"CUACA"}
              icon={
                <img
                  className={"iso"}
                  src={"img/isometric/dashboard2.png"}
                  style={{ height: 80, width: 80 }}
                />
              }
              content={<div />}
            />
            <ItemPanelChart
              id={"SENSOR"}
              label={"PARAS AIR"}
              icon={
                <img
                  className={"iso"}
                  src={"img/logo/jps-logo.png"}
                  style={{ height: 80, width: 80 }}
                />
              }
              content={<div />}
            />
            <ItemPanelChart
              id={"READINESS"}
              label={"KESIAPSIAGAAN"}
              icon={
                <img
                  className={"iso"}
                  src={"img/isometric/analysis.png"}
                  style={{ height: 80, width: 80 }}
                />
              }
              content={<div />}
            />
          </div>

          <br />

          <div>
            <div style={childrenSideBySideStyle}>
              <ItemPanelChart
                id={"PPS"}
                label={"PPS"}
                icon={
                  <img
                    className={"iso"}
                    src={"img/isometric/emergency.png"}
                    style={{ height: 80, width: 80 }}
                  />
                }
                color={"red"}
                content={<div />}
              />
              <ItemPanelChart
                id={"LAYER"}
                label={"ANALISIS"}
                icon={
                  <img
                    className={"iso"}
                    src={"img/isometric/location.png"}
                    style={{ height: 80, width: 80 }}
                  />
                }
                color={"red"}
                content={<div />}
              />
              <ItemPanelChart
                id={"REPORT"}
                label={"LAPORAN"}
                icon={
                  <img
                    className={"iso"}
                    src={"img/isometric/report.png"}
                    style={{ height: 80, width: 80 }}
                  />
                }
                content={<div />}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
