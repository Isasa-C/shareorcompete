export type ThemeId =
  | "mint-amber"
  | "sky-mint"
  | "sky-lavender"
  | "editorial-ink";

export type ThemeDefinition = {
  id: ThemeId;
  name: string;
  tagline: string;
  vibe: string;
  tokens: {
    bgPage: string;
    bgCard: string;
    textPrimary: string;
    textSecondary: string;
    borderHairline: string;
    partnerA: string;
    partnerB: string;
    partnerALight: string;
    partnerBLight: string;
    accentAction: string;
    primaryDeep: string;
    textLight: string;
    shadowSoft: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
};

export const themes: ThemeDefinition[] = [
  {
    id: "mint-amber",
    name: "Mint & Amber",
    tagline: "WARM · COZY",
    vibe: "Sunday morning, croissants, soft light",
    tokens: {
      bgPage: "#F5EFE4",
      bgCard: "#FFFFFF",
      textPrimary: "#2A2A2A",
      textSecondary: "#8A8578",
      borderHairline: "#E8E2D5",
      partnerA: "#7DAA92",
      partnerB: "#D4A24C",
      partnerALight: "#DCEADF",
      partnerBLight: "#F3E3BD",
      accentAction: "#2A2A2A",
      primaryDeep: "#547A65",
      textLight: "#B8B0A3",
      shadowSoft: "rgba(125,170,146,0.18)",
      chart1: "#7DAA92",
      chart2: "#D4A24C",
      chart3: "#F5C842",
      chart4: "#C4634A",
      chart5: "#9B87C4",
    },
  },
  {
    id: "sky-mint",
    name: "Sky & Mint",
    tagline: "FRESH · BALANCED",
    vibe: "Morning walk, fresh air, clean slate",
    tokens: {
      bgPage: "#FFFFFF",
      bgCard: "#FAFAFA",
      textPrimary: "#1A1A1A",
      textSecondary: "#6B6B6B",
      borderHairline: "#EAEAEA",
      partnerA: "#5BABF0",
      partnerB: "#7EC8A0",
      partnerALight: "#D0E9FF",
      partnerBLight: "#D4F0E3",
      accentAction: "#1A1A1A",
      primaryDeep: "#2A8AD0",
      textLight: "#A8C4D8",
      shadowSoft: "rgba(91,171,240,0.18)",
      chart1: "#5BABF0",
      chart2: "#7EC8A0",
      chart3: "#F5C842",
      chart4: "#FF8C69",
      chart5: "#B094D4",
    },
  },
  {
    id: "sky-lavender",
    name: "Sky & Lavender",
    tagline: "CALM · DREAMY",
    vibe: "Evening wind-down, soft and dreamy",
    tokens: {
      bgPage: "#F4F1FA",
      bgCard: "#FFFFFF",
      textPrimary: "#1A1A1A",
      textSecondary: "#6B6B6B",
      borderHairline: "#E5DFEF",
      partnerA: "#5B9BD5",
      partnerB: "#9B87C4",
      partnerALight: "#D0E9FF",
      partnerBLight: "#E6DEF7",
      accentAction: "#1A1A1A",
      primaryDeep: "#4B82BE",
      textLight: "#B8B0CE",
      shadowSoft: "rgba(91,155,213,0.18)",
      chart1: "#5B9BD5",
      chart2: "#9B87C4",
      chart3: "#F5C842",
      chart4: "#FF8C69",
      chart5: "#7DAA92",
    },
  },
  {
    id: "editorial-ink",
    name: "Editorial Ink",
    tagline: "MINIMAL · MAGAZINE",
    vibe: "Quiet luxury, Kinfolk magazine, less is more",
    tokens: {
      bgPage: "#FAFAF7",
      bgCard: "#FFFFFF",
      textPrimary: "#111111",
      textSecondary: "#6B6B6B",
      borderHairline: "#EAEAEA",
      partnerA: "#1A1A1A",
      partnerB: "#1A1A1A",
      partnerALight: "#EFE8E5",
      partnerBLight: "#EAEAEA",
      accentAction: "#C4634A",
      primaryDeep: "#1A1A1A",
      textLight: "#A3A3A3",
      shadowSoft: "rgba(26,26,26,0.12)",
      chart1: "#C4634A",
      chart2: "#1A1A1A",
      chart3: "#A3A3A3",
      chart4: "#7A7A55",
      chart5: "#D4D4D4",
    },
  },
];

export const defaultThemeId: ThemeId = "sky-mint";

export function getThemeById(themeId: string | null | undefined) {
  return themes.find((theme) => theme.id === themeId) ?? themes[3];
}
