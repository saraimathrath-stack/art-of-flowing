import React, { createContext, useContext, useEffect, useState } from "react";

type ThemePeriod = "morning" | "day" | "evening" | "night";
type ColorPalette = "original" | "warm" | "ocean" | "sunset";

interface ThemeContextType {
  period: ThemePeriod;
  palette: ColorPalette;
  colors: {
    background: string;
    accent: string;
    card: string;
    text: string;
    secondary: string;
  };
  setPalette: (palette: ColorPalette) => void;
  setPeriod: (period: ThemePeriod) => void;
  isDayMode: boolean;
  toggleDayNight: () => void;
}

const colorPalettes = {
  original: {
    morning: { 
      background: "#F8F6F1", 
      accent: "#C9A227", 
      card: "rgba(255,255,255,0.9)", 
      text: "#1C1C1C",
      secondary: "#7A8E92"
    },
    day: { 
      background: "#F8F6F1", 
      accent: "#C9A227", 
      card: "rgba(255,255,255,0.95)", 
      text: "#1C1C1C",
      secondary: "#7A8E92"
    },
    evening: { 
      background: "#F8F6F1", 
      accent: "#C9A227", 
      card: "rgba(255,255,255,0.9)", 
      text: "#1C1C1C",
      secondary: "#7A8E92"
    },
    night: {
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)",
      accent: "#2d3748",
      card: "rgba(255,255,255,0.08)",
      text: "#e8e8e8",
      secondary: "#a0aec0"
    }
  },
  warm: {
    morning: { 
      background: "#FAF3E0", 
      accent: "#D99873", 
      card: "rgba(255,255,255,0.9)", 
      text: "#3A2E2A",
      secondary: "#E8C4A2"
    },
    day: { 
      background: "#FAF3E0", 
      accent: "#D99873", 
      card: "rgba(255,255,255,0.95)", 
      text: "#3A2E2A",
      secondary: "#E8C4A2"
    },
    evening: { 
      background: "#FAF3E0", 
      accent: "#D99873", 
      card: "rgba(255,255,255,0.9)", 
      text: "#3A2E2A",
      secondary: "#E8C4A2"
    },
    night: {
      background: "linear-gradient(135deg, #8B455F 0%, #4A2C2A 25%, #2F1B1A 50%, #8B455F 75%, #4A2C2A 100%)",
      accent: "#2F1B1A",
      card: "rgba(255,248,225,0.08)",
      text: "#FFF8E1",
      secondary: "#FFDAB9"
    }
  },
  ocean: {
    morning: { 
      background: "#E8F4F8", 
      accent: "#3E8E9E", 
      card: "rgba(255,255,255,0.9)", 
      text: "#1E2A32",
      secondary: "#8FBBCB"
    },
    day: { 
      background: "#E8F4F8", 
      accent: "#3E8E9E", 
      card: "rgba(255,255,255,0.95)", 
      text: "#1E2A32",
      secondary: "#8FBBCB"
    },
    evening: { 
      background: "#E8F4F8", 
      accent: "#3E8E9E", 
      card: "rgba(255,255,255,0.9)", 
      text: "#1E2A32",
      secondary: "#8FBBCB"
    },
    night: { 
      background: "#0B1C2C", 
      accent: "#4DD0E1", 
      card: "rgba(31,58,74,0.85)", 
      text: "#E6F4F1",
      secondary: "#A8C5C9"
    }
  },
  sunset: {
    morning: { 
      background: "#FFF4E8", 
      accent: "#E27D60", 
      card: "rgba(255,255,255,0.9)", 
      text: "#3B1E17",
      secondary: "#F5B971"
    },
    day: { 
      background: "#FFF4E8", 
      accent: "#E27D60", 
      card: "rgba(255,255,255,0.95)", 
      text: "#3B1E17",
      secondary: "#F5B971"
    },
    evening: { 
      background: "#FFF4E8", 
      accent: "#E27D60", 
      card: "rgba(255,255,255,0.9)", 
      text: "#3B1E17",
      secondary: "#F5B971"
    },
    night: {
      background: "linear-gradient(135deg, #451A03 0%, #92400E 25%, #D97706 50%, #451A03 75%, #92400E 100%)",
      accent: "#D97706",
      card: "rgba(254,243,199,0.08)",
      text: "#FEF3C7",
      secondary: "#FDE68A"
    }
  }
};

const ThemeContext = createContext<ThemeContextType>({
  period: "day",
  palette: "original",
  colors: colorPalettes.original.day,
  setPalette: () => {},
  setPeriod: () => {},
  isDayMode: true,
  toggleDayNight: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [period, setPeriod] = useState<ThemePeriod>("day");
  const [palette, setPalette] = useState<ColorPalette>("original");
  const [isDayMode, setIsDayMode] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 7) setPeriod("night");
    else if (hour < 12) setPeriod("morning");
    else if (hour < 18) setPeriod("day");
    else if (hour < 21) setPeriod("evening");
    else setPeriod("night");
  }, []);

  const colors = colorPalettes[palette][period];

  const handleSetPalette = (newPalette: ColorPalette) => {
    setPalette(newPalette);
  };

  const handleSetPeriod = (newPeriod: ThemePeriod) => {
    setPeriod(newPeriod);
  };

  const toggleDayNight = () => {
    if (isDayMode) {
      setPeriod("night");
      setIsDayMode(false);
    } else {
      setPeriod("day");
      setIsDayMode(true);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      period, 
      palette, 
      colors, 
      setPalette: handleSetPalette,
      setPeriod: handleSetPeriod,
      isDayMode,
      toggleDayNight
    }}>
      <div className={`theme-${period} palette-${palette}`} style={{ background: colors.background, color: colors.text, minHeight: "100vh", transition: "background 1s" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};