/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: EarthquakeLater.js
 * Created: Saturday, 19th March 2022 7:38:11 pm
 * Modified: Saturday, 19th March 2022 7:38:11 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export function EarthquakeLayer(GeoJSONLayer) {
  var jsonLayer = new GeoJSONLayer({
    url: "https://bsvensson.github.io/various-tests/geojson/usgs-earthquakes-06182019.geojson",
    copyright: "USGS Earthquakes",
    title: "USGS Earthquakes",
    // set the CSVLayer's timeInfo based on the date field
    timeInfo: {
      startField: "time", // name of the date field
      interval: {
        // set time interval to one day
        unit: "days",
        value: 1,
      },
    },
    orderBy: {
      field: "mag",
    },
    renderer: {
      type: "simple",
      field: "mag",
      symbol: {
        type: "simple-marker",
        color: "orange",
        outline: null,
      },
      visualVariables: [
        {
          type: "size",
          field: "mag",
          stops: [
            {
              value: 1,
              size: "5px",
            },
            {
              value: 2,
              size: "10px",
            },
            {
              value: 3,
              size: "15px",
            },
          ],
        },
        {
          type: "color",
          field: "depth",
          stops: [
            {
              value: 2.5,
              color: "#F9C653",
              label: "<2km",
            },
            {
              value: 3.5,
              color: "#F8864D",
              label: "3km",
            },
            {
              value: 4,
              color: "#C53C06",
              label: ">4km",
            },
          ],
        },
      ],
    },
    popupTemplate: {
      title: "{title}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "place",
              label: "Location",
              visible: true,
            },
            {
              fieldName: "mag",
              label: "Magnitude",
              visible: true,
            },
            {
              fieldName: "depth",
              label: "Depth",
              visible: true,
            },
          ],
        },
      ],
    },
  });
  return jsonLayer;
}
