//get the screen width from react native
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ICONS = {
  logo: require("./assets/icons/logo.png"),
  email: require("./assets/icons/email.png"),
  padlock: require("./assets/icons/padlock.png"),
  view: require("./assets/icons/view.png"),
  hide: require("./assets/icons/hide.png"),
  facebook: require("./assets/icons/facebook.png"),
  google: require("./assets/icons/google.png"),
};

const THEME = {
  screenWidth,
  screenHeight,
};

export { ICONS, THEME };
