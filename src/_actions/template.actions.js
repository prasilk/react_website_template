import { templateConstants } from "../_constants";

export const templateActions = {
  hideNavigator,
  showNavigator,
  toggleNavigator,
  updateHeader,
  initializeTabs,
};

function hideNavigator() {
  return { type: templateConstants.NAVIGATOR_HIDE };
}

function showNavigator() {
  return { type: templateConstants.NAVIGATOR_SHOW };
}

function toggleNavigator() {
  return {
    type: templateConstants.NAVIGATOR_TOGGLE,
  };
}

function updateHeader(header) {
  return {
    type: templateConstants.UPDATE_HEADER,
    header,
  };
}

function initializeTabs(tabs) {
  return {
    type: templateConstants.UPDATE_TABS,
    tabs,
  };
}
