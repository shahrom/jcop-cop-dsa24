/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Widgets.js
 * Created: Saturday, 19th March 2022 5:46:30 pm
 * Modified: Saturday, 19th March 2022 5:46:30 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

var searchWidget = null;
var printWidget = null;
var coordConvertWidget = null;
var timeSlider = null;
var layerView = null;
var measureDistance = null;
var measureArea = null;
var mapGallery = null;
var layerList = null;
var homeWidget = null;

// Search Widget
export const ShowWidget = (name) => {
  // alert(name);

  switch (name) {
    case "DGIM_LAYERS":
      layerList.visible = true;
      break;

    case "CHANGE_BASEMAP":
      mapGallery.visible = true;
      break;

    case "FIND_ADDRESS_PLACE":
      searchWidget.visible = true;
      break;

    case "COORDINATE_CONVERTER":
      coordConvertWidget.visible = true;
      break;

    case "MEASURE_AREA":
      measureArea.activeTool = "area";
      measureArea.startMeasurement();
      measureArea.visible = true;
      // Close measure distance
      measureDistance.visible = false;
      measureDistance.clear();
      break;

    case "MEASURE_DISTANCE":
      measureDistance.activeTool = "distance";
      measureDistance.startMeasurement();
      measureDistance.visible = true;
      // Close measure area
      measureArea.visible = false;
      measureArea.clear();
      break;

    case "TIME_SLIDER":
      timeSlider.visible = true;
      break;

    case "PRINT_MAP":
      printWidget.visible = true;
      break;

    case "":
    default:
      if (measureArea != null) {
        measureArea.visible = false;
        measureArea.clear();
      }
      if (measureDistance != null) {
        measureDistance.visible = false;
        measureDistance.clear();
      }
      if (timeSlider != null) timeSlider.visible = false;
      if (printWidget != null) printWidget.visible = false;
      if (coordConvertWidget != null) coordConvertWidget.visible = false;
      if (searchWidget != null) searchWidget.visible = false;
      if (mapGallery != null) mapGallery.visible = false;
      if (layerList != null) layerList.visible = false;
      if (layerView != null) layerView.visible = false;
      break;
  }
};

export const SearchWidget = (viewConfig, Search) => {
  searchWidget = new Search({
    view: viewConfig.activeView,
    visible: false,
  });
  viewConfig.activeView.ui.add(searchWidget, {
    id: "SearchWidget",
    position: "top-right",
  });
};

export const PrintWidget = (viewConfig, Print) => {
  printWidget = new Print({
    view: viewConfig.activeView,
    visible: false,
  });
  viewConfig.activeView.ui.add(printWidget, {
    id: "PrintWidget",
    position: "top-right",
    printServiceUrl:
      "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
  });
};

export const LayerListWidget = (viewConfig, LayerList, Expand) => {
  var lyrList = new LayerList({
    view: viewConfig.activeView,
    statusIndicators: false,
  });
  layerList = new Expand({
    content: lyrList,
    view: viewConfig.activeView,
    label: "DGIM Layers",
    visible: false,
  });
  viewConfig.activeView.ui.add(layerList, {
    id: "LayerListWidget",
    position: "top-right",
  });
};

export const BasemapGalleryWidget = (viewConfig, BasemapGallery, Expand) => {
  mapGallery = new Expand({
    content: new BasemapGallery({ view: viewConfig.activeView }),
    view: viewConfig.activeView,
    visible: true,
  });
  viewConfig.activeView.ui.add(mapGallery, "top-right");
};

export const CoordinateConversionWidget = (
  viewConfig,
  CoordinateConversion
) => {
  coordConvertWidget = new CoordinateConversion({
    view: viewConfig.activeView,
    visible: true,
  });
  coordConvertWidget.multipleConversions = false;
  viewConfig.activeView.ui.add(coordConvertWidget, "bottom-left");
};

export const MeasureLineWidget = (viewConfig, Measurement) => {
  measureDistance = new Measurement({
    view: viewConfig.activeView,
    // activeTool: "area", // Disable this so that it does not initiate as default tool
    visible: false,
  });
  measureDistance.clear();
  viewConfig.activeView.ui.add(measureDistance, "bottom-right");
};

export const MeasureAreaWidget = (viewConfig, Measurement) => {
  measureArea = new Measurement({
    view: viewConfig.activeView,
    // activeTool: "area", // Disable this so that it does not initiate as default tool
    visible: false,
  });
  measureArea.clear();
  viewConfig.activeView.ui.add(measureArea, "bottom-right");
};

export const CompassWidget = (viewConfig, Compass) => {
  let compass = new Compass({
    view: viewConfig.activeView,
  });
  viewConfig.activeView.ui.add(compass, "top-left");
};

export const ScaleBarWidget = (viewConfig, ScaleBar) => {
  let scaleBar = new ScaleBar({
    view: viewConfig.activeView,
    unit: "dual",
  });
  viewConfig.activeView.ui.add(scaleBar, "bottom-left");
};

export const HomeWidget = (viewConfig, Home, view) => {
  viewConfig.activeView.ui.remove(homeWidget);

  homeWidget = new Home({
    view: viewConfig.activeView,
  });
  viewConfig.activeView.ui.add(homeWidget, "top-left");

  homeWidget.view = view;
};

export const TimeSliderWidget = (viewConfig, TimeSlider, jsonLayer) => {
  timeSlider = new TimeSlider({
    container: "timeSlider",
    view: viewConfig.activeView,
    visible: false,
    playRate: 50,
    stops: {
      interval: {
        value: 1,
        unit: "hours",
      },
    },
    timeVisible: true, // show the time stamps on the timeslider
    loop: true,
  });
  viewConfig.activeView.ui.add(timeSlider, "bottom-left");

  // wait till the layer view is loaded
  viewConfig.activeView.whenLayerView(jsonLayer).then((lv) => {
    layerView = lv;

    // let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    // alert(date); // 1.01.2011, 02:03:04.567

    // start time of the time slider - 5/25/2019
    // const start = new Date(2019, 4, 25);
    const start = new Date("2022-03-01T00:00:00");

    // set time slider's full extent to
    // 5/25/5019 - until end date of layer's fullTimeExtent
    timeSlider.fullTimeExtent = {
      start: start,
      end: jsonLayer.timeInfo.fullTimeExtent.end,
    };

    // We will be showing earthquakes with one day interval
    // when the app is loaded we will show earthquakes that
    // happened between 5/25 - 5/26.
    let end = new Date(start);
    // end of current time extent for time slider
    // showing earthquakes with one day interval
    // end.setDate(end.getDate() + 1);
    end.setDate(end.getDate());

    // timeExtent property is set so that timeslider
    // widget show the first day. We are setting
    // the thumbs positions.
    timeSlider.timeExtent = { start, end };
  });

  // watch for time slider timeExtent change
  timeSlider.watch("timeExtent", () => {
    // only show earthquakes happened up until the end of
    // timeSlider's current time extent.
    jsonLayer.definitionExpression =
      "time <= " + timeSlider.timeExtent.end.getTime();

    // now gray out earthquakes that happened before the time slider's current
    // timeExtent... leaving footprint of earthquakes that already happened
    layerView.featureEffect = {
      filter: {
        timeExtent: timeSlider.timeExtent,
        geometry: viewConfig.activeView.extent,
      },
      excludedEffect: "grayscale(20%) opacity(12%)",
    };
  });
};
