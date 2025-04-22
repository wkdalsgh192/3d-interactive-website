import React, { useEffect, useRef, useState } from "react";
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
        const response = await fetch("/api/countries");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const countryData = formatCountryInfo(await response.json());

        setData(countryData);
        
        if (countryData && containerRef.current) {
          const existingSvgs = containerRef.current.querySelectorAll('svg.population-chart');
          existingSvgs.forEach(svg => svg.remove());
          
          const areaChartPromises = countryData.map(data => 
            renderAreaChart(data, containerRef.current)
          );
          
          await Promise.all(areaChartPromises);
          
          chartsRenderedRef.current = true;
          cleanup = render3dChart(countryData, containerRef.current);
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

function formatCountryInfo(allData) {

  // Type Conversion
  allData = allData.map((d) => {
    return {
      Country: d["countryName"].replace(/-/g, " "),
      Code: d["countryCode"],
      Population: Object.entries(d["population"]).map(([key, value]) => {
        return {
          Year: parseInt(key.replace("YR", ""), 10),
          Number: parseInt(value, 10)
        }
      })
    };
  });

  // Get Initial Year Data for all countries and
  // sort highest count first
  return allData.sort((a, b) => b.Population[0].Number - a.Population[0].Number).slice(0, 30);
}

export default PopulationModel;