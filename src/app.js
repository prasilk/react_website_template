import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Base from "./_template/base";
import { history } from "./_helpers";
import { alertActions } from "./_actions";
import { CComponent } from "./_components/custom";

class App extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      alert: {},
      alertOpen: false,
    };
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  handleClose = (event) => {
    this.props.clearAlerts();
    this.setState((state) => ({
      ...state,
      alertOpen: false,
    }));
  };

  componentDidUpdate() {
    if (this.props.alert.uuid !== this.state.alert.uuid)
      this.updateState({ alert: this.props.alert, alertOpen: true });
  }
  render() {
    const { alert } = this.props;

    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          key={`top,right`}
          open={this.state.alertOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert severity={alert.type} onClose={this.handleClose}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Base {...this.props} />
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

export default connect(mapState, actionCreators)(App);
