/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DGIMLayers.js
 * Created: Saturday, 19th March 2022 5:46:53 pm
 * Modified: Saturday, 19th March 2022 5:46:53 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { templateAIS, templateFLIGHT } from "./PopUpTemplates";

export const LoadDGIMLayers = (map, ImageryLayer, FeatureLayer) => {
  const jupem_img_layer = new ImageryLayer({
    url: "https://bgsp.jupem.gov.my/server/rest/services/02_RasterDataset/RasterMaps_Topo_MY502/ImageServer",
    id: "jupem-img-layer",
    visible: false,
  });

  // Add the ais layer
  const ais_layer = new FeatureLayer({
    url: "https://bgsp.jupem.gov.my/geosvr/rest/services/AIS/AIS/MapServer/2",
    id: "ais-layer",
    mode: FeatureLayer.MODE_ONDEMAND,
    refreshInterval: 5, //Set the interval to 5 minute
    outFields: ["*"],
    popupTemplate: templateAIS,
    visible: false,
  });

  // Add the flight layer
  const flight_layer = new FeatureLayer({
    url: "https://bgsp.jupem.gov.my/geosvr/rest/services/Flight/InfoFlight/MapServer",
    id: "flight-layer",
    mode: FeatureLayer.MODE_ONDEMAND,
    refreshInterval: 5, //Set the interval to 5 minute
    outFields: ["*"],
    popupTemplate: templateFLIGHT,
    visible: false,
  });

  map.layers.add(jupem_img_layer);
  map.layers.add(ais_layer);
  map.layers.add(flight_layer);
};

// Loop through each layer
// view.map.layers.map(function (lyr) {
//   if (lyr.id === "jupem-img-layer") {
//     lyr.opacity = 0.5;
//   }
// });
