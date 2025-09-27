import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const { palette, setPalette } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const palettes = [
    { id: 'original', name: 'Original', emoji: '🎨' },
    { id: 'warm', name: 'Warm', emoji: '🌅' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊' },
    { id: 'sunset', name: 'Sunset', emoji: '🌇' }
  ] as const;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 10000); // Collapse after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    // Don't auto-collapse on mouse leave, keep it expanded when user is interacting
  };

  return (
    <div 
      className={`theme-switcher ${isCollapsed ? 'collapsed' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="theme-switcher-label">Theme</div>
      <div className="palette-options">
        {palettes.map((p) => (
          <button
            key={p.id}
            className={`palette-option ${palette === p.id ? 'active' : ''}`}
            onClick={() => setPalette(p.id)}
            title={p.name}
          >
            <span className="palette-emoji">{p.emoji}</span>
            <span className="palette-name">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
