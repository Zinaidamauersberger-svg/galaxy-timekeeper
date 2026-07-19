const test = require("node:test");
const assert = require("node:assert/strict");

const calculations = require("../js/calculations.js");

const mercury = { rotationHours: 1407.6, orbitDays: 88 };
const jupiter = { rotationHours: 9.9, orbitDays: 4333 };

test("converts every supported Earth unit to seconds", () => {
  assert.equal(calculations.durationToSeconds(1, "seconds"), 1);
  assert.equal(calculations.durationToSeconds(1, "minutes"), 60);
  assert.equal(calculations.durationToSeconds(1, "hours"), 3600);
  assert.equal(calculations.durationToSeconds(1, "days"), 86400);
  assert.equal(calculations.durationToSeconds(1, "years"), 31_557_600);
});

test("rejects negative, non-numeric, and unsupported durations", () => {
  assert.throws(() => calculations.durationToSeconds(-1, "days"), RangeError);
  assert.throws(() => calculations.durationToSeconds("not a number", "days"), RangeError);
  assert.throws(() => calculations.durationToSeconds(1, "fortnights"), TypeError);
});

test("one Earth year becomes about 4.15 Mercury years", () => {
  const earthYear = calculations.durationToSeconds(1, "years");
  const result = calculations.calculatePlanetTime(earthYear, mercury);
  assert.ok(Math.abs(result.orbits - 4.1505681818) < 1e-9);
});

test("one Earth day contains more than two Jupiter rotations", () => {
  const earthDay = calculations.durationToSeconds(1, "days");
  const result = calculations.calculatePlanetTime(earthDay, jupiter);
  assert.ok(Math.abs(result.rotations - 2.4242424242) < 1e-9);
});

test("zero duration produces zero rotations, orbits, and progress", () => {
  const result = calculations.calculatePlanetTime(0, mercury);
  assert.deepEqual(
    { rotations: result.rotations, orbits: result.orbits, orbitProgress: result.orbitProgress },
    { rotations: 0, orbits: 0, orbitProgress: 0 },
  );
});

test("logarithmic slider conversion round-trips representative durations", () => {
  [1, 60, 86400, 31_557_600, 4.3549488e17].forEach((seconds) => {
    const reconstructed = calculations.logValueToSeconds(calculations.secondsToLogValue(seconds));
    const relativeError = Math.abs(reconstructed - seconds) / seconds;
    assert.ok(relativeError < 1e-12);
  });
});

test("selects a readable Earth unit", () => {
  assert.deepEqual(calculations.pickReadableUnit(45), { unit: "seconds", value: 45 });
  assert.deepEqual(calculations.pickReadableUnit(120), { unit: "minutes", value: 2 });
  assert.deepEqual(calculations.pickReadableUnit(7200), { unit: "hours", value: 2 });
  assert.deepEqual(calculations.pickReadableUnit(172800), { unit: "days", value: 2 });
  assert.deepEqual(calculations.pickReadableUnit(63_115_200), { unit: "years", value: 2 });
});

test("finds the fastest rotational and orbital rhythms", () => {
  const duration = calculations.durationToSeconds(1, "years");
  const mercuryResult = calculations.calculatePlanetTime(duration, { ...mercury, id: "mercury" });
  const jupiterResult = calculations.calculatePlanetTime(duration, { ...jupiter, id: "jupiter" });
  const extremes = calculations.getExtremes([mercuryResult, jupiterResult]);

  assert.equal(extremes.mostOrbits.planet.id, "mercury");
  assert.equal(extremes.mostRotations.planet.id, "jupiter");
});
