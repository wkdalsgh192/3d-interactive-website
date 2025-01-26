import React, { useEffect, useRef, useState } from "react";
import { formatData } from "../temps/DataFormatter";
import { renderAreaChart } from "../temps/AreaChart";
import { render3dChart } from "../temps/3dChart";

const PopulationModel = () => {
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
          const existingSvgs = containerRef.current.querySelectorAll('svg.population-chart');
          existingSvgs.forEach(svg => svg.remove());
          
          const areaChartPromises = allData.map(countryData => 
            renderAreaChart(countryData, containerRef.current)
          );
          
          await Promise.all(areaChartPromises);
          
          chartsRenderedRef.current = true;
          cleanup = render3dChart(allData, containerRef.current);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        chartsRenderedRef.current = false;
      } finally {
        loadingRef.current = false;
      }
    };

    loadData();

    return () => {
      if (cleanup) cleanup();
      loadingRef.current = false;
      chartsRenderedRef.current = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="container" 
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  );
}; 

export default PopulationModel;