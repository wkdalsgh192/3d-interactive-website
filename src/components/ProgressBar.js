import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate(); // React Router navigation

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
    <div className="progress-wrapper">
      {!completed ? (
        <>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress}%</p>
        </>
      ) : (
        <button className="start-button" onClick={() => navigate("/portfolio")}>
          Start
        </button>
      )}
    </div>
  );
};

export default ProgressBar;
