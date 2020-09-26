import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import { templateActions } from "../../../_actions";
import { Child3 } from "./child3";

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

const Child3Container = compose(
  withStyles(styles),
  connect(mapStateToProps, actionCreators)
)(Child3);

export default Child3Container;
