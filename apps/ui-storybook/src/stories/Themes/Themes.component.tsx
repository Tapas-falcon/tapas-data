import * as React from "react";
import startCase from "lodash/startCase";
import { deepmerge } from "@mui/utils";
import { decomposeColor } from "@mui/system";
import * as mdColors from "@mui/material/colors";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import {
  CssVarsProvider,
  extendTheme,
  ColorPaletteProp,
  VariantProp,
  PaletteVariant,
  Palette,
} from "@mui/joy/styles";
import Autocomplete, { AutocompleteProps } from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input, { InputProps } from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Sheet, { SheetProps } from "@mui/joy/Sheet";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import TabPanel, { tabPanelClasses } from "@mui/joy/TabPanel";
import Tab, { tabClasses } from "@mui/joy/Tab";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import literalToObject from "./literalToObject";

const palettes = {
    primary: {
      "50": undefined,
      "100": "#F9F2E8",
      "200": "#895F38",
      "300": undefined,
      "400": undefined,
      "500": "#644528",
      "600": undefined,
      "700": undefined,
      "800": "#46301C",
      "900": undefined,
      "solidActiveColor": "var(--joy-palette-common-white)",
      "solidActiveBg": "var(--joy-palette-neutral-540)",
      "solidHoverBg": "var(--joy-palette-neutral-540)",
      "solidBg": "var(--joy-palette-primary-500)",
      "solidColor": "var(--joy-palette-neutral-79)",
      "softBg": "var(--joy-palette-primary-200)",
      "softHoverBg": "var(--joy-palette-neutral-540)",
      "softActiveColor": "var(--joy-palette-common-white)",
      "softActiveBg": "var(--joy-palette-neutral-540)",
      "softColor": "var(--joy-palette-neutral-79)"
    },
    neutral: {
      "4": "rgba(0,0,0, 0.04)",
      "8": "rgba(255,255,255,0.08)",
      "16": "rgba(255,255,255,0.16)",
      "30": "rgba(255,255,255,0.3)",
      "50": "rgba(255,255,255, 0.5)",
      "79": "rgba(255,255,255, 0.8)",
      "80": "rgba(0,0,0, 0.08)",
      "120": "rgba(0,0,0, 0.12)",
      "260": "rgba(0,0,0, 0.26)",
      "540": "rgba(0,0,0, 0.54)",
      "870": "rgba(0,0,0, 0.87)",
      "softBg": "var(--joy-palette-neutral-80)",
      "softColor": "var(--joy-palette-neutral-870)",
      "softHoverBg": "var(--joy-palette-neutral-120)",
      "softActiveBg": "var(--joy-palette-neutral-870)",
      "softActiveColor": "var(--joy-palette-common-white)",
      "softDisabledBg": "var(--joy-palette-neutral-80)",
      "softDisabledColor": "var(--joy-palette-neutral-260)",
      "plainColor": "var(--joy-palette-neutral-870)",
      "plainHoverBg": "var(--joy-palette-neutral-120)",
      "plainActiveColor": "var(--joy-palette-common-white)",
      "plainHoverColor": "var(--joy-palette-neutral-870)",
      "plainActiveBg": "var(--joy-palette-neutral-540)",
      "plainDisabledColor": "var(--joy-palette-neutral-260)",
      "solidBg": "var(--joy-palette-neutral-870)",
      "solidHoverBg": "var(--joy-palette-primary-200)",
      "solidDisabledBg": "var(--joy-palette-neutral-80)",
      "solidDisabledColor": "var(--joy-palette-neutral-260)",
      "solidActiveBg": "var(--joy-palette-neutral-870)",
      "outlinedColor": "var(--joy-palette-neutral-870)",
      "outlinedBorder": "var(--joy-palette-neutral-120)",
      "outlinedHoverBg": "undefined",
      "outlinedHoverBorder": "var(--joy-palette-neutral-870)",
      "outlinedHoverColor": "var(--joy-palette-neutral-870)",
      "outlinedActiveBg": "undefined",
      "outlinedActiveColor": "var(--joy-palette-neutral-870)",
      "outlinedActiveBorder": "var(--joy-palette-neutral-120)",
      "outlinedDisabledBorder": "var(--joy-palette-neutral-120)",
      "outlinedDisabledColor": "var(--joy-palette-neutral-260)"
    },
    success: {
      "500": "#57B07B",
    },
    danger: {
      "500": "#FF3B30",
      "800": "#B81F1E",
      "outlinedBorder": "var(--joy-palette-danger-800)",
      "outlinedColor": "var(--joy-palette-danger-800)"
    },
    warning: {
      "500": "#DCD421",
    },
    accent: {
      "50": undefined,
      "80": "var(--joy-palette-neutral-79)",
      "100": undefined,
      "200": undefined,
      "300": undefined,
      "400": undefined,
      "500": "#F55523",
      "600": undefined,
      "700": undefined,
      "800": undefined,
      "900": undefined,
      mainChannel: "var(--joy-palette-common-white)",
      solidBg: "var(--joy-palette-accent-500)",
      solidColor: "var(--joy-palette-common-white)",
      solidHoverBg: "var(--joy-palette-accent-500)",
      solidActiveBg: "var(--joy-palette-accent-500)",
      outlinedBorder: "var(--joy-palette-accent-500)",
      outlinedActiveBg: "undefined",
      plainColor: "var(--joy-palette-neutral-870)",
      plainActiveBg: "undefined",
      plainHoverBg: "undefined",
      outlinedHoverBg: "undefined",
    },
    blue: {
      "500": "#007AFF",
      "800": "#3E6DA4",
    },
    text: {
      primary: "var(--joy-palette-neutral-870)",
      icon: "var(--joy-palette-neutral-540)",
      placeholder: "var(--joy-palette-neutral-260)",
    },
    background: {
      surface: "var(--joy-palette-primary-100)",
    },
};
 
