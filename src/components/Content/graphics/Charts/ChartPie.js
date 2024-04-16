/*
 * --------------------------------------------------------------------
 * Project:
 * Version:
 * File: ChartPie.js
 * Created: Tuesday, 11th January 2022 12:22:00 pm
 * Modified: Tuesday, 11th November 2022 12:22:00 pm
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

export function ChartPie(props) {
  const {
    data,
    width = "100%",
    height = 200,
    valueName,
    categoryName,
    colorName,
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
    var chart = am4core.create(chartId, am4charts.PieChart3D);

    chart.data = data;

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = valueName;
    pieSeries.dataFields.category = categoryName;

    chart.series.getIndex(0).labels.template.fill = am4core.color("gray");
    chart.series.getIndex(0).labels.template.fontSize = 12;
    chart.innerRadius = am4core.percent(40);

    pieSeries.ticks.template.disabled = false;
    pieSeries.ticks.template.stroke = am4core.color("white");

    const sliceTemplate = pieSeries.slices.template;

    sliceTemplate.adapter.add("fill", function (fill, target) {
      return data[target.dataItem.index][colorName];
    });

    sliceTemplate.adapter.add("stroke", function (stroke, target) {
      return data[target.dataItem.index][colorName];
    });

    return () => {
      chart.dispose();
    };
  }, [chartId, data, valueName, categoryName, colorName]);

  return <div id={chartId} style={{ marginLeft: 0, width: width, height: height }}></div>;
}

export default memo(ChartPie);
