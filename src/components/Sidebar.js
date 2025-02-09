import { useState } from "react";
import { motion } from "framer-motion";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import MenuButton from "./MenuButton"; // Import animated menu button
import "./Sidebar.css";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Menu Button (Always Visible) */}
      <MenuButton isOpen={isExpanded} toggle={() => setIsExpanded(!isExpanded)} />

      {/* Sidebar (Shrinks Completely When Closed) */}
      <motion.div
        initial={{ width: "0px"}}
        animate={{ 
          width: isExpanded ? "270px" : "0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sidebar"
      >
        {isExpanded && (
          <>
          <h2></h2>
          <List>
            {[
              { text: "Home", icon: <HomeIcon />, path: "/" },
              { text: "About", icon: <SettingsIcon />, path: "/about" },
              { text: "Legal", icon: <SettingsIcon />, path: "/legal" },
              { text: "Patch Note", icon: <SettingsIcon />, path: "/patch-note" }
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
          </>
        )}
      </motion.div>
    </div>
  );
}
