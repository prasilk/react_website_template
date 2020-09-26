import React, { Component } from "react";
import { Paper } from "@material-ui/core";

export class Child1 extends Component {
  componentDidMount() {
    this.props.updateHeader("Child 1");
  }

  render() {
    const { classes } = this.props;
    return <Paper className={classes.paper}>Child 1</Paper>;
  }
}
