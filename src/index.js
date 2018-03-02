const { gearTypeScore, aquacultureScore, anchorScore } = require("./scores.js");

export function classifyZone(gearTypes, aquaculture, anchoring) {
  const aquacultureAndBottomExploitationScore = aquacultureScore(aquaculture);
  const anchoringScore = anchorScore(anchoring);
  const maxGearScore = Math.max(...gearTypes.map(type => gearTypeScore(type)));
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

export function classifyMPA(zones) {
  const zoneScores = [];
  for (const zone of zones) {
    if (zone.length < 4) {
      throw new Error("Expected array of 4 arguments for each zone (gearTypes, aquacultureAndBottomExploitation, boating, and area");
    } else {
      zoneScores.push([classifyZone(zone[0], zone[1], zone[2]), zone[3]]);
    }
  }
  const sumArea = zoneScores.reduce((sum, score) => sum + score[1], 0);
  const score = zoneScores.reduce((sum, score) => sum + (score[0] * score[1] / sumArea), 0);
  return {
    scores: zoneScores.map((zoneScore) => zoneScore[0]),
    index: score,
    indexLabel: getClassificationLabel(score)
  }
}

export const constants = require("./constants");

export const scores = {
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
}

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
