import React from "react";
import { Typography } from "@mui/material";

const SettingsPage = () => {
  return (
    <div style={{margin: "10% 20px 10% 20px"}}>
      <p><a href='/'>Minho's</a> / Legal</p>
      <br />
      <br />
      <br />
      <h1>Credits</h1>
      <br />
      <p>
        Thanks to all Sketchfab users who provided their 3D assets and made this project possible:
        <br /><br />
        Johnnart_ - Easter Island Low Poly
        <br />
        AsteroidCap4040 - A low poly Boat
        <br />
        Michael - Flying Flamingo
      </p>
      <br />
      <br />
      <br />
      <h1>Special Thanks</h1>
      <br />
      <p>
        A special thanks to Joshua's World, one of my key references that inspired me to create this interactive website. Many aspects of my work are influenced by his earlier artwork.
      </p>
      <br />
    </div>
  );
};

export default SettingsPage;
