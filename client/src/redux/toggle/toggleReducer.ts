import {
  ToggleReducerTypes,
  DROPDOWN_TOGGLE,
  AUTHFORM_TOGGLE,
  RESET_TOGGLE,
} from "./toggleTypes"

interface IInitState {
  dropDown: boolean
  authForm: boolean
}

const initState: IInitState = {
  dropDown: false,
  authForm: false,
}

const toggleReducer = (
  state = initState,
  action: ToggleReducerTypes
): IInitState => {
  switch (action.type) {
    case DROPDOWN_TOGGLE:
      return {
        ...state,
        dropDown: !state.dropDown,
      }
    case AUTHFORM_TOGGLE:
      return {
        ...state,
        authForm: !state.authForm,
      }
    case RESET_TOGGLE:
      return {
        dropDown: false,
        authForm: false,
      }
    default:
      return state
  }
}

export default toggleReducer
