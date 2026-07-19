(function defineGalaxyData(global) {
  "use strict";

  const planets = [
    {
      id: "mercury",
      name: { en: "Mercury", de: "Merkur" },
      kicker: { en: "The swift messenger", de: "Der schnelle Bote" },
      orbitDays: 88,
      rotationHours: 1407.6,
      retrograde: false,
      glow: "rgba(205, 188, 166, 0.46)",
      fact: {
        en: "Mercury races around the Sun, yet turns very slowly on its own axis.",
        de: "Merkur rast um die Sonne, dreht sich aber sehr langsam um die eigene Achse.",
      },
      source: "https://science.nasa.gov/mercury/facts/",
    },
    {
      id: "venus",
      name: { en: "Venus", de: "Venus" },
      kicker: { en: "The backward spinner", de: "Die Rückwärtsdreherin" },
      orbitDays: 225,
      rotationHours: 5832,
      retrograde: true,
      glow: "rgba(247, 181, 94, 0.5)",
      fact: {
        en: "One axis rotation lasts longer than a Venus year — and it spins retrograde.",
        de: "Eine Achsendrehung dauert länger als ein Venusjahr – und sie dreht rückläufig.",
      },
      source: "https://science.nasa.gov/venus/venus-facts/",
    },
    {
      id: "earth",
      name: { en: "Earth", de: "Erde" },
      kicker: { en: "Our familiar rhythm", de: "Unser vertrauter Rhythmus" },
      orbitDays: 365.25,
      rotationHours: 23.9,
      retrograde: false,
      glow: "rgba(76, 176, 232, 0.5)",
      fact: {
        en: "Earth is our reference point: about 24 hours per rotation and 365.25 days per orbit.",
        de: "Die Erde ist unser Bezugspunkt: etwa 24 Stunden je Drehung und 365,25 Tage je Umlauf.",
      },
      source: "https://science.nasa.gov/earth/facts/",
    },
    {
      id: "mars",
      name: { en: "Mars", de: "Mars" },
      kicker: { en: "Almost an Earth day", de: "Fast ein Erdentag" },
      orbitDays: 687,
      rotationHours: 24.6,
      retrograde: false,
      glow: "rgba(211, 85, 54, 0.5)",
      fact: {
        en: "A Martian rotation is close to Earth's, but its journey around the Sun takes nearly twice as long.",
        de: "Eine Marsdrehung ähnelt der Erde, doch sein Weg um die Sonne dauert fast doppelt so lange.",
      },
      source: "https://science.nasa.gov/mars/facts/",
    },
    {
      id: "jupiter",
      name: { en: "Jupiter", de: "Jupiter" },
      kicker: { en: "The fastest spin", de: "Die schnellste Drehung" },
      orbitDays: 4333,
      rotationHours: 9.9,
      retrograde: false,
      glow: "rgba(218, 160, 111, 0.52)",
      fact: {
        en: "The Solar System's largest planet also has its shortest rotation: just under ten hours.",
        de: "Der größte Planet des Sonnensystems hat zugleich die kürzeste Drehung: knapp zehn Stunden.",
      },
      source: "https://science.nasa.gov/jupiter/jupiter-facts/",
    },
    {
      id: "saturn",
      name: { en: "Saturn", de: "Saturn" },
      kicker: { en: "The ringed metronome", de: "Das beringte Metronom" },
      orbitDays: 10756,
      rotationHours: 10.7,
      retrograde: false,
      glow: "rgba(227, 202, 143, 0.5)",
      fact: {
        en: "Saturn spins quickly, but one stately trip around the Sun takes about 29.4 Earth years.",
        de: "Saturn dreht sich rasch, doch ein würdevoller Sonnenumlauf dauert etwa 29,4 Erdenjahre.",
      },
      source: "https://science.nasa.gov/saturn/facts/",
    },
    {
      id: "uranus",
      name: { en: "Uranus", de: "Uranus" },
      kicker: { en: "The tilted clock", de: "Die gekippte Uhr" },
      orbitDays: 30687,
      rotationHours: 17.2,
      retrograde: true,
      glow: "rgba(112, 220, 219, 0.5)",
      fact: {
        en: "Uranus rotates on its side, turning its 84-Earth-year orbit into seasons that last decades.",
        de: "Uranus dreht sich auf der Seite; dadurch werden seine Jahreszeiten jahrzehntelang.",
      },
      source: "https://science.nasa.gov/uranus/facts/",
    },
    {
      id: "neptune",
      name: { en: "Neptune", de: "Neptun" },
      kicker: { en: "The far blue year", de: "Das ferne blaue Jahr" },
      orbitDays: 60190,
      rotationHours: 16.1,
      retrograde: false,
      glow: "rgba(72, 113, 235, 0.55)",
      fact: {
        en: "Neptune turns in only sixteen hours, while a single orbit takes about 165 Earth years.",
        de: "Neptun dreht sich in nur sechzehn Stunden, während ein Umlauf etwa 165 Erdenjahre dauert.",
      },
      source: "https://science.nasa.gov/neptune/neptune-facts/",
    },
  ];

  global.GALAXY_DATA = Object.freeze({
    EARTH_DAY_SECONDS: 86_400,
    EARTH_YEAR_DAYS: 365.25,
    MAX_DURATION_SECONDS: 13_800_000_000 * 365.25 * 86_400,
    PLANETS: Object.freeze(planets.map((planet) => Object.freeze(planet))),
  });
})(globalThis);
