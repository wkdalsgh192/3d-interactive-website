import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const DashboardModel = () => {
  const svgRef = useRef();
  const [data, setData] = useState([
    { id: 1, value: 80, color: "#FF6384", label: "PC" },
    { id: 2, value: 10, color: "#36A2EB", label: "Tablet" },
    { id: 3, value: 5, color: "#FFCE56", label: "Mobile" },
    { id: 4, value: 5, color: "#000000", label: "Other" }
  ]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Clear previous SVG contents
    d3.select(svgRef.current).selectAll("*").remove();

    // Create an SVG container
    const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Pie and Arc generators
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);

    // Add transition
    const arcTween = (d) => {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => arc(interpolate(t));
    };

    // Function to handle section clicks
    const handleSectionClick = (event, d) => {
      // Update only the clicked section's value
      const newData = data.map(item => {
        if (item.id === d.data.id) {
          return {
            ...item,
            value: Math.random() * 100
          };
        }
        return item;
      });
      setData(newData);
    };

    // Create the chart sections with animations and interactions
    const paths = svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "slice");

    // Add the paths (sections)
    paths.append("path")
        .attr("fill", d => d.data.color)
        .style("stroke", "#fff")
        .style("stroke-width", "2px")
        .style("cursor", "pointer")
        .transition()
        .duration(1000)
        .attrTween("d", arcTween);

    // Add labels
    paths.append("text")
        .attr("transform", d => {
          const pos = arc.centroid(d);
          return `translate(${pos[0]}, ${pos[1]})`;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "#fff")
        .style("pointer-events", "none")
        .text(d => d.data.label);

    // Add click handlers
    paths.select("path")
        .on("click", handleSectionClick)
        .on("mouseover", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("d", d3.arc()
              .innerRadius(radius * 0.6)
              .outerRadius(radius * 1.1)
            );
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc);
        });

    // Add legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${radius + 30}, ${-radius + 20})`);

    data.forEach((item, i) => {
      const legendRow = legend.append("g")
          .attr("transform", `translate(0, ${i * 20})`);
      
      legendRow.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", item.color);

      legendRow.append("text")
          .attr("x", 20)
          .attr("y", 10)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text(`${item.label}: ${Math.round(item.value)}%`);
    });

  }, [data]);

  return (
    <div style={{ 
      width: "100%", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      position: "relative"
    }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DashboardModel;
