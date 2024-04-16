/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: CIMLineStyle.js
 * Created: Saturday, 16th April 2022 10:19:36 pm
 * Modified: Saturday, 16th April 2022 10:20:17 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export const lineBorder = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectWave",
            amplitude: 5,
            period: 5,
            waveform: "Square",
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
    ],
  },
});

export const lineZigZag = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectJog",
            angle: 225,
            length: 20,
            position: 50,
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
    ],
  },
});

export const lineDashes = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectDashes",
            dashTemplate: [5, 5, 1, 5], // [dash, gap, dash, gap]
            lineDashEnding: "NoConstraint",
            offsetAlongLine: 0,
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
    ],
  },
});

export const lineBuffer = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectBuffer",
            size: 5,
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
    ],
  },
});

export const lineArrow = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectArrow",
            geometricEffectArrowType: "Crossed",
            width: 10,
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
      // {
      //   type: "CIMSolidStroke",
      //   enable: true,
      //   capStyle: "Butt",
      //   joinStyle: "Round",
      //   width: 3.4,
      //   color: [165, 9, 16, 255],
      // },
    ],
  },
});

export const lineSymbolBlock = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectDashes",
            dashTemplate: [5, 5],
            lineDashEnding: "FullGap",
            controlPointEnding: "NoConstraint",
          },
        ],
        enable: "true",
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
      {
        type: "CIMSolidStroke",
        enable: true,
        capStyle: "Butt",
        joinStyle: "Round",
        width: 3.4,
        color: [165, 9, 16, 255],
      },
    ],
  },
});

export const lineMarkerPlacementVertices = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        // black 1px line symbol
        type: "CIMSolidStroke",
        enable: true,
        width: 1,
        color: [0, 0, 0, 255],
      },
      {
        // arrow symbol
        type: "CIMVectorMarker",
        enable: true,
        size: 5,
        markerPlacement: {
          type: "CIMMarkerPlacementOnVertices",
          angleToLine: true,
          offset: 0,
          placeOnEndPoints: true,
          placeOnRegularVertices: true,
        },
        frame: {
          xmin: -5,
          ymin: -5,
          xmax: 5,
          ymax: 5,
        },
      },
    ],
  },
});

export const lineMarkerPlacement = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        // black 1px line symbol
        type: "CIMSolidStroke",
        enable: true,
        width: 1,
        color: [0, 0, 0, 255],
      },
      {
        // arrow symbol
        type: "CIMVectorMarker",
        enable: true,
        size: 5,
        markerPlacement: {
          type: "CIMMarkerPlacementAlongLineSameSize",
          angleToLine: true,
          offset: 0,
          controlPointsPlacement: "NoConstraint",
          customEndingOffset: 0,
          endings: "NoConstraint",
          offsetAlongLine: 0,
          placementTemplate: [10, 10],
        },
      },
    ],
  },
});

export const lineSymbolArrow = () => ({
  type: "CIMSymbolReference",
  symbol: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        // black 1px line symbol
        type: "CIMSolidStroke",
        enable: true,
        width: 1,
        color: [0, 0, 0, 255],
      },
      {
        // arrow symbol
        type: "CIMVectorMarker",
        enable: true,
        size: 5,
        markerPlacement: {
          // places same size markers along the line
          type: "CIMMarkerPlacementAlongLineSameSize",
          endings: "WithMarkers",
          placementTemplate: [19.5], // determines space between each arrow
        },
        frame: {
          xmin: -5,
          ymin: -5,
          xmax: 5,
          ymax: 5,
        },
        markerGraphics: [
          {
            type: "CIMMarkerGraphic",
            geometry: {
              rings: [
                [
                  [-8, -5.47],
                  [-8, 5.6],
                  [1.96, -0.03],
                  [-8, -5.47],
                ],
              ],
            },
            symbol: {
              // black fill for the arrow symbol
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [255, 106, 0, 255],
                },
              ],
            },
          },
        ],
      },
    ],
  },
});
