# Galaxy Timekeeper — Devpost submission draft

## Project name

Galaxy Timekeeper

## Elevator pitch

Your lifetime is a cosmic blink. Galaxy Timekeeper maps your age onto the Milky Way's 24-hour clock and translates it across the Sun and all eight planets — privately, in your browser.

## About the project

## Inspiration

Time is deeply personal, yet a whole human life is almost invisible on a galactic scale. Under an estimate of roughly 230 million Earth years for one Solar System orbit around the Milky Way, 40 human years occupy only about 0.015 seconds on a galactic 24-hour clock.

That number became the emotional heart of Galaxy Timekeeper. Somewhere, our time is insignificant; to us and to the people we affect, it can be extraordinarily significant. The project does not tell people what matters. It asks them to notice the difference between duration and meaning — and to decide what deserves their brief cosmic moment.

## What it does

A visitor enters a birth date and, optionally, a birth time. Galaxy Timekeeper calculates the elapsed Earth age, maps the entire lifetime onto a 24-hour galactic clock, estimates how many times the Sun rotated during that life, and translates the same duration into axis rotations and completed years for every planet.

The personal result flows directly into an eight-world comparison. People who do not want to enter a date can use only their age or explore any arbitrary duration. The original time laboratory remains available with seconds, minutes, hours, days, years, presets, a logarithmic scale from one second to the age of the universe, and a live pulse.

The experience works in English and German and explains the scientific ideas behind rotations, planetary years, the Sun's differential rotation, and a galactic year.

## Privacy

The date is processed only inside the current browser tab. It is never uploaded, stored, logged, or sent to a backend. Refreshing the page clears it. Galaxy Timekeeper has no account, database, analytics, cookies, or tracking.

This distinction mattered to us: the product may accept a personal value, but it does not collect personal data.

## How we built it

Galaxy Timekeeper is a static mobile-first website built with semantic HTML, responsive CSS, and vanilla JavaScript. Every input is normalized to Earth seconds and passed through pure calculation functions. Planetary rotations and orbits use rounded NASA values. The galactic clock uses an explicit 230-million-Earth-year assumption.

The Sun required special care. Because it is not solid, it rotates in about 25 Earth days near the equator and roughly 36 days near the poles. Instead of presenting one false exact count, the result shows a scientifically honest range.

The interface, planets, and galactic clock are built locally with CSS and inline vector geometry, so the live product makes no third-party media requests. The calculation layer is separated from interface state and covered by Node's built-in test runner.

Codex with GPT-5.6 helped turn an unsorted but emotionally strong idea into a testable product, verify NASA sources, design and implement the bilingual interface, isolate the mathematics, add automated tests, perform live browser interaction checks, and prepare the documentation and submission story. Human direction defined the meaning, privacy boundaries, scope, and visual character.

## Challenges we ran into

The biggest challenge was keeping emotion and scientific honesty together. A 24-hour galactic clock is a metaphorical rescaling, so its underlying assumption must remain visible. We show the precise digital value and state the 230-million-year estimate beside it.

The word “day” is also ambiguous beyond Earth. Solar days and axis rotations differ dramatically on worlds such as Mercury and Venus, and some planets rotate retrograde. We explicitly calculate axis rotations and completed orbits rather than hiding those differences behind familiar language.

Privacy posed a product-design challenge, too. A birth date creates personal relevance but can also be personal data. A browser-only architecture lets us use the value without collecting it, and an age-only alternative keeps participation optional.

## Accomplishments that we're proud of

- A personal lifetime becomes one coherent journey from Earth to the Sun, the Galaxy, and all eight planets.
- The 40-year example resolves to about 0.01503 galactic seconds under the documented assumption.
- The app acknowledges the Sun's differential rotation with a range instead of false precision.
- Thirteen automated tests cover unit conversion, validation, planets, the galactic mapping, solar rotation, age calculation, and localization.
- The full experience needs no sign-in, credentials, backend, or stored data.
- English and German share the same live result without re-entering information.

## What we learned

Scale becomes memorable when a number is connected to a life. We learned that scientific caveats do not weaken an emotional experience; when presented clearly, they make it more trustworthy. We also learned that privacy can be an architectural feature rather than only a policy statement.

## What's next for Galaxy Timekeeper

The next step is an optional personal timeline: a visitor could mark meaningful life events on the magnified galactic blink without saving or uploading them. We would also add shareable result cards and classroom explanations while preserving the local-first, no-account model.

## Built with

- HTML5
- CSS3
- JavaScript
- Node.js
- Vite (local preview only)
- OpenAI Codex
- GPT-5.6
- GitHub
- GitHub Pages

## Try it out links

- Live demo: https://zinaidamauersberger-svg.github.io/galaxy-timekeeper/
- Source code: https://github.com/Zinaidamauersberger-svg/galaxy-timekeeper

## Project media

- Updated gallery screenshots: TO BE CAPTURED AFTER FINAL MOBILE REVIEW
- Public YouTube demo: TO BE ADDED AFTER UPLOAD
