import React, { useEffect } from "react";

const PatchNotePage = () => {
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
  };

  return (
    <div style={containerStyle}>
      <nav>
        <p2>
          <a href="/">Minho's</a> / Release Notes
        </p2>
      </nav>

      <h1>Get all the details about the latest feature releases, product improvements, and bug fixes of Minho's World.</h1>
      <br /><br />
      <h2> 🚀 v0.1 (February 15, 2025) </h2>
      <ul>
        <li>Introduced a scalable notification system design project</li>
        <li>Added About and Release Notes pages</li>
        <li>Enhanced sidebar UI for a smoother transition</li>
      </ul>
      <br /><br />

      <h2> 🚀 v0 (February 07, 2025) </h2>
      <ul>
        <li>Implemented interactive animations on the island, allowing users to explore with mouse movements</li>
        <li>Added a loading screen for a seamless transition to the island</li>
        <li>Integrated a 3D island into the website using WebGL</li>
      </ul>
      <br /><br />
    </div>
  );
};

export default PatchNotePage;
