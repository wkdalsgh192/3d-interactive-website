import { motion } from "framer-motion";
import "./MenuButton.css";

export default function MenuButton({ isOpen, toggle }) {
  return (
    <button className="menu-button" onClick={toggle}>
      <motion.div
        className="line first-line"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="line second-line"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="line third-line"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}
