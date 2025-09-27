import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Logo } from "../Logo";
import { iconMap } from "../Icons/CustomIcons";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Home", iconKey: "home" },
  { to: "/finance", label: "Finance", iconKey: "finance" },
  { to: "/projects", label: "Projects", iconKey: "projects" },
  { to: "/reflection", label: "Reflection", iconKey: "reflection" },
  { to: "/manifesto", label: "Manifesto", iconKey: "manifesto" },
  { to: "/wisdom", label: "Wisdom", iconKey: "wisdom" },
  { to: "/chakra", label: "Chakra Deep Dive", iconKey: "chakra" },
  { to: "/settings", label: "Settings", iconKey: "settings" },
];

export const Sidebar: React.FC = () => {
  const { colors } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <button 
          className="mobile-nav-toggle touch-friendly"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isMobile && (
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar ${isMobile ? (sidebarOpen ? 'open' : '') : ''} ${sidebarCollapsed ? 'collapsed' : ''}`} 
        style={{ background: colors.card }}
      >
        {/* Logo in sidebar */}
        {!sidebarCollapsed && (
          <div className="sidebar-logo" style={{ padding: "1.5rem", borderBottom: `1px solid ${colors.accent}20` }}>
            <Logo size="small" showText={!isMobile} />
          </div>
        )}
        
        <nav>
          {/* Desktop collapse toggle - moved above Home */}
          {!isMobile && (
            <div className="sidebar-collapse-section-top">
              <button 
                className="sidebar-collapse-toggle-top"
                onClick={toggleCollapse}
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? "▶" : "◀"}
              </button>
            </div>
          )}
          
          {navItems.map(item => {
            const IconComponent = iconMap[item.iconKey as keyof typeof iconMap];
            return (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={`sidebar-link touch-friendly hover-lift ${sidebarCollapsed ? 'collapsed' : ''}`}
                onClick={handleLinkClick}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className="sidebar-icon">
                  <IconComponent size={sidebarCollapsed ? 19 : 20} />
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};