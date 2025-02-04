import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import PortfolioContainer from "./components/PortfolioContainer";
export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 0,
          overflow: 'hidden'
        }}>
        <Routes>
          <Route path="/" element={<PortfolioContainer />} />
        </Routes>
      </Box>
    </Box>
  );
}
