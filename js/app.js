(function runGalaxyTimekeeper(global) {
  "use strict";

  const data = global.GALAXY_DATA;
  const calculations = global.GALAXY_CALCULATIONS;

  if (!data || !calculations) {
    throw new Error("Galaxy Timekeeper could not load its local calculation modules.");
  }

  const translations = {
    en: {
      heroEyebrow: "A private, pocket-sized time laboratory",
      heroTitle: "One duration.<br><em>Eight different worlds.</em>",
      heroIntro:
        "Turn an ordinary stretch of Earth time into planetary rotations and years — and feel how dramatically time changes across our Solar System.",
      trustNoAccount: "No account",
      trustNoTracking: "No tracking",
      trustLocal: "Calculations stay on-device",
      labTitle: "Set your time span",
      liveStart: "Start live pulse",
      liveStop: "Pause live pulse",
      liveResume: "Resume live pulse",
      durationLabel: "Earth duration",
      durationHelp: "Enter a duration — never a birth date or personal detail.",
      unitSeconds: "seconds",
      unitMinutes: "minutes",
      unitHours: "hours",
      unitDays: "days",
      unitYears: "years",
      scaleLabel: "Cosmic scale",
      scaleSecond: "1 second",
      scaleUniverse: "age of the universe",
      presetsLabel: "Quick journeys",
      presetCoffee: "Coffee break",
      presetDay: "Earth day",
      presetYear: "Earth year",
      presetCentury: "A century",
      presetEarthAge: "Age of Earth",
      presetUniverse: "Age of universe",
      worldTitle: "Choose a world",
      worldHint: "Tap a planet to bring its rhythm into focus.",
      rotationsLabel: "Axis rotations",
      orbitsLabel: "Planet years",
      currentOrbit: "Current orbit progress",
      copyResult: "Copy this result",
      comparisonTitle: "All eight rhythms",
      comparisonHint: "The same Earth duration, translated at once.",
      scienceTitle: "What are we measuring?",
      rotationTitle: "A rotation",
      rotationText:
        "One complete spin around a planet's axis, measured against distant stars. Retrograde planets spin in the opposite direction; the duration shown here is always positive.",
      orbitTitle: "A planet year",
      orbitText:
        "One complete orbit around the Sun. The farther a planet travels from the Sun, the longer its year usually becomes.",
      sourcesSummary: "Data method & NASA sources",
      sourcesText:
        "Calculations use rounded rotation and orbital periods published by NASA. Results are educational approximations, not mission-planning ephemerides.",
      footerBuilt: "Built with Codex and GPT-5.6 for OpenAI Build Week 2026.",
      footerPrivacy: "Zero accounts. Zero stored data.",
      resultRotations: "rotations",
      resultYears: "years",
      oneRotation: "1 rotation",
      oneOrbit: "1 orbit",
      earthHours: "Earth hours",
      earthDays: "Earth days",
      retrograde: "retrograde",
      focusAction: "Focus",
      sourceSuffix: "NASA facts",
      invalidDuration: "Please enter a non-negative number.",
      durationTooLarge: "The maximum journey is the estimated age of the universe: 13.8 billion Earth years.",
      copied: "Cosmic result copied",
      copyFailed: "Copying is unavailable in this browser",
      insight:
        "In this span, {orbitPlanet} completes the most years at {orbitValue}, while {spinPlanet} makes {spinValue} rotations.",
      zeroInsight: "Move the scale or choose a quick journey to begin translating time.",
    },
    de: {
      heroEyebrow: "Ein privates Zeitlabor für die Hosentasche",
      heroTitle: "Eine Zeitspanne.<br><em>Acht völlig andere Welten.</em>",
      heroIntro:
        "Verwandle eine gewöhnliche Erdzeit in planetare Drehungen und Jahre — und spüre, wie dramatisch sich Zeit in unserem Sonnensystem verändert.",
      trustNoAccount: "Kein Konto",
      trustNoTracking: "Kein Tracking",
      trustLocal: "Berechnungen bleiben auf dem Gerät",
      labTitle: "Wähle deine Zeitspanne",
      liveStart: "Live-Puls starten",
      liveStop: "Live-Puls pausieren",
      liveResume: "Live-Puls fortsetzen",
      durationLabel: "Erdzeit",
      durationHelp: "Gib eine Zeitspanne ein — niemals Geburtsdatum oder persönliche Daten.",
      unitSeconds: "Sekunden",
      unitMinutes: "Minuten",
      unitHours: "Stunden",
      unitDays: "Tage",
      unitYears: "Jahre",
      scaleLabel: "Kosmische Skala",
      scaleSecond: "1 Sekunde",
      scaleUniverse: "Alter des Universums",
      presetsLabel: "Schnellreisen",
      presetCoffee: "Kaffeepause",
      presetDay: "Erdentag",
      presetYear: "Erdenjahr",
      presetCentury: "Ein Jahrhundert",
      presetEarthAge: "Alter der Erde",
      presetUniverse: "Alter des Universums",
      worldTitle: "Wähle eine Welt",
      worldHint: "Tippe einen Planeten an und hole seinen Rhythmus in den Fokus.",
      rotationsLabel: "Achsendrehungen",
      orbitsLabel: "Planetenjahre",
      currentOrbit: "Fortschritt im aktuellen Umlauf",
      copyResult: "Ergebnis kopieren",
      comparisonTitle: "Alle acht Rhythmen",
      comparisonHint: "Dieselbe Erdzeit — gleichzeitig übersetzt.",
      scienceTitle: "Was messen wir?",
      rotationTitle: "Eine Drehung",
      rotationText:
        "Eine vollständige Drehung um die Planetenachse, gemessen gegenüber fernen Sternen. Rückläufige Planeten drehen entgegengesetzt; die Dauer wird immer positiv angezeigt.",
      orbitTitle: "Ein Planetenjahr",
      orbitText:
        "Ein vollständiger Umlauf um die Sonne. Je weiter ein Planet von der Sonne entfernt reist, desto länger wird meist sein Jahr.",
      sourcesSummary: "Datenmethode & NASA-Quellen",
      sourcesText:
        "Die Berechnungen verwenden gerundete Dreh- und Umlaufzeiten der NASA. Die Ergebnisse sind anschauliche Näherungen, keine Ephemeriden für Raumfahrtmissionen.",
      footerBuilt: "Mit Codex und GPT-5.6 für die OpenAI Build Week 2026 gebaut.",
      footerPrivacy: "Null Konten. Null gespeicherte Daten.",
      resultRotations: "Drehungen",
      resultYears: "Jahre",
      oneRotation: "1 Drehung",
      oneOrbit: "1 Umlauf",
      earthHours: "Erdstunden",
      earthDays: "Erdentage",
      retrograde: "rückläufig",
      focusAction: "Fokus auf",
      sourceSuffix: "NASA-Fakten",
      invalidDuration: "Bitte gib eine nicht negative Zahl ein.",
      durationTooLarge: "Die maximale Reise entspricht dem geschätzten Alter des Universums: 13,8 Milliarden Erdenjahre.",
      copied: "Kosmisches Ergebnis kopiert",
      copyFailed: "Kopieren ist in diesem Browser nicht verfügbar",
      insight:
        "In dieser Zeit vollendet {orbitPlanet} mit {orbitValue} die meisten Jahre, während sich {spinPlanet} {spinValue}-mal dreht.",
      zeroInsight: "Bewege die Skala oder wähle eine Schnellreise, um Zeit zu übersetzen.",
    },
  };

  const state = {
    language: navigator.language.toLowerCase().startsWith("de") ? "de" : "en",
    durationSeconds: calculations.durationToSeconds(1, "years"),
    selectedPlanetId: "mercury",
    live: false,
    liveHasStarted: false,
    liveBaseSeconds: 0,
    liveStartedAt: 0,
    liveFrame: null,
    lastLiveRender: 0,
    toastTimer: null,
  };

  const elements = {
    body: document.body,
    copyButton: document.querySelector("#copy-button"),
    durationOutput: document.querySelector("#earth-duration-output"),
    durationUnit: document.querySelector("#duration-unit"),
    durationValue: document.querySelector("#duration-value"),
    error: document.querySelector("#form-error"),
    focusCard: document.querySelector("#focus-card"),
    focusFact: document.querySelector("#focus-fact"),
    focusKicker: document.querySelector("#focus-kicker"),
    focusName: document.querySelector("#focus-name"),
    focusOrbitLength: document.querySelector("#focus-orbit-length"),
    focusOrbits: document.querySelector("#focus-orbits"),
    focusPlanetNumber: document.querySelector("#focus-planet-number"),
    focusPlanetVisual: document.querySelector("#focus-planet-visual"),
    focusRotationLength: document.querySelector("#focus-rotation-length"),
    focusRotations: document.querySelector("#focus-rotations"),
    insight: document.querySelector("#dynamic-insight"),
    languageToggle: document.querySelector("#language-toggle"),
    liveButton: document.querySelector("#live-button"),
    orbitProgressLabel: document.querySelector("#orbit-progress-label"),
    orbitProgressTrack: document.querySelector("#orbit-progress-track"),
    planetGrid: document.querySelector("#planet-grid"),
    planetSelector: document.querySelector("#planet-selector"),
    presets: document.querySelector("#presets"),
    scaleSlider: document.querySelector("#scale-slider"),
    sourceLinks: document.querySelector("#source-links"),
    toast: document.querySelector("#toast"),
  };

  function t(key) {
    return translations[state.language][key] ?? key;
  }

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.title = state.language === "de" ? "Galaxien-Zeitmesser" : "Galaxy Timekeeper";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key === "heroTitle") {
        element.innerHTML = t(key);
      } else if (translations[state.language][key]) {
        element.textContent = t(key);
      }
    });

    const englishIsActive = state.language === "en";
    elements.languageToggle.innerHTML = englishIsActive
      ? '<span class="language-toggle__active">EN</span><span aria-hidden="true">/</span><span>DE</span>'
      : '<span>EN</span><span aria-hidden="true">/</span><span class="language-toggle__active">DE</span>';
    elements.languageToggle.setAttribute(
      "aria-label",
      englishIsActive ? "Deutsche Sprache einschalten" : "Switch to English",
    );
    elements.durationUnit.setAttribute("aria-label", state.language === "de" ? "Zeiteinheit" : "Duration unit");
    elements.scaleSlider.setAttribute(
      "aria-label",
      state.language === "de"
        ? "Zeitspanne auf einer logarithmischen Skala einstellen"
        : "Adjust duration on a logarithmic scale",
    );
    elements.planetSelector.setAttribute("aria-label", state.language === "de" ? "Planeten" : "Planets");
    elements.presets.setAttribute("aria-label", state.language === "de" ? "Schnellreisen" : "Duration presets");
    elements.orbitProgressTrack.setAttribute(
      "aria-label",
      state.language === "de" ? "Fortschritt im aktuellen Umlauf" : "Current orbit progress",
    );
  }

  function setError(message = "") {
    elements.error.hidden = !message;
    elements.error.textContent = message;
    elements.durationValue.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function stopLive({ preserveStartedState = true } = {}) {
    if (state.liveFrame !== null) {
      cancelAnimationFrame(state.liveFrame);
      state.liveFrame = null;
    }

    state.live = false;
    if (!preserveStartedState) {
      state.liveHasStarted = false;
      state.liveBaseSeconds = 0;
    }
    updateLiveButton();
  }

  function updateLiveButton() {
    elements.liveButton.setAttribute("aria-pressed", String(state.live));
    const label = state.live ? t("liveStop") : state.liveHasStarted ? t("liveResume") : t("liveStart");
    const labelElement = elements.liveButton.querySelector("span:last-child");
    if (labelElement) labelElement.textContent = label;
  }

  function startLive() {
    if (!state.liveHasStarted) {
      state.durationSeconds = 0;
      state.liveBaseSeconds = 0;
      state.liveHasStarted = true;
      elements.durationUnit.value = "seconds";
    } else {
      state.liveBaseSeconds = state.durationSeconds;
    }

    state.live = true;
    state.liveStartedAt = performance.now();
    state.lastLiveRender = 0;
    updateLiveButton();
    tickLive(state.liveStartedAt);
  }

  function tickLive(timestamp) {
    if (!state.live) return;

    state.durationSeconds = Math.min(
      state.liveBaseSeconds + (timestamp - state.liveStartedAt) / 1000,
      data.MAX_DURATION_SECONDS,
    );

    if (timestamp - state.lastLiveRender >= 90) {
      elements.durationValue.value = calculations.formatInputValue(state.durationSeconds);
      syncSlider();
      render();
      state.lastLiveRender = timestamp;
    }

    state.liveFrame = requestAnimationFrame(tickLive);
  }

  function syncSlider() {
    const logValue = calculations.clamp(
      calculations.secondsToLogValue(state.durationSeconds),
      Number(elements.scaleSlider.min),
      Number(elements.scaleSlider.max),
    );
    elements.scaleSlider.value = logValue.toFixed(3);
  }

  function setInputFromSeconds(seconds) {
    const readable = calculations.pickReadableUnit(seconds);
    elements.durationUnit.value = readable.unit;
    elements.durationValue.value = calculations.formatInputValue(readable.value);
  }

  function setDuration(seconds, { syncInput = true, manual = true } = {}) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      setError(t("invalidDuration"));
      return false;
    }

    if (seconds > data.MAX_DURATION_SECONDS) {
      setError(t("durationTooLarge"));
      return false;
    }

    if (manual) stopLive({ preserveStartedState: false });
    setError();
    state.durationSeconds = seconds;
    if (syncInput) setInputFromSeconds(seconds);
    syncSlider();
    render();
    return true;
  }

  function readDurationFields() {
    try {
      const seconds = calculations.durationToSeconds(elements.durationValue.value, elements.durationUnit.value);
      setDuration(seconds, { syncInput: false, manual: true });
    } catch (_error) {
      setError(t("invalidDuration"));
    }
  }

  function formatRotationLength(planet) {
    const language = state.language;
    let value;
    let unit;

    if (planet.rotationHours >= 48) {
      value = calculations.formatCosmicNumber(planet.rotationHours / 24, language);
      unit = t("earthDays");
    } else {
      value = calculations.formatCosmicNumber(planet.rotationHours, language);
      unit = t("earthHours");
    }

    return `${t("oneRotation")} = ${value} ${unit}${planet.retrograde ? ` · ${t("retrograde")}` : ""}`;
  }

  function formatOrbitLength(planet) {
    const value = calculations.formatCosmicNumber(planet.orbitDays, state.language);
    return `${t("oneOrbit")} = ${value} ${t("earthDays")}`;
  }

  function selectPlanet(planetId, { scroll = false } = {}) {
    if (!data.PLANETS.some((planet) => planet.id === planetId)) return;
    state.selectedPlanetId = planetId;
    render();

    if (scroll) {
      elements.focusCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function renderPlanetSelector() {
    elements.planetSelector.innerHTML = "";
    data.PLANETS.forEach((planet) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "planet-selector__button";
      button.dataset.planetId = planet.id;
      button.setAttribute("role", "listitem");
      button.setAttribute("aria-pressed", String(planet.id === state.selectedPlanetId));
      button.setAttribute("aria-label", `${t("focusAction")} ${planet.name[state.language]}`);
      button.innerHTML = `<span class="planet planet--${planet.id}" aria-hidden="true"></span><span>${planet.name[state.language]}</span>`;
      button.addEventListener("click", () => selectPlanet(planet.id));
      elements.planetSelector.append(button);
    });
  }

  function renderPlanetGrid(results) {
    elements.planetGrid.innerHTML = "";

    results.forEach((result) => {
      const planet = result.planet;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "planet-card";
      button.dataset.planetId = planet.id;
      button.setAttribute("aria-pressed", String(planet.id === state.selectedPlanetId));
      button.setAttribute("aria-label", `${t("focusAction")} ${planet.name[state.language]}`);
      button.innerHTML = `
        <span class="planet planet--${planet.id}" aria-hidden="true"></span>
        <span class="planet-card__content">
          <span class="planet-card__top">
            <strong>${planet.name[state.language]}</strong>
            <small>${String(data.PLANETS.indexOf(planet) + 1).padStart(2, "0")}</small>
          </span>
          <span class="planet-card__values">
            <span>
              <strong>${calculations.formatCosmicNumber(result.rotations, state.language)}</strong>
              <small>${t("resultRotations")}</small>
            </span>
            <span>
              <strong>${calculations.formatCosmicNumber(result.orbits, state.language)}</strong>
              <small>${t("resultYears")}</small>
            </span>
          </span>
        </span>`;
      button.addEventListener("click", () => selectPlanet(planet.id, { scroll: true }));
      elements.planetGrid.append(button);
    });
  }

  function renderSourceLinks() {
    elements.sourceLinks.innerHTML = "";
    data.PLANETS.forEach((planet) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = planet.source;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `${planet.name[state.language]} · ${t("sourceSuffix")}`;
      item.append(link);
      elements.sourceLinks.append(item);
    });
  }

  function renderInsight(results) {
    if (state.durationSeconds === 0) {
      elements.insight.textContent = t("zeroInsight");
      return;
    }

    const extremes = calculations.getExtremes(results);
    const replacements = {
      orbitPlanet: extremes.mostOrbits.planet.name[state.language],
      orbitValue: calculations.formatCosmicNumber(extremes.mostOrbits.orbits, state.language),
      spinPlanet: extremes.mostRotations.planet.name[state.language],
      spinValue: calculations.formatCosmicNumber(extremes.mostRotations.rotations, state.language),
    };

    const parts = t("insight").split(/(\{orbitPlanet\}|\{orbitValue\}|\{spinPlanet\}|\{spinValue\})/g);
    elements.insight.innerHTML = "";
    parts.forEach((part) => {
      const key = part.slice(1, -1);
      if (replacements[key]) {
        const strong = document.createElement("strong");
        strong.textContent = replacements[key];
        elements.insight.append(strong);
      } else {
        elements.insight.append(document.createTextNode(part));
      }
    });
  }

  function updatePresetStates() {
    elements.presets.querySelectorAll("button[data-seconds]").forEach((button) => {
      const presetSeconds = Number(button.dataset.seconds);
      const tolerance = Math.max(0.01, presetSeconds * 1e-10);
      button.setAttribute("aria-pressed", String(Math.abs(state.durationSeconds - presetSeconds) <= tolerance));
    });
  }

  function render() {
    const results = calculations.calculateAllPlanets(state.durationSeconds, data.PLANETS);
    const selectedIndex = data.PLANETS.findIndex((planet) => planet.id === state.selectedPlanetId);
    const selectedResult = results[selectedIndex];
    const planet = selectedResult.planet;
    const progressPercent = selectedResult.orbitProgress * 100;

    elements.durationOutput.textContent = calculations.formatEarthDuration(state.durationSeconds, state.language);
    elements.focusKicker.textContent = planet.kicker[state.language];
    elements.focusName.textContent = planet.name[state.language];
    elements.focusFact.textContent = planet.fact[state.language];
    elements.focusRotations.textContent = calculations.formatCosmicNumber(selectedResult.rotations, state.language);
    elements.focusOrbits.textContent = calculations.formatCosmicNumber(selectedResult.orbits, state.language);
    elements.focusRotationLength.textContent = formatRotationLength(planet);
    elements.focusOrbitLength.textContent = formatOrbitLength(planet);
    elements.focusPlanetNumber.textContent = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(data.PLANETS.length).padStart(2, "0")}`;
    elements.focusPlanetVisual.className = `planet planet--large planet--${planet.id}`;
    elements.focusCard.style.setProperty("--planet-glow", planet.glow);
    elements.orbitProgressLabel.textContent = `${calculations.formatCosmicNumber(progressPercent, state.language)}%`;
    elements.orbitProgressTrack.setAttribute("aria-valuenow", progressPercent.toFixed(2));
    elements.orbitProgressTrack.querySelector("span").style.width = `${progressPercent}%`;

    renderPlanetSelector();
    renderPlanetGrid(results);
    renderInsight(results);
    renderSourceLinks();
    updatePresetStates();
    updateLiveButton();
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    state.toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
  }

  async function copySelectedResult() {
    const planet = data.PLANETS.find((item) => item.id === state.selectedPlanetId);
    const result = calculations.calculatePlanetTime(state.durationSeconds, planet);
    const summary =
      `Galaxy Timekeeper — ${calculations.formatEarthDuration(state.durationSeconds, state.language)} = ` +
      `${calculations.formatCosmicNumber(result.rotations, state.language)} ${planet.name[state.language]} ${t("resultRotations")} / ` +
      `${calculations.formatCosmicNumber(result.orbits, state.language)} ${planet.name[state.language]} ${t("resultYears")}.`;

    try {
      await navigator.clipboard.writeText(summary);
      showToast(t("copied"));
    } catch (_error) {
      showToast(t("copyFailed"));
    }
  }

  function bindEvents() {
    elements.durationValue.addEventListener("input", readDurationFields);
    elements.durationUnit.addEventListener("change", readDurationFields);

    elements.scaleSlider.addEventListener("input", () => {
      const seconds = Math.min(calculations.logValueToSeconds(elements.scaleSlider.value), data.MAX_DURATION_SECONDS);
      setDuration(seconds, { syncInput: true, manual: true });
    });

    elements.presets.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-seconds]");
      if (!button) return;
      setDuration(Number(button.dataset.seconds), { syncInput: true, manual: true });
    });

    elements.liveButton.addEventListener("click", () => {
      if (state.live) {
        state.liveBaseSeconds = state.durationSeconds;
        stopLive();
      } else {
        startLive();
      }
    });

    elements.languageToggle.addEventListener("click", () => {
      state.language = state.language === "en" ? "de" : "en";
      applyTranslations();
      render();
    });

    elements.copyButton.addEventListener("click", copySelectedResult);
  }

  function initialize() {
    const maxLog = Math.log10(data.MAX_DURATION_SECONDS);
    elements.scaleSlider.max = maxLog.toFixed(3);
    document.querySelector('[data-i18n="presetUniverse"]').dataset.seconds = String(data.MAX_DURATION_SECONDS);
    applyTranslations();
    bindEvents();
    syncSlider();
    render();
  }

  initialize();
})(globalThis);