const augmentPalette = (colorSchemes: any, prop: keyof Palette) => {
  const defaultTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: palettes,
      },
    },
  });
  if (!colorSchemes) {
    return "";
  }
  const result: Array<string> = [];
  const palette = {
    ...colorSchemes.light?.palette?.[prop],
    ...colorSchemes.dark?.palette?.[prop],
  };
  Object.keys(palette).forEach((k) => {
    if (
      !Object.keys(defaultTheme.colorSchemes.light.palette[prop]).includes(k) &&
      !k.match(/^(plain|outlined|soft|solid)/)
    ) {
      result.push(`${k}: true;`);
    }
    if (
      Object.keys(defaultTheme.colorSchemes.light.palette[prop]).includes(k) &&
      palette[k] === undefined
    ) {
      result.push(`${k}: false;`);
    }
  });
  return result.join("\n");
};

const prependSpace = (text: string, space = 0) => {
  const lines = text
    .split("\n")
    .map((line) => `${[...Array(space).fill(" ")].join("")}${line}`);
  return lines.join("\n");
};

const renderInterface = (name: string, text: string) => {
  if (!text || !text.trim()) {
    return "";
  }
  return `interface ${name} {
${text}
  }`;
};

const generateThemeAugmentation = function (data: any) {
  const result = [
    renderInterface(
      "PalettePrimaryOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "primary"), 4)
    ),
    renderInterface(
      `PaletteNeutralOverrides`,
      prependSpace(augmentPalette(data?.colorSchemes, "neutral"), 4)
    ),
    renderInterface(
      "PaletteDangerOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "danger"), 4)
    ),
    renderInterface(
      "PaletteSuccessOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "success"), 4)
    ),
    renderInterface(
      "PaletteWarningOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "warning"), 4)
    ),
    renderInterface(
      "PaletteWarningOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "accent"), 4)
    ),
    renderInterface(
      "PaletteWarningOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "blue"), 4)
    ),
    renderInterface(
      "PaletteBackgroundOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "background"), 4)
    ),
    renderInterface(
      "PaletteCommonOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "common"), 4)
    ),
    renderInterface(
      "PaletteTextOverrides",
      prependSpace(augmentPalette(data?.colorSchemes, "text"), 4)
    ),
  ]
    .filter((text) => !!text)
    .join("\n  ");
  return `
declare module '@mui/joy/styles' {
  ${
    result === ""
      ? "// No custom tokens found, you can skip the theme augmentation."
      : result
  }
}
`;
};

const tailwindColors = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
};

const defaultTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: palettes,
    },
  },
});

const generateThemeCode = (data: any) =>
  `
import { extendTheme } from '@mui/joy/styles';

${generateThemeAugmentation(data)}

const theme = extendTheme(${JSON.stringify(
    data,
    (k, v) => (v === undefined ? "__undefined" : v),
    2
  ).replace(/"__undefined"/g, "undefined")})

export default theme;`;

function getPaletteFormProps(
  colorSchemes: any,
  colorMode: string,
  node: string
) {
  // @ts-ignore
  const themeDefaultValue = defaultTheme.colorSchemes[colorMode].palette[node];
  const value = colorSchemes[colorMode][node] || {};

  const mergedValue = { ...themeDefaultValue, ...value };
  return {
    themeDefaultValue,
    value,
    mergedValue,
    tokens: Object.keys(mergedValue).filter(
      (k) => mergedValue[k] !== undefined
    ),
  };
}

