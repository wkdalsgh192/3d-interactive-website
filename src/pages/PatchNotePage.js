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
          <a href="/">Minho's</a> / Patch Note
        </p2>
      </nav>

      <h1>Get all the details about the latest feature releases, product improvements, and bug fixes of Minho's World.</h1>
      <br /><br />
      <h2> &#x1F680; V1.1.0 (January 12, 2025) </h2>
      <ul>
        <li>MS in Computer Science, University of Southern California (~Present)</li>
        <li>BS in Computer Science, Korea National University</li>
        <li>Bachelor of Politics, Korea University</li>
      </ul>
      <br /><br />

      <h2> &#x1F680; V1.0.0 (January 07, 2025) </h2>
      <ul>
        <li>MS in Computer Science, University of Southern California (~Present)</li>
        <li>BS in Computer Science, Korea National University</li>
        <li>Bachelor of Politics, Korea University</li>
      </ul>
      <br /><br />
    </div>
  );
};

export default PatchNotePage;
