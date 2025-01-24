import React from "react";
import { Typography } from "@mui/material";
import DashboardChart from "../components/DashboardChart";

const DashboardPage = () => {
  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <DashboardChart />
    </div>
  );
};

export default DashboardPage;
