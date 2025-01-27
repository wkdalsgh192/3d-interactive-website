import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setCompleted(true);
    }
  }, [progress]);

  return (
    <div id="loadingscreen">
      <div id="loader-wrapper">
        <div className="title">Welcome to my world!</div>
        <h1 style={{ textAlign: 'right' }}>
          <span>I'm Minho, a Software Engineer who is enthusiastic about creating insights from data and building amazing products.</span>
        </h1>
        {!completed ? (
          <div id="progress" style={{ display: progress === 0 ? 'none' : 'block' }}>
            <span id="loading">Loading...{progress}%</span>
            <div id="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        ) : (
          <button 
            className="button cta" 
            id="start-button" 
            onClick={() => navigate("/portfolio")}
          >
            Explore my world <i className="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;