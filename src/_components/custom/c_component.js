import { Component } from "react";
import _ from "lodash";

export class CComponent extends Component {
  updateState = (key, valueOrFn, fn) => {
    if (_.isObject(key))
      this.setState((state) => ({ ...state, ...key }), valueOrFn);
    else this.setState((state) => ({ ...state, [key]: valueOrFn }), fn);
  };
}
