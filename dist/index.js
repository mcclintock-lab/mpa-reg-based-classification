"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyZone = classifyZone;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require("./scores.js"),
    gearTypeScore = _require.gearTypeScore,
    aquacultureScore = _require.aquacultureScore,
    anchorScore = _require.anchorScore;

function classifyZone(gearTypes, aquaculture, anchoring) {
  var aquacultureAndBottomExploitationScore = aquacultureScore(aquaculture);
  var anchoringScore = anchorScore(anchoring);
  var maxGearScore = Math.max.apply(Math, _toConsumableArray(gearTypes.map(function (type) {
    return gearTypeScore(type);
  })));
  // >20
  if (gearTypes.length > 20) {
    return 8;
    // 16-20
  } else if (gearTypes.length >= 16) {
    return 7;
    // 11-15
  } else if (gearTypes.length >= 11) {
    return 6;
    // 6-10
  } else if (gearTypes.length >= 6) {
    if (maxGearScore === 9) {
      return 6;
      // <= 8
    } else {
      if (aquacultureAndBottomExploitationScore === 2) {
        return 6;
      } else {
        return 5;
      }
    }
    // 1-5
  } else if (gearTypes.length >= 1) {
    // 9
    if (maxGearScore === 9) {
      return 6;
      // 6-8
    } else if (maxGearScore >= 6) {
      if (aquacultureAndBottomExploitationScore === 2) {
        return 6;
      } else {
        return 5;
      }
      // <= 5
    } else {
      if (aquacultureAndBottomExploitationScore === 2) {
        return 6;
      } else {
        return 4;
      }
    }
    // 0
  } else {
    // no gear allowed
    if (aquacultureAndBottomExploitationScore === 2) {
      return 6;
    } else if (aquacultureAndBottomExploitationScore === 1) {
      return 4;
    } else {
      if (anchoringScore === 2) {
        return 3;
      } else if (anchoringScore === 1) {
        return 2;
      } else {
        return 1;
      }
    }
  }
}

var constants = exports.constants = require("./constants");

var scores = exports.scores = {
  1: {
    label: "No-take/No-go",
    color: "rgb(78, 142, 135)"
  },
  2: {
    label: "No-take/Regulated access",
    color: "rgb(147,181,54)"
  },
  3: {
    label: "No-take/Unregulated access",
    color: "rgb(235,204,53)"
  },
  4: {
    label: "Highly regulated extraction",
    color: "rgb(203,131,44)"
  },
  5: {
    label: "Moderately regulated extraction",
    color: "rgb(176,33,97)"
  },
  6: {
    label: "Weakly regulated extraction",
    color: "rgb(115,25,74)"
  },
  7: {
    label: "Very weakly regulated extraction",
    color: "rgb(68,25,105)"
  },
  8: {
    label: "Unregulated extraction",
    color: "rgb(72,46,19)"
  }
};