import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import StorageIcon from '@mui/icons-material/Storage';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          left: '20px',
          top: '20px',
          zIndex: 1200,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          }
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "Home", icon: <HomeIcon />, path: "/" },
            { text: "Graphics", icon: <SmartToyIcon />, path: "/dashboard" },
            { text: "Visualization", icon: <DataThresholdingIcon />, path: "/visualization" },
            { text: "Database", icon: <StorageIcon />, path: "/database" },
            { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
          ].map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={NavLink} 
              to={item.path} 
              onClick={toggleDrawer}
              sx={{ 
                textDecoration: "none", 
                color: "inherit",
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
