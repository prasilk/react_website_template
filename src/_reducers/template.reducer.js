import { templateConstants } from "../_constants";

const initialState = {
  open: false,
  tabs: [],
  header: "Home",
  tabHighlight: {},
};

export function template(state = initialState, action) {
  switch (action.type) {
    case templateConstants.NAVIGATOR_HIDE:
      return { ...state, open: false };
    case templateConstants.NAVIGATOR_SHOW:
      return { ...state, open: true };
    case templateConstants.NAVIGATOR_TOGGLE:
      return { ...state, open: !state.open };
    case templateConstants.UPDATE_HEADER:
      return { ...state, header: action.header };
    case templateConstants.UPDATE_TABS:
      return { ...state, tabs: action.tabs };
    default:
      return state;
  }
}
