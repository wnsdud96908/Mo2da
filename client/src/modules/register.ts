import { RegisterState, RegisterAction } from "../types/registerType";
import {CHANGE_FORM, POST_FORM} from "../actions/registerAction"


const initialState: RegisterState = {
  form: {
    title: "",
    category: "",
    personnel: 0,
    online: "",
    position: "",
    contact: "",
    content: "",
  },
};


const register = (
  state: RegisterState = initialState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case CHANGE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.key]: action.payload.value,
        },
      };
    case POST_FORM:
      return {
        ...state,
        form: {
          ...state.form,
        },
      };
    default:
      return state;
  }
}

export default register;
