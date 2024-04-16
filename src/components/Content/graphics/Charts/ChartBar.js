/*
 * --------------------------------------------------------------------
 * Project:
 * Version:
 * File: ChartBar.js
 * Created: Tuesday, 11th January 2022 10:37:00 pm
 * Modified: Tuesday, 11th November 2022 12:20:00 pm
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

export function ChartBar(props) {
  const {
    data,
    width = "100%",
    height = 200,
    valueName,
    categoryName,
    colorName,
    seriesName,
  } = props;
  const chartId = parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(16)
      .toString()
      .replace(".", "")
  ).toString();

  useLayoutEffect(() => {
    if (data.length === 0) return;

    // Create chart instance
    var chart = am4core.create(chartId, am4charts.XYChart3D);

    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.title.text = "";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.fill = "gray";
    categoryAxis.renderer.labels.template.fontSize = 12;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "";
    valueAxis.renderer.labels.template.fill = "gray";
    valueAxis.renderer.labels.template.fontSize = 12;

    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = valueName;
    series.dataFields.categoryX = categoryName;
    series.name = seriesName;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.5;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");

    columnTemplate.adapter.add("fill", function (fill, target) {
      return data[target.dataItem.index][colorName];
    });

    columnTemplate.adapter.add("stroke", function (stroke, target) {
      return data[target.dataItem.index][colorName];
    });

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    return () => {
      chart.dispose();
    };
  }, [chartId, data, valueName, categoryName, seriesName, colorName]);

  return <div id={chartId} style={{ marginLeft: 0, width: width, height: height }}></div>;
}

export default memo(ChartBar);
