// ==========================================================
// GIRLFRIEND PROPOSAL
// script.js
//
// Shared helpers + opening experience
// iPhone scrolling fix included
// ==========================================================


// ----------------------------------------------------------
// ELEMENTS
// ----------------------------------------------------------

const terminal = document.getElementById("terminal");
const terminalScreen = document.getElementById("terminal-screen");


// ----------------------------------------------------------
// SETTINGS
// ----------------------------------------------------------

const settings = {
    typingSpeed: 42,
    fastTypingSpeed: 27,

    linePause: 550,

    shortPause: 850,
    mediumPause: 1400,
    longPause: 2000,

    dontTouchDuration: 2200
};


// ----------------------------------------------------------
// BASIC HELPERS
// ----------------------------------------------------------

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ==========================================================
// IPHONE-SAFE TERMINAL SCROLLING
//
// IMPORTANT:
// We DO NOT use scrollIntoView() anymore.
//
// scrollIntoView() can make Safari move the entire viewport,
// which causes the annoying up/down jumping.
//
// Now only the terminal element itself scrolls.
// ==========================================================

let terminalScrollFrame = null;

function scrollTerminal() {

    if (!terminal) {
        return;
    }

    if (terminalScrollFrame) {
        cancelAnimationFrame(terminalScrollFrame);
    }

    terminalScrollFrame = requestAnimationFrame(() => {

        terminal.scrollTop = terminal.scrollHeight;

        terminalScrollFrame = null;

    });
}


// ----------------------------------------------------------
// CREATE TERMINAL LINE
// ----------------------------------------------------------

function createLine(className = "") {

    const line = document.createElement("div");

    line.className = "terminal-line";

    if (className) {
        line.classList.add(className);
    }

    terminal.appendChild(line);

    scrollTerminal();

    return line;
}


// ----------------------------------------------------------
// TYPE TEXT
// ----------------------------------------------------------

async function typeText(
    text,
    speed = settings.typingSpeed,
    className = ""
) {

    const line = createLine(className);

    const textSpan = document.createElement("span");
    const cursor = document.createElement("span");

    cursor.className = "cursor";

    line.appendChild(textSpan);
    line.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {

        textSpan.textContent += text[i];

        /*
            Only update scroll occasionally instead of
            every single character.

            This keeps the terminal steady on iPhone.
        */

        if (i % 5 === 0) {
            scrollTerminal();
        }

        await wait(speed);
    }

    cursor.remove();

    scrollTerminal();

    await wait(settings.linePause);

    return line;
}


// ----------------------------------------------------------
// ADD TEXT WITHOUT TYPING
// ----------------------------------------------------------

function addText(text, className = "") {

    const line = createLine(className);

    line.textContent = text;

    scrollTerminal();

    return line;
}


// ----------------------------------------------------------
// BLANK LINE
// ----------------------------------------------------------

function addSpace() {

    const line = createLine("terminal-space");

    line.innerHTML = "&nbsp;";

    scrollTerminal();

    return line;
}


// ----------------------------------------------------------
// CLEAR TERMINAL
// ----------------------------------------------------------

function clearTerminal() {

    terminal.innerHTML = "";

    terminal.scrollTop = 0;
}


// ==========================================================
// LOADING BAR
// ==========================================================

async function loadingBar(label, duration = 2500) {

    const container = document.createElement("div");

    container.className = "loading-container";


    // Top row

    const header = document.createElement("div");

    header.className = "loading-header";


    const labelElement = document.createElement("span");

    labelElement.className = "loading-label";
    labelElement.textContent = label;


    const percentage = document.createElement("span");

    percentage.className = "loading-percentage";
    percentage.textContent = "0%";


    header.appendChild(labelElement);
    header.appendChild(percentage);


    // Bar

    const bar = document.createElement("div");

    bar.className = "loading-bar";


    const fill = document.createElement("div");

    fill.className = "loading-fill";

    bar.appendChild(fill);


    container.appendChild(header);
    container.appendChild(bar);

    terminal.appendChild(container);

    scrollTerminal();


    // Animate 0 → 100%

    await new Promise(resolve => {

        const start = performance.now();

        function update(now) {

            const elapsed = now - start;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const value = Math.floor(
                progress * 100
            );

            percentage.textContent = `${value}%`;

            fill.style.width = `${value}%`;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                percentage.textContent = "100%";
                fill.style.width = "100%";

                resolve();
            }
        }

        requestAnimationFrame(update);
    });

    scrollTerminal();

    await wait(450);
}


// ==========================================================
// COMPATIBILITY SCORE
// ==========================================================

