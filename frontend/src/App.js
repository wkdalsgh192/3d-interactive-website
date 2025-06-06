import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import PortfolioContainer from "./components/PortfolioContainer";
import LegalPage from "./pages/LegalPage";
import AboutPage from "./pages/AboutPage";
import PatchNotePage from "./pages/PatchNotePage";
import PopulationModel from "./models/PopulationModel";

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
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/patch-note" element={<PatchNotePage />} />
          <Route path="/visualization" element={<PopulationModel />} />
        </Routes>
      </Box>
    </Box>
  );
}
