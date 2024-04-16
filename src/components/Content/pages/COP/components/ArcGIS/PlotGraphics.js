/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: COP.PlotGraphics.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Friday, 11th March 2022 1:15:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { loadModules } from "esri-loader";
import ReactDOMServer from "react-dom/server";
import {
  reportTemplate,
  trackTemplate,
  radioTemplate,
  cameraTemplate,
  uavTemplate,
  trailTemplate,
} from "./PopUpTemplates";

export default class PlotGraphics {
  constructor(map) {
    this.gMap = map;
  }

  /**
   * Updates the current BFT tracks. The position of the marker is updated
   * including the label of the markers which is separate marker by it self
   * there is only the change in location and not the actual markers for both
   */
  UpdateBFTMarker = (data) => {
    // Gurd Clause
    if (this.gMap === null) return;

    // Create a NEW marker if the id does not exist in the existing list
    var createNewBFT = true;
    var gLayer = this.gMap.findLayerById("BFTMarkerLayer");
    if (gLayer != null) {
      for (var i = 0; i < gLayer.graphics.length; i++) {
        var g = gLayer.graphics.items[i];
        if (g.attributes.id === data.blue_track_id) {
          createNewBFT = false;
        }
      }
      if (createNewBFT) {
        this.PlotBFTMarker(data);

        // Need to update the graphics in the layer because the graphics
        // has been updated when a new marker is created
        gLayer = this.gMap.findLayerById("BFTMarkerLayer");
        return;
      }
    }

    // Update the positions for both marker and label
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    // Update Attributes
    var attributes = {
      id: data.blue_track_id,
      user_label: data.user_label,
      marker: data.marker, // Updated 14July
      coordinates: data.spatial.geometry.coordinates,
      device_status: data.device_status,
      course: data.spatial.course,
      speed: data.spatial.speed,
      time_of_receipt: data.time_of_receipt,
      time_of_validity: data.time_of_validity,
      blue_track_type_id: data.blue_track_type_id,
      organization_name: data.organization_name,
      appointment_name: data.appointment_name,
    };

    // Update PopupTemplate
    var content = ReactDOMServer.renderToString(trackTemplate(data));
    var popupTemplate = {
      title: data.user_label,
      content: content,
    };

    var gLayer = this.gMap.findLayerById("BFTMarkerLayer");
    if (gLayer != null) {
      for (var i = 0; i < gLayer.graphics.length; i++) {
        var g = gLayer.graphics.items[i];
        if (g.attributes.id === data.blue_track_id) {
          var gClone = g.clone();
          gLayer.remove(g);
          gClone.geometry = point;
          gClone.attributes = attributes;
          gClone.popupTemplate = popupTemplate;
          gLayer.add(gClone);
        }
      }
    }

    var updatedAt = new Date(data.time_of_validity).toLocaleTimeString("en-GB");

    // Update Text Symbol
    var textSymbol = {
      type: "text",
      color: "white",
      haloColor: "black",
      haloSize: "1px",
      text: data.user_label + "\n@ " + updatedAt + "\n\n\n\n",
      xoffset: "30px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "left",
      font: {
        size: 10,
        family: "Arial",
      },
    };

    // Update Label
    var gLayer = this.gMap.findLayerById("BFTLabelLayer");
    if (gLayer != null) {
      for (var i = 0; i < gLayer.graphics.length; i++) {
        var g = gLayer.graphics.items[i];
        if (g.attributes.id === data.blue_track_id) {
          var gClone = g.clone();
          gLayer.remove(g);
          gClone.geometry = point;
          gClone.symbol = textSymbol;
          gLayer.add(gClone);
        }
      }
    }
  };

