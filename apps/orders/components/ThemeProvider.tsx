import { ReactNode } from "react";
import {
  CssVarsProvider,
  PaletteRange,
  StyledEngineProvider,
} from "@mui/joy/styles";
import { OverridableRecord } from "@mui/joy/styles/types/utils";
import CssBaseline from "@mui/joy/CssBaseline";
import { extendTheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { Bricolage_Grotesque, Source_Code_Pro } from "next/font/google";

// 扩展的皮肤属性类型申明
declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    accent: true;
    blue: true;
  }

  interface Palette {
    accent: PaletteAccent;
    blue: PaletteRange;
  }
  interface PaletteNeutralOverrides {
    4: true;
    8: true;
    16: true;
    30: true;
    79: true;
    80: true;
    120: true;
    260: true;
    540: true;
    870: true;
  }
  interface PaletteTextOverrides {
    placeholder: true;
  }
  interface PaletteAccentOverrides {
    80: true;
  }
  export interface PaletteAccent
    extends OverridableRecord<PaletteRange, PaletteAccentOverrides, string> {}
}

const bgFont = Bricolage_Grotesque({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  display: "swap",
});

const transitions = {
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

function formatMs(milliseconds: number) {
  return `${Math.round(milliseconds)}ms`;
}

const theme = extendTheme({
  palette: {
    action: {
      activatedOpacity: 0.12,
      active: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
    },
  },
  typography: {
    pxToRem: (size: number) => `${(size / 16) * 1}rem`,
  },
  transitions: {
    ...transitions,
    create: (props = ["all"], options = {}) => {
      const {
          duration: durationOption = transitions.duration.standard,
          easing: easingOption = JSON.stringify(transitions.easing),
          delay = 0,
        } = options as any,
        other = {};
      if (process.env.NODE_ENV !== "production") {
        const isString = (value: string[]) => typeof value === "string";
        // IE11 support, replace with Number.isNaN
        // eslint-disable-next-line no-restricted-globals
        const isNumber = (value: string) => !isNaN(parseFloat(value));
        if (!isString(props) && !Array.isArray(props)) {
          console.error('MUI: Argument "props" must be a string or Array.');
        }
        if (!isNumber(durationOption) && !isString(durationOption)) {
          console.error(
            `MUI: Argument "duration" must be a number or a string but found ${durationOption}.`
          );
        }
        if (!isString(easingOption)) {
          console.error('MUI: Argument "easing" must be a string.');
        }
        if (!isNumber(delay) && !isString(delay)) {
          console.error('MUI: Argument "delay" must be a number or a string.');
        }
        if (typeof options !== "object") {
          console.error(
            [
              "MUI: Secong argument of transition.create must be an object.",
              "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`",
            ].join("\n")
          );
        }
        if (Object.keys(other).length !== 0) {
          console.error(
            `MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`
          );
        }
      }
      return (Array.isArray(props) ? props : [props])
        .map(
          (animatedProp) =>
            `${animatedProp} ${
              typeof durationOption === "string"
                ? durationOption
                : formatMs(durationOption)
            } ${easingOption} ${
              typeof delay === "string" ? delay : formatMs(delay)
            }`
        )
        .join(",");
    },
    getAutoHeightDuration: function (height: number) {
      if (!height) {
        return 0;
      }
      const constant = height / 36;

      // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
      return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
    },
  },
  colorSchemes: {
    light: {
      palette: {
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
          solidActiveColor: "var(--joy-palette-common-white)",
          solidActiveBg: "var(--joy-palette-neutral-540)",
          solidHoverBg: "var(--joy-palette-neutral-540)",
          solidBg: "var(--joy-palette-primary-500)",
          solidColor: "var(--joy-palette-neutral-79)",
          softBg: "var(--joy-palette-primary-200)",
          softHoverBg: "var(--joy-palette-neutral-540)",
          softActiveColor: "var(--joy-palette-common-white)",
          softActiveBg: "var(--joy-palette-neutral-540)",
          softColor: "var(--joy-palette-neutral-79)",
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
          softBg: "var(--joy-palette-neutral-80)",
          softColor: "var(--joy-palette-neutral-870)",
          softHoverBg: "var(--joy-palette-neutral-120)",
          softActiveBg: "var(--joy-palette-neutral-870)",
          softActiveColor: "var(--joy-palette-common-white)",
          softDisabledBg: "var(--joy-palette-neutral-80)",
          softDisabledColor: "var(--joy-palette-neutral-260)",
          plainColor: "var(--joy-palette-neutral-870)",
          plainHoverBg: "var(--joy-palette-neutral-120)",
          plainActiveColor: "var(--joy-palette-common-white)",
          plainHoverColor: "var(--joy-palette-neutral-870)",
          plainActiveBg: "var(--joy-palette-neutral-540)",
          plainDisabledColor: "var(--joy-palette-neutral-260)",
          solidBg: "var(--joy-palette-neutral-870)",
          solidHoverBg: "var(--joy-palette-primary-200)",
          solidDisabledBg: "var(--joy-palette-neutral-80)",
          solidDisabledColor: "var(--joy-palette-neutral-260)",
          solidActiveBg: "var(--joy-palette-neutral-870)",
          outlinedColor: "var(--joy-palette-neutral-870)",
          outlinedBorder: "var(--joy-palette-neutral-120)",
          outlinedHoverBg: "undefined",
          outlinedHoverBorder: "var(--joy-palette-neutral-870)",
          outlinedHoverColor: "var(--joy-palette-neutral-870)",
          outlinedActiveBg: "undefined",
          outlinedActiveColor: "var(--joy-palette-neutral-870)",
          outlinedActiveBorder: "var(--joy-palette-neutral-120)",
          outlinedDisabledBorder: "var(--joy-palette-neutral-120)",
          outlinedDisabledColor: "var(--joy-palette-neutral-260)",
        },
        success: {
          "500": "#57B07B",
        },
        danger: {
          "500": "#FF3B30",
          "800": "#B81F1E",
          outlinedBorder: "var(--joy-palette-danger-800)",
          outlinedColor: "var(--joy-palette-danger-800)",
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
          solidDisabledColor: "var(--joy-palette-neutral-260)",
          solidDisabledBg: "unset",
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
      },
    },
    dark: {
      palette: {},
    },
  },
  fontFamily: {
    body: bgFont.style.fontFamily,
    display: bgFont.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          // ...(ownerState.color === 'primary' && {
          //   backgroundColor: '#4338ca',
          // }),
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          ...(ownerState.variant === "soft" && {
            backgroundColor: "var(--joy-palette-neutral-79)",
          }),
        }),
      },
    },
  },
  breakpoints: {
    // sync with tailwind default breakpoints config
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      // '2xl': 1536,
    },
  },
} as any);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              svg: {
                // color: "var(--Icon-color)",
                margin: "var(--Icon-margin)",
                fontSize: "var(--Icon-fontSize, 24px)",
                // adjust the proportion as you like:
                width: "1em",
                height: "1em",
              },
            }}
          />
          {children}
        </CssVarsProvider>
      </StyledEngineProvider>
  );
}
