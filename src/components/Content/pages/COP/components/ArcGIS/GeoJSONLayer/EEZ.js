/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: EEZLayer.js
 * Created: Saturday, 19th March 2022 7:38:11 pm
 * Modified: Saturday, 19th March 2022 7:38:11 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export function EEZLayer(GeoJSONLayer) {
  const renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: "black",
      outline: {
        color: "cyan",
        width: 1.25,
      },
    },
  };

  var geojsonLayer = new GeoJSONLayer({
    url: window.location.href + "/data/GeoJSON/EEZBorders.geojson",
    title: "EEZ",
    renderer: renderer,
    opacity: 0.4,
    popupTemplate: {
      title: "Malaysian Exclusive Economic Zone (EEZ)",
    },
  });
  return geojsonLayer;
}
