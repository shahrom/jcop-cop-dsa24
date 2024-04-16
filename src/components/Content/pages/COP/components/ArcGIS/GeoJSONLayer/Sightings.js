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

export function SightingsLayer(GeoJSONLayer) {
  var jsonLayer = new GeoJSONLayer({
    url: window.location.href + "/data/GeoJSON/SightingReports.geojson",
    copyright: "MAFC2 Sightings",
    title: "MAFC2 Sightings",
    timeInfo: {
      startField: "time", // name of the date field
      interval: {
        // set time interval to one day
        unit: "days",
        value: 1,
      },
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "img/markers/bft/p-1.png",
        width: "28px",
        height: "28px",
      },
    },
    popupTemplate: {
      title: "{title}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "time",
              label: "Time",
              visible: true,
            },
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
