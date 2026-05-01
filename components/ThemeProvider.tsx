"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { defaultThemeId, getThemeById, type ThemeId } from "@/src/lib/themes";

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const storageKey = "coupleflow-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(defaultThemeId);

  const theme = getThemeById(themeId);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId,
      setThemeId: (nextThemeId) => {
        setThemeIdState(nextThemeId);
        window.localStorage.setItem(storageKey, nextThemeId);
      },
    }),
    [themeId],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className="min-h-screen transition-colors duration-200"
        data-theme={theme.id}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
