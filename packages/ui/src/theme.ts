import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeConfig {
  mode: ThemeMode;
}

export const ThemeContext = createContext<ThemeConfig>({ mode: "light" });

export const useTheme = () => useContext(ThemeContext);
