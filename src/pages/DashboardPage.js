import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";
import { formatData } from "../temps/DataFormatter";
import { renderAreaChart } from "../temps/AreaChart";
import { render3dChart } from "../temps/3dChart";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const containerRef = useRef(null);
  const loadingRef = useRef(false);
  const chartsRenderedRef = useRef(false);

  useEffect(() => {
    let cleanup;
    
    const loadData = async () => {
      if (loadingRef.current || chartsRenderedRef.current) return;
      loadingRef.current = true;

      try {
        const allData = await formatData("./population.csv");
        setData(allData);
        
        if (allData && containerRef.current) {
          // Clear existing SVGs
          const existingSvgs = containerRef.current.querySelectorAll('svg.population-chart');
          existingSvgs.forEach(svg => svg.remove());
          
          // First, create all SVG elements
          const areaChartPromises = allData.map(countryData => 
            renderAreaChart(countryData, containerRef.current)
          );
          
          // Wait for all area charts to be rendered
          await Promise.all(areaChartPromises);
          
          console.log("All area charts rendered, starting 3D visualization");
          
          // Now render the 3D chart after all SVGs are created
          chartsRenderedRef.current = true; // Mark charts as rendered
          cleanup = render3dChart(allData, containerRef.current);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        chartsRenderedRef.current = false; // Reset on error
      } finally {
        loadingRef.current = false;
      }
    };

    loadData();

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
      loadingRef.current = false;
      chartsRenderedRef.current = false;
    };
  }, []);

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <div 
        className="container"
        ref={containerRef} 
        style={{
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: "hidden"    // Prevent scrolling
        }} 
      />
    </div>
  );
};

export default DashboardPage;
