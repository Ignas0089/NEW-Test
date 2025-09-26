import type { PropsWithChildren } from "react";
import { ThemeContext, type ThemeConfig } from "./theme";

export interface ThemeProviderProps extends PropsWithChildren {
  value?: ThemeConfig;
}

export function ThemeProvider({ children, value }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={value ?? { mode: "light" }}>
      {children}
    </ThemeContext.Provider>
  );
}
