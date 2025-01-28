import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Container,
  CardActionArea
} from '@mui/material';

// Import your complete visualization models
import PopulationModel from '../models/PopulationModel';
import DashboardModel from '../models/DashboardModel';
// Import other models as needed

const visualizationModels = [
  {
    id: 'population-3d',
    title: 'Population Growth 3D',
    description: 'Interactive 3D visualization of population data with area charts',
    image: '/images/3d-population-preview.png',
    component: PopulationModel
  },
  {
    id: 'normal-dashboard',
    title: 'Dashboard with charts',
    description: 'A collection of charts that I \'ve made for data visualization projects',
    image: '/images/dashboard.png',
    component: DashboardModel
  },
  // Add more visualization models here
];

const VisualizationPage = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleCardClick = (model) => {
    setSelectedModel(model);
  };

  const handleBack = () => {
    setSelectedModel(null);
  };

  if (selectedModel) {
    const SelectedComponent = selectedModel.component;
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <button 
          onClick={handleBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            cursor: 'pointer'
          }}
        >
          ← Back to Gallery
        </button>
        <SelectedComponent />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Visualization Models
      </Typography>
      <Grid container spacing={4}>
        {visualizationModels.map((model) => (
          <Grid item key={model.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardActionArea onClick={() => handleCardClick(model)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={model.image}
                  alt={model.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {model.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {model.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VisualizationPage;
