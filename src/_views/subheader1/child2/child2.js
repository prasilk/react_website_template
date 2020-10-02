import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";

export class Child2 extends Component {
  componentDidMount() {
    this.props.updateHeader("Child 2");
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5">Child 2</Typography>
      </Paper>
    );
  }
}
