import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <path 
      d="M12 3L2 12H5V20H19V12H22L12 3Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 20V14H15V20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const FinanceIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <path 
      d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

export const ProjectsIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <path 
      d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 7L12 13L21 7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="8" 
      cy="12" 
      r="1" 
      fill="currentColor"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="1" 
      fill="currentColor"
    />
    <circle 
      cx="16" 
      cy="12" 
      r="1" 
      fill="currentColor"
    />
  </svg>
);

export const ReflectionIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <path 
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11H13C14.1 11 15 10.1 15 9Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22ZM3 15V17L9 23L15 17V15C15 13.9 14.1 13 13 13H11C9.9 13 9 13.9 9 15Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 12C12 12 12 8 8 8C8 8 8 12 12 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 12C12 12 16 12 16 16C16 16 12 16 12 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ManifestoIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <path 
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 2V8H20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 13H8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 17H8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M10 9H9H8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const WisdomIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 17H12.01" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2C13.5 2 15 2.5 16 3.5C17 4.5 17.5 6 17.5 7.5C17.5 9 17 10.5 16 11.5C15 12.5 13.5 13 12 13C10.5 13 9 12.5 8 11.5C7 10.5 6.5 9 6.5 7.5C6.5 6 7 4.5 8 3.5C9 2.5 10.5 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChakraIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="6" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="2" 
      stroke="currentColor" 
      strokeWidth="1"
    />
    <path 
      d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 8L16 16M8 16L16 8" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={{ color }}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
  </svg>
);

// Icon mapping for easy use
export const iconMap = {
  home: HomeIcon,
  finance: FinanceIcon,
  projects: ProjectsIcon,
  reflection: ReflectionIcon,
  manifesto: ManifestoIcon,
  wisdom: WisdomIcon,
  chakra: ChakraIcon,
  settings: SettingsIcon,
};


