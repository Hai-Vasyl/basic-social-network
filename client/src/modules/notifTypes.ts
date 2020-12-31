import {
  RiShieldCheckLine,
  RiShieldCrossLine,
  RiShieldFlashLine,
} from "react-icons/ri"

export default {
  access: {
    icon: RiShieldCrossLine,
    keyWord: "access",
  },
  accessDenied: {
    icon: RiShieldFlashLine,
    keyWord: "access-denied",
  },
  accessAllowed: {
    icon: RiShieldCheckLine,
    keyWord: "access-allowed",
  },
}
