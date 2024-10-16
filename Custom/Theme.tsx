import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const themes = {
    light: {
      whisperGreen: '#247870',
      background: '#FFFFFF',
      invertbackground: '#333',
      invertText: '#FFFFFF',
      whiteText: '#FFFFFF',
      selected: '#D1D1D1',
      text: '#000000',
      card: '#F5F5F5',
      border: '#D1D1D1',
      primary: '#6200EE',
      notification: '#FF0266',
    },
    dark: {
      whisperGreen: '#247870',
      background: '#333',
      invertbackground: '#FFFFFF',
      invertText: '#000000',
      whiteText: '#FFFFFF',
      selected: '#D1D1D1',
      text: '#FFFFFF',
      card: '#1F1F1F',
      border: '#4d4d4d',
      primary: '#BB86FC',
      notification: '#CF6679',
    },
  };
const ThemeContext = createContext(themes.dark);

export const ThemeProvider = ({ children }) => {
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
