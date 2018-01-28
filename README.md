Javascript implementation of [A regulation-based classification system for Marine Protected Areas](https://doi.org/10.1016/j.marpol.2016.06.021).

### Installation

`npm install mpa-reg-based-classification`

### Usage

`classifyZone(gearTypes: [String], aquacultureActivities: String, anchoringActivities: String)`

You can pass the full description of activities from the publication verbatim
but that will bind your application to an exact phrasing. The strings are long
so this is both error prone and limits flexibility. Best to use the provided
constants as a shorthand.

```javascript
import {classifyZone, constants} from "mpa-reg-based-classification";

const gearTypes = constants.GEAR_TYPES;
const aquaculture = constants.AQUACULTURE_AND_BOTTOM_EXPLOITATION;
const anchoring = constants.BOATING_AND_ANCHORING;

const classification = classifyZone(
  [
    gearTypes.SPEARFISHING,
    gearTypes.LINES
  ],
  aquaculture.NOT_ALLOWED,
  anchoring.FULLY_REGULATED
);

console.log(classification);
>>> 4
```


### Status

Zone classification is implemented. MPAs with multiple zones forthcoming.

[![CircleCI](https://circleci.com/gh/mcclintock-lab/mpa-reg-based-classification.svg?style=svg)](https://circleci.com/gh/mcclintock-lab/mpa-reg-based-classification) [Unit Tests]("https://github.com/mcclintock-lab/mpa-reg-based-classification/blob/master/index.test.js")
