"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyZone = classifyZone;
exports.classifyMPA = classifyMPA;

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

function classifyMPA(zones) {
  var zoneScores = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = zones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var zone = _step.value;

      if (zone.length < 4) {
        throw new Error("Expected array of 4 arguments for each zone (gearTypes, aquacultureAndBottomExploitation, boating, and area");
      } else {
        zoneScores.push([classifyZone(zone[0], zone[1], zone[2]), zone[3]]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var sumArea = zoneScores.reduce(function (sum, score) {
    return sum + score[1];
  }, 0);
  var score = zoneScores.reduce(function (sum, score) {
    return sum + score[0] * score[1] / sumArea;
  }, 0);
  return {
    scores: zoneScores.map(function (zoneScore) {
      return zoneScore[0];
    }),
    index: score,
    indexLabel: getClassificationLabel(score)
  };
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

function getClassificationLabel(index) {
  if (index < 3) {
    return "Fully Protected Area";
  } else if (index < 5) {
    return "Highly Protected Area";
  } else if (index < 6) {
    return "Moderately Protected Area";
  } else if (index < 7) {
    return "Poorly Protected Area";
  } else {
    return "Unprotected Area";
  }
}