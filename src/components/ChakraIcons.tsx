import React from 'react';

interface ChakraIconProps {
  size?: number;
  className?: string;
}

export const RootChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="rootGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B22222" />
        <stop offset="100%" stopColor="#8B0000" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#rootGradient)" stroke="#fff" strokeWidth="2" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#fff" strokeWidth="1" opacity="0.7" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
    <circle cx="50" cy="50" r="5" fill="#fff" />
    <path d="M20 20 L80 20 L80 80 L20 80 Z" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
  </svg>
);

export const SacralChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="sacralGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8C00" />
        <stop offset="100%" stopColor="#FF4500" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#sacralGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M30 30 Q50 20 70 30 Q80 50 70 70 Q50 80 30 70 Q20 50 30 30 Z" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="M40 40 Q50 35 60 40 Q65 50 60 60 Q50 65 40 60 Q35 50 40 40 Z" fill="none" stroke="#fff" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="8" fill="#fff" />
  </svg>
);

export const SolarPlexusChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="solarGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#solarGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M20 50 L80 50 M50 20 L50 80" stroke="#fff" strokeWidth="3" />
    <path d="M30 30 L70 70 M70 30 L30 70" stroke="#fff" strokeWidth="2" />
    <circle cx="50" cy="50" r="12" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="50" cy="50" r="6" fill="#fff" />
  </svg>
);

export const HeartChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#32CD32" />
        <stop offset="100%" stopColor="#228B22" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#heartGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M50 30 Q30 30 30 50 Q30 70 50 70 Q70 70 70 50 Q70 30 50 30 Z" fill="none" stroke="#fff" strokeWidth="3" />
    <path d="M40 40 Q50 35 60 40 Q65 50 60 60 Q50 65 40 60 Q35 50 40 40 Z" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="50" cy="50" r="8" fill="#fff" />
  </svg>
);

export const ThroatChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="throatGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4169E1" />
        <stop offset="100%" stopColor="#0000CD" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#throatGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M30 40 L70 40 L70 60 L30 60 Z" fill="none" stroke="#fff" strokeWidth="3" />
    <path d="M35 45 L65 45 M35 50 L65 50 M35 55 L65 55" stroke="#fff" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="8" fill="#fff" />
  </svg>
);

export const ThirdEyeChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="thirdEyeGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="100%" stopColor="#4B0082" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#thirdEyeGradient)" stroke="#fff" strokeWidth="2" />
    <ellipse cx="50" cy="50" rx="25" ry="15" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="50" cy="50" r="8" fill="#fff" />
    <path d="M30 30 L70 30 M30 70 L70 70" stroke="#fff" strokeWidth="2" opacity="0.7" />
  </svg>
);

export const CrownChakraIcon: React.FC<ChakraIconProps> = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="crownGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9370DB" />
        <stop offset="100%" stopColor="#663399" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#crownGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="50" cy="50" r="8" fill="#fff" />
    <path d="M50 15 L50 25 M50 75 L50 85" stroke="#fff" strokeWidth="2" />
  </svg>
);

export const getChakraIcon = (chakraId: string, size?: number, className?: string) => {
  const iconProps = { size, className };
  
  switch (chakraId) {
    case 'root':
      return <RootChakraIcon {...iconProps} />;
    case 'sacral':
      return <SacralChakraIcon {...iconProps} />;
    case 'solar':
      return <SolarPlexusChakraIcon {...iconProps} />;
    case 'heart':
      return <HeartChakraIcon {...iconProps} />;
    case 'throat':
      return <ThroatChakraIcon {...iconProps} />;
    case 'third-eye':
      return <ThirdEyeChakraIcon {...iconProps} />;
    case 'crown':
      return <CrownChakraIcon {...iconProps} />;
    default:
      return <RootChakraIcon {...iconProps} />;
  }
};



