import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { compose } from "recompose";
import { connect } from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import logo from "../_assets/logo.png";
import { history } from "../_helpers";
import { templateActions } from "../_actions";
const categories = [
  {
    id: "main_menu",
    title: "Main Menu",
    children: [
      {
        id: "subheader1",
        title: "Sub-Header 1",

        children: [
          {
            id: "subheader1-child1",
            title: "child 1",
            link: "/subheader1/child1",
          },
          {
            id: "subheader1-child2",
            title: "child 2",
            link: "/subheader1/child2",
          },
          {
            id: "subheader1-child3",
            title: "child 3",
            link: "/subheader1/child3",
          },
        ],
      },
      {
        id: "subheader2",
        title: "Sub-Header 2",

        children: [
          {
            id: "subheader2-child1",
            title: "child 1",
            link: "/subheader2/child1",
          },
          {
            id: "subheader2-child2",
            title: "child 2",
            link: "/subheader2/child2",
          },
        ],
      },
      {
        id: "subheader3",
        title: "Sub-Header 3",

        children: [
          {
            id: "subheader3-child1",
            title: "child 1",
            link: "/subheader3/child1",
          },
          {
            id: "subheader3-child2",
            title: "child 2",
            link: "/subheader3/child2",
          },
        ],
      },
    ],
  },
];

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  logo: {
    width: "inherit",
    height: "inherit",
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: theme.palette.primary.light,
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

class Navigator extends Component {
  state = { selectedParent: "", selectedId: "" };

  handleClick = (e) => {
    this.setState((state) => ({ ...state, [e]: !this.state[e] }));
  };

  handleListItemClick = (id, parentId, link) => {
    if (id in this.props.tabHighlight) {
      link = this.props.tabHighlight[id];
    }
    this.setState((state) => ({
      ...state,
      selectedParent: parentId,
      selectedId: id,
    }));
    history.push(link);
  };

  componentDidMount() {
    let urlPath = window.location.pathname;
    let currentTab = urlPath.split("/");
    if (currentTab.length === 5) {
      this.props.tabHighlight[currentTab[3]] = urlPath;
      this.props.highlightsTab(this.props.tabHighlight);
    }
    history.push(urlPath);
    this.setState((state) => ({
      ...state,
      [currentTab[2]]: true,
      selectedParent: currentTab[2],
      selectedId: currentTab[3],
    }));
  }
  render() {
    const {
      classes,
      toggleNavigator,
      tabHighlight,
      highlightsTab,
      ...other
    } = this.props;
    return (
      <Drawer onClose={toggleNavigator} variant="permanent" {...other}>
        <List disablePadding>
          <ListItem style={{ padding: 0 }}>
            <img className={classes.logo} src={logo} alt="Logo" />
          </ListItem>
          <ListItem
            button
            className={clsx(classes.item, classes.itemCategory)}
            onClick={() => history.push("/home")}
          >
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon style={{ fontSize: "2rem" }} />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Home
            </ListItemText>
          </ListItem>

          {categories.map(({ id, title, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {title}
                </ListItemText>
              </ListItem>

              {children.map(({ id: parentId, title, icon, children }) => (
                <React.Fragment key={parentId}>
                  <ListItem
                    button
                    onClick={this.handleClick.bind(this, parentId)}
                    className={clsx(
                      classes.item,
                      this.state.selectedParent === parentId &&
                        classes.itemActiveItem
                    )}
                  >
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                      }}
                    >
                      {title}
                    </ListItemText>
                    {this.state[parentId] === parentId ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    key={parentId}
                    in={this.state[parentId]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {children.map(({ id: childId, title, link }) => (
                        <React.Fragment key={childId}>
                          <ListItem
                            button
                            onClick={this.handleListItemClick.bind(
                              this,
                              childId,
                              parentId,
                              link
                            )}
                            className={clsx(
                              classes.item,
                              this.state.selectedId === childId &&
                                classes.itemActiveItem,
                              classes.nested
                            )}
                          >
                            <ListItemText
                              classes={{
                                primary: classes.itemPrimary,
                              }}
                            >
                              {title}
                            </ListItemText>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}

              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}

function mapState(state) {
  const { open, tabHighlight } = state.template;
  return { open, tabHighlight };
}
const actionCreators = {
  toggleNavigator: templateActions.toggleNavigator,
  highlightsTab: templateActions.highlightsTab,
};

export default compose(
  withStyles(styles),
  connect(mapState, actionCreators)
)(Navigator);
