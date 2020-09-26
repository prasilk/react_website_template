import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import { Route } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { templateActions } from "../_actions";
import { history } from "../_helpers";

const breadcrumbNameMap = {
  "/home": "Home",
  "/subheader1": "Sub Header 1",
  "/subheader1/child1": "Child 1",
  "/subheader1/child2": "Child 2",
  "/subheader1/child3": "Child 3",
};

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  breadcrumbs: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    color: lightColor,
    fontWeight: "bold",
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTime: true,
    };
  }

  handleChange = (event, value) => {
    this.setState((state) => ({ ...state, value }));
    history.push(value);
    let currentTab = value.split("/");
    this.props.tabHighlight[currentTab[3]] = value;
    this.props.highlightsTab(this.props.tabHighlight);
  };

  render() {
    const { classes, toggleNavigator, header } = this.props;

    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ justifyContent: "flex-end" }}
            >
              <Hidden mdUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleNavigator}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs />
              </Hidden>
              <Hidden smDown>
                <Grid item xs>
                  <div className={classes.breadcrumbs} color="inherit">
                    <Route>
                      {({ location }) => {
                        const pathnames = location.pathname
                          .split("/")
                          .filter((x) => x);

                        return (
                          <Breadcrumbs
                            className={classes.breadcrumbs}
                            aria-label="breadcrumb"
                          >
                            {/* <LinkRouter color="inherit" to="/"></LinkRouter> */}
                            {pathnames.map((value, index) => {
                              const to = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                              return (
                                <Typography
                                  color="inherit"
                                  className={classes.breadcrumbs}
                                  key={to}
                                >
                                  {breadcrumbNameMap[to]}
                                </Typography>
                              );
                            })}
                          </Breadcrumbs>
                        );
                      }}
                    </Route>
                  </div>
                </Grid>
              </Hidden>
              <Grid item>
                <Link className={classes.link} href="#" variant="body2">
                  Notifications
                </Link>
              </Grid>
              <Grid item>
                <Tooltip title="Alerts • No alerts">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid
              container
              alignItems="center"
              spacing={1}
              style={{ justifyContent: "flex-end" }}
            >
              <Grid item xs style={{ display: "flex" }}>
                <span>
                  {header === "Home" && (
                    <HomeIcon style={{ fontSize: "1.9rem" }} />
                  )}
                </span>
                <Typography color="inherit" variant="h5" component="h1">
                  &nbsp;{header}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={this.props.logout}
                >
                  Logout
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  return { ...state.template };
}

const actionCreators = {
  toggleNavigator: templateActions.toggleNavigator,
  highlightsTab: templateActions.highlightsTab,
};

export default compose(
  withStyles(styles),
  connect(mapState, actionCreators)
)(Header);
