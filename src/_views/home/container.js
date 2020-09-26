import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";
import { HomePage } from "./home_page";

import { templateActions, alertActions } from "../../_actions";

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
  successAlert: alertActions.success,
  failureAlert: alertActions.error,
};

const HomePageContainer = compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(HomePage);

export default HomePageContainer;
