import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  className = '' 
}) => {
  const { colors, period } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-lg';
      case 'large':
        return 'w-16 h-16 text-4xl';
      default:
        return 'w-12 h-12 text-2xl';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  };

  return (
    <div className={`logo-container flex items-center gap-3 ${className}`}>
      {/* Visual Logo - Flowing Water Drop */}
      <div 
        className={`logo-icon ${getSizeClasses()} flex items-center justify-center rounded-full relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.accent}20 100%)`,
          border: `2px solid ${colors.accent}30`,
          color: colors.accent
        }}
      >
        {/* Water drop shape */}
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="w-3/4 h-3/4 drop-shadow-sm"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        
        {/* Flowing animation overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${colors.accent}20 50%, transparent 70%)`,
            animation: 'flowing-shimmer 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="logo-text">
          <div 
            className={`font-logo font-light tracking-wide ${getTextSize()}`}
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: colors.text,
              lineHeight: 1.2
            }}
          >
            The Art of Flowing
          </div>
        </div>
      )}
    </div>
  );
};

// CSS for the flowing animation
const logoStyles = `
@keyframes flowing-shimmer {
  0%, 100% {
    transform: translateX(-100%) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translateX(100%) rotate(180deg);
    opacity: 0.3;
  }
}

.logo-container {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.logo-container:hover .logo-icon {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.logo-icon {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.font-logo {
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.font-logo::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: logo-shimmer 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes logo-shimmer {
  0%, 100% {
    background-position: -200% 0;
  }
  50% {
    background-position: 200% 0;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = logoStyles;
  document.head.appendChild(styleSheet);
}
