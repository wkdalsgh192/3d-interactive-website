import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ResearchPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const containerStyle = {
    margin: "10% 20px",
  };

  const cardStyle = {
    border: "1px solid gray",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#1a1a1a",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1>Research Projects</h1>

      <Link to="/research/graph-db" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={cardStyle}>
          <h2>Ebay Distributed Graph Database</h2>
        </div>
      </Link>
    </div>
  );
};

export default ResearchPage;