  PlotReportMarkers = (dataList) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById("ReportLayer");
      for (var i = 0; i < dataList.length; i++) {
        var pointGraphic = new Graphic();
        this.CreateReportMarker(pointGraphic, dataList[i]);
        gLayer.add(pointGraphic);
      }
    }, []);
  };

  PlotReportMarker = (data) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById("ReportLayer");
      var pointGraphic = new Graphic();
      this.CreateReportMarker(pointGraphic, data);
      gLayer.add(pointGraphic);
    }, []);
  };

  PlotMarkerTrail = (track_id) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById("TrailLayer");
      gLayer.graphics.removeAll();

      var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/blue_track_history/blue_track_id/${track_id}/limit/300`;

      fetch(url, {
        headers: {
          Authorization: "Bearer " + window.token,
        },
      })
        .then((result) => result.json())
        .then((data) => {
          data.reverse();

          for (var i = 0; i < data.length; i++) {
            var pointGraphic = new Graphic();
            this.CreateMarkerTrails(pointGraphic, data[i]);
            gLayer.add(pointGraphic);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }, []);
  };

  PlotAlertMarker = (data) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById("AlertLayer");
      var pointGraphic = new Graphic();
      this.CreateAlertMarker(pointGraphic, data);
      gLayer.add(pointGraphic);
    }, []);
  };

  PlotTargetMarker = (data) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      // Remove all the existing graphics on the layer
      var gLayer = this.gMap.findLayerById("TargetLayer");
      // gLayer.graphics.removeAll();

      // Label
      var labelGraphic = new Graphic();
      this.CreateTargetLabel(labelGraphic, data);
      gLayer.add(labelGraphic);

      // Marker
      var pointGraphic = new Graphic();
      this.CreateTargetMarker(pointGraphic, data);
      gLayer.add(pointGraphic);
    }, []);
  };

  // Plot Line ===================================
  PlotLine = (paths, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById(layer);
      var objGraphic = new Graphic();
      this.createLine(objGraphic, paths);
      gLayer.add(objGraphic);
    }, []);
  };

  createLine = (objGraphic, paths) => {
    const polyline = {
      type: "polyline",
      paths: paths,
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2,
    };

    objGraphic.geometry = polyline;
    objGraphic.symbol = simpleLineSymbol;
  };

  // Plot Agency Markers ============================
  PlotAgencyMarkers = (dataList) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      for (var i = 0; i < dataList.length; i++) {
        var pointGraphic = new Graphic();
        this.CreateAgencyMarker(pointGraphic, dataList[i]);

        if (dataList[i].organization_name === "uav") {
          var gLayer = this.gMap.findLayerById("UAVLayer");
          gLayer.add(pointGraphic);
          var pointGraphic = new Graphic();
          this.CreateAgencyLabel(pointGraphic, dataList[i]);
          gLayer.add(pointGraphic);
        } else {
          var gLayer = this.gMap.findLayerById("AgencyLayer");
          gLayer.add(pointGraphic);
          var pointGraphic = new Graphic();
          this.CreateAgencyLabel(pointGraphic, dataList[i]);
          gLayer.add(pointGraphic);
        }
      }
    }, []);
  };

  // Plot Circle ====================================
  PlotCircle = (data, layer, label) => {
    loadModules(["esri/Graphic", "esri/geometry/Circle"]).then(([Graphic, Circle]) => {
      if (this.gMap === null) return;
      var gLayer = this.gMap.findLayerById(layer);
      // gLayer.graphics.removeAll();

      // Marker
      var pointGraphic = new Graphic();
      this.createCircle(pointGraphic, Circle, data);
      gLayer.add(pointGraphic);

      // Label
      var pointGraphic = new Graphic();
      this.createCircleLabel(pointGraphic, data, label);
      gLayer.add(pointGraphic);
    }, []);
  };

  createCircle = (objGraphic, Circle, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data[1],
      longitude: data[0],
    };

    var circleGeometry = new Circle({
      center: point,
      geodesic: true,
      numberOfPoints: 360,
      radius: 0.1,
      radiusUnit: "kilometers",
    });

    var picSymbol = {
      type: "simple-fill",
      color: "rgba(255,1,0,0.3)",
      style: "solid",
      outline: {
        width: 1,
        color: "white",
      },
      cap: "round",
      join: "round",
    };

    objGraphic.geometry = circleGeometry;
    objGraphic.symbol = picSymbol;
  };

  createCircleLabel = (objGraphic, data, label) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data[1],
      longitude: data[0],
    };

    // Text
    var textSymbol = {
      type: "text",
      color: "rgba(255, 234, 0,0.5)",
      haloColor: "orange",
      haloSize: "1px",
      text: label,
      xoffset: "0px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "center",
      font: {
        size: 40,
        family: "Arial",
        weight: "bold",
      },
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
  };

  // =================================================

  CreateTargetMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.latitude,
      longitude: data.longitude,
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url: "img/markers/bft/target-4.png",
      width: "48px",
      height: "48px",
      haloSize: "1px",
      haloColor: "black",
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
  };

  CreateTargetLabel = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.latitude,
      longitude: data.longitude,
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "yellow",
      haloColor: "black",
      haloSize: "1px",
      text: data.label,
      xoffset: "0px",
      yoffset: "-50px",
      zoffset: "0px",
      horizontalAlignment: "center",
      font: {
        size: 10,
        family: "Arial",
        weight: "bold",
      },
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
  };

  PlotBFTMarker = (marker) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      // Guard Clause
      if (this.gMap === null) return;

      // Create marker
      var gLayer = this.gMap.findLayerById("BFTMarkerLayer");
      var pointGraphic = new Graphic();
      this.CreateBFTMarker(pointGraphic, marker);
      gLayer.add(pointGraphic);

      // Create label
      var gLayer = this.gMap.findLayerById("BFTLabelLayer");
      var pointGraphic = new Graphic();
      this.CreateBFTLabel(pointGraphic, marker);
      gLayer.add(pointGraphic);
    }, []);
  };

  PlotBFTMarkers = (markers) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      // Guard Clause
      if (this.gMap === null) return;

      var gLayer = this.gMap.findLayerById("BFTMarkerLayer");
      gLayer.graphics.removeAll();

      for (var i = 0; i < markers.length; i++) {
        var pointGraphic = new Graphic();

        this.CreateBFTMarker(pointGraphic, markers[i]);
        gLayer.add(pointGraphic);
      }

      var gLayer = this.gMap.findLayerById("BFTLabelLayer");
      gLayer.graphics.removeAll();

      for (var i = 0; i < markers.length; i++) {
        var pointGraphic = new Graphic();

        this.CreateBFTLabel(pointGraphic, markers[i]);
        gLayer.add(pointGraphic);
      }
    }, []);
  };

  PlotStationMarkers = (markers) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      var gLayer = this.gMap.findLayerById("StationLayer");
      gLayer.graphics.removeAll();

      for (var i = 0; i < markers.length; i++) {
        var pointGraphic = new Graphic();

        this.CreateStationMarker(pointGraphic, markers[i]);
        gLayer.add(pointGraphic);
      }

      var gLayer = this.gMap.findLayerById("LabelLayer");
      gLayer.graphics.removeAll();

      for (var i = 0; i < markers.length; i++) {
        var pointGraphic = new Graphic();

        this.CreateMarkerLabel(
          pointGraphic,
          markers[i].coordinates,
          markers[i].title,
          markers[i].description
        );
        gLayer.add(pointGraphic);
      }
    }, []);
  };

  PlotReportMarkers = (markers) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      var gLayer = this.gMap.findLayerById("ReportLayer");
      gLayer.graphics.removeAll();

      for (var i = 0; i < markers.length; i++) {
        var pointGraphic = new Graphic();

        this.CreateReportMarker(pointGraphic, markers[i]);
        gLayer.add(pointGraphic);
      }
    }, []);
  };

  CreateMarkerLabel = (objGraphic, coordinates, label1, label2) => {
    // Geometry
    var point = {
      type: "point",
      latitude: coordinates[1],
      longitude: coordinates[0],
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "white",
      haloColor: "rgba(0,0,0,0.5)",
      haloSize: "2px",
      text: label1 + "\n" + label2 + "\n\n\n\n",
      xoffset: "30px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "left",
      font: {
        size: 10,
        family: "Arial",
        weight: "bold",
      },
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
  };

  CreateStationMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.coordinates[1],
      longitude: data.coordinates[0],
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url: data.symbol_img,
      width: "64px",
      height: "64px",
    };

    // var attributes = {
    //   icon: data.icon,
    // };

    // var popupTemplate = {
    //   title: data.title,
    //   content: ReactDOMServer.renderToString(cameraTemplate(data)),
    // };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    // objGraphic.attributes = attributes;
    // objGraphic.popupTemplate = popupTemplate;
  };

  CreateReportMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.geometry.coordinates[1],
      longitude: data.geometry.coordinates[0],
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url: "img/markers/bft/" + data.report_type + ".png",
      width: "38px",
      height: "38px",
    };

    var attributes = {
      id: data.blue_track_id,
      description: data.description,
      icon: "img/markers/bft/" + data.report_type + ".png",
      width: "38px",
      height: "38px",
    };

    var content = ReactDOMServer.renderToString(reportTemplate(data));

    var popupTemplate = {
      title: data.report_name + "\n" + "(" + data.user_label + ")",
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  CreateAlertMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.geometry.coordinates[1],
      longitude: data.geometry.coordinates[0],
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url: "img/gif/red_pulse64.gif",
      width: "64px",
      height: "64px",
    };

    var attributes = {
      id: data.distress_call_id,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.attributes = attributes;
  };

  CreateMarkerTrails = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    // Symbol
    var picSymbol = {
      type: "picture-marker",
      url:
        data.is_offline === false ? "img/markers/bft/r-4.png" : "img/markers/bft/r-6.png",
      width: "10px",
      height: "10px",
    };

    var content = ReactDOMServer.renderToString(trailTemplate(data));

    var popupTemplate = {
      // title: data.is_offline ? "Offline Trail" : "Online Trail",
      title: "Trail",
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.popupTemplate = popupTemplate;
  };

  CreateAgencyMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    // Symbol
    switch (data.organization_name) {
      case "sensor":
        var markerUrl = `img/markers/agency/sensor.gif`;
        var picSymbol = {
          type: "picture-marker",
          url: markerUrl,
          width: "32px",
          height: "32px",
        };
        break;
      case "heli":
        var markerUrl = `img/markers/agency/${data.organization_name}.png`;
        var picSymbol = {
          type: "picture-marker",
          url: markerUrl,
          width: "80px",
          height: "80px",
        };
        break;
      default:
        var markerUrl = `img/markers/agency/${data.organization_name}.png`;
        var picSymbol = {
          type: "picture-marker",
          url: markerUrl,
          width: "48px",
          height: "48px",
        };
        break;
    }

    // if (data.organization_name === "heli") {
    //   var markerUrl = `img/markers/agency/${data.organization_name}.png`;
    //   var picSymbol = {
    //     type: "picture-marker",
    //     url: markerUrl,
    //     width: "80px",
    //     height: "80px",
    //   };
    // } else {
    //   var markerUrl = `img/markers/agency/${data.organization_name}.png`;
    //   var picSymbol = {
    //     type: "picture-marker",
    //     url: markerUrl,
    //     width: "48px",
    //     height: "48px",
    //   };
    // }

    // Attributes
    var attributes = {
      id: data.blue_track_id,
      user_label: data.user_label,
      marker: data.marker, // Updated 14July
      coordinates: data.spatial.geometry.coordinates,
      device_status: data.device_status,
      course: data.spatial.course,
      speed: data.spatial.speed,
      time_of_receipt: data.time_of_receipt,
      time_of_validity: data.time_of_validity,
      blue_track_type_id: data.blue_track_type_id,
      organization_name: data.organization_name,
      appointment_name: data.appointment_name,
    };

    var content = {};
    if (data.blue_track_type_id === 1) {
      content = ReactDOMServer.renderToString(trackTemplate(data));
    }
    if (data.blue_track_type_id === 4) {
      content = ReactDOMServer.renderToString(uavTemplate(data));
    }

    var popupTemplate = {
      title: data.user_label,
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  CreateAgencyLabel = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "white",
      haloColor: "black",
      haloSize: "1px",
      text: data.user_label + "\n" + data.organization_name.toUpperCase() + "\n\n\n\n",
      xoffset: "30px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "left",
      font: {
        size: 10,
        family: "Arial",
      },
    };

    // Attributes
    var attributes = {
      id: data.blue_track_id,
      user_label: data.user_label,
      marker: data.marker, // Updated 14July
      coordinates: data.spatial.geometry.coordinates,
      device_status: data.device_status,
      course: data.spatial.course,
      speed: data.spatial.speed,
      time_of_receipt: data.time_of_receipt,
      time_of_validity: data.time_of_validity,
      blue_track_type_id: data.blue_track_type_id,
      organization_name: data.organization_name,
      appointment_name: data.appointment_name,
    };

    var content = {};
    if (data.blue_track_type_id === 1) {
      content = ReactDOMServer.renderToString(trackTemplate(data));
    }
    if (data.blue_track_type_id === 4) {
      content = ReactDOMServer.renderToString(uavTemplate(data));
    }

    var popupTemplate = {
      title: data.user_label,
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  CreateBFTMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    var picSymbol = {};

    // var markerUrl = `https://mabpoc.scs.my:${window.appConfig.mediaPort}/${data.marker}`;
    var markerUrl = `img/markers/agency/scs.png`;

    picSymbol = {
      type: "picture-marker",
      url: markerUrl,
      width: "48px",
      height: "48px",
    };

    // Attributes
    var attributes = {
      id: data.blue_track_id,
      user_label: data.user_label,
      marker: data.marker, // Updated 14July
      coordinates: data.spatial.geometry.coordinates,
      device_status: data.device_status,
      course: data.spatial.course,
      speed: data.spatial.speed,
      time_of_receipt: data.time_of_receipt,
      time_of_validity: data.time_of_validity,
      blue_track_type_id: data.blue_track_type_id,
      organization_name: data.organization_name,
      appointment_name: data.appointment_name,
    };

    var content =
      data.blue_track_type_id === 3
        ? ReactDOMServer.renderToString(radioTemplate(data))
        : ReactDOMServer.renderToString(trackTemplate(data));

    var popupTemplate = {
      title: data.user_label,
      content: content,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
    objGraphic.attributes = attributes;
    objGraphic.popupTemplate = popupTemplate;
  };

  CreateBFTLabel = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.spatial.geometry.coordinates[1],
      longitude: data.spatial.geometry.coordinates[0],
    };

    var updatedAt = new Date(data.time_of_validity).toLocaleTimeString("en-GB");

    // Symbol
    var textSymbol = {
      type: "text",
      color: "white",
      haloColor: "black",
      haloSize: "1px",
      text: data.user_label + "\n@" + updatedAt + "\n\n\n\n",
      xoffset: "30px",
      yoffset: "0px",
      zoffset: "0px",
      horizontalAlignment: "left",
      font: {
        size: 10,
        family: "Arial",
        // weight: "bold",
      },
    };

    // Attributes
    var attributes = {
      id: data.blue_track_id,
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
    objGraphic.attributes = attributes;
  };

  PlotFixedSites = (sites, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      // Remove all the existing graphics on the layer
      var gLayer = this.gMap.findLayerById(layer);
      gLayer.graphics.removeAll();

      // Add the new graphics to the layer
      if (sites != undefined) {
        for (var i = 0; i < sites.length; i++) {
          // Label
          var objGraphic = new Graphic();
          this.CreateSiteLabel(objGraphic, sites[i]);
          gLayer.add(objGraphic);

          // Marker
          var objGraphic = new Graphic();
          this.CreateSiteMarker(objGraphic, sites[i]);
          gLayer.add(objGraphic);
        }
      }
    }, []);
  };

  CreateSiteMarker = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.coordinates[1],
      longitude: data.coordinates[0],
    };

    // Symbol
    var markerUrl = `https://mabpoc.scs.my:${window.appConfig.mediaPort}/${data.marker}`;
    var picSymbol = {
      type: "picture-marker",
      url: markerUrl,
      width: "28px",
      height: "28px",
    };

    objGraphic.geometry = point;
    objGraphic.symbol = picSymbol;
  };

  CreateSiteLabel = (objGraphic, data) => {
    // Geometry
    var point = {
      type: "point",
      latitude: data.coordinates[1],
      longitude: data.coordinates[0],
    };

    // Symbol
    var textSymbol = {
      type: "text",
      color: "yellow",
      haloColor: "black",
      haloSize: "1px",
      text: data.name,
      xoffset: "0px",
      yoffset: "20px",
      zoffset: "0px",
      horizontalAlignment: "center",
      font: {
        size: 14,
        family: "Arial",
        weight: "bold",
      },
    };

    objGraphic.geometry = point;
    objGraphic.symbol = textSymbol;
  };

  PlotArea = (paths, layer) => {
    loadModules(["esri/Graphic"]).then(([Graphic]) => {
      if (this.gMap === null) return;

      // Remove all the existing graphics on the layer
      var gLayer = this.gMap.findLayerById(layer);
      gLayer.graphics.removeAll();

      // Add the new graphics to the layer
      var objGraphic = new Graphic();
      this.CreateArea(objGraphic, paths);
      gLayer.add(objGraphic);
    }, []);
  };

  CreateArea = (objGraphic, paths) => {
    const polygon = {
      type: "polygon",
      rings: paths,
    };

    // const simpleFillSymbol = {
    //   type: "simple-fill",
    //   style: "none",
    //   outline: {
    //     color: "rgba(255,255,0,0.8)",
    //     width: 1,
    //   },
    // };
    var simpleFillSymbol = {
      type: "simple-fill",
      color: "rgba(255,1,0,0.3)",
      style: "solid",
      outline: {
        width: 1,
        color: "white",
      },
      cap: "round",
      join: "round",
    };

    objGraphic.geometry = polygon;
    objGraphic.symbol = simpleFillSymbol;
  };
}
