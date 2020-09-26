import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import { templateActions } from "../../../_actions";
import { Child2 } from "./child2";

const styles = {
  paper: {
    minHeight: 600,
    padding: 10,
  },
};

function mapStateToProps(state) {
  return {};
}

const actionCreators = { updateHeader: templateActions.updateHeader };

const Child2Container = compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(Child2);

export default Child2Container;
