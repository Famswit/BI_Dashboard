"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme") as PaletteMode;
    if (storedMode) setMode(storedMode);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const nextMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#000000",
                  paper: "#121212",
                },
                text: {
                  primary: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#ffffff",
                  paper: "#f5f5f5",
                },
                text: {
                  primary: "#000000",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
