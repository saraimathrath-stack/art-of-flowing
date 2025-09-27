import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { Sidebar } from "./components/Layout/Sidebar";
import { BackgroundPatterns } from "./components/BackgroundPatterns";
import { Home } from "./pages/Home";
import { Finance } from "./pages/Finance";
import { Projects } from "./pages/Projects";
import { Reflection } from "./pages/Reflection";
import { Manifesto } from "./pages/Manifesto";
import { Wisdom } from "./pages/Wisdom";
import { ChakraDeepDive } from "./pages/ChakraDeepDive";
import { Settings } from "./pages/Settings";
import "./styles/background-patterns.css";
import "./styles/animations.css";
import "./styles/mobile-enhancements.css";
import "./styles/logo.css";
import "./styles/home-page.css";
import "./styles/collapsible-sidebar.css";
import "./styles/menu-animations.css";

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <BackgroundPatterns />
          <Sidebar />
          <div className="main-content" style={{ 
            marginLeft: isMobile ? '0' : '200px',
            marginTop: isMobile ? '80px' : '0',
            minHeight: '100vh', 
            padding: isMobile ? '1rem' : '2rem',
            position: 'relative',
            zIndex: 1,
            transition: 'margin-left 0.3s ease'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reflection" element={<Reflection />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="/wisdom" element={<Wisdom />} />
              <Route path="/chakra" element={<ChakraDeepDive />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
};