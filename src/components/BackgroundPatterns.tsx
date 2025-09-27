import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundPatterns: React.FC = () => {
  const { period, palette } = useTheme();

  const getPatternOpacity = () => {
    switch (period) {
      case 'morning': return 0.03;
      case 'day': return 0.02;
      case 'evening': return 0.04;
      case 'night': return 0.06;
      default: return 0.02;
    }
  };

  const getPatternColor = () => {
    if (period === 'night') {
      return palette === 'ocean' ? '#4DD0E1' : '#A0AEC0';
    }
    return palette === 'ocean' ? '#3E8E9E' : '#6C7B7D';
  };

  return (
    <div className="background-patterns">
      {/* Flowing organic patterns */}
      <svg 
        className="flowing-patterns" 
        viewBox="0 0 1200 800" 
        style={{ 
          opacity: getPatternOpacity(),
          color: getPatternColor()
        }}
      >
        {/* Gentle flowing curves */}
        <path
          d="M0,200 Q300,100 600,200 T1200,200 L1200,0 L0,0 Z"
          fill="currentColor"
          className="flowing-wave-1"
        />
        <path
          d="M0,400 Q400,300 800,400 T1600,400 L1600,200 L0,200 Z"
          fill="currentColor"
          className="flowing-wave-2"
        />
        <path
          d="M0,600 Q500,500 1000,600 T2000,600 L2000,400 L0,400 Z"
          fill="currentColor"
          className="flowing-wave-3"
        />
        
        {/* Organic circles */}
        <circle cx="150" cy="150" r="80" fill="currentColor" className="organic-circle-1" />
        <circle cx="1050" cy="300" r="120" fill="currentColor" className="organic-circle-2" />
        <circle cx="200" cy="600" r="60" fill="currentColor" className="organic-circle-3" />
        <circle cx="900" cy="700" r="100" fill="currentColor" className="organic-circle-4" />
        
        {/* Subtle dots pattern */}
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" className="dots-pattern" />
      </svg>

      {/* Geometric overlay patterns */}
      <svg 
        className="geometric-patterns" 
        viewBox="0 0 1200 800"
        style={{ 
          opacity: getPatternOpacity() * 0.5,
          color: getPatternColor()
        }}
      >
        {/* Hexagonal patterns */}
        <defs>
          <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 50,14 50,38 30,50 10,38 10,14" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
        
        {/* Subtle grid */}
        <defs>
          <pattern id="grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      <div className="floating-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};


