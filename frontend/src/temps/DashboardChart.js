import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const DashboardChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://api.example.com/sales")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return chartData ? <Bar data={chartData} /> : <p>Loading...</p>;
};

export default DashboardChart;
