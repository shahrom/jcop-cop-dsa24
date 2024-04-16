/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: CreateGraphicLayers.js
 * Created: Tuesday, 5th April 2022 11:43:56 am
 * Modified: Tuesday, 5th April 2022 11:43:56 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export const CreateGraphicLayers = (map, GraphicsLayer) => {
  var gLayer = new GraphicsLayer({ id: "CompassLayer" });
  gLayer.id = "CompassLayer";
  gLayer.title = "Compass";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawPolylineLayer" });
  gLayer.id = "DrawPolylineLayer";
  gLayer.title = "Lines";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DeclutterLayer" });
  gLayer.id = "DeclutterLayer";
  gLayer.title = "Declutter";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawPolygonLayer" });
  gLayer.id = "DrawPolygonLayer";
  gLayer.title = "Areas";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawGeofencingLayer" });
  gLayer.id = "DrawGeofencingLayer";
  gLayer.title = "Geofencing";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawCircleLayer" });
  gLayer.id = "DrawCircleLayer";
  gLayer.title = "Circles";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawEllipseLayer" });
  gLayer.id = "DrawEllipseLayer";
  gLayer.title = "Ellipse";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawRectangleLayer" });
  gLayer.id = "DrawRectangleLayer";
  gLayer.title = "Rectangles";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawArcLayer" });
  gLayer.id = "DrawArcLayer";
  gLayer.title = "Arcs";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "BFTMarkerLayer" });
  gLayer.id = "BFTMarkerLayer";
  gLayer.title = "BFTMarkers";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "BFTLabelLayer" });
  gLayer.id = "BFTLabelLayer";
  gLayer.title = "BFTLabels";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "LabelLayer" });
  gLayer.id = "LabelLayer";
  gLayer.title = "Labels";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "AORLayer" });
  gLayer.id = "AORLayer";
  gLayer.title = "AOR";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "StationLayer" });
  gLayer.id = "StationLayer";
  gLayer.title = "Stations";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "ReportLayer" });
  gLayer.id = "ReportLayer";
  gLayer.title = "Reports";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "AlertLayer" });
  gLayer.id = "AlertLayer";
  gLayer.title = "Alerts";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "TrailLayer" });
  gLayer.id = "TrailLayer";
  gLayer.title = "Trail";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "TargetLayer" });
  gLayer.id = "TargetLayer";
  gLayer.title = "Targets";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DistanceBearingLayer" });
  gLayer.id = "DistanceBearingLayer";
  gLayer.title = "DistanceBearing";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "NextPositionLayer" });
  gLayer.id = "NextPositionLayer";
  gLayer.title = "NextPosition";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DeadReckoningLayer" });
  gLayer.id = "DeadReckoningLayer";
  gLayer.title = "DeadReckoning";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "GazetteerLayer" });
  gLayer.id = "GazetteerLayer";
  gLayer.title = "Gazetteer";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DrawPointLayer" });
  gLayer.id = "DrawPointLayer";
  gLayer.title = "Points";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "SIMLayer" });
  gLayer.id = "SIMLayer";
  gLayer.title = "SIM";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "DisasterLayer" });
  gLayer.id = "DisasterLayer";
  gLayer.title = "Disaster";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  var gLayer = new GraphicsLayer({ id: "AgencyLayer" });
  gLayer.id = "AgencyLayer";
  gLayer.title = "Disaster";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  map.add(gLayer);

  const currentElevationInfo = {
    mode: "relative-to-ground",
    // mode: "absolute-height",
    offset: 0,
    featureExpressionInfo: {
      expression: "100",
    },
    unit: "meters",
  };

  var gLayer = new GraphicsLayer({ id: "UAVLayer" });
  gLayer.id = "UAVLayer";
  gLayer.title = "UAV";
  gLayer.listMode = "hide";
  gLayer.visible = true;
  gLayer.elevationInfo = currentElevationInfo;
  map.add(gLayer);
};
