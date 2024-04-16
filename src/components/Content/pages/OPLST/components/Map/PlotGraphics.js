/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: OPLST.PlotGraphics.js
 * Created: Wednesday, 9th March 2022 10:21:32 am
 * Modified: Tuesday, 15th March 2022 1:28:57 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { loadModules } from "esri-loader";
import ReactDOMServer from "react-dom/server";
import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";
import Button from "@material-ui/core/Button";

// icons
import InfoIcon from "@material-ui/icons/Info";

export default class PlotGraphics {
  constructor(map) {
    this.gMap = map;
  }

  aorTemplate = (data) => (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Location:</td>
          <td style={{ color: "cyan" }}>&nbsp;{data.location}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Duration:</td>
          <td style={{ color: "cyan" }}>&nbsp;{data.duration}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Status:</td>
          <td style={{ color: "lime" }}>&nbsp;{data.status}</td>
        </tr>
      </table>
      <br />
      <span style={{ color: "gray" }}>Mission:</span>
      <br />
      <span style={{ color: "orange" }}>{data.mission}</span>

      {/* <br />
      <br />
      <p
        onClick={(e) => {}}
        title={"ViewCOP:" + data.id}
        style={{
          backgroundColor: "#027DE9",
          color: "white",
          width: 100,
          height: 25,
          cursor: "pointer",
          borderRadius: 5,
          padding: 5,
          textAlign: "center",
        }}
      >
        VIEW AOR
      </p> */}
    </div>
  );

  // Plot Label ===================================

  PlotLabel = (title, center, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById(layer);
      var objGraphic = new Graphic();
      this.CreateLabel(objGraphic, title, center);
      gLayer.add(objGraphic);
    }, []);
  };

  CreateLabel = (objGraphic, title, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.centerY,
      longitude: data.centerX,
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "cyan",
      haloColor: "black",
      haloSize: "1px",
      text: title,
      // xoffset: "0px",
      // yoffset: "5px",
      // zoffset: "0px",
      font: {
        size: 12,
        family: "Arial",
        // weight: "bold",
      },
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
  };

  // Plot Point ===================================

  PlotPoint = (markers, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      var gLayer = this.gMap.findLayerById(layer);
      for (var i = 0; i < markers.length; i++) {
        var objGraphic = new Graphic();
        this.CreatePoint(objGraphic, markers[i]);
        gLayer.add(objGraphic);
      }
    }, []);
  };

  CreatePoint = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.Lat,
      longitude: data.Lng,
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url: "img/markers/reports/" + data.ReportItem2 + ".png",
      width: "48px",
      height: "48px",
    };

    // Attributes
    var attributes = {
      id: data.ReportId,
      description: data.ReportType,
    };

    var content = ReactDOMServer.renderToString(this.infoTemplate(data));

    var popupTemplate = {
      title: "REPORT INFORMATION",
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  // Plot Line ===================================

  PlotLine = (paths, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById(layer);
      var objGraphic = new Graphic();
      this.CreateLine(objGraphic, paths);
      gLayer.add(objGraphic);
    }, []);
  };

  CreateLine = (objGraphic, paths) => {
    const polyline = {
      type: "polyline",
      paths: paths,
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2,
    };

    const popupTemplate = {
      title: "{Name}",
      content: "{Description}",
    };

    const attributes = {
      Name: "Graphic",
      Description: "I am a polyline",
    };

    objGraphic.geometry = polyline;
    objGraphic.symbol = simpleLineSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  // Plot Area ===================================

  PlotArea = (data, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById(layer);
      var objGraphic = new Graphic();
      this.CreateArea(objGraphic, data);
      gLayer.add(objGraphic);
    }, []);
  };

  CreateArea = (objGraphic, data) => {
    const polygon = {
      type: "polygon",
      rings: data.aor,
    };

    const simpleFillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.1], // Orange, opacity 80%
      outline: {
        color: "cyan",
        width: 3,
      },
    };

    var content = ReactDOMServer.renderToString(this.aorTemplate(data));
    const popupTemplate = {
      title: data.title,
      content: content,
    };

    objGraphic.geometry = polygon;
    objGraphic.symbol = simpleFillSymbol;
    objGraphic.popupTemplate = popupTemplate;
  };
}
