import React, { Component } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import theme from "../../_template/theme";

export class HomePage extends Component {
  componentDidMount() {
    this.props.updateHeader("Home");
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                this.props.successAlert("Your last action was successfull")
              }
            >
              Success Alert
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor: theme.palette.error.main,
                color: "white",
                paddingLeft: 10,
              }}
              variant="contained"
              onClick={() =>
                this.props.failureAlert("Your last action was successfull")
              }
            >
              Failure Alert
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