async function score(
    name,
    target,
    duration = 1800
) {

    target = Math.max(
        0,
        Math.min(100, target)
    );


    const row = document.createElement("div");

    row.className = "score-row";


    const nameElement = document.createElement("span");

    nameElement.className = "score-name";
    nameElement.textContent = name;


    const dots = document.createElement("span");

    dots.className = "score-dots";
    dots.textContent =
        "........................................";


    const percentage = document.createElement("span");

    percentage.className = "score-percent";
    percentage.textContent = "0%";


    row.appendChild(nameElement);
    row.appendChild(dots);
    row.appendChild(percentage);

    terminal.appendChild(row);

    scrollTerminal();


    await new Promise(resolve => {

        const start = performance.now();

        function update(now) {

            const elapsed = now - start;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const value = Math.floor(
                progress * target
            );

            percentage.textContent = `${value}%`;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                percentage.textContent = `${target}%`;

                resolve();
            }
        }

        requestAnimationFrame(update);
    });

    scrollTerminal();

    await wait(450);
}


// ==========================================================
// WHITE FLASH
// ==========================================================

async function whiteFlash(duration = 120) {

    const flash = document.createElement("div");

    flash.className = "white-flash";

    document.body.appendChild(flash);

    await wait(duration);

    flash.remove();
}


// ==========================================================
// DRAMATIC GLITCH
// ==========================================================

async function dramaticGlitch() {

    const overlay = document.createElement("div");

    overlay.className = "glitch-overlay";

    document.body.appendChild(overlay);


    terminalScreen.classList.add("heavy-glitch");


    // ------------------------------------------------------
    // RANDOM PIXEL BLOCK GENERATOR
    // ------------------------------------------------------

    function createPixels(amount = 10) {

        const colors = [
            "#ff003c",
            "#00eaff",
            "#ffffff",
            "#ff00ea",
            "#00ff66",
            "#ffe600"
        ];

        for (let i = 0; i < amount; i++) {

            const pixel =
                document.createElement("div");

            pixel.className = "glitch-pixel";

            pixel.style.left =
                `${Math.random() * 100}%`;

            pixel.style.top =
                `${Math.random() * 100}%`;

            pixel.style.width =
                `${20 + Math.random() * 120}px`;

            pixel.style.height =
                `${4 + Math.random() * 30}px`;

            pixel.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];

            pixel.style.opacity =
                `${0.4 + Math.random() * 0.6}`;

            overlay.appendChild(pixel);

            setTimeout(() => {
                pixel.remove();
            }, 80 + Math.random() * 250);
        }
    }


    // ------------------------------------------------------
    // RANDOM GLITCH LINES
    // ------------------------------------------------------

    function createLines(amount = 6) {

        for (let i = 0; i < amount; i++) {

            const line =
                document.createElement("div");

            line.className = "glitch-line";

            line.style.top =
                `${Math.random() * 100}%`;

            line.style.height =
                `${2 + Math.random() * 14}px`;

            line.style.transform =
                `translateX(${
                    -40 +
                    Math.random() * 80
                }px)`;

            overlay.appendChild(line);

            setTimeout(() => {
                line.remove();
            }, 80 + Math.random() * 200);
        }
    }


    // ------------------------------------------------------
    // BLACK CORRUPTION BARS
    // ------------------------------------------------------

    function createBlackBars(amount = 4) {

        for (let i = 0; i < amount; i++) {

            const line =
                document.createElement("div");

            line.className =
                "glitch-black-line";

            line.style.top =
                `${Math.random() * 100}%`;

            line.style.height =
                `${5 + Math.random() * 35}px`;

            overlay.appendChild(line);

            setTimeout(() => {
                line.remove();
            }, 100 + Math.random() * 300);
        }
    }


    // ------------------------------------------------------
    // GLITCH SEQUENCE
    // ------------------------------------------------------

    createPixels(12);
    createLines(5);

    await wait(300);


    terminalScreen.classList.add(
        "glitch-skew"
    );

    createPixels(18);
    createLines(8);

    await whiteFlash(90);

    await wait(350);


    terminalScreen.classList.remove(
        "glitch-skew"
    );

    createBlackBars(5);
    createPixels(25);

    await wait(500);


    await whiteFlash(130);

    createLines(12);
    createPixels(30);

    await wait(450);


    terminalScreen.classList.add(
        "glitch-skew"
    );

    createBlackBars(7);

    await wait(350);


    terminalScreen.classList.remove(
        "glitch-skew"
    );

    createPixels(40);
    createLines(15);

    await whiteFlash(80);

    await wait(450);


    createBlackBars(9);

    await wait(400);


    await whiteFlash(180);

    await wait(250);


    // ------------------------------------------------------
    // SCREEN FAILURE / BLACKOUT
    // ------------------------------------------------------

    terminalScreen.style.opacity = "0";

    await wait(700);


    terminalScreen.classList.remove(
        "heavy-glitch"
    );

    terminalScreen.classList.remove(
        "glitch-skew"
    );

    overlay.remove();


    terminalScreen.style.opacity = "1";
}


// ==========================================================
// DON'T TOUCH SCREEN WARNING
// ==========================================================

