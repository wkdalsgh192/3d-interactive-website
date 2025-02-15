import React, { useEffect } from "react";

const Legal = () => {
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
          <a href="/">Minho's</a> / About
        </p2>
      </nav>

      <h1>I'm Minho, a software engineer who is passionate about building scalable systems</h1>
      <br /><br />
      <h2>
        I have worked for
      </h2>
      <p>MIRIDIH</p>
      <br /><br />

      <h2>Education</h2>
      <p>MS in Computer Science, University of Southern California</p>
      <p>BS in Computer Science, Korea National University</p>
      <p>Bachelor of Politics, Korea University</p>
    </div>
  );
};

export default Legal;
