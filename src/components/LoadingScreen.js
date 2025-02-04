import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingScreen.css";

const LoadingScreen = ({ onStartClick }) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '144px', fontWeight: 'bold' }}>0</span>
            <div style={{ flexGrow: 1, height: '10px', backgroundColor: 'black', position: 'relative', margin: '0 10px' }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
            <span style={{ fontSize: '144px', fontWeight: 'bold' }}>1</span>
        </div>
        <div style={{ textAlign: 'center', flexGrow: 1, marginBottom: '20px' }}>
          <h1 style={{ margin: '10px 0', fontSize: '64px', fontWeight: 'bold' }}>I'm Minho, a software engineer</h1>
          <h1 style={{ margin: '10px 0', fontSize: '72px', fontWeight: 'bold' }}>passionate about building scalable systems</h1>
        </div>
        {!completed ? (
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
            }}
          >
            <div 
              id="progress" 
              style={{ display: progress === 0 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span id="loading">Loading...{progress}%</span>
              <div 
                id="progress-bar" 
                style={{ 
                  width: `${progress}%`, 
                  height: '4px', 
                  backgroundColor: '#757BFD', 
                  transition: 'width 0.5s ease',
                  position: 'absolute',
                  bottom: '10px', // Adjust as needed to fit visually
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button 
              className="button cta" 
              id="start-button" 
              onClick={onStartClick}
            >
              Explore my world <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;