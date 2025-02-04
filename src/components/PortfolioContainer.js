import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import PortfolioPage from '../pages/PortfolioPage';

const PortfolioContainer = () => {
  const [showPortfolio, setShowPortfolio] = useState(false); // Track if user clicked to proceed
  const [startAnimation, setStartAnimation] = useState(false); // Triggers animation in PortfolioPage

  const handleStartClick = () => {
    setShowPortfolio(true);  // Show PortfolioPage when user clicks the button
    setStartAnimation(true); // Trigger animation in PortfolioPage
  };


  return (
    <>
      {!showPortfolio && <LoadingScreen onStartClick={handleStartClick} />}
      <PortfolioPage startAnimation={startAnimation} />
    </>
  );
};

export default PortfolioContainer;
