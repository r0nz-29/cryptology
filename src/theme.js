import { createTheme, responsiveFontSizes } from "@mui/material";

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#4FD1C5",
      },
      secondary: {
        main: "#1A365D",
      },
      info: {
        main: "#ffffff",
      },
      background: {
        default: "#F8F9FA",
        paper: "#ffffff",
      },
      text: {
        primary: "#1A365D",
        secondary: "#718096",
      },
    },
    typography: {
      h4: {
        fontWeight: "bold",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            padding: "16px",
            transition: "0.2s  ease-out",
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.12)", // boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
              cursor: "pointer",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            transition: "0.2s  ease-out",
            "&:hover": {
              transform: "scale(1)",
              boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#4FD1C5",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            transition: "0.2s ease-out",
            "&:hover": {
              backgroundColor: "#4FD1C530",
            },
          },
        },
      },
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#4FD1C5",
      },
      secondary: {
        main: "#1A365D",
      },
      info: {
        main: "#171923",
      },

      background: {
        default: "#171923",
        paper: "#1A202C",
      },
      text: {
        secondary: "#A0AEC0",
      },
      divider: "#171923",
    },
    typography: {
      h4: {
        fontWeight: "bold",
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.5)",
            backgroundImage: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            backgroundImage: "none",
            padding: "16px",
            transition: "0.2s  ease-out",
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.12)", // boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
              cursor: "pointer",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            transition: "0.2s  ease-out",
            "&:hover": {
              transform: "scale(1)",
              boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#4FD1C5",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            transition: "0.2s ease-out",
            "&:hover": {
              backgroundColor: "#4FD1C530",
            },
          },
        },
      },
    },
  })
);
