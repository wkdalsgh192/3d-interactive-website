import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Home", icon: <HomeIcon />, path: "/" },
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
          { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
        ].map((item) => (
          <ListItem button key={item.text} component={NavLink} to={item.path} sx={{ textDecoration: "none", color: "inherit" }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
