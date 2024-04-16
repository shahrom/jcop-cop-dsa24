/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Gazetteer.js
 * Created: Monday, 18th April 2022 10:36:46 pm
 * Modified: Monday, 18th April 2022 10:37:25 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { loadModules } from "esri-loader";
import Button from "@material-ui/core/Button";
import ReactDOMServer from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";

// components
// import { buildingTemplate, bridgeTemplate } from "../PopUpTemplates";
import { setMapTool, setMapCommand } from "app/appSlice";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

var gMap = null;
var gView = null;
var gDispatch = null;

// const plotGazetteerOnMap = (data) => {
//   loadModules(["esri/Graphic"]).then(([Graphic]) => {
//     let point = {
//       type: "point",
//       x: data.centroid[0],
//       y: data.centroid[1],
//     };

//     // Symbol
//     var picSymbol = {
//       type: "picture-marker",
//       url: data.icon,
//       width: "48px",
//       height: "48px",
//       xoffset: "0px",
//       yoffset: "0px",
//     };

//     var graphic = new Graphic();
//     graphic.geometry = point;
//     graphic.symbol = picSymbol;

//     var lyr = gMap.findLayerById("GazetteerLayer");
//     lyr.add(graphic);
//   }, []);
// };

const createLabel = (data) => {
  loadModules(["esri/Graphic"]).then(([Graphic]) => {
    let point = {
      type: "point",
      x: data.centroid[0],
      y: data.centroid[1],
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "orange",
      haloColor: "black",
      haloSize: "1px",
      opacity: 0.2,
      text: data.label,
      xoffset: "0px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "center",
      font: {
        size: 18,
        family: "Arial",
      },
    };

    var graphic = new Graphic();
    graphic.geometry = point;
    graphic.symbol = textSymbol;

    var lyr = gMap.findLayerById("GazetteerLayer");
    lyr.add(graphic);
  }, []);
};

const createPolygon = (data) => {
  loadModules(["esri/Graphic", "esri/geometry/geometryEngine"]).then(
    ([Graphic, geometryEngine]) => {
      var point = {
        type: "polygon",
        rings: data.rings,
        spatialReference: gView.spatialReference,
      };

      var symbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.2],
        outline: {
          color: "rgba(255,255,255,0.7)",
          width: 3,
        },
        style: "solid",
      };

      var graphic = new Graphic();
      graphic.geometry = point;
      graphic.symbol = symbol;

      const geodesicArea = geometryEngine.planarArea(
        graphic.geometry,
        "square-kilometers"
      );
      const geodesicLength = geometryEngine.planarLength(graphic.geometry, "kilometers");
      data.info.area = Math.abs(geodesicArea.toFixed(2)) + " km" + "\u00B2";
      data.info.perimeter = geodesicLength.toFixed(2) + " km";

      var content = "";
      // if (data.id === 99) content = ReactDOMServer.renderToString(buildingTemplate(data));
      // if (data.id === 100) content = ReactDOMServer.renderToString(bridgeTemplate(data));

      var popupTemplate = {
        title: data.label,
        content: content,
      };
      graphic.popupTemplate = popupTemplate;

      // Zoom to the extent of the polygon
      var ext = graphic.geometry.extent;
      gView.extent = ext;
      gView.zoom = gView.zoom - 1.2;

      var lyr = gMap.findLayerById("GazetteerLayer");
      lyr.add(graphic);
    },
    []
  );
};

