"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTheme;
var DEFAULT_THEME_MODE = "light";

function getTheme(props) {
  if (props && props.theme && props.theme.mode) {
    // $FlowFixMe - cannot narrow type between input types
    return props.theme;
  }

  return {
    mode: DEFAULT_THEME_MODE
  };
}