# Galaxy Timekeeper

**One life. A cosmic blink.**

Galaxy Timekeeper is a mobile-first, bilingual web experience that turns a human lifetime into a personal cosmic scale. Enter a birth date to see an exact Earth age, a life mapped onto a galactic 24-hour clock, estimated rotations of the Sun, and the same elapsed time translated across all eight planets.

Built with Codex and GPT-5.6 for **OpenAI Build Week 2026**.

**[Open the live demo](https://zinaidamauersberger-svg.github.io/galaxy-timekeeper/)**

## Why it exists

A human life can feel enormous from the inside and almost invisible against galactic time. Galaxy Timekeeper connects those two truths without reducing either one:

> On the scale of the Galaxy, your life is a blink. For you — and for the people you touch — that blink can mean everything.

The product measures duration. The person using it decides what gives that duration meaning.

## What it does

- Calculates elapsed age from a birth date and optional birth time
- Maps that lifetime onto a 24-hour clock representing one Solar System orbit around the Milky Way
- Uses NASA's estimate of about 230 million Earth years for that galactic orbit
- Shows an honest range of estimated Sun rotations because the Sun rotates at different rates by latitude
- Translates the same lifetime into rotations and years for all eight planets
- Keeps the original free-duration explorer, logarithmic scale, presets, and live pulse
- Provides a focused animated explanation for every planet
- Works in English and German
- Supports keyboard navigation and reduced-motion preferences
- Requires no account, backend, database, analytics, or cookies

## Privacy by design

The birth date is an **input, not collected data**. It is processed locally inside the current browser tab and is never transmitted or saved by Galaxy Timekeeper. Refreshing the page clears it.

People who prefer not to enter a date can type only their age as a duration in years. Both paths use the same local calculation engine.

## Run it locally

```bash
git clone https://github.com/Zinaidamauersberger-svg/galaxy-timekeeper.git
cd galaxy-timekeeper
npm install
npm run dev
```

The production experience is plain HTML, CSS, and JavaScript and can be hosted by any static server. Vite is used only for the local development preview.

## Test it

```bash
npm test
npm run check
npm run build
```

The automated suite covers unit conversion, validation, planetary rotations and orbits, logarithmic scale round-trips, the galactic 24-hour mapping, solar rotation ranges, age calculation, and localized scientific notation.

## How the calculations work

Every duration is normalized to Earth seconds.

```text
planet axis rotations = duration in seconds / rotation period in seconds
planet years          = duration in seconds / orbital period in seconds
galactic clock time   = lifetime / 230,000,000 Earth years × 24 hours
Sun rotations         = lifetime / 25–36 Earth days
```

The 25-to-36-day solar range represents differential rotation: the Sun is not solid and its equatorial regions rotate faster than its polar regions. All figures are rounded educational approximations, not spacecraft-navigation ephemerides.

For example, under the 230-million-year assumption, 40 Earth years occupy about **0.01503 seconds** on the galactic 24-hour clock.

## Architecture

```text
index.html          semantic interface and content structure
styles.css          responsive visual system, cosmic clock, and CSS planets
js/data.js          local planet facts, cosmic constants, and NASA source links
js/calculations.js  pure conversion, age, solar, and galactic functions
js/app.js           state, privacy-safe interactions, rendering, and i18n
tests/              automated calculation tests
scripts/build.mjs   static build and source-artifact preparation
```

The application has no runtime framework and makes no third-party requests. Planet artwork and the galactic clock use only CSS and inline vector geometry.

## Human + Codex collaboration

### Human product direction

- Originated the “Galaxien-Zeitmesser” concept and its personal emotional core
- Connected birth date, planetary age, the Sun, and galactic scale into one journey
- Defined the central thought: time can be cosmically tiny and personally meaningful at once
- Required a mobile website with no login, database, tracking, or stored personal data
- Chose an adult, warm, wondrous tone rather than a cold scientific calculator

### Where Codex helped

- Shaped the concept into a focused, testable product flow
- Verified the astronomical assumptions against NASA sources
- Designed and implemented the responsive bilingual interface
- Built the local calculation engine for planets, Sun, age, and galactic time
- Added automated tests and performed real browser interaction checks
- Documented the privacy model, architecture, sources, and submission story

### Key decisions

1. **Birth date without collection.** Personal relevance is preserved while the value stays inside the browser tab.
2. **A range for the Sun.** The interface does not invent one false exact rotation period for a differentially rotating star.
3. **A visible galactic clock plus a precise digital value.** The clock creates the emotional scale; the number keeps it scientifically honest.
4. **Personal mode plus explorer mode.** A visitor can use a date, only an age, or any arbitrary duration.
5. **Static-first architecture.** Judges can open the project without credentials, servers, or setup beyond a browser.

## NASA data sources

- [Sun facts and the Solar System's galactic orbit](https://science.nasa.gov/sun/facts/)
- [Solar System facts](https://science.nasa.gov/solar-system/solar-system-facts/)
- [Mercury](https://science.nasa.gov/mercury/facts/)
- [Venus](https://science.nasa.gov/venus/venus-facts/)
- [Earth](https://science.nasa.gov/earth/facts/)
- [Mars](https://science.nasa.gov/mars/facts/)
- [Jupiter](https://science.nasa.gov/jupiter/jupiter-facts/)
- [Saturn](https://science.nasa.gov/saturn/facts/)
- [Uranus](https://science.nasa.gov/uranus/facts/)
- [Neptune](https://science.nasa.gov/neptune/neptune-facts/)

## Build Week submission fit

- **Recommended track:** Apps for Your Life
- **Live demo:** public GitHub Pages site, no sign-in required
- **Repository:** public with MIT license
- **Demo video:** planned under three minutes, public on YouTube
- **Codex evidence:** the `/feedback` Session ID from the core build thread will be added to Devpost

## License

[MIT](LICENSE) © 2026 Zinaida Mauersberger
