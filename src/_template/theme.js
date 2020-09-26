import { createMuiTheme } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5E87D4",
      main: "#274d94",
      dark: "#0945B3",
    },
    secondary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
    error: {
      light: "#bf4b52",
      main: "#af1f27",
      dark: "#7a151b",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    main: {
      padding: theme.spacing(6, 4),
      background: "#eaeff1",
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      outlined: {
        borderRadius: 2,
      },
      label: {
        borderRadius: 2,
        textTransform: "none",
      },
      contained: {
        borderRadius: 2,
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        "&$expanded": {
          minHeight: 48,
          margin: 0,
        },
      },
      content: {
        margin: 0,
        "&$expanded": {
          margin: 0,
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};
export default theme;
