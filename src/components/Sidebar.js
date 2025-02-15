import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useLocation } from "react-router-dom";
import MenuButton from "./MenuButton"; // Import animated menu button
import "./Sidebar.css";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); // Detects the current route

  // Close sidebar when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [location.pathname]);

  return (
    <div className="sidebar-container">
      {/* Menu Button (Always Visible) */}
      <MenuButton isOpen={isExpanded} toggle={() => setIsExpanded(!isExpanded)} />

      {/* Sidebar (Expanding and Shrinking with Smooth Transition) */}
      <motion.div
        initial={{ width: "0px" }}
        animate={{ width: isExpanded ? "270px" : "0px" }}
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
                { text: "Release Notes", icon: <SettingsIcon />, path: "/patch-note" }
              ].map((item) => (
                <ListItem 
                  button 
                  key={item.text} 
                  component={NavLink} 
                  to={item.path} 
                  onClick={() => setIsExpanded(false)} // Close sidebar when clicked
                  sx={{ 
                    textDecoration: "none", 
                    color: "inherit",
                    '&.active': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
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
