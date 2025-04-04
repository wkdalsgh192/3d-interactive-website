import React, { useEffect, useRef, useState } from "react";
import { formatData } from "../temps/DataFormatter";
import { renderAreaChart } from "../temps/AreaChart";
import { render3dChart } from "../temps/3dChart";
// import { Language } from "@mui/icons-material";

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
        const response = await fetch("http://localhost:5000/api/countries");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }


        const countryData = formatCountryInfo(await response.json());
        const populationData = await formatData("./population.csv");

        const mergedData = populationData.map((popEntry) => {
          const match = countryData.find(
            (metaEntry) => metaEntry.Country === popEntry.Country
          );
        
          return {
            ...popEntry,
            ...(match || {}) // include metadata only if a match is found
          };
        });
        

        setData(populationData);
        
        if (populationData && containerRef.current) {
          const existingSvgs = containerRef.current.querySelectorAll('svg.population-chart');
          existingSvgs.forEach(svg => svg.remove());
          
          const areaChartPromises = populationData.map(countryData => 
            renderAreaChart(countryData, containerRef.current)
          );
          
          await Promise.all(areaChartPromises);
          
          chartsRenderedRef.current = true;
          cleanup = render3dChart(data, containerRef.current);
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
      Flag: d["image"],
      Landmass: d["landmass"],
      Zone: d["zone"],
      Area: parseInt(d["area"]),
      Population: parseInt(d["population"]) * 1000,
      Language: d["language"],
      Religion: d["religion"]
    };
  });

  // Get Initial Year Data for all countries and
  // sort highest count first
  const finalData = allData
    .filter((d) => d.Area > 0)
    .sort((a, b) => b.Population - a.Population);

  // Create an array of objects for the top 30 countries
  // const finalData = firstYearSorted.slice(0, 30);
  // const finalData = [];
  // for (let i = 0; i < 30; i++) {
  //   let country = firstYearSorted[i].Country;

  //   // Get all data of a country and
  //   // Needed to convert the index data into string info
  //   const allYearsData = allData
  //     .filter((d) => d.Country === country)
  //     .map((d) => ({ Year: d.Year, Count: d.Count }));

  //   const countryData = {
  //     Country: country,
  //     Values: allYearsData,
  //   };

  //   // finalData.push(countryData);
  //   finalData.push(firstYearSorted[i]);
  // }

  return finalData;
}

export default PopulationModel;