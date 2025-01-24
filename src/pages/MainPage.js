import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h2">Welcome to Mino's </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>Visualize your thoughts </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/dashboard">
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default MainPage;
