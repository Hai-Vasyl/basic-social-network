export const DROPDOWN_TOGGLE = "DROPDOWN_TOGGLE"
export const AUTHFORM_TOGGLE = "AUTHFORM_TOGGLE"
export const RESET_TOGGLE = "RESET_TOGGLE"

export interface ToggleDropDown {
  type: typeof DROPDOWN_TOGGLE
}
export interface ToggleAuthForm {
  type: typeof AUTHFORM_TOGGLE
}
export interface ResetToggle {
  type: typeof RESET_TOGGLE
}

export type ToggleReducerTypes = ToggleDropDown | ResetToggle | ToggleAuthForm