function ColorBubblePreview({
  sx,
  value,
  ...props
}: SheetProps & { value: string | undefined }) {
  return (
    <Sheet
      variant="outlined"
      {...props}
      sx={[
        {
          width: 20,
          height: 20,
          borderRadius: "50%",
          ...(value?.includes("-gradient")
            ? {
                background: value,
              }
            : {
                bgcolor: value,
              }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

function CodeBlockResult({
  data,
  onClose,
  ...props
}: { data: any; onClose: () => void } & SheetProps) {
  const [lang, setLang] = React.useState("js");
  return (
    <Sheet
      variant="outlined"
      {...props}
      sx={{
        borderRadius: "sm",
        overflow: "auto",
        "&& pre": {
          maxHeight: "initial",
          minHeight: 450,
          borderRadius: 0,
          margin: 0,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={lang}
          onChange={(event, newValue) => setLang(newValue as string)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            variant="plain"
            size="sm"
            sx={{
              flexGrow: 0,
              "--List-radius": "0px",
              "--List-padding": "0px",
              "--List-gap": "0px",
              "--ListItem-minHeight": "48px",
              "--ListItem-paddingX": "16px",
              [`& .${tabClasses.root}`]: {
                bgcolor: "transparent",
                color: "text.tertiary",
                flexGrow: 0,
                "&:hover, &:active": {
                  bgcolor: "transparent",
                },
              },
              [`& .${tabClasses.selected}`]: {
                boxShadow: "none",
                fontWeight: "lg",
                color: "text.primary",
                "&::after": {
                  content: '""',
                  display: "block",
                  height: 3,
                  bgcolor: "primary.500",
                  position: "absolute",
                  insetInline: 0,
                  bottom: 0,
                },
              },
            }}
          >
            <Tab value="js">
              <ListItemDecorator>
                <DescriptionOutlinedIcon />
              </ListItemDecorator>
              theme.js
            </Tab>
            <Tab value="ts">
              <ListItemDecorator>{/* <TypeScriptIcon /> */}</ListItemDecorator>
              theme.d.ts
            </Tab>
          </TabList>
        </Tabs>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={onClose}
          sx={{ ml: "auto", mr: 1 }}
        >
          <Close />
        </IconButton>
      </Box>
      {/* <BrandingProvider mode="dark">
        <HighlightedCode
          language={lang}
          code={lang === 'ts' ? generateThemeAugmentation(data) : generateThemeCode(data)}
        />
      </BrandingProvider> */}
    </Sheet>
  );
}

function ColorInput({
  value = "",
  onValidColor,
  onEmptyColor,
  ...props
}: InputProps & {
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
}) {
  const [internalValue, setInternalValue] = React.useState(value);
  const [isError, setIsError] = React.useState(false);
  const focused = React.useRef(false);
  React.useEffect(() => {
    if (value !== internalValue && !focused.current) {
      setInternalValue(value || "");
    }
  }, [value, internalValue]);
  return (
    <Input
      {...props}
      size="sm"
      error={isError}
      startDecorator={
        <ColorBubblePreview
          value={internalValue || props.placeholder}
          sx={{
            mr: -0.5,
          }}
        />
      }
      value={internalValue}
      onFocus={(event) => {
        (event.target as HTMLInputElement).select();
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        if (inputValue === "") {
          onEmptyColor();
          setIsError(false);
        } else if (inputValue.match(/^var\(--.*\)$/)) {
          onValidColor(inputValue);
          setIsError(false);
        } else {
          try {
            decomposeColor(inputValue); // if inputValue is not a valid color, it throws an error
            onValidColor(inputValue);
            setIsError(false);
          } catch (error) {
            setIsError(true);
          }
        }
      }}
    />
  );
}

function PaletteImport({
  onSelect,
  colorMode = "light",
}: {
  onSelect: (palette: Record<string, string>) => void;
  colorMode: "light" | "dark";
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <React.Fragment>
      <Modal
        data-joy-color-scheme={colorMode}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <ModalDialog
          aria-labelledby="color-palettes-modal"
          sx={{ "--ModalDialog-minWidth": "700px" }}
        >
          <ModalClose />
          <Typography id="color-palettes-modal" component="h2">
            Palettes
          </Typography>
          <Alert
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<InfoOutlined />}
            sx={{ bgcolor: "neutral.softBg", my: 1 }}
          >
            The selected palette will replace the default Joy UI color tokens or
            the ones you inserted.
          </Alert>
          <Tabs
            size="sm"
            defaultValue={0}
            sx={{
              minHeight: 0,
              flexBasis: 480,
              [`& .${tabPanelClasses.root}`]: {
                overflow: "auto",
                mr: -2,
                pr: 2,
              },
            }}
          >
            <TabList
              variant="plain"
              sx={{
                "--List-padding": "0px",
                "--List-gap": "1rem",
                "--ListItem-minHeight": "48px",
                "--ListItemDecorator-size": "2rem",
                "& > button": {
                  bgcolor: "transparent",
                  boxShadow: "none",
                  flex: "none",
                  color: "text.tertiary",
                  fontWeight: "md",
                  "&:hover": { bgcolor: "transparent" },
                  '&[aria-selected="true"]': {
                    color: "text.primary",
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      height: 2,
                      left: 0,
                      right: 0,
                      bottom: -1,
                      bgcolor: `neutral.solidBg`,
                    },
                  },
                },
              }}
            >
              <Tab>
                <ListItemDecorator>
                  <SvgIcon viewBox="0 0 53 31" fontSize="xl2">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                      fill="#38bdf8"
                    />
                  </SvgIcon>
                </ListItemDecorator>{" "}
                Tailwind CSS
              </Tab>
              <Tab>
                <ListItemDecorator>
                  <SvgIcon viewBox="0 0 24 24" fontSize="xl">
                    <circle cx="12" cy="12" fill="#757575" r="12" />
                    <path d="m3.6 3.6h16.8v16.8h-16.8z" fill="#bdbdbd" />
                    <path d="m20.4 3.6-8.4 16.8-8.4-16.8z" fill="#fff" />
                    <path d="m0 0h24v24h-24z" fill="none" />
                  </SvgIcon>
                </ListItemDecorator>{" "}
                Material Design
              </Tab>
            </TabList>
            <Divider inset="context" />
            <TabPanel value={0}>
              <List
                size="sm"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 1,
                }}
              >
                {Object.entries(tailwindColors).map(([name, colors]) => (
                  <ListItem key={name}>
                    <ListItemButton
                      aria-label={name}
                      onClick={() => {
                        setAnchorEl(null);
                        onSelect(colors);
                      }}
                    >
                      <Typography sx={{ mr: "auto" }}>{name}</Typography>
                      {Object.entries(colors).map(([key, value]) => (
                        <Box
                          key={key}
                          sx={{ width: 20, height: 20, bgcolor: value }}
                        />
                      ))}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value={1}>
              <List
                size="sm"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 1,
                }}
              >
                {Object.entries(mdColors).map(([name, colors]) => {
                  if (name === "common") {
                    return <React.Fragment key={name} />;
                  }
                  const filteredColors: Record<string, string> = {};
                  (Object.keys(colors) as Array<keyof typeof colors>).forEach(
                    (key) => {
                      if (!Number.isNaN(Number(key))) {
                        filteredColors[key] = colors[key];
                      }
                    }
                  );
                  return (
                    <ListItem key={name}>
                      <ListItemButton
                        aria-label={name}
                        onClick={() => {
                          setAnchorEl(null);
                          onSelect(filteredColors);
                        }}
                      >
                        <Typography sx={{ mr: "auto" }}>{name}</Typography>
                        {Object.entries(filteredColors).map(([key, value]) => (
                          <Box
                            key={key}
                            sx={{ width: 20, height: 20, bgcolor: value }}
                          />
                        ))}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </TabPanel>
          </Tabs>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

function ColorTokenCreator({
  onChange,
}: {
  onChange: (name: string, value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const nameRef = React.useRef<HTMLInputElement | null>(null);
  const colorRef = React.useRef<HTMLInputElement | null>(null);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  if (!open) {
    return (
      <Button
        size="sm"
        variant="soft"
        color="neutral"
        startDecorator={<Add />}
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          setOpen(true);
          nameRef.current?.focus();
        }}
      >
        Add token
      </Button>
    );
  }

  const isValidToken = name.trim() && color.trim();

  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{
        borderRadius: "sm",
        my: 1,
        p: 1,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Input
        autoFocus
        size="sm"
        placeholder="Token name/number"
        slotProps={{
          input: { ref: nameRef },
        }}
        onChange={(event) => setName(event.target.value)}
      />{" "}
      <b>:</b>{" "}
      <ColorInput
        size="sm"
        placeholder="A valid CSS color"
        value={color}
        onEmptyColor={() => {
          setColor("");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && name && color) {
            onChange(name, color);
            setOpen(false);
          }
        }}
        onValidColor={(newColor) => {
          setColor(newColor);
        }}
        slotProps={{
          input: { ref: colorRef },
        }}
        sx={{ flexGrow: 1 }}
      />
      <IconButton
        variant="solid"
        color={isValidToken ? "primary" : "neutral"}
        size="sm"
        onClick={() => {
          const trimmedName = name.trim();
          const trimmedColor = color.trim();

          if (!trimmedName) {
            nameRef.current?.focus();
          } else if (!trimmedColor) {
            colorRef.current?.focus();
          } else {
            onChange(trimmedName, trimmedColor);
            setColor("");
            setName("");
            setOpen(false);
          }
        }}
      >
        <Check />
      </IconButton>
    </Sheet>
  );
}

function ColorAutocomplete({
  value,
  onValidColor,
  onEmptyColor,
  options,
  ...props
}: AutocompleteProps<string, false, false, true> & {
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
  options: Array<string>;
}) {
  const [showEnter, setShowEnter] = React.useState(false);
  return (
    <Autocomplete
      freeSolo
      options={options}
      slotProps={{
        listbox: {
          disablePortal: true,
          placement: "bottom-start",
          sx: {
            minWidth: "max-content",
            maxHeight: 160,
          },
        },
      }}
      renderOption={(optionProps, data) => (
        <AutocompleteOption {...optionProps}>
          <ColorBubblePreview value={data} sx={{ mr: 0.5 }} />
          {data}
        </AutocompleteOption>
      )}
      value={value ?? ""}
      blurOnSelect
      openOnFocus
      {...props}
      startDecorator={
        <ColorBubblePreview
          value={value || props.placeholder}
          sx={{ mr: -0.5 }}
        />
      }
      endDecorator={showEnter ? "⏎" : ""}
      onChange={(event, newValue) => {
        setShowEnter(false);
        if (!newValue) {
          onEmptyColor();
        } else {
          onValidColor(newValue as string);
        }
      }}
      onInputChange={(event, newValue) => {
        setShowEnter(newValue !== value);
      }}
    />
  );
}

function GlobalVariantTokenCreator({
  primitiveTokens = [],
  availableTokens = [],
  onChange,
}: {
  primitiveTokens: Array<string>;
  availableTokens: Array<string>;
  onChange: (name: string, value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  if (!open) {
    return (
      <Button
        size="sm"
        variant="soft"
        color="neutral"
        startDecorator={<Add />}
        fullWidth
        sx={{ my: 1 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add token
      </Button>
    );
  }
  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{
        borderRadius: "sm",
        my: 2,
        p: 1,
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Select
        defaultListboxOpen
        placeholder="Select a token"
        size="sm"
        onChange={(event, newValue) => {
          setName(newValue as string);
          inputRef.current?.focus();
        }}
      >
        {availableTokens.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>{" "}
      <b>:</b>{" "}
      <Autocomplete
        options={primitiveTokens}
        size="sm"
        freeSolo
        blurOnSelect
        slotProps={{
          listbox: {
            disablePortal: true,
            placement: "bottom-start",
            sx: {
              minWidth: "max-content",
              maxHeight: 160,
            },
          },
          input: {
            ref: inputRef,
          },
        }}
        renderOption={(optionProps, data) => (
          <AutocompleteOption {...optionProps}>
            <ColorBubblePreview value={data} sx={{ mr: 0.5 }} />
            {data}
          </AutocompleteOption>
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (name) {
              onChange(
                name,
                (event.target as EventTarget & HTMLInputElement).value
              );
              setOpen(false);
            }
          }
        }}
        onChange={(event, newValue) => setColor(newValue || "")}
        onInputChange={(event, newValue) => setColor(newValue)}
        sx={{ flex: 1 }}
      />
      <IconButton
        variant="solid"
        color="neutral"
        size="sm"
        onClick={() => {
          if (name) {
            onChange(name, color);
            setOpen(false);
          }
        }}
      >
        <Check />
      </IconButton>
    </Sheet>
  );
}

function filterGlobalVariantTokens(
  palette: Partial<PaletteVariant>,
  variant: VariantProp
) {
  const tokens: Partial<PaletteVariant> = {};
  (Object.entries(palette) as Array<[keyof PaletteVariant, string]>).forEach(
    ([key, value]) => {
      if (
        key.match(/^(plain|outlined|soft|solid)/) &&
        key.startsWith(variant)
      ) {
        tokens[key] = value;
      }
    }
  );
  return tokens;
}

type StateReducer<T> = (state: T, action: Partial<T>) => T;

function GlobalVariantForm({
  color,
  themeDefaultValue: themeDefaultValueProp = {},
  value: valueProp = {},
  availableTokens = [],
  onChange,
  onRemove,
}: {
  availableTokens?: Array<string>;
  color: ColorPaletteProp;
  themeDefaultValue: any;
  value: any;
  onChange: (newValue: any) => void;
  onRemove: (token: string) => void;
}) {
  const [selectedVariant, setSelectedVariant] =
    React.useState<VariantProp>("solid");
  const [states, setStates] = React.useReducer<
    StateReducer<{ hover: boolean; active: boolean; disabled: boolean }>
  >((prevState, action) => ({ ...prevState, ...action }), {
    hover: false,
    active: false,
    disabled: false,
  });
  const themeDefaultValue = filterGlobalVariantTokens(
    themeDefaultValueProp,
    selectedVariant
  );
  const value = filterGlobalVariantTokens(valueProp, selectedVariant);
  const mergedValue = { ...themeDefaultValue, ...value };
  const tokens = (
    Object.keys(mergedValue) as Array<keyof PaletteVariant>
  ).filter((k) => mergedValue[k] !== undefined);
  const allTokens = [
    `${selectedVariant}Color`,
    `${selectedVariant}HoverColor`,
    `${selectedVariant}ActiveColor`,
    `${selectedVariant}DisabledColor`,
    `${selectedVariant}Bg`,
    `${selectedVariant}HoverBg`,
    `${selectedVariant}ActiveBg`,
    `${selectedVariant}DisabledBg`,
    `${selectedVariant}Border`,
    `${selectedVariant}HoverBorder`,
    `${selectedVariant}ActiveBorder`,
    `${selectedVariant}DisabledBorder`,
  ].filter((item) => !(tokens as Array<string>).includes(item));
  return (
    <React.Fragment>
      <Typography component="div" fontWeight="xl" level="title-md">
        Global variant tokens
      </Typography>
      <Typography component="div" level="body-sm" mb={2} mt={0.5}>
        Pick the specific primitive color, now in CSS variables form already, to
        correspond to a semantic global variant token.
      </Typography>

      <Sheet
        variant="outlined"
        sx={{
          bgcolor: "background.level1",
          px: 2,
          py: 4,
          mt: 1,
          mb: 3,
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          variant={selectedVariant}
          color={color}
          value={selectedVariant}
          onChange={(event, newValue) =>
            setSelectedVariant(newValue as VariantProp)
          }
          sx={(theme) => ({
            minWidth: 120,
            ...(states.hover && {
              ...theme.variants[`${selectedVariant}Hover`][color],
              "&:hover, &:active":
                theme.variants[`${selectedVariant}Hover`][color],
            }),
            ...(states.active && {
              ...theme.variants[`${selectedVariant}Active`][color],
              "&:hover, &:active":
                theme.variants[`${selectedVariant}Active`][color],
            }),
            ...(states.disabled &&
              theme.variants[`${selectedVariant}Disabled`][color]),
          })}
        >
          <Option value="solid">solid</Option>
          <Option value="soft">soft</Option>
          <Option value="outlined">outlined</Option>
          <Option value="plain">plain</Option>
        </Select>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Checkbox
            size="sm"
            label=":hover"
            checked={states.hover}
            onChange={(event) => setStates({ hover: event.target.checked })}
          />
          <Checkbox
            size="sm"
            label=":active"
            checked={states.active}
            onChange={(event) => setStates({ active: event.target.checked })}
          />
          <Checkbox
            size="sm"
            label=":disabled"
            checked={states.disabled}
            onChange={(event) => setStates({ disabled: event.target.checked })}
          />
        </Box>
      </Sheet>
      <Box
        sx={{
          my: 1,
          display: "grid",
          gridTemplateColumns: "min-content min-content 1fr",
          alignItems: "center",
          gap: "6px 12px",
          "& > div": {
            display: "contents",
            "--FormLabel-alignSelf": "center",
            "--FormLabel-margin": "0px",
          },
        }}
      >
        {tokens.map((item) => (
          <FormControl key={item} size="sm">
            <IconButton
              tabIndex={-1}
              variant="outlined"
              color="danger"
              size="sm"
              sx={{ borderRadius: "50%", "--IconButton-size": "24px" }}
              onClick={() => {
                onChange({ [item]: undefined });
              }}
            >
              <Remove />
            </IconButton>
            <FormLabel>{item}:</FormLabel>
            <ColorAutocomplete
              value={value[item] ?? ""}
              placeholder={themeDefaultValue[item]?.replace(
                /, #[0-9a-zA-Z]+/,
                ""
              )}
              options={availableTokens}
              onValidColor={(newValue) => {
                onChange({ [item]: newValue });
              }}
              onEmptyColor={() => {
                onRemove(item);
              }}
              onFocus={() => {
                if (item.includes("Hover")) {
                  setStates({ hover: true, active: false, disabled: false });
                } else if (item.includes("Active")) {
                  setStates({ hover: false, active: true, disabled: false });
                } else if (item.includes("Disabled")) {
                  setStates({ hover: false, active: false, disabled: true });
                } else {
                  setStates({ hover: false, active: false, disabled: false });
                }
              }}
            />
          </FormControl>
        ))}
      </Box>
      <GlobalVariantTokenCreator
        primitiveTokens={availableTokens}
        availableTokens={allTokens}
        onChange={(token, newValue) => onChange({ [token]: newValue })}
      />
    </React.Fragment>
  );
}

function ColorPaletteForm({
  tokens = [],
  availableTokens = [],
  themeDefaultValue = {},
  value = {},
  onChange,
  onRemove,
}: {
  availableTokens?: Array<string>;
  tokens: Array<string>;
  themeDefaultValue: any;
  value: any;
  onChange: (newValue: any) => void;
  onRemove: (token: string) => void;
}) {
  return (
    <React.Fragment>
      <Box
        sx={{
          mt: 1.5,
          display: "grid",
          gridTemplateColumns: "min-content minmax(min-content, 64px) 1fr",
          alignItems: "center",
          gap: "6px 12px",
          "& > div": {
            display: "contents",
            "--FormLabel-alignSelf": "center",
            "--FormLabel-margin": "0px",
          },
        }}
      >
        {tokens.map((item) => (
          <FormControl key={item} size="sm">
            <IconButton
              tabIndex={-1}
              variant="outlined"
              color="danger"
              size="sm"
              sx={{ borderRadius: "50%", "--IconButton-size": "24px" }}
              onClick={() => {
                if (themeDefaultValue[item]) {
                  onChange({ [item]: undefined });
                } else {
                  onRemove(item);
                }
              }}
            >
              <Remove />
            </IconButton>
            <FormLabel>{item}:</FormLabel>
            {availableTokens.length > 0 ? (
              <ColorAutocomplete
                value={value[item] ?? ""}
                placeholder={themeDefaultValue[item]?.replace(
                  /, #[0-9a-zA-Z]+/,
                  ""
                )}
                options={availableTokens}
                onValidColor={(newValue) => {
                  onChange({ [item]: newValue });
                }}
                onEmptyColor={() => {
                  onRemove(item);
                }}
              />
            ) : (
              <ColorInput
                value={value[item] ?? ""}
                placeholder={themeDefaultValue[item]?.replace(
                  /, #[0-9a-zA-Z]+/,
                  ""
                )}
                onEmptyColor={() => {
                  onRemove(item);
                }}
                onValidColor={(color) => {
                  onChange({ [item]: color });
                }}
              />
            )}
          </FormControl>
        ))}
      </Box>
      <ColorTokenCreator
        onChange={(name, color) => {
          onChange({ [name]: color });
        }}
      />
    </React.Fragment>
  );
}

function getAvailableTokens(colorSchemes: any, colorMode: "light" | "dark") {
  const palette = deepmerge(
    defaultTheme.colorSchemes[colorMode].palette,
    colorSchemes[colorMode].palette
  );
  const tokens: Array<string> = [];
  function iterateObject(object: any, keys: Array<string> = []) {
    Object.keys(object).forEach((k) => {
      if (object[k] && !k.match(/^(mode|colorScheme)$/)) {
        if (typeof object[k] === "object") {
          iterateObject(object[k], [...keys, k]);
        } else {
          tokens.push(`var(--joy-palette-${[...keys, k].join("-")})`);
        }
      }
    });
  }
  iterateObject(palette);
  return tokens;
}

function TemplatesDialog({
  children,
  data,
}: {
  children: React.ReactElement;
  data: any;
}) {
  const [open, setOpen] = React.useState(false);
  //   const { map: templateMap } = sourceJoyTemplates();
  const renderItem = (name: string, item: any) => {
    if (!item.files) {
      return null;
    }
    const themeFileName =
      Object.keys(item.files).find((file) =>
        file.match(/theme\.(ts|tsx|js)/)
      ) || "theme.ts";
    const themeFile = item.files[themeFileName];
    const customTheme = literalToObject(
      themeFile?.match(/extendTheme\({(.*)}\)/s)?.[1]
    );
    const mergedData = deepmerge(customTheme, data);
    const newFiles = {
      ...item.files,
      [themeFileName]: generateThemeCode(mergedData),
    };
    return (
      <Card
        component="li"
        size="sm"
        variant="outlined"
        key={name}
        sx={{ "--Card-padding": "0px" }}
      >
        <AspectRatio ratio="2">
          <Box
            sx={(theme) => ({
              background: `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${name}.jpg)`,
              transition: "0.3s",
              [theme.getColorSchemeSelector("dark")]: {
                background: `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${name}-dark.jpg)`,
              },
            })}
          />
        </AspectRatio>
        <CardCover
          sx={{
            opacity: 0,
            transition: "0.2s",
            "&:hover, &:focus-within": {
              opacity: 1,
              bgcolor: "rgba(0 0 0 / 0.72)",
              boxShadow: "md",
            },
          }}
        >
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              component="button"
              fontSize="xl"
              fontWeight="xl"
              color="neutral"
              textColor="#fff"
              overlay
              //   onClick={() => {
              //     codeSandbox
              //       .createJoyTemplate({
              //         ...item,
              //         files: newFiles,
              //         githubLocation: '',
              //         title: `Joy UI - Custom theme`,
              //         codeVariant: 'TS',
              //       })
              //       .openSandbox();
              //   }}
              endDecorator={
                <ArrowOutwardIcon sx={{ color: "inherit", opacity: 0.72 }} />
              }
            >
              {startCase(name)}
            </Link>
          </div>
        </CardCover>
      </Card>
    );
  };
  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: () => {
          setOpen(true);
          children.props.onClick?.();
        },
      })}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          size="lg"
          aria-labelledby="templates-dialog"
          aria-describedby="templates-dialog-description"
          sx={{ "--ModalDialog-minWidth": "1200px" }}
        >
          <ModalClose />
          <Typography level="h2" id="templates-dialog">
            Clone a template sandbox
          </Typography>
          <Typography
            id="templates-dialog-description"
            textColor="text.secondary"
            fontSize="md"
          >
            Click on one of these template to see start a sandbox with your
            custom theme.
          </Typography>

          <List
            sx={{
              px: 1,
              overflow: "auto",
              flexGrow: 1,
              gap: 4,
              height: "max-content",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              "--Icon-color": (theme) => theme.vars.palette.text.tertiary,
            }}
          >
            <Card
              variant="outlined"
              sx={{
                borderStyle: "dashed",
                "--variant-borderWidth": "2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                component="button"
                fontSize="lg"
                fontWeight="lg"
                color="neutral"
                textColor="text.primary"
                overlay
                // onClick={() => {
                //   const { result } = extractTemplates({
                //     './result/App.tsx': getMinimalJoyTemplate(),
                //     './result/theme.ts': generateThemeCode(data),
                //   });
                //   codeSandbox
                //     .createJoyTemplate({
                //       ...result,
                //       codeVariant: 'TS',
                //       githubLocation: '',
                //       title: `Joy UI - Minimal template`,
                //     })
                //     .openSandbox();
                // }}
                endDecorator={<ArrowOutwardIcon />}
              >
                Minimal template
              </Link>
              <Typography textColor="text.tertiary">
                Build your next project with Joy!
              </Typography>
            </Card>
            {/* {Array.from(templateMap.entries()).map(([name, template]) =>
              renderItem(name, template)
            )} */}
          </List>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default function JoyThemeBuilder() {
  const muiTheme = useMuiTheme();
  const [showCode, setShowCode] = React.useState(false);
  const [colorMode, setColorMode] = React.useState<"light" | "dark">("light");
  let [lightPalette, setLightPalette] = React.useState<Record<string, any>>({});
  lightPalette = { ...lightPalette, ...palettes };
  const [darkPalette, setDarkPalette] = React.useState<Record<string, any>>({});
  const [colorProp, setColorProp] = React.useState<
    ColorPaletteProp | "etc" | "accent" | "blue"
  >("primary");
  const availableTokens = React.useMemo(
    () =>
      getAvailableTokens({ light: lightPalette, dark: darkPalette }, colorMode),
    [lightPalette, darkPalette, colorMode]
  );
  const setter = { light: setLightPalette, dark: setDarkPalette }[colorMode];
  const theme = React.useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: {
            palette: lightPalette,
          },
          dark: {
            palette: darkPalette,
          },
        },
      }),
    [lightPalette, darkPalette]
  );
  const data = {
    colorSchemes: {
      light: {
        palette: lightPalette,
      },
      dark: {
        palette: darkPalette,
      },
    },
  };
  React.useEffect(() => {
    setColorMode(muiTheme.palette.mode);
  }, [muiTheme.palette.mode, setColorMode]);
  return (
    <CssVarsProvider theme={theme}>
      {showCode && (
        <CodeBlockResult
          data-joy-color-scheme={muiTheme.palette.mode}
          data={data}
          onClose={() => setShowCode(false)}
        />
      )}
      {!showCode && (
        <Box
          data-joy-color-scheme={muiTheme.palette.mode}
          sx={{
            p: 1,
            border: "1px solid",
            borderBottomWidth: 0,
            borderColor: "divider",
            bgcolor: "background.surface",
            display: "flex",
            gap: 1,
            borderRadius: "8px 8px 0 0",
          }}
        >
          <ToggleButtonGroup
            size="sm"
            value={colorMode}
            onChange={(event, newValue) =>
              setColorMode(newValue as "light" | "dark")
            }
          >
            <Button value="light">
              <LightMode />
              Light
            </Button>
            <Button value="dark">
              <DarkMode />
              Dark
            </Button>
          </ToggleButtonGroup>
        </Box>
      )}
      {!showCode && (
        <Sheet
          data-joy-color-scheme={colorMode}
          variant="outlined"
          sx={{
            display: "flex",
            borderRadius: "0 0 8px 8px",
            overflow: "auto",
          }}
        >
          <List
            sx={{
              flexBasis: 256,
              flexGrow: 0,
              "--ListDivider-gap": "0px",
              "--ListItem-minHeight": "56px",
              "--ListItemDecorator-size": "32px",
            }}
          >
            <ListSubheader sx={{ minHeight: 48 }}>Palette</ListSubheader>
            {(
              [
                "primary",
                "neutral",
                "danger",
                "success",
                "warning",
                "accent",
                "blue",
              ] as const
            ).map((color) => (
              <React.Fragment key={color}>
                <ListItem>
                  <ListItemButton
                    {...(colorProp === color && {
                      variant: "soft",
                      selected: true,
                      color,
                    })}
                    onClick={() => setColorProp(color)}
                  >
                    <ListItemDecorator>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: `${color}.500`,
                        }}
                      />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: "sm" }}>
                      {color}
                    </ListItemContent>
                    <KeyboardArrowRight />
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </React.Fragment>
            ))}
            <ListItem>
              <ListItemButton
                {...(colorProp === "etc" && {
                  variant: "soft",
                  color: "neutral",
                  selected: true,
                })}
                onClick={() => setColorProp("etc")}
              >
                <ListItemContent sx={{ fontSize: "sm" }}>
                  text, background, etc.
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider />
          </List>
          <Divider orientation="vertical" />
          {(() => {
            if (colorProp === "etc") {
              return (
                <Box sx={{ p: 3, flex: 1 }}>
                  <Typography fontSize="sm" fontWeight="lg">
                    background
                  </Typography>
                  <ColorPaletteForm
                    availableTokens={availableTokens}
                    {...getPaletteFormProps(
                      { light: lightPalette, dark: darkPalette },
                      colorMode,
                      "background"
                    )}
                    onChange={(newValue) => {
                      setter((prev) => ({
                        ...prev,
                        background: { ...prev.background, ...newValue },
                      }));
                    }}
                    onRemove={(token) => {
                      setter((prev) => {
                        const newPalette = prev.background || {};
                        delete newPalette[token];
                        return { ...prev, background: newPalette };
                      });
                    }}
                  />
                  <Typography fontSize="sm" fontWeight="lg" mt={2}>
                    common
                  </Typography>
                  <ColorPaletteForm
                    availableTokens={availableTokens}
                    {...getPaletteFormProps(
                      { light: lightPalette, dark: darkPalette },
                      colorMode,
                      "common"
                    )}
                    onChange={(newValue) => {
                      setter((prev) => ({
                        ...prev,
                        common: { ...prev.common, ...newValue },
                      }));
                    }}
                    onRemove={(token) => {
                      setter((prev) => {
                        const newPalette = prev.common || {};
                        delete newPalette[token];
                        return { ...prev, common: newPalette };
                      });
                    }}
                  />
                  <Typography fontSize="sm" fontWeight="lg" mt={2}>
                    text
                  </Typography>
                  <ColorPaletteForm
                    availableTokens={availableTokens}
                    {...getPaletteFormProps(
                      { light: lightPalette, dark: darkPalette },
                      colorMode,
                      "text"
                    )}
                    onChange={(newValue) => {
                      setter((prev) => ({
                        ...prev,
                        text: { ...prev.text, ...newValue },
                      }));
                    }}
                    onRemove={(token) => {
                      setter((prev) => {
                        const newPalette = prev.text || {};
                        delete newPalette[token];
                        return { ...prev, text: newPalette };
                      });
                    }}
                  />
                </Box>
              );
            }
            const { mergedValue, ...formProps } = getPaletteFormProps(
              { light: lightPalette, dark: darkPalette },
              colorMode,
              colorProp
            );
            const primitives = Object.keys(mergedValue)
              .filter(
                (k) =>
                  !k.match(/Channel$/) &&
                  !k.match(/^(plain|outlined|soft|solid)/)
              )
              .filter((k) => mergedValue[k] !== undefined);
            return (
              <Tabs
                size="md"
                defaultValue={0}
                sx={{ flex: 1, [`& .${tabPanelClasses.root}`]: { p: 3 } }}
              >
                <TabList variant="plain">
                  <Tab>Primitive colors</Tab>
                  <Tab>Global variants</Tab>
                </TabList>
                <TabPanel value={0}>
                  <Typography component="div" fontWeight="xl" level="title-md">
                    Customize primitive colors
                  </Typography>
                  <Typography component="div" level="body-sm" mb={2} mt={0.5}>
                    Add your custom-tailored palette here, inserting each HEX
                    value to the scale, or choose from an available set of
                    popular color palettes.
                  </Typography>
                  <PaletteImport
                    colorMode={muiTheme.palette.mode}
                    onSelect={(newTokens) => {
                      setter((prev) => ({
                        ...prev,
                        [colorProp]: { ...prev[colorProp], ...newTokens },
                      }));
                    }}
                  />

                  <ColorPaletteForm
                    {...formProps}
                    tokens={primitives}
                    onChange={(newValue) => {
                      setter((prev) => ({
                        ...prev,
                        [colorProp]: { ...prev[colorProp], ...newValue },
                      }));
                    }}
                    onRemove={(token) => {
                      setter((prev) => {
                        const newPalette = prev[colorProp] || {};
                        delete newPalette[token];
                        return { ...prev, [colorProp]: newPalette };
                      });
                    }}
                  />
                </TabPanel>
                <TabPanel value={1}>
                  <GlobalVariantForm
                    color={colorProp}
                    availableTokens={availableTokens}
                    themeDefaultValue={
                      defaultTheme.colorSchemes[colorMode].palette[colorProp]
                    }
                    value={
                      { light: lightPalette, dark: darkPalette }[colorMode][
                        colorProp
                      ]
                    }
                    onChange={(newValue) => {
                      setter((prev) => ({
                        ...prev,
                        [colorProp]: { ...prev[colorProp], ...newValue },
                      }));
                    }}
                    onRemove={(token) => {
                      setter((prev) => {
                        const newPalette = prev[colorProp] || {};
                        delete newPalette[token];
                        return { ...prev, [colorProp]: newPalette };
                      });
                    }}
                  />
                </TabPanel>
              </Tabs>
            );
          })()}
        </Sheet>
      )}
      <Box sx={{ height: 200 }} />
    </CssVarsProvider>
  );
}
