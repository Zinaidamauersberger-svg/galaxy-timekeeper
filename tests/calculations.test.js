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

test("maps forty Earth years to about 0.015 galactic seconds", () => {
  const fortyYears = calculations.durationToSeconds(40, "years");
  const result = calculations.calculateGalacticMoment(fortyYears);

  assert.ok(Math.abs(result.galacticClockSeconds - 0.015026086956521738) < 1e-12);
  assert.ok(Math.abs(result.orbitFraction - 40 / 230_000_000) < 1e-18);
});

test("maps one galactic orbit to a complete 24-hour clock", () => {
  const galacticYear = calculations.durationToSeconds(230_000_000, "years");
  const result = calculations.calculateGalacticMoment(galacticYear);

  assert.equal(result.galacticClockSeconds, 86_400);
  assert.equal(result.orbitFraction, 1);
  assert.equal(result.clockAngleDegrees, 360);
});

test("calculates the Sun's latitude-dependent rotation range", () => {
  const fortyYears = calculations.durationToSeconds(40, "years");
  const result = calculations.calculateSolarRotations(fortyYears);

  assert.ok(Math.abs(result.minimum - 405.8333333333333) < 1e-10);
  assert.ok(Math.abs(result.maximum - 584.4) < 1e-10);
});

test("calculates elapsed age and rejects future birth moments", () => {
  assert.equal(calculations.calculateAgeSeconds(1_000, 61_000), 60);
  assert.throws(() => calculations.calculateAgeSeconds(61_000, 1_000), RangeError);
  assert.throws(() => calculations.calculateAgeSeconds("unknown", 1_000), TypeError);
});

test("localizes very small scientific values in German", () => {
  assert.equal(calculations.formatCosmicNumber(0.0000174, "en"), "1.74e-5");
  assert.equal(calculations.formatCosmicNumber(0.0000174, "de"), "1,74e-5");
});
