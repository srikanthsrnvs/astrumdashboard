"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultColors = void 0;

var _themed = _interopRequireDefault(require("../utils/themed"));

var defaultColors = function defaultColors(theme) {
  var akTheme = {
    theme: theme
  };
  return {
    lineNumberColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    lineNumberBgColor: (0, _themed["default"])({
      light: "#fafafa",
      dark: "#282c34"
    })(akTheme),
    backgroundColor: (0, _themed["default"])({
      light: "#fafafa",
      dark: "#282c34"
    })(akTheme),
    textColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    substringColor: (0, _themed["default"])({
      light: "#e45649",
      dark: "#e06c75"
    })(akTheme),
    keywordColor: (0, _themed["default"])({
      light: "#a626a4",
      dark: "#c678dd"
    })(akTheme),
    attributeColor: (0, _themed["default"])({
      light: "#50a14f",
      dark: "#98c379"
    })(akTheme),
    selectorAttributeColor: (0, _themed["default"])({
      light: "#e45649",
      dark: "#e06c75"
    })(akTheme),
    docTagColor: (0, _themed["default"])({
      light: "#a626a4",
      dark: "#c678dd"
    })(akTheme),
    nameColor: (0, _themed["default"])({
      light: "#e45649",
      dark: "#e06c75"
    })(akTheme),
    builtInColor: (0, _themed["default"])({
      light: "#c18401",
      dark: "#e6c07b"
    })(akTheme),
    literalColor: (0, _themed["default"])({
      light: "#0184bb",
      dark: "#56b6c2"
    })(akTheme),
    bulletColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    codeColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    additionColor: (0, _themed["default"])({
      light: "#50a14f",
      dark: "#98c379"
    })(akTheme),
    regexpColor: (0, _themed["default"])({
      light: "#50a14f",
      dark: "#98c379"
    })(akTheme),
    symbolColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    variableColor: (0, _themed["default"])({
      light: "#986801",
      dark: "#d19a66"
    })(akTheme),
    templateVariableColor: (0, _themed["default"])({
      light: "#986801",
      dark: "#d19a66"
    })(akTheme),
    linkColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    selectorClassColor: (0, _themed["default"])({
      light: "#986801",
      dark: "#d19a66"
    })(akTheme),
    typeColor: (0, _themed["default"])({
      light: "#986801",
      dark: "#d19a66"
    })(akTheme),
    stringColor: (0, _themed["default"])({
      light: "#50a14f",
      dark: "#98c379"
    })(akTheme),
    selectorIdColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    quoteColor: (0, _themed["default"])({
      light: "#a0a1a7",
      dark: "#5c6370"
    })(akTheme),
    templateTagColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    deletionColor: (0, _themed["default"])({
      light: "#e45649",
      dark: "#e06c75"
    })(akTheme),
    titleColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    sectionColor: (0, _themed["default"])({
      light: "#e45649",
      dark: "#e06c75"
    })(akTheme),
    commentColor: (0, _themed["default"])({
      light: "#a0a1a7",
      dark: "#5c6370"
    })(akTheme),
    metaKeywordColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    metaColor: (0, _themed["default"])({
      light: "#4078f2",
      dark: "#61aeee"
    })(akTheme),
    functionColor: (0, _themed["default"])({
      light: "#383a42",
      dark: "#abb2bf"
    })(akTheme),
    numberColor: (0, _themed["default"])({
      light: "#986801",
      dark: "#d19a66"
    })(akTheme)
  };
};

exports.defaultColors = defaultColors;