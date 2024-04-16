/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: COP.ArcGIS.js
 * Created: Tuesday, 8th March 2022 9:10:15 am
 * Modified: Saturday, 19th March 2022 6:46:58 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState, memo } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useDispatch, useSelector } from "react-redux";

// components
import PlotGraphics from "./PlotGraphics";
// import { LoadDGIMLayers } from "./DGIMServices";
import { CreateGraphicLayers } from "./GraphicLayers";
import { EarthquakeLayer, SightingsLayer, EEZLayer } from "./GeoJSONLayer";

// Mini Map
import MiniMap from "./Tools/MiniMap";
import ImportLayers from "./Tools/ImportLayers";

// Filter Tools
import Declutter, { UnDeclutter } from "./Tools/Declutter";
import LayerControl from "./Tools/LayerControl";

// Search Tools
import FindSymbol from "./Tools/FindSymbol";
// import Gazetteer from "./Tools/Gazetteer";
import Compass, { DrawCompass, ResetCompass } from "./Tools/Compass";
import Geofencing, { DrawGeofencingOnMap, DrawGeofencingRoute } from "./Tools/Geofencing";

// Create Tools
import DrawPoint, { DrawPointStartPoint } from "./Tools/DrawPoint";
import DrawPolyline, { DrawPolylineOnMap } from "./Tools/DrawPolyline";
import DrawPolygon, { DrawPolygonOnMap } from "./Tools/DrawPolygon";
import DrawRectangle, { DrawRectangleOnMap } from "./Tools/DrawRectangle";
import DrawArc, { DrawArcOnMap } from "./Tools/DrawArc";
import DrawCircle, { DrawCircleOnMap } from "./Tools/DrawCircle";

// Calculate Tools
import DistanceBearing, { DrawDistanceBearing } from "./Tools/DistanceBearing";
import NextPosition, {
  NextPositionStartPoint,
  DrawNextPosition,
} from "./Tools/NextPosition";
import DeadReckoning, {
  DeadReckoningStartPoint,
  DrawDeadReckoning,
} from "./Tools/DeadReckoning";

import {
  ShowWidget,
  SearchWidget,
  LayerListWidget,
  BasemapGalleryWidget,
  CoordinateConversionWidget,
  CompassWidget,
  ScaleBarWidget,
  HomeWidget,
  TimeSliderWidget,
  MeasureLineWidget,
  MeasureAreaWidget,
  PrintWidget,
} from "./Widgets";

import {
  setDrawer,
  setSelectedUnit,
  getMapTool,
  setMapTool,
  setMapCommand,
  getMapCommand,
  getAuthToken,
} from "app/appSlice";

import {
  getCOPTransparency,
  getViewMode,
  getOpsSelected,
  setCOPTrackingList,
} from "app/copSlice";

var map = null;
var jsonLayer = null;
var layerView = null;

function ArcGIS(props) {
  const dispatch = useDispatch();

  const [miniMap, setMiniMap] = useState(false);
  const [multiMap, setMultiMap] = useState(false);
  const [selectedTool, setSelectedTool] = useState(false);
  const [viewConfig, setViewConfig] = useState({
    mapView: null,
    sceneView: null,
    activeView: null,
    container: "viewDiv",
  });

  const mapTransValue = useSelector(getCOPTransparency);
  const viewMode = useSelector(getViewMode);
  const opsSelected = useSelector(getOpsSelected);
  const mapTool = useSelector(getMapTool);
  const mapCommand = useSelector(getMapCommand);
  const token = useSelector(getAuthToken);

  const plotDisasterScenario = () => {
    var plotGraphics = new PlotGraphics(map);

    // Plot Scenario Markers
    fetch("data/COP/Track.json")
      .then((result) => result.json())
      .then((data) => {
        var plotGraphics = new PlotGraphics(map);
        plotGraphics.PlotAgencyMarkers(data);
      })
      .catch(function (err) {
        console.log(err);
      });

    // AOR
    var aor = [
      [99.77636673882337, 6.33027737704044],
      [99.77709629967538, 6.33002145488485],
      [99.7778687758716, 6.33073590326786],
      [99.77841594651059, 6.33143968856777],
      [99.77933862706648, 6.33219678916475],
      [99.78014328977086, 6.3330605222929],
      [99.78023984864056, 6.33377496712169],
      [99.78018620446026, 6.33447874730259],
      [99.77969267800157, 6.33479864721551],
      [99.77940299942797, 6.33491594412598],
      [99.77913477852651, 6.33475599423066],
      [99.77869489690295, 6.3347346675742],
      [99.7783193876409, 6.33429747092269],
      [99.77748253777348, 6.33381762051303],
      [99.77711775734748, 6.33312450246714],
      [99.77680662110178, 6.33265531368781],
      [99.77640965416762, 6.33159963949061],
    ];
    plotGraphics.PlotArea(aor, "AORLayer");

    // Plot Circle
    var data = [101.76963067006983, 3.2082330420616549];
    plotGraphics.PlotCircle(data, "DisasterLayer", "ZON 3");
    var data = [101.76947806566768, 3.2054768687347117];
    plotGraphics.PlotCircle(data, "DisasterLayer", "ZON 4");
    var data = [101.77102199733773, 3.209580759120196];
    plotGraphics.PlotCircle(data, "DisasterLayer", "ZON 2");
    var data = [101.77687356687547, 3.213317511595442];
    plotGraphics.PlotCircle(data, "DisasterLayer", "ZON 1");
    // var data = [101.77133478450816, 3.1847937889025326];
    // plotGraphics.PlotCircle(data, "DisasterLayer", "ZON 5");

    // Plot Line
    var paths = [
      [101.77233905669803, 3.2067456478986403],
      [101.76963067006983, 3.2082330420616549],
    ];
    plotGraphics.PlotLine(paths, "DisasterLayer");
    var paths = [
      [101.77233905669803, 3.2067456478986403],
      [101.76947806566768, 3.2054768687347117],
    ];
    plotGraphics.PlotLine(paths, "DisasterLayer");
    var paths = [
      [101.77233905669803, 3.2067456478986403],
      [101.77102199733773, 3.209580759120196],
    ];
    plotGraphics.PlotLine(paths, "DisasterLayer");
    var paths = [
      [101.77233905669803, 3.2067456478986403],
      [101.77687356687547, 3.213317511595442],
    ];
    plotGraphics.PlotLine(paths, "DisasterLayer");
    // var paths = [
    //   [101.77233905669803, 3.2067456478986403],
    //   [101.77133478450816, 3.1847937889025326],
    // ];
    // plotGraphics.PlotLine(paths, "DisasterLayer");
  };

  const plotOpMarkers = () => {
    // Plot Disaster Scenario
    plotDisasterScenario();
  };

  /**
   * Update the BFT tracks
   */
  useEffect(() => {
    setTimeout(() => {
      window.MessageDispatcher.SubscribeDispatcher("ARCGIS", (param) => {
        switch (param.Command) {
          case "UPDATE_TRACK":
            // Updates the tracking list with the status of the current graphics on the BFTMarkerLayer
            // The graphics is not sorted
            if (map !== null) {
              var gLayer = map.findLayerById("BFTMarkerLayer");
              if (gLayer != null) {
                // Plot the marker on the map
                var plotGraphics = new PlotGraphics(map);
                plotGraphics.UpdateBFTMarker(param.Data);

                setTimeout(() => {
                  var trackList = [];
                  for (var i = 0; i < gLayer.graphics.length; i++) {
                    var g = gLayer.graphics.items[i];
                    var obj = {
                      blue_track_id: g.attributes.id,
                      blue_track_type_id: g.attributes.blue_track_type_id,
                      user_label: g.attributes.user_label,
                      time_of_receipt: g.attributes.time_of_receipt,
                      time_of_validity: g.attributes.time_of_validity,
                      battery_percentage: g.attributes.device_status.battery_percentage,
                      network_type: g.attributes.device_status.network_type,
                      transmit_interval: g.attributes.device_status.transmit_interval,

                      marker: g.attributes.marker,
                      isImageExist: true,

                      course:
                        g.attributes.course != undefined
                          ? g.attributes.course.toFixed(1)
                          : "",
                      speed:
                        g.attributes.speed != undefined
                          ? g.attributes.speed.toFixed(1)
                          : "",
                      coordinates: g.attributes.coordinates,
                      organization_name: g.attributes.organization_name,
                      appointment_name: g.attributes.appointment_name,
                    };
                    trackList.push(obj);
                  }

                  dispatch(setCOPTrackingList({ data: trackList }));
                }, 500);
              }
            }
            break;

          case "PLOT_REPORT":
            var plotGraphics = new PlotGraphics(map);
            plotGraphics.PlotReportMarkers(param.Data);
            break;

          case "PLOT_TRAIL":
            var plotGraphics = new PlotGraphics(map);
            plotGraphics.PlotMarkerTrail(param.Data);
            break;

          case "CLEAR_TRAIL":
            var gLayer = map.findLayerById("TrailLayer");
            gLayer.graphics.removeAll();

            viewConfig.activeView.popup.close();
            break;

          case "DISPLAY_EEZ":
            map.layers.map(function (lyr) {
              if (lyr.title === "EEZ") {
                lyr.visible = !lyr.visible;
              }
            });
            break;

          case "UPDATE_ALERTS":
            var plotGraphics = new PlotGraphics(map);
            plotGraphics.PlotAlertMarker(param.Data);
            break;

          case "ZOOM_TO_POINT":
            viewConfig.activeView.center = [param.Data.longitude, param.Data.latitude];
            viewConfig.activeView.zoom = param.Data.zoom;
            break;

          case "CLEAR_ALERT":
            var gLayer = map.findLayerById("AlertLayer");
            if (gLayer != null) {
              for (var i = 0; i < gLayer.graphics.length; i++) {
                var g = gLayer.graphics.items[i];
                if (g.attributes.id === param.Data) {
                  gLayer.graphics.remove(g);
                }
              }
            }
            break;

          case "PLOT_TARGET_MARKER":
            var plotGraphics = new PlotGraphics(map);
            plotGraphics.PlotTargetMarker(param.Data);
            break;

          case "CLEAR_TARGET_MARKER":
            // Remove all the existing graphics on the layer
            var gLayer = map.findLayerById("TargetLayer");
            gLayer.graphics.removeAll();
            break;
        }
      });
    }, 1000);
  }, []);

  /**
   * Display the map tool when selected
   */
  useEffect(() => {
    setSelectedTool(mapTool);
    // alert(mapTool);

    switch (mapTool) {
      case "MINI_MAP":
        setMiniMap(!miniMap);
        setMultiMap(false);
        break;
      case "MULTI_MAP":
        setMiniMap(false);
        setMultiMap(!multiMap);
        break;
      case "CALCULATE_NEXT_POSITION":
        DrawNextPosition();
        dispatch(setMapTool("NEXT_POSITION"));
        break;
      case "LAST_KNOWN_LOCATION":
        var param = {
          Receiver: "LAST_POSITION",
          Command: "DISPLAY_LIST",
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);
        break;
      case "COMPASS":
        ResetCompass();
        break;
      case "CLEAR_DRAW":
        viewConfig.activeView.graphics.removeAll();
        ResetCompass();
        break;
      case "":
      default:
        ResetCompass();
        setMiniMap(false);
        setMultiMap(false);
        if (map != null) {
          UnDeclutter(map);
        }
        if (viewConfig.mapView != null) {
          viewConfig.mapView.graphics.removeAll();
        }
        if (window.MessageDispatcher != undefined) {
          var param = {
            Receiver: "LAST_POSITION",
            Command: "CLOSE_LIST",
          };
          window.MessageDispatcher.TriggerMessageDispatcher(param);
        }
        break;
    }

    // Display widgets
    ShowWidget(mapTool);
  }, [mapTool]);

  useEffect(() => {
    switch (mapCommand) {
      case "DRAW_POLYLINE_ON_MAP":
        DrawPolylineOnMap();
        break;
      case "DRAW_POLYGON_ON_MAP":
        DrawPolygonOnMap();
        break;
      case "DRAW_GEOFENCING_ON_MAP":
        DrawGeofencingOnMap();
        break;
      case "DRAW_GEOFENCING_SIM_ROUTE":
        DrawGeofencingRoute();
        break;
      case "DRAW_CIRCLE_ON_MAP":
        DrawCircleOnMap();
        break;
      case "DRAW_RECTANGLE_ON_MAP":
        DrawRectangleOnMap();
        break;
      case "DRAW_ARC_ON_MAP":
        DrawArcOnMap();
        break;
      case "DRAW_POINT_START_POSITION":
        DrawPointStartPoint();
        break;
      case "DISTANCE_BEARING_START_POSITION":
        DrawDistanceBearing();
        break;
      case "COMPASS_START_POSITION":
        DrawCompass();
        break;
      case "NEXT_POSITION_START_POSITION":
        NextPositionStartPoint();
        break;
      case "DEAD_RECKONING_START_POSITION":
        DeadReckoningStartPoint();
        break;
      case "CALCULATE_DEAD_RECKONING":
        DrawDeadReckoning();
        break;
      case "CLEAR_DRAW":
        viewConfig.activeView.graphics.removeAll();
        ResetCompass();
        break;
    }

    dispatch(setMapCommand(""));
  }, [mapCommand]);

  /**
   * This is when the COP gets loaded with all the operation markers on the map and the
   * map is also focused on the AOR
   */
  useEffect(() => {
    // Guard Clause
    if (viewConfig.activeView === null) return;

    // Zoom and center map according to the center and scale. Need to get
    // the animation out of the way. That is why the timeout is implemented
    setTimeout(() => {
      // Map default center
      // viewConfig.activeView.center = [101.53507131086732, 3.029488931414104];
      // viewConfig.activeView.zoom = 15;
      viewConfig.activeView.center = [
        opsSelected.geometry.coordinates[0],
        opsSelected.geometry.coordinates[1],
      ];
      viewConfig.activeView.zoom = opsSelected.zoom_level;

      loadModules(["esri/widgets/Home"]).then(([Home]) => {
        HomeWidget(viewConfig, Home, viewConfig.activeView);
      }, []);
    }, 1000);

    var lyr = map.findLayerById("BFTMarkerLayer");
    lyr.graphics.removeAll();
    var lyr = map.findLayerById("BFTLabelLayer");
    lyr.graphics.removeAll();

    // Hide EEZ layerby default
    if (opsSelected.operation_type !== "Domestic") {
      map.layers.map(function (lyr) {
        if (lyr.title === "EEZ") {
          lyr.visible = false;
        }
      });
    }

    // Plot all the markers on the map
    plotOpMarkers();
  }, [opsSelected]);

  /**
   * Update the map transparency based on the mapTransValue (0.1 - 1)
   */
  useEffect(() => {
    if (map != null) {
      /**
       * This function maybe usefull in the future in order to control not only
       * the opacity but also the visibility of the layer in the basemap
      // view.when(function () {
      //   console.log(map.allLayers.length);
      //   console.log(map.basemap.baseLayers.getItemAt(0));
      //   map.basemap.baseLayers.getItemAt(0).opacity = mapTransValue;
      // });
      */

      map.basemap.baseLayers.getItemAt(0).opacity = mapTransValue;
    }
  }, [mapTransValue]);

  /**
   * Update the map view according to the viewMode (2D/3D)
   */
  useEffect(() => {
    // Guard clause
    if (viewConfig.activeView === null) return;

    // Clone the viewpoint and remove the reference to the container for the previous view
    var viewPoint = viewConfig.activeView.viewpoint.clone();
    viewConfig.activeView.container = null;

    if (viewMode === "2D") {
      viewConfig.mapView.viewpoint = viewPoint; // Set the viewpoint for 2D
      viewConfig.mapView.container = viewConfig.container; // Set the container for 3D
      viewConfig.activeView = viewConfig.mapView;
    } else {
      viewConfig.sceneView.viewpoint = viewPoint; // Set the viewpoint for 2D
      viewConfig.sceneView.container = viewConfig.container; // Set the container for 3D
      viewConfig.activeView = viewConfig.sceneView;
    }
  }, [viewMode]);

  /**
   * Initialize the map
   */
  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/TileLayer",
      "esri/layers/FeatureLayer",
      "esri/layers/ImageryLayer",
      "esri/layers/GraphicsLayer",
      "esri/widgets/Expand",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Search",
      "esri/widgets/LayerList",
      "esri/widgets/Print",
      "esri/core/watchUtils",
      "esri/widgets/CoordinateConversion",
      "esri/widgets/Measurement",
      "esri/widgets/Compass",
      "esri/widgets/ScaleBar",
      "esri/widgets/Home",
      "esri/widgets/TimeSlider",
      "esri/layers/GeoJSONLayer",
      "esri/Graphic",
      "esri/config",
    ]).then(
      ([
        Map,
        MapView,
        SceneView,
        TileLayer,
        FeatureLayer,
        ImageryLayer,
        GraphicsLayer,
        Expand,
        BasemapGallery,
        Search,
        LayerList,
        Print,
        WatchUtils,
        CoordinateConversion,
        Measurement,
        Compass,
        ScaleBar,
        Home,
        TimeSlider,
        GeoJSONLayer,
        Graphic,
        EsriConfig,
      ]) => {
        EsriConfig.apiKey =
          "AAPKce445306ce804087aa910b2ffa1fe796Zy4bI4yITB-wvCXYL4Dcr-SKJFbQWir6NYl0WWLwFpBM2AhY3hR-ZCjJz1Sy9y1c";

        if (map === null) {
          // Initialize the map
          map = new Map({
            basemap: "arcgis-imagery",
            ground: "world-elevation", // Added the elevation map
          });

          // Initialize the view to Malaysia
          var initialViewParams = {
            map: map,
            container: viewConfig.container,
          };

          // create 2D view and and set active
          viewConfig.mapView = new MapView(initialViewParams);
          viewConfig.activeView = viewConfig.mapView;

          // create 3D view, won't initialize until container is set
          initialViewParams.container = null;
          viewConfig.sceneView = new SceneView(initialViewParams);
        }

        viewConfig.activeView.on("click", function (event) {
          console.log("screen point", event.x, event.y);
          console.log("lat", event.mapPoint.latitude);
          console.log("lng", event.mapPoint.longitude);
          console.log("map point", event.mapPoint);
          console.log("zoom", viewConfig.activeView.zoom);
          console.log("centerX", viewConfig.activeView.center.longitude);
          console.log("centerY", viewConfig.activeView.center.latitude);
        });

        // Create all the graphic layers
        CreateGraphicLayers(map, GraphicsLayer);

        // Widgets ---------------------------------------------------------------------------
        BasemapGalleryWidget(viewConfig, BasemapGallery, Expand);
        CompassWidget(viewConfig, Compass);
        HomeWidget(viewConfig, Home);
        CoordinateConversionWidget(viewConfig, CoordinateConversion);
        ScaleBarWidget(viewConfig, ScaleBar);
        MeasureLineWidget(viewConfig, Measurement);
        MeasureAreaWidget(viewConfig, Measurement);
      }
    );

    return () => {
      if (map != null) map.destroy();
      map = null;
      viewConfig.activeView.destroy();
      viewConfig.activeView = null;
    };
  }, []);

  const handleGenericClick = (e) => {
    // Guard Clause
    if (e.target === undefined) return;
    if (e.target.title === undefined) return;

    if (e.target.title.length > 0) {
      var splitMsg = e.target.title.split(":");

      if (splitMsg[0] === "TrackInfo") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];
        dispatch(setDrawer("UNIT_INFO"));
        dispatch(setSelectedUnit({ trackId: blue_track_id, userId: user_id }));
      }

      if (splitMsg[0] === "UnitInfo") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];
        dispatch(setDrawer("RADIO_INFO"));
        dispatch(setSelectedUnit({ trackId: blue_track_id, userId: user_id }));
      }

      if (splitMsg[0] === "RadioInfo") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];
        dispatch(setDrawer("RADIO_INFO"));
        dispatch(setSelectedUnit({ trackId: blue_track_id, userId: user_id }));
      }

      if (splitMsg[0] === "MarkerTrail") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];

        // Dispatch the data to the component
        var param = {
          Receiver: "ARCGIS",
          Command: "PLOT_TRAIL",
          Data: blue_track_id,
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);
      }

      if (splitMsg[0] === "VideoCall") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];

        // Dispatch the data to the component
        var param = {
          Receiver: "UNIT_INFO",
          Command: "SET_VIDEO_CALL",
          Data: blue_track_id,
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);

        dispatch(setDrawer("MARKER_VIDEO_CALL"));
      }

      if (splitMsg[0] === "CameraStream") {
        dispatch(setDrawer("CAMERA"));
      }

      if (splitMsg[0] === "UAVStream") {
        var splitVal = splitMsg[1].split(",");
        var blue_track_id = splitVal[0];
        var user_id = splitVal[1];
        dispatch(setDrawer("UAV"));
        dispatch(setSelectedUnit({ trackId: blue_track_id, userId: user_id }));
      }

      if (splitMsg[0] === "ImageList") {
        // alert("ImageList");
      }
    }
  };

  return (
    <div>
      <div
        onClick={(e) => handleGenericClick(e)}
        id={"viewDiv"}
        style={{
          position: "absolute",
          width: props.width,
          height: props.height,
        }}
      >
        <div>
          {selectedTool === "DRAW_CIRCLE" && (
            <DrawCircle map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DRAW_ARC" && (
            <DrawArc map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DISTANCE_BEARING" && (
            <DistanceBearing map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "NEXT_POSITION" && (
            <NextPosition map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DEAD_RECKONING" && (
            <DeadReckoning map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>{selectedTool === "LAYER_CONTROL" && <LayerControl map={map} />}</div>
        <div>
          {selectedTool === "DRAW_POINT" && (
            <DrawPoint map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DRAW_LINE" && (
            <DrawPolyline map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DRAW_AREA" && (
            <DrawPolygon map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "DRAW_RECTANGLE" && (
            <DrawRectangle map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "FIND_SYMBOL" && (
            <FindSymbol map={map} view={viewConfig.activeView} />
          )}
        </div>
        {/* <div>
          {selectedTool === "GAZETTEER" && (
            // <Gazetteer map={map} view={viewConfig.activeView} />
          )}
        </div> */}
        <div>
          {selectedTool === "COMPASS" && (
            <Compass map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "GEOFENCING" && (
            <Geofencing map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "SYMBOL_DECLUTTER" && (
            <Declutter map={map} view={viewConfig.activeView} />
          )}
        </div>
        <div>
          {selectedTool === "IMPORT_LAYERS" && (
            <ImportLayers map={map} view={viewConfig.activeView} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ArcGIS);