export default function Gazatteer(props) {
  gMap = props.map;
  gView = props.view;
  gDispatch = useDispatch();

  const handleClear = () => {
    var lyr = gMap.findLayerById("GazetteerLayer");
    lyr.graphics.removeAll();
  };

  const handleClose = () => {
    gDispatch(setMapTool(""));
  };

  const handlePlotMarker = (data) => {
    createLabel(data);
    createPolygon(data);
  };

  const mainList = [
    {
      category: "Buildings",
      markers: [
        {
          icon: "img/markers/bft/hq-2.png",
          label: "MITEC",
          centroid: [101.7155727851071, 3.201020048269693],
          rings: [
            [11322936.51714138, 356647.43841807643],
            [11322832.013391757, 356565.6269112287],
            [11322943.085948499, 356407.37837608537],
            [11323053.561340958, 356490.98137578374],
          ],
          info: {
            fullName: "Ministry Of Defence",
            address:
              "15, Jalan Padang Tembak, Kementah, 50634 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
            photo: "https://mabpoc.scs.my:45443/media/chat/picture2.jpg",
            floors: 17,
            gates: 5,
            lift: 8,
            desc: "The main gate is secured with guards guarding at all times. The main entrance is supported with CCTV and a boom gate",
          },
        },
        {
          id: 99,
          icon: "img/markers/bft/hq-3.png",
          label: "Istana Negara",
          centroid: [101.66370422717728, 3.1614648710878295],
          rings: [
            [
              [11317241.06278772, 352237.97734888137],
              [11317155.071130887, 352272.01571304427],
              [11317140.142023798, 352230.2142131951],
              [11317173.583223678, 352215.88227038964],
              [11317160.44560944, 352182.4410705103],
              [11317105.506495351, 352205.73047756916],
              [11317089.98022398, 352166.3176348542],
              [11317045.192902712, 352186.6212204952],
              [11317018.320509952, 352120.93314930366],
              [11317055.941859817, 352107.79553506535],
              [11317051.761709832, 352100.03239937907],
              [11317098.937688233, 352079.1316494545],
              [11317081.619924009, 352040.31597102305],
              [11317091.77171683, 352036.7329853217],
              [11317073.25962404, 351996.7229783232],
              [11317033.24961704, 352015.23507111357],
              [11317020.112002803, 351982.9881998013],
              [11317062.510666935, 351962.6846141603],
              [11317051.761709832, 351937.6037142508],
              [11317080.425595442, 351924.4661000125],
              [11317096.549031097, 351959.10162845894],
              [11317125.21291671, 351947.75550707127],
              [11317134.767545246, 351965.6704355781],
              [11317106.103659635, 351978.21088553284],
              [11317118.64410959, 352005.6804425766],
              [11317168.208745126, 351985.9740212191],
              [11317192.692480752, 352052.2592566943],
              [11317163.431430858, 352064.20254236547],
              [11317171.194566544, 352084.5061280065],
              [11317194.483973602, 352076.14582803665],
              [11317202.247109288, 352096.4494136777],
              [11317181.346359365, 352104.8097136475],
              [11317188.512330767, 352123.32180643786],
              [11317218.370544944, 352110.7813564831],
              [11317235.091144884, 352150.1941991981],
              [11317194.483973602, 352169.303456272],
              [11317207.62158784, 352201.5503275842],
              [11317225.536516348, 352193.19002761436],
            ],
          ],
          info: {
            fullName: "Istana Negara",
            address:
              "Jln Tuanku Abdul Halim, Bukit Damansara, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
            photo: window.location.href + "img/gazetteer/istana.jpg",
            floors: 5,
            gates: 5,
            lift: 4,
            desc: "The main gate is secured with guards guarding at all times. The main entrance is supported with CCTV and a boom gate",
          },
        },
      ],
    },
    {
      category: "Bridges",
      markers: [
        {
          id: 100,
          icon: "img/markers/bft/r-1.png",
          label: "Bridge 1",
          centroid: [103.33415114571953, 3.8078282531287613],
          rings: [
            [
              [11503031.188016575, 424376.74933387723],
              [11503049.849400437, 424382.7209767128],
              [11503096.129632413, 424240.14800401294],
              [11503198.394015972, 423979.63508531],
              [11503177.493266048, 423971.424076411],
              [11503099.861909185, 424169.9812006947],
              [11503035.666748703, 424358.83440537046],
            ],
          ],
          info: {
            fullName: "Bridge 1",
            address: "",
            photo: "",
            width: 22,
            length: 423,
          },
        },
        {
          icon: "img/markers/bft/r-2.png",
          label: "Bridge 2",
          address: "",
        },
        {
          icon: "img/markers/bft/r-3.png",
          label: "Bridge 3",
          address: "",
        },
      ],
    },
    {
      category: "Telecommunications",
      markers: [
        {
          icon: "img/markers/bft/r-1.png",
          label: "Tower 1",
          address: "",
        },
        {
          icon: "img/markers/bft/r-2.png",
          label: "Tower 3",
          address: "",
        },
        {
          icon: "img/markers/bft/r-3.png",
          label: "Tower 3",
          address: "",
        },
      ],
    },
    {
      category: "Power",
      markers: [
        {
          icon: "img/markers/bft/r-1.png",
          label: "Power Building 1",
          address: "",
        },
        {
          icon: "img/markers/bft/r-2.png",
          label: "Power Building 2",
          address: "",
        },
      ],
    },
    {
      category: "Water",
      markers: [
        {
          icon: "img/markers/bft/r-1.png",
          label: "Reservoir 1",
          address: "",
        },
        {
          icon: "img/markers/bft/r-2.png",
          label: "Reservoir 3",
          address: "",
        },
        {
          icon: "img/markers/bft/r-3.png",
          label: "Reservoir 3",
          address: "",
        },
      ],
    },
  ];

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: window.innerWidth - 295,
          width: 250,
          maxHeight: 600,
          backgroundColor: "#242424",
          color: "white",
          padding: "0px 15px 15px 15px",
        }}
      >
        <div>
          <p>Gazetteer</p>
          <CloseIcon
            onClick={() => handleClose()}
            style={{
              color: "gray",
              fontSize: 24,
              float: "right",
              marginTop: -35,
              cursor: "pointer",
            }}
          />
        </div>

        <div style={{ overflow: "auto", maxHeight: 500 }}>
          {mainList.map((row, index) => (
            <Accordion
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                color: "white",
                margin: 0,
                padding: 0,
                fontSize: 14,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      marginTop: 0,
                      color: "white",
                    }}
                  />
                }
              >
                {row.category +
                  (row.markers.length > 0 ? " (" + row.markers.length + ")" : "")}
              </AccordionSummary>
              <AccordionDetails
                style={{
                  margin: 0,
                  padding: 10,
                  margintop: -10,
                  backgroundColor: "rgba(48,48,48,1)",
                }}
              >
                <div>
                  {row.markers.map((marker, index) => (
                    <div style={childrenSideBySideStyle}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePlotMarker(marker)}
                      >
                        <img
                          style={{
                            width: 28,
                            height: 28,
                          }}
                          src={marker.icon != null && marker.icon}
                          alt={""}
                          object-fit="contain"
                        />
                        <p
                          key={index}
                          style={{
                            marginLeft: 30,
                            marginTop: -25,
                            color: "white",
                            fontSize: 14,
                          }}
                        >
                          {marker.label != null && marker.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <br />
        <Button
          onClick={() => handleClear()}
          style={{
            color: "#242424",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#ADADAD",
            fontSize: 12,
            borderRadius: 0,
          }}
        >
          <span>Clear</span>
        </Button>
      </div>
    </Draggable>
  );
}
