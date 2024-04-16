/*
 * --------------------------------------------------------------------
 * Project:
 * Version:
 * File: ChartBar.js
 * Created: Tuesday, 11th January 2022 3:00:00 pm
 * Modified: Tuesday, 11th November 2022 3:20:00 pm
 * Author: Arief Abu Bakar (arief@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useLayoutEffect, memo } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply chart themes
am4core.useTheme(am4themes_animated);

export function ChartLine(props) {
  const {
    data,
    width = "100%",
    height = 200,
    valueName,
    categoryName,
    colorName,
    seriesName,
    groupName,
  } = props;
  const chartId = parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(16)
      .toString()
      .replace(".", "")
  ).toString();

  const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  useLayoutEffect(() => {
    if (data.length === 0) return;

    // Create chart instance
    var chart = am4core.create(chartId, am4charts.XYChart);

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 1;
    // dateAxis.renderer.grid.template.location = 0.5;
    // dateAxis.startLocation = 0.5;
    // dateAxis.endLocation = 0.5;
    dateAxis.renderer.labels.template.fill = "";
    dateAxis.renderer.labels.template.fontSize = 1;
    dateAxis.name = seriesName;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = "gray";
    valueAxis.renderer.labels.template.fontSize = 16;
    valueAxis.renderer.grid.template.strokeOpacity = 0.2;
    valueAxis.renderer.grid.template.stroke = am4core.color("gray");
    valueAxis.renderer.grid.template.strokeWidth = 1;

    const grouped = Array.from(groupBy(data, (item) => item[groupName]));

    console.log(grouped);

    for (let i = 0; i < grouped.length; i++) {
      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = valueName;
      series.dataFields.dateX = categoryName;
      series.strokeWidth = 2;
      series.stroke = grouped[i][1][0][colorName];
      series.tensionX = 0.8;

      series.data = grouped[i][1];
    }

    return () => {
      chart.dispose();
    };
  }, [chartId, data, seriesName, colorName, valueName, categoryName, groupName]);

  return <div id={chartId} style={{ marginLeft: 0, width: width, height: height }}></div>;
}

export default memo(ChartLine);
