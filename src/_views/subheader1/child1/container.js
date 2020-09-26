import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import { Child1 } from "./child1";
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

const Child1Container = compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(Child1);

export default Child1Container;
