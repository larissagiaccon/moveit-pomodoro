import React, { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { dark, light} from '../styles/themes';

interface ThemeContextData {
  theme: DefaultTheme;
  
  ToggleTheme(): void;
}
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

export const ThemesProvider: React.FC = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<DefaultTheme>(light);

  useEffect(() => {
    const themeLocal = localStorage.getItem('@MoveYourself:theme');

    setTheme(themeLocal === 'light' ? light : dark);
  }, [])

  const ToggleTheme = () => {
    if (theme.title === 'light') {
      localStorage.setItem('@MoveYourself:theme', dark.title);
      setTheme(dark);
    } else {
      localStorage.setItem('@MoveYourself:theme', light.title);
      setTheme(light);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        ToggleTheme
    }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  return context;
}