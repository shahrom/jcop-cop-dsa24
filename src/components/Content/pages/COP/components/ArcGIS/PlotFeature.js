/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: PlotMarker.js
 * Created: Monday, 27th September 2021 2:52:17 pm
 * Modified: Monday, 27th September 2021 2:52:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export default class PlotFeature {
  constructor(map) {
    this.gMap = map;
    this.graphics = [];
  }

  UpdateMarker = (name, lat, lng) => {
    var point = {
      type: "point",
      latitude: lat,
      longitude: lng,
    };

    for (var i = 0; i < this.FeatureLayer.graphics.length; i++) {
      var g = this.FeatureLayer.graphics.items[i];
      if (g.attributes.name === name.toString()) {
        var gClone = g.clone();
        this.FeatureLayer.remove(g);
        gClone.geometry = point;
        this.FeatureLayer.add(gClone);
      }
    }

    // for (var i = 0; i < updatedList.length; i++) {
    //   this.FeatureLayer.add(g);
    // }
  };

  CreateFeatureLayer = () => {
    var picSymbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: "img/icons/agk.png",
      width: "64px",
      height: "64px",
      // angle: 45,
      // xoffset: 400,
    };

    const labelClass = {
      // autocasts as new LabelClass()
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        color: "green",
        font: {
          // autocast as new Font()
          family: "Playfair Display",
          size: 12,
          weight: "bold",
        },
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.MARKER_ACTIVITY",
      },
    };

    const layer = new FeatureLayer({
      source: this.graphics, // array of graphics objects
      objectIdField: "OBJECTID",
      fields: [
        {
          name: "OBJECTID",
          type: "oid",
        },
        {
          name: "url",
          type: "string",
        },
      ],
      popupTemplate: {
        content: "<img src='{url}'>",
      },
      labelingInfo: [labelClass],
      renderer: {
        // overrides the layer's default renderer
        type: "simple",
        symbol: picSymbol,
        // symbol: {
        //   type: "text",
        //   color: "#7A003C",
        //   text: "\ue661",
        //   font: {
        //     size: 20,
        //     family: "CalciteWebCoreIcons",
        //   },
        // },
      },
    });

    this.gMap.add(layer);
  };

  CreateGraphics = (label, type, lat, lng) => {
    // Geometry
    var point = {
      type: "point",
      latitude: lat,
      longitude: lng,
    };

    // Symbol
    var icon = "";
    if (type === 1) icon = "img/icons/agk.png";
    if (type === 2) icon = "img/icons/land-jeep.png";
    if (type === 3) icon = "img/icons/bot5_cyan.png";

    // Symbol
    var picSymbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: icon,
      width: "64px",
      height: "64px",
      // angle: 45,
      // xoffset: 400,
    };

    // Attributes
    var attributes = {
      name: label,
      description: "I am a point",
    };

    // PopupTemplate
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: picSymbol, //webStyleSymbol, //simpleMarkerSymbol,
      attributes: attributes,
      popupTemplate: {
        title: attributes.name,
        content: attributes.description,
      },
    });

    this.graphics.push(pointGraphic);
  };
}
