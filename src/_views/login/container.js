import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import Login from "./login";
import { templateActions } from "../../../_actions";

const styles = {
  paper: {
    minHeight: 600,
    padding: 10,
  },
};

function mapStateToProps(state) {
  return {};
}

const actionCreators = {
  updateHeader: templateActions.updateHeader,
};

const LoginContainer = compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(Login);

export default LoginContainer;
