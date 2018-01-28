"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anchorScore = exports.aquacultureScore = exports.gearTypeScore = exports.anchoringActivities = exports.aquacultureActivities = exports.gearTypes = undefined;

var _constants = require("./constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gearTypes = exports.gearTypes = {
  "Beach seines": 8,
  "Cast nets": 3,
  "Dredges (bivalves)": 7,
  "Drift nets": 5,
  "Fish traps": 6,
  "Fixed fish traps “madrague”": 6,
  "Gillnets": 6,
  "Hand dredges (bivalves)": 5,
  "Hand harvesting": 4,
  "Intertidal hand captures": 3,
  "Lines (jigs, hook and line, rod, troll)": 5,
  "Longlines (bottom)": 5,
  "Longlines (pelagic)": 4,
  "Purse seining (bottom)": 9,
  "Purse seining (pelagic)": 5,
  "Spearfishing/diving": 3,
  "Surrounding nets near shore": 8,
  "Trammel nets": 8,
  "Traps (lobster/octopus/crab)": 4,
  "Trawl (bottom)": 9,
  "Trawl (pelagic)": 5
};

var aquacultureActivities = exports.aquacultureActivities = {
  "Aquaculture and bottom exploitation not allowed": 0,
  "Aquaculture OR bottom exploitation allowed, but not mining/oil platforms/sand extraction/detonations": 1,
  "Both aquaculture AND bottom exploitation allowed with no restrictions (or if aquaculture is not allowed but mining/oil platforms/sand ex-traction/detonations are)": 2
};

var anchoringActivities = exports.anchoringActivities = {
  "No anchoring": 0,
  "Boating and/or anchoring allowed but anchoring is fully regulated: restricted to particular areas or mooring buoys": 1,
  "Boating and/or anchoring allowed but anchoring is only partially 2 regulated or unregulated": 2
};

var gearTypeScore = exports.gearTypeScore = function gearTypeScore(regulation) {
  return getScore(regulation, gearTypes, "Gear Type");
};
var aquacultureScore = exports.aquacultureScore = function aquacultureScore(regulation) {
  return getScore(regulation, aquacultureActivities, "Aquaculture Activity Type");
};
var anchorScore = exports.anchorScore = function anchorScore(regulation) {
  return getScore(regulation, anchoringActivities, "Anchoring Activity Type");
};

function getScore(key, lookup, errorType) {
  if (key in lookup) {
    return lookup[key];
  } else {
    throw new Error("Could not find " + errorType + " " + key + ".\n      Must be one of the following: " + Object.keys(lookup).join(", "));
  }
}