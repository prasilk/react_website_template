import React, { Component } from "react";
import { Paper } from "@material-ui/core";

export class Child3 extends Component {
  componentDidMount() {
    this.props.updateHeader("Child 3");
  }

  render() {
    const { classes } = this.props;
    return <Paper className={classes.paper}>Child 3</Paper>;
  }
}
