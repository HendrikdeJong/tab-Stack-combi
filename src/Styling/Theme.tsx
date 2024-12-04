import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';


const common = {
  whisperGreen: '#006561',
  whiteText: '#FFFFFF',
  selected: '#D1D1D1',
  notification: '#FFA500',
  error: '#FF0000',
};

const themes = {
  light: {
    ...common,
    background: '#FFFFFF',
    invertbackground: '#333',
    invertText: '#FFFFFF',
    subtext: '#6E6E6E',
    text: '#000000',
    card: '#e6e3e395',
    border: '#D1D1D1',
    primary: '#007BFF',
  },
  dark: {
    ...common,
    background: '#333',
    invertbackground: '#FFFFFF',
    invertText: '#000000',
    subtext: '#B5B5B5',
    text: '#FFFFFF',
    card: '#1F1F1F95',
    border: '#4d4d4d',
    primary: '#1E90FF',
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext(themes.dark);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => listener.remove();
  }, []);
  const currentTheme = themes[theme];
  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
