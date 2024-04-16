/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: OPLST.ArcGIS.js
 * Created: Wednesday, 9th March 2022 10:21:32 am
 * Modified: Tuesday, 15th March 2022 1:28:45 am
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
import {
  getZoom,
  getGoTo,
  getPage,
  getService,
  setPage,
  setContent,
  setSubContent,
  getUserProfile,
} from "app/appSlice";

import { setOpsSelected, getOpsSelected } from "app/copSlice";

var map = null;
var view = null;
var globeRotateTimer = null;

function ArcGIS(props) {
  const dispatch = useDispatch();
  const zoom = useSelector(getZoom);
  const goTo = useSelector(getGoTo);
  const page = useSelector(getPage);
  const service = useSelector(getService);
  const userProfile = useSelector(getUserProfile);

  const [data, setData] = useState([]);
  const [opList, setOpList] = useState([]);
  const [zoomTo, setZoomTo] = useState({});

  const plotMarkers = (data) => {
    // Guard clause
    if (service.length === 0) return;

    // Remove all markers
    var lyr = map.findLayerById("BorderLayer");
    lyr.graphics.removeAll();

    setOpList(data);
    for (var i = 0; i < data.length; i++) {
      var plotGraphics = new PlotGraphics(map);
      plotGraphics.PlotArea(data[i], "BorderLayer");
      plotGraphics.PlotLabel(data[i].operation_name, data[i].aorZoom, "BorderLayer");
    }
  };

  const shiftCamera = (deg) => {
    if (view.camera != null) {
      const camera = view.camera.clone();
      camera.position.longitude += deg;
      return camera;
    }
  };

  const rotateGlobe = () => {
    globeRotateTimer = setInterval(() => {
      if (view != null) {
        view.goTo(shiftCamera(10), {
          duration: 7000,
          easing: "linear",
        });
      }
    }, 7000);
  };

  // Initialize the map zoom when return to the page again
  useEffect(() => {
    if (view != null) {
      view.center = [zoom.lng, zoom.lat];
      view.zoom = zoom.level;
    }
  }, [zoom]);

  useEffect(() => {
    if (view != null) {
      let opts = {
        duration: 2500, // Duration of animation will be 2.5 seconds
      };

      clearInterval(globeRotateTimer);

      view.goTo(
        {
          center: [goTo.lng, goTo.lat],
          zoom: [goTo.level],
          speedFactor: 6,
          easing: "in-out-expo",
        },
        opts
      );
    }
  }, [goTo]);

  useEffect(() => {
    // rotateGlobe();
  }, []);

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/TileLayer",
      "esri/layers/GraphicsLayer",
      "esri/widgets/Home",
      "esri/core/watchUtils",
      "esri/config",
    ]).then(
      ([
        Map,
        MapView,
        SceneView,
        TileLayer,
        GraphicsLayer,
        Home,
        WatchUtils,
        EsriConfig,
      ]) => {
        EsriConfig.apiKey =
          "AAPKce445306ce804087aa910b2ffa1fe796Zy4bI4yITB-wvCXYL4Dcr-SKJFbQWir6NYl0WWLwFpBM2AhY3hR-ZCjJz1Sy9y1c";

        if (map === null) {
          map = new Map({ basemap: "arcgis-imagery" });

          // Set as SceneView
          view = new SceneView({
            map: map,
            container: document.getElementById(props.mapId),
          });

          // Rotate the globe when the scene is double-click
          view.on("double-click", function (event) {
            clearInterval(globeRotateTimer);
            rotateGlobe();
          });
        }

        // Create Graphics Layers
        var gLayer = new GraphicsLayer({ id: "LabelLayer" });
        gLayer.id = "LabelLayer";
        gLayer.title = "LabelLayer";
        gLayer.listMode = "hide";
        gLayer.visible = true;
        map.add(gLayer);

        var gLayer = new GraphicsLayer({ id: "PointLayer" });
        gLayer.id = "PointLayer";
        gLayer.title = "PointLayer";
        gLayer.listMode = "hide";
        gLayer.visible = true;
        map.add(gLayer);

        var gLayer = new GraphicsLayer({ id: "LineLayer" });
        gLayer.id = "LineLayer";
        gLayer.title = "LineLayer";
        gLayer.listMode = "hide";
        gLayer.visible = true;
        map.add(gLayer);

        var gLayer = new GraphicsLayer({ id: "AreaLayer" });
        gLayer.id = "AreaLayer";
        gLayer.title = "AreaLayer";
        gLayer.listMode = "hide";
        gLayer.visible = true;
        map.add(gLayer);

        var gLayer = new GraphicsLayer({ id: "BorderLayer" });
        gLayer.id = "BorderLayer";
        gLayer.title = "BorderLayer";
        gLayer.listMode = "hide";
        gLayer.visible = true;
        map.add(gLayer);

        // Widgets ---------------------------------------------------------------------------
        let homeWidget = new Home({
          view: view,
        });
        view.ui.add(homeWidget, "top-left");
      }
    );

    return () => {
      if (map != null) map.destroy();
      if (view != null) view.destroy();
      map = null;
      view = null;
    };
  }, []);

  const handleGenericClick = (e) => {
    if (e.target.title.length > 0) {
      var splitMsg = e.target.title.split(":");

      if (splitMsg[0] === "ViewCOP") {
        var id = splitMsg[1];
        // Set the selected operation
        var ops = opList.filter((item) => item.id === Number(id));
        dispatch(setOpsSelected(ops[0]));

        setTimeout(() => {
          dispatch(setPage("MONITORING"));
          dispatch(setContent("MONITORING"));
          dispatch(setSubContent("MAIN"));
        }, 100);
      }
    }
  };

  return (
    <div
      onClick={(e) => handleGenericClick(e)}
      id={props.mapId}
      style={{
        position: "absolute",
        width: props.width,
        height: props.height,
      }}
    ></div>
  );
}

export default memo(ArcGIS);
