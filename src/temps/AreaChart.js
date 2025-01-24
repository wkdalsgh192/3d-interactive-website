import * as d3 from "d3";
import { randomExponential } from "d3";

export function renderAreaChart(data, container) {
  return new Promise((resolve) => {
    if (!container) {
      resolve();
      return;
    }

    const allYearsData = data.Values;

    let svg = d3
      .select(".container")
      .append("svg")
      .attr("class", "population-chart")
      .attr("width", 500)
      .attr("height", 1500)
      .style("position", "absolute") // Make SVGs position absolute
      .style("top", 0)              // Position at top
      .style("left", 0)             // Position at left
      .style("pointer-events", "none") // Prevent SVGs from blocking interaction
      .style("opacity", 0);         // Hide SVGs since we only need them for 3D geometry

    const timeParser = d3.timeParse("%Y");

    let x = d3
      .scaleTime()
      .domain(d3.extent(allYearsData, (d) => timeParser(d.Year)))
      .range([0, 500]);

    console.log(d3.extent(allYearsData, (d) => d.Count));

    let y = d3.scalePow().exponent(0.3).domain([0, 1400000000]).range([1500, 0]);

    svg
      .append("path")
      .datum(allYearsData)
      .attr("fill", "#ffffff")
      .attr(
        "d",
        d3
          .area()
          .x((d) => x(timeParser(d.Year)))
          .y0(y(0))
          .y1((d) => y(d.Count))
      );

    resolve();
  });
}
