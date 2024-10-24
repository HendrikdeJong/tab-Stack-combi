import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';


const common = {
  whisperGreen: '#006561',
  whiteText: '#FFFFFF',
  selected: '#D1D1D1',
};

const themes = {
  light: {
    ...common,
    background: '#FFFFFF',
    invertbackground: '#333',
    invertText: '#FFFFFF',
    text: '#000000',
    card: '#F5F5F5',
    border: '#D1D1D1',
    primary: '#6200EE',
    notification: '#FF0266',
  },
  dark: {
    ...common,
    background: '#333',
    invertbackground: '#FFFFFF',
    invertText: '#000000',
    text: '#FFFFFF',
    card: '#1F1F1F',
    border: '#4d4d4d',
    primary: '#BB86FC',
    notification: '#CF6679',
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