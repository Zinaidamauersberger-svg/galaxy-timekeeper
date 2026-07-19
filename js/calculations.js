(function defineGalaxyCalculations(global) {
  "use strict";

  const EARTH_DAY_SECONDS = 86_400;
  const EARTH_YEAR_DAYS = 365.25;
  const unitFactors = Object.freeze({
    seconds: 1,
    minutes: 60,
    hours: 3_600,
    days: EARTH_DAY_SECONDS,
    years: EARTH_YEAR_DAYS * EARTH_DAY_SECONDS,
  });

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function durationToSeconds(value, unit) {
    const numericValue = Number(value);
    const factor = unitFactors[unit];

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      throw new RangeError("Duration must be a finite, non-negative number.");
    }

    if (!factor) {
      throw new TypeError(`Unsupported duration unit: ${unit}`);
    }

    return numericValue * factor;
  }

  function calculatePlanetTime(durationSeconds, planet) {
    if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
      throw new RangeError("Duration seconds must be finite and non-negative.");
    }

    if (!planet || !(planet.rotationHours > 0) || !(planet.orbitDays > 0)) {
      throw new TypeError("Planet must have positive rotationHours and orbitDays values.");
    }

    const rotationSeconds = planet.rotationHours * 3_600;
    const orbitSeconds = planet.orbitDays * EARTH_DAY_SECONDS;
    const rotations = durationSeconds / rotationSeconds;
    const orbits = durationSeconds / orbitSeconds;

    return {
      planet,
      rotations,
      orbits,
      orbitProgress: ((orbits % 1) + 1) % 1,
    };
  }

  function calculateAllPlanets(durationSeconds, planets) {
    if (!Array.isArray(planets)) {
      throw new TypeError("Planets must be an array.");
    }

    return planets.map((planet) => calculatePlanetTime(durationSeconds, planet));
  }

  function secondsToLogValue(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 1) {
      return 0;
    }

    return Math.log10(seconds);
  }

  function logValueToSeconds(logValue) {
    const numericValue = Number(logValue);
    if (!Number.isFinite(numericValue)) {
      throw new TypeError("Log value must be finite.");
    }

    return 10 ** Math.max(0, numericValue);
  }

  function pickReadableUnit(seconds) {
    if (seconds >= unitFactors.years) {
      return { unit: "years", value: seconds / unitFactors.years };
    }
    if (seconds >= unitFactors.days) {
      return { unit: "days", value: seconds / unitFactors.days };
    }
    if (seconds >= unitFactors.hours) {
      return { unit: "hours", value: seconds / unitFactors.hours };
    }
    if (seconds >= unitFactors.minutes) {
      return { unit: "minutes", value: seconds / unitFactors.minutes };
    }
    return { unit: "seconds", value: seconds };
  }

  function formatInputValue(value) {
    if (!Number.isFinite(value)) return "0";
    if (value === 0) return "0";

    const absolute = Math.abs(value);
    if (absolute >= 1_000_000_000) return Number(value.toPrecision(5)).toString();
    if (absolute >= 100_000) return Math.round(value).toString();
    if (absolute >= 100) return Number(value.toFixed(2)).toString();
    if (absolute >= 1) return Number(value.toFixed(4)).toString();
    return Number(value.toPrecision(5)).toString();
  }

  function formatCosmicNumber(value, language = "en") {
    if (!Number.isFinite(value)) return "—";
    if (value === 0) return "0";

    const absolute = Math.abs(value);
    const locale = language === "de" ? "de-DE" : "en-US";

    if (absolute >= 1_000_000) {
      return new Intl.NumberFormat(locale, {
        notation: "compact",
        maximumSignificantDigits: 4,
      }).format(value);
    }

    if (absolute < 0.0001) {
      return value.toExponential(2).replace("e+", "e");
    }

    const maximumFractionDigits =
      absolute >= 100 ? 1 : absolute >= 10 ? 2 : absolute >= 1 ? 3 : absolute >= 0.01 ? 4 : 5;

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(value);
  }

  function formatEarthDuration(seconds, language = "en") {
    const readable = pickReadableUnit(seconds);
    const value = formatCosmicNumber(readable.value, language);
    const isSingular = Math.abs(readable.value - 1) < 0.000001;
    const labels = {
      en: {
        seconds: ["Earth second", "Earth seconds"],
        minutes: ["Earth minute", "Earth minutes"],
        hours: ["Earth hour", "Earth hours"],
        days: ["Earth day", "Earth days"],
        years: ["Earth year", "Earth years"],
      },
      de: {
        seconds: ["Erdsekunde", "Erdsekunden"],
        minutes: ["Erdminute", "Erdminuten"],
        hours: ["Erdstunde", "Erdstunden"],
        days: ["Erdentag", "Erdentage"],
        years: ["Erdenjahr", "Erdenjahre"],
      },
    };

    return `${value} ${labels[language][readable.unit][isSingular ? 0 : 1]}`;
  }

  function getExtremes(results) {
    if (!Array.isArray(results) || results.length === 0) {
      return null;
    }

    return results.reduce(
      (extremes, result) => ({
        mostRotations: result.rotations > extremes.mostRotations.rotations ? result : extremes.mostRotations,
        mostOrbits: result.orbits > extremes.mostOrbits.orbits ? result : extremes.mostOrbits,
        fewestOrbits: result.orbits < extremes.fewestOrbits.orbits ? result : extremes.fewestOrbits,
      }),
      {
        mostRotations: results[0],
        mostOrbits: results[0],
        fewestOrbits: results[0],
      },
    );
  }

  const api = Object.freeze({
    EARTH_DAY_SECONDS,
    EARTH_YEAR_DAYS,
    UNIT_FACTORS: unitFactors,
    calculateAllPlanets,
    calculatePlanetTime,
    clamp,
    durationToSeconds,
    formatCosmicNumber,
    formatEarthDuration,
    formatInputValue,
    getExtremes,
    logValueToSeconds,
    pickReadableUnit,
    secondsToLogValue,
  });

  global.GALAXY_CALCULATIONS = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(globalThis);
