import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import PortfolioContainer from "./components/PortfolioContainer";
import LegalPage from "./pages/LegalPage";
import AboutPage from "./pages/AboutPage";
import PatchNotePage from "./pages/PatchNotePage";
import PopulationModel from "./models/PopulationModel";
import ResearchPage from "./pages/research/ResearchPage";
import EbayGraphDatabasePage from "./pages/research/EbayGraphDatabasePage";
import HadoopSparkPage from "./pages/project/SparkProcessingPage";
import ProjectPage from "./pages/project/ProjectPage";
import TrafficForecastingPage from "./pages/project/TrafficForecastingPage";

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
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/graph-db" element={<EbayGraphDatabasePage />} />
          <Route path="/project/spark-processing" element={<HadoopSparkPage />} />
          <Route path="/project/traffic-forecasting" element={<TrafficForecastingPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
