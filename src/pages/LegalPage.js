import React, { useEffect } from "react";

const LegalPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white"; // Ensure text is readable

    return () => {
      document.body.style.backgroundColor = ""; // Reset when component unmounts
      document.body.style.color = "";
    };
  }, []);

  const containerStyle = {
    margin: "10% 20px",
    backgroundColor: "black",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <nav>
        <p>
          <a href="/">Minho's</a> / Legal
        </p>
      </nav>

      <h1>Credits</h1>
      <p>
        Thanks to all Sketchfab users who provided their 3D assets and made this project possible:
      </p>
      <ul>
        <li>Johnnart_ - Easter Island Low Poly</li>
        <li>AsteroidCap4040 - A low poly Boat</li>
        <li>Michael - Flying Flamingo</li>
      </ul>

      <h1>Special Thanks</h1>
      <p>
        A special thanks to{" "}
        <a href="https://www.joshuas.world/" target="_blank" rel="noopener noreferrer">
          Joshua's World
        </a>
        , one of my key references that inspired me to create this interactive website. Many aspects of my work are influenced by his earlier artwork.
      </p>
    </div>
  );
};

export default LegalPage;