async function showDontTouchWarning() {

    clearTerminal();

    const warning =
        document.createElement("div");

    warning.className = "dont-touch";

    warning.textContent =
        "DON'T TOUCH SCREEN";

    terminal.appendChild(warning);

    scrollTerminal();

    await wait(
        settings.dontTouchDuration
    );

    clearTerminal();
}


// ==========================================================
// MAIN EXPERIENCE
// ==========================================================

async function startExperience() {

    await wait(settings.shortPause);


    // ------------------------------------------------------
    // FAKE FLOWER CARE SCREEN
    // ------------------------------------------------------

    await typeText(
        "FLOWER CARE DATABASE"
    );

    await typeText(
        "Reading flower information..."
    );

    await loadingBar(
        "Identifying flower",
        2500
    );

    await typeText(
        "Flower identified."
    );

    await typeText(
        "Retrieving care instructions..."
    );

    await loadingBar(
        "Loading care information",
        2900
    );

    await typeText(
        "Checking QR code..."
    );


    // ------------------------------------------------------
    // ERROR
    // ------------------------------------------------------

    await typeText(
        "ERROR",
        120,
        "error"
    );

    await wait(1100);


    // ------------------------------------------------------
    // GLITCH
    // ------------------------------------------------------

    await dramaticGlitch();


    // ------------------------------------------------------
    // GREEN SECURITY MODE
    // ------------------------------------------------------

    terminalScreen.classList.add(
        "security-mode"
    );

    await showDontTouchWarning();


    await typeText(
        "SECURITY CHECK"
    );

    await typeText(
        "Something unusual was detected."
    );

    await typeText(
        "Checking your device..."
    );

    await loadingBar(
        "Scanning",
        3800
    );

    await typeText(
        "Scan complete."
    );

    await typeText(
        "Unknown connection found."
    );

    await typeText(
        "Finding the source..."
    );

    await loadingBar(
        "Searching",
        3500
    );

    await typeText(
        "Source found."
    );

    await typeText(
        "SOURCE: LOUI",
        settings.typingSpeed,
        "source-reveal"
    );


    // ------------------------------------------------------
    // PHASE 3
    // ------------------------------------------------------

    if (
        typeof runConnectionPhase ===
        "function"
    ) {

        await runConnectionPhase();

    } else {

        console.error(
            "runConnectionPhase() not found."
        );
    }
}


// ==========================================================
// DEVELOPMENT / TEST MODE
//
// Examples:
//
// Full experience:
// http://127.0.0.1:5500/
//
// Phase 3:
// http://127.0.0.1:5500/?phase=3
//
// Phase 7:
// http://127.0.0.1:5500/?phase=7
// ==========================================================

async function startFromSelectedPhase() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const requestedPhase =
        params.get("phase");


    // Normal experience

    if (!requestedPhase) {

        await startExperience();

        return;
    }


    const phase =
        Number(requestedPhase);


    clearTerminal();

    terminalScreen.classList.add(
        "security-mode"
    );


    // ------------------------------------------------------
    // PHASE 1
    // ------------------------------------------------------

    if (phase === 1) {

        terminalScreen.classList.remove(
            "security-mode"
        );

        await startExperience();

        return;
    }


    // ------------------------------------------------------
    // PHASE 3
    // ------------------------------------------------------

    if (phase === 3) {

        if (
            typeof runConnectionPhase ===
            "function"
        ) {

            await runConnectionPhase();
        }

        return;
    }


    // ------------------------------------------------------
    // PHASE 4
    // ------------------------------------------------------

    if (phase === 4) {

        if (
            typeof runCompatibilityPhase ===
            "function"
        ) {

            await runCompatibilityPhase();
        }

        return;
    }


    // ------------------------------------------------------
    // PHASE 5
    // ------------------------------------------------------

    if (phase === 5) {

        if (
            typeof runRelationshipPhase ===
            "function"
        ) {

            await runRelationshipPhase();
        }

        return;
    }


    // ------------------------------------------------------
    // PHASE 6
    // ------------------------------------------------------

    if (phase === 6) {

        if (
            typeof runRomanticPhase ===
            "function"
        ) {

            await runRomanticPhase();
        }

        return;
    }


    // ------------------------------------------------------
    // PHASE 7
    // ------------------------------------------------------

    if (phase === 7) {

        if (
            typeof runQuestionPhase ===
            "function"
        ) {

            await runQuestionPhase();
        }

        return;
    }


    // ------------------------------------------------------
    // PHASE 8
    // ------------------------------------------------------

    if (phase === 8) {

        if (
            typeof runSuccessPhase ===
            "function"
        ) {

            await runSuccessPhase();
        }

        return;
    }


    await typeText(
        `Unknown test phase: ${phase}`
    );
}


// ==========================================================
// START
// ==========================================================

startFromSelectedPhase();