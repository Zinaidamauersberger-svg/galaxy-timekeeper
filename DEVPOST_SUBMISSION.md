# Galaxy Timekeeper — Devpost submission draft

## Project name

Galaxy Timekeeper

## Elevator pitch

One duration, eight worlds. An interactive, privacy-first time translator that turns Earth seconds, days, and years into planetary rotations and orbits.

## About the project

## Inspiration

Planetary time is usually presented as a table of enormous numbers. We may read that a day on Venus lasts longer than its year, or that Neptune needs about 165 Earth years to orbit the Sun, but those facts are difficult to feel. Galaxy Timekeeper began with a simple question: what would one familiar span of time mean on every planet at once?

We wanted the answer to feel immediate, playful, and scientifically clear. We also made an early privacy decision: the experience asks for a duration, never a birth date, name, account, or location.

## What it does

Galaxy Timekeeper translates any Earth duration into axis rotations and completed orbits for all eight planets. People can enter seconds, minutes, hours, days, or years; move through a logarithmic time scale from one second to the age of the universe; or choose quick journeys such as a coffee break, an Earth year, and the age of Earth.

All eight results update together. Each planet also has a focused animated view with a short scientific explanation, while Live Pulse turns passing seconds into a running planetary clock. The interface works in English and German and includes keyboard support and reduced-motion behavior.

## How we built it

The project is a dependency-free mobile website built with semantic HTML, responsive CSS, and vanilla JavaScript. Every input is normalized to Earth seconds, then divided by each planet's axis-rotation and orbital periods. Pure calculation functions are separated from interface state and rendering, which lets us test the mathematical core with Node's built-in test runner.

The planets are original CSS illustrations made from gradients, so the app has no third-party image requests or licensing concerns. All calculations happen locally in the browser. There is no backend, database, login, analytics, cookie, or personal-data collection. NASA planet fact pages are documented as the scientific sources.

Codex with GPT-5.6 helped turn the first concept into a focused MVP, check Build Week requirements, verify the calculation model, implement the bilingual responsive interface, isolate testable logic, write automated tests, and run visual browser checks at mobile and desktop widths. Human product decisions shaped the privacy model, scope, visual direction, and the emphasis on understandable planetary rhythms rather than a larger unfinished feature set.

## Challenges we ran into

The word “day” is surprisingly ambiguous beyond Earth. Solar days and sidereal rotations differ greatly on planets such as Mercury and Venus, and some planets rotate retrograde. We therefore label the result explicitly as axis rotations and explain the scientific distinction instead of hiding it behind a familiar but misleading term.

Another challenge was scale: one control needed to represent a second, a human lifetime, planetary history, and cosmic time without becoming unusable. A logarithmic slider solved that interaction problem. During visual QA we also found and fixed a grid overflow at narrow mobile widths.

## Accomplishments that we're proud of

- One understandable interaction compares all eight planets simultaneously.
- The experience remains useful without collecting or transmitting any personal data.
- Eight automated tests cover conversions, boundaries, rotations, orbits, scale round-trips, and extreme values.
- The same product works at 390-pixel mobile and 1440-pixel desktop widths.
- Scientific explanations, NASA sources, bilingual copy, and accessible motion behavior are part of the product rather than afterthoughts.

## What we learned

Scientific clarity often improves product design. Naming rotations and orbits precisely made the interface easier to trust, while reducing the architecture to a static browser app made it faster, more private, and easier for anyone to try. We also learned that logarithmic controls can make astronomical scale feel surprisingly personal.

## What's next for Galaxy Timekeeper

Next we would add shareable comparison cards, more classroom-friendly explanations, and optional journeys to dwarf planets and selected exoplanets while preserving the same no-account, local-first approach.

## Built with

- HTML5
- CSS3
- JavaScript
- Node.js
- OpenAI Codex
- GPT-5.6
- GitHub
- GitHub Pages

## Try it out links

- Live demo: TO BE ADDED AFTER DEPLOYMENT
- Source code: TO BE ADDED AFTER REPOSITORY PUBLICATION

## Project media

- `docs/media/devpost-cover.png`
- `docs/media/devpost-explorer.png`
- `docs/media/devpost-results.png`
- Public YouTube demo: TO BE ADDED AFTER UPLOAD

