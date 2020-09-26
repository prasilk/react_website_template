import { alertConstants, alertTypes } from "../_constants";
import { v4 as uuidv4 } from "uuid";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertTypes.SUCCESS,
        message: action.message,
        uuid: uuidv4(),
      };
    case alertConstants.ERROR:
      return {
        type: alertTypes.ERROR,
        message: action.message,
        uuid: uuidv4(),
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
