import {
  ToggleReducerTypes,
  DROPDOWN_TOGGLE,
  AUTHFORM_TOGGLE,
  RESET_TOGGLE,
  NOTIFICATIONS_TOGGLE,
  CHAT_OPEN,
  CHAT_TOGGLE,
} from "./toggleTypes"

interface IInitState {
  dropDown: boolean
  authForm: boolean
  chat: boolean
  notifications: boolean
}

const initState: IInitState = {
  dropDown: false,
  authForm: false,
  chat: false,
  notifications: false,
}

const toggleReducer = (
  state = initState,
  action: ToggleReducerTypes
): IInitState => {
  switch (action.type) {
    case DROPDOWN_TOGGLE:
      return {
        ...initState,
        dropDown: !state.dropDown,
      }
    case AUTHFORM_TOGGLE:
      return {
        ...initState,
        authForm: !state.authForm,
      }
    case NOTIFICATIONS_TOGGLE:
      return {
        ...initState,
        notifications: !state.notifications,
      }
    case CHAT_TOGGLE:
      return {
        ...initState,
        chat: !state.chat,
      }
    case CHAT_OPEN:
      return {
        ...initState,
        chat: true,
      }
    case RESET_TOGGLE:
      return initState
    default:
      return state
  }
}

export default toggleReducer
