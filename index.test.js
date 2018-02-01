import { classifyZone, constants, classifyMPA } from "./src/index";

const gearTypes = constants.GEAR_TYPES;
const aquaculture = constants.AQUACULTURE_AND_BOTTOM_EXPLOITATION;
const anchoring = constants.BOATING_AND_ANCHORING;

test("No-take/No-go", () => {
  expect(classifyZone([], aquaculture.NOT_ALLOWED, anchoring.NOT_ALLOWED)).toBe(
    1
  );
});

test("No-take/Regulated access", () => {
  expect(classifyZone([], aquaculture.NOT_ALLOWED, anchoring.FULLY_REGULATED)).toBe(
    2
  );
});

test("No-take/Unregulated access", () => {
  expect(classifyZone([], aquaculture.NOT_ALLOWED, anchoring.UNREGULATED)).toBe(
    3
  );
});

test("Highly regulated extraction", () => {
  expect(
    classifyZone(
      [gearTypes.SPEARFISHING, gearTypes.LINES],
      aquaculture.NOT_ALLOWED,
      anchoring.FULLY_REGULATED
    )
  ).toBe(4);
});

test("Moderately regulated extraction", () => {
  expect(
    classifyZone(
      [gearTypes.SPEARFISHING, gearTypes.LINES, gearTypes.FISH_TRAPS],
      aquaculture.NOT_ALLOWED,
      anchoring.FULLY_REGULATED
    )
  ).toBe(5);
});

test("Weakly regulated extraction", () => {
  expect(
    classifyZone(
      [gearTypes.SPEARFISHING, gearTypes.LINES],
      aquaculture.NO_RESTRICTIONS,
      anchoring.FULLY_REGULATED
    )
  ).toBe(6);
});

test("Very weakly regulated extraction", () => {
  expect(
    classifyZone(
      [
        gearTypes.BEACH_SEINES,
        gearTypes.CAST_NETS,
        gearTypes.DREDGES,
        gearTypes.DRIFT_NETS,
        gearTypes.FISH_TRAPS,
        gearTypes.FIXED_FISH_TRAPS,
        gearTypes.GILLNETS,
        gearTypes.HAND_DREDGES,
        gearTypes.HAND_HARVESTING,
        gearTypes.INTERTIDAL_HAND_CAPTURES,
        gearTypes.LINES,
        gearTypes.LONGLINES_BOTTOM,
        gearTypes.LONGLINES_PELAGIC,
        gearTypes.PURSE_SEINING_BOTTOM,
        gearTypes.PURSE_SEINING_PELAGIC,
        gearTypes.SPEARFISHING
      ],
      aquaculture.NO_RESTRICTIONS,
      anchoring.FULLY_REGULATED
    )
  ).toBe(7);
});

test("Unregulated extraction", () => {
  expect(
    classifyZone(
      [
        gearTypes.BEACH_SEINES,
        gearTypes.CAST_NETS,
        gearTypes.DREDGES,
        gearTypes.DRIFT_NETS,
        gearTypes.FISH_TRAPS,
        gearTypes.FIXED_FISH_TRAPS,
        gearTypes.GILLNETS,
        gearTypes.HAND_DREDGES,
        gearTypes.HAND_HARVESTING,
        gearTypes.INTERTIDAL_HAND_CAPTURES,
        gearTypes.LINES,
        gearTypes.LONGLINES_BOTTOM,
        gearTypes.LONGLINES_PELAGIC,
        gearTypes.PURSE_SEINING_BOTTOM,
        gearTypes.PURSE_SEINING_PELAGIC,
        gearTypes.SPEARFISHING,
        gearTypes.SURROUNDING_NETS,
        gearTypes.TRAMMEL_NETS,
        gearTypes.TRAPS,
        gearTypes.TRAWL_BOTTOM,
        gearTypes.TRAWL_PELAGIC
      ],
      aquaculture.NO_RESTRICTIONS,
      anchoring.FULLY_REGULATED
    )
  ).toBe(8);
});

test("Classify MPA", () => {
  const zone1 = [
    [
      gearTypes.BEACH_SEINES,
      gearTypes.CAST_NETS,
      gearTypes.DREDGES,
      gearTypes.DRIFT_NETS,
      gearTypes.FISH_TRAPS,
      gearTypes.FIXED_FISH_TRAPS,
      gearTypes.GILLNETS,
      gearTypes.HAND_DREDGES,
      gearTypes.HAND_HARVESTING,
      gearTypes.INTERTIDAL_HAND_CAPTURES,
      gearTypes.LINES,
      gearTypes.LONGLINES_BOTTOM,
      gearTypes.LONGLINES_PELAGIC,
      gearTypes.PURSE_SEINING_BOTTOM,
      gearTypes.PURSE_SEINING_PELAGIC,
      gearTypes.SPEARFISHING,
      gearTypes.SURROUNDING_NETS,
      gearTypes.TRAMMEL_NETS,
      gearTypes.TRAPS,
      gearTypes.TRAWL_BOTTOM,
      gearTypes.TRAWL_PELAGIC
    ],
    aquaculture.NO_RESTRICTIONS,
    anchoring.FULLY_REGULATED,
    2
  ];
  const zone2 = [
    [gearTypes.SPEARFISHING, gearTypes.LINES],
    aquaculture.NOT_ALLOWED,
    anchoring.FULLY_REGULATED,
    8
  ]
  const {scores, index, indexLabel} = classifyMPA([zone1, zone2]);
  expect(scores[0]).toBe(8);
  expect(scores[1]).toBe(4);
  expect(Math.round(index * 10) / 10).toBe(4.8)
  expect(indexLabel).toBe("Highly Protected Area")
})
