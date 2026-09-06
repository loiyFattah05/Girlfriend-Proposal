/* =========================================
   GIRLFRIEND PROPOSAL
   VERSION 2.3
   IPHONE-FIRST TERMINAL EXPERIENCE

   Normal mode:
   Starts from the flower-care sequence.

   Developer mode:
   ?phase=3
   ?phase=4

   Current normal flow ends by handing off
   into the separate phase files.
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const terminal =
    document.getElementById("terminal");

const terminalScreen =
    document.getElementById("terminal-screen");


/* =========================================
   EXPERIENCE SETTINGS
========================================= */

const settings = {

    typingSpeed: 42,

    fastTypingSpeed: 27,

    linePause: 550,

    shortPause: 850,

    mediumPause: 1400,

    longPause: 2000,

    dontTouchDuration: 2200

};


/* =========================================
   WAIT
========================================= */

function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(
            resolve,
            milliseconds
        );

    });

}


/* =========================================
   AUTO-SCROLL TERMINAL
========================================= */

function scrollTerminal(
    smooth = true
) {

    const lastElement =
        terminal.lastElementChild;


    if (!lastElement) {
        return;
    }


    requestAnimationFrame(() => {

        lastElement.scrollIntoView({

            behavior:
                smooth
                    ? "smooth"
                    : "auto",

            block: "end"

        });

    });

}


/* =========================================
   CREATE TERMINAL LINE
========================================= */

function createLine(
    className = ""
) {

    const line =
        document.createElement("div");


    line.classList.add(
        "terminal-line"
    );


    if (className) {

        line.classList.add(
            className
        );

    }


    terminal.appendChild(
        line
    );


    return line;

}


/* =========================================
   TYPE TEXT LETTER BY LETTER
========================================= */

async function typeText(
    text,
    speed = settings.typingSpeed,
    className = ""
) {

    const line =
        createLine(
            className
        );


    const cursor =
        document.createElement("span");


    cursor.classList.add(
        "cursor"
    );


    line.appendChild(
        cursor
    );


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        cursor.insertAdjacentText(
            "beforebegin",
            text[i]
        );


        /*
            Scroll every few characters
            instead of every character.

            This is smoother on iPhone.
        */

        if (i % 5 === 0) {

            scrollTerminal(
                false
            );

        }


        await wait(
            speed
        );

    }


    cursor.remove();


    scrollTerminal(
        true
    );


    return line;

}


/* =========================================
   ADD TEXT IMMEDIATELY
========================================= */

function addText(
    text,
    className = ""
) {

    const line =
        createLine(
            className
        );


    line.textContent =
        text;


    scrollTerminal();


    return line;

}


/* =========================================
   ADD EMPTY SPACE
========================================= */

function addSpace(
    height = 14
) {

    const space =
        document.createElement("div");


    space.style.height =
        `${height}px`;


    terminal.appendChild(
        space
    );

}


/* =========================================
   CLEAR TERMINAL
========================================= */

function clearTerminal() {

    terminal.innerHTML =
        "";


    window.scrollTo({

        top: 0,

        behavior: "auto"

    });

}


/* =========================================
   ANIMATED LOADING BAR

   Updates ONE percentage element.

   Example:

   Scanning
   [████████████          ]
   47%

   Only 47 changes.
========================================= */

async function loadingBar(
    label,
    duration = 2500
) {

    const container =
        document.createElement("div");


    container.classList.add(
        "loading-container"
    );


    const labelElement =
        document.createElement("div");


    labelElement.classList.add(
        "loading-label"
    );


    labelElement.textContent =
        label;


    const bar =
        document.createElement("div");


    bar.classList.add(
        "loading-bar"
    );


    const fill =
        document.createElement("div");


    fill.classList.add(
        "loading-fill"
    );


    const percentage =
        document.createElement("div");


    percentage.classList.add(
        "loading-percentage"
    );


    percentage.textContent =
        "0%";


    bar.appendChild(
        fill
    );


    container.appendChild(
        labelElement
    );


    container.appendChild(
        bar
    );


    container.appendChild(
        percentage
    );


    terminal.appendChild(
        container
    );


    scrollTerminal();


    const startTime =
        performance.now();


    let previousPercent =
        -1;


    return new Promise(resolve => {

        function update(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const percent =
                Math.floor(
                    progress * 100
                );


            if (
                percent !==
                previousPercent
            ) {

                previousPercent =
                    percent;


                percentage.textContent =
                    `${percent}%`;


                fill.style.width =
                    `${percent}%`;

            }


            if (
                percent > 0 &&
                percent % 10 === 0
            ) {

                scrollTerminal(
                    false
                );

            }


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            }

            else {

                percentage.textContent =
                    "100%";


                fill.style.width =
                    "100%";


                resolve();

            }

        }


        requestAnimationFrame(
            update
        );

    });

}


/* =========================================
   ANIMATED SCORE

   Used in Phase 4.

   Example:

   Chemistry ............. 0%

   Only the percentage changes.
========================================= */

async function score(
    name,
    target,
    duration = 1800
) {

    target =
        Math.max(
            0,
            Math.min(
                100,
                target
            )
        );


    const row =
        document.createElement("div");


    row.classList.add(
        "score-row"
    );


    const nameElement =
        document.createElement("span");


    nameElement.classList.add(
        "score-name"
    );


    nameElement.textContent =
        name;


    const dots =
        document.createElement("span");


    dots.classList.add(
        "score-dots"
    );


    const percentage =
        document.createElement("span");


    percentage.classList.add(
        "score-percent"
    );


    percentage.textContent =
        "0%";


    row.appendChild(
        nameElement
    );


    row.appendChild(
        dots
    );


    row.appendChild(
        percentage
    );


    terminal.appendChild(
        row
    );


    scrollTerminal();


    /*
        If the target is zero,
        leave it at zero.
    */

    if (target === 0) {

        await wait(
            550
        );

        return;

    }


    const startTime =
        performance.now();


    let previousValue =
        -1;


    return new Promise(resolve => {

        function update(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const currentValue =
                Math.floor(
                    progress * target
                );


            if (
                currentValue !==
                previousValue
            ) {

                previousValue =
                    currentValue;


                percentage.textContent =
                    `${currentValue}%`;

            }


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            }

            else {

                percentage.textContent =
                    `${target}%`;


                resolve();

            }

        }


        requestAnimationFrame(
            update
        );

    });

}


/* =========================================
   WHITE FLASH
========================================= */

async function whiteFlash() {

    const flash =
        document.createElement("div");


    flash.classList.add(
        "white-flash"
    );


    document.body.appendChild(
        flash
    );


    await wait(
        240
    );


    flash.remove();

}


/* =========================================
   DRAMATIC GLITCH
========================================= */

async function dramaticGlitch() {

    const overlay =
        document.createElement("div");


    overlay.classList.add(
        "glitch-overlay"
    );


    document.body.appendChild(
        overlay
    );


    /*
        Shake and distort
        the flower terminal.
    */

    terminalScreen.classList.add(
        "heavy-glitch"
    );


    terminal.classList.add(
        "glitch-skew"
    );


    const colors = [

        "#ff004c",
        "#00ffff",
        "#ffffff",
        "#ff00ff",
        "#00ff66",
        "#3355ff",
        "#ffff00",
        "#ff6600"

    ];


    const pixels = [];

    const whiteLines = [];

    const blackLines = [];


    /* =====================================
       COLOR CORRUPTION
    ===================================== */

    for (
        let i = 0;
        i < 85;
        i++
    ) {

        const pixel =
            document.createElement("div");


        pixel.classList.add(
            "glitch-pixel"
        );


        pixel.style.width =
            `${Math.random() * 120 + 8}px`;


        pixel.style.height =
            `${Math.random() * 42 + 3}px`;


        pixel.style.left =
            `${Math.random() * 100}%`;


        pixel.style.top =
            `${Math.random() * 100}%`;


        pixel.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        pixel.style.opacity =
            Math.random() * 0.8 + 0.2;


        overlay.appendChild(
            pixel
        );


        pixels.push(
            pixel
        );

    }


    /* =====================================
       WHITE DISTORTION LINES
    ===================================== */

    for (
        let i = 0;
        i < 14;
        i++
    ) {

        const line =
            document.createElement("div");


        line.classList.add(
            "glitch-line"
        );


        line.style.top =
            `${Math.random() * 100}%`;


        line.style.height =
            `${Math.random() * 6 + 1}px`;


        overlay.appendChild(
            line
        );


        whiteLines.push(
            line
        );

    }


    /* =====================================
       BLACK SCREEN TEARS
    ===================================== */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const line =
            document.createElement("div");


        line.classList.add(
            "glitch-black-line"
        );


        line.style.top =
            `${Math.random() * 100}%`;


        line.style.height =
            `${Math.random() * 55 + 8}px`;


        overlay.appendChild(
            line
        );


        blackLines.push(
            line
        );

    }


    /* =====================================
       INITIAL HIT
    ===================================== */

    await wait(
        350
    );


    /* =====================================
       RAPID CORRUPTION
    ===================================== */

    for (
        let frame = 0;
        frame < 28;
        frame++
    ) {

        pixels.forEach(pixel => {

            pixel.style.left =
                `${Math.random() * 100}%`;


            pixel.style.top =
                `${Math.random() * 100}%`;


            pixel.style.opacity =
                Math.random() * 0.95 + 0.05;

        });


        whiteLines.forEach(line => {

            line.style.top =
                `${Math.random() * 100}%`;


            line.style.opacity =
                Math.random() * 0.9 + 0.1;

        });


        blackLines.forEach(line => {

            line.style.top =
                `${Math.random() * 100}%`;


            line.style.height =
                `${Math.random() * 70 + 5}px`;

        });


        /*
            Large temporary glitch bursts.
        */

        if (
            frame % 4 === 0
        ) {

            const burst =
                document.createElement("div");


            burst.classList.add(
                "glitch-pixel"
            );


            burst.style.width =
                `${Math.random() * 65 + 30}%`;


            burst.style.height =
                `${Math.random() * 25 + 6}px`;


            burst.style.left =
                `${Math.random() * 20}%`;


            burst.style.top =
                `${Math.random() * 100}%`;


            burst.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            overlay.appendChild(
                burst
            );


            setTimeout(() => {

                burst.remove();

            }, 180);

        }


        await wait(
            80
        );

    }


    /* =====================================
       SCREEN TEMPORARILY FAILS
    ===================================== */

    terminalScreen.style.opacity =
        "0";


    await wait(
        300
    );


    terminalScreen.style.opacity =
        "1";


    await wait(
        120
    );


    terminalScreen.style.opacity =
        "0";


    await wait(
        180
    );


    terminalScreen.style.opacity =
        "1";


    await wait(
        120
    );


    /* =====================================
       FINAL HEAVY CORRUPTION
    ===================================== */

    for (
        let frame = 0;
        frame < 14;
        frame++
    ) {

        pixels.forEach(pixel => {

            pixel.style.width =
                `${Math.random() * 180 + 15}px`;


            pixel.style.height =
                `${Math.random() * 60 + 3}px`;


            pixel.style.left =
                `${Math.random() * 100}%`;


            pixel.style.top =
                `${Math.random() * 100}%`;

        });


        blackLines.forEach(line => {

            line.style.height =
                `${Math.random() * 100 + 10}px`;


            line.style.top =
                `${Math.random() * 100}%`;

        });


        if (
            frame % 3 === 0
        ) {

            const largeBlock =
                document.createElement("div");


            largeBlock.classList.add(
                "glitch-pixel"
            );


            largeBlock.style.width =
                `${Math.random() * 75 + 20}%`;


            largeBlock.style.height =
                `${Math.random() * 50 + 10}px`;


            largeBlock.style.left =
                `${Math.random() * 15}%`;


            largeBlock.style.top =
                `${Math.random() * 100}%`;


            largeBlock.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            overlay.appendChild(
                largeBlock
            );


            setTimeout(() => {

                largeBlock.remove();

            }, 180);

        }


        await wait(
            100
        );

    }


    /* =====================================
       STOP DISTORTION
    ===================================== */

    terminalScreen.classList.remove(
        "heavy-glitch"
    );


    terminal.classList.remove(
        "glitch-skew"
    );


    terminalScreen.style.opacity =
        "1";


    overlay.remove();


    /* =====================================
       FIRST WHITE FLASH
    ===================================== */

    await whiteFlash();


    await wait(
        130
    );


    /* =====================================
       SECOND WHITE FLASH
    ===================================== */

    const secondFlash =
        document.createElement("div");


    secondFlash.classList.add(
        "white-flash"
    );


    secondFlash.style.opacity =
        "0.75";


    document.body.appendChild(
        secondFlash
    );


    await wait(
        180
    );


    secondFlash.remove();


    /* =====================================
       BLACKOUT
    ===================================== */

    clearTerminal();


    await wait(
        1500
    );

}


/* =========================================
   DON'T TOUCH SCREEN
========================================= */

async function showDontTouchWarning() {

    const warning =
        createLine(
            "dont-touch"
        );


    warning.textContent =
        "DON'T TOUCH SCREEN";


    await wait(
        settings.dontTouchDuration
    );


    clearTerminal();


    await wait(
        500
    );

}


/* =========================================
   NORMAL EXPERIENCE
========================================= */

async function startExperience() {

    /*
        Small pause after Safari opens.
    */

    await wait(
        850
    );


    /* =====================================
       PHASE 1
       FLOWER CARE
    ===================================== */

    await typeText(
        "FLOWER CARE DATABASE",
        settings.fastTypingSpeed
    );


    addSpace();


    await typeText(
        "Reading flower information..."
    );


    await wait(
        settings.shortPause
    );


    await loadingBar(
        "Identifying flower",
        2500
    );


    await wait(
        settings.shortPause
    );


    await typeText(
        "Flower identified."
    );


    await wait(
        400
    );


    await typeText(
        "Retrieving care instructions..."
    );


    await wait(
        settings.shortPause
    );


    await loadingBar(
        "Loading care information",
        2900
    );


    await wait(
        settings.mediumPause
    );


    /* =====================================
       ERROR
    ===================================== */

    await typeText(
        "Checking QR code..."
    );


    await wait(
        settings.mediumPause
    );


    await typeText(
        "ERROR",
        120,
        "big-message"
    );


    await wait(
        1100
    );


    /* =====================================
       MAJOR GLITCH
    ===================================== */

    await dramaticGlitch();


    /* =====================================
       SWITCH TO GREEN SECURITY MODE
    ===================================== */

    terminalScreen.classList.add(
        "security-mode"
    );


    /* =====================================
       WARNING
    ===================================== */

    await showDontTouchWarning();


    /* =====================================
       PHASE 2
       SECURITY TERMINAL
    ===================================== */

    await typeText(
        "SECURITY CHECK",
        settings.fastTypingSpeed,
        "big-message"
    );


    addSpace();


    await typeText(
        "Something unusual was detected."
    );


    await wait(
        settings.shortPause
    );


    await typeText(
        "Checking your device..."
    );


    await wait(
        450
    );


    await loadingBar(
        "Scanning",
        3800
    );


    await wait(
        settings.mediumPause
    );


    await typeText(
        "Scan complete."
    );


    addSpace();


    await typeText(
        "Unknown connection found.",
        50,
        "warning"
    );


    await wait(
        settings.longPause
    );


    /* =====================================
       FIND SOURCE
    ===================================== */

    await typeText(
        "Finding the source..."
    );


    await wait(
        600
    );


    await loadingBar(
        "Searching",
        3500
    );


    await wait(
        settings.mediumPause
    );


    await typeText(
        "Source found."
    );


    await wait(
        settings.longPause
    );


    /* =====================================
       FIRST REVEAL
    ===================================== */

    await typeText(
        "SOURCE: LOUI",
        90,
        "big-message"
    );


    /* =====================================
       HAND OFF TO PHASE 3
    ===================================== */

    await runConnectionPhase();

}


/* =========================================
   DEVELOPER / TEST MODE

   Examples:

   Full experience:
   http://127.0.0.1:5500/

   Phase 3:
   http://127.0.0.1:5500/?phase=3

   Phase 4:
   http://127.0.0.1:5500/?phase=4
========================================= */

async function startFromSelectedPhase() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const requestedPhase =
        params.get(
            "phase"
        );


    /*
        No phase in the URL means
        run the real experience.
    */

    if (!requestedPhase) {

        await startExperience();

        return;

    }


    const phase =
        Number(
            requestedPhase
        );


    /*
        Reset the page before starting
        a developer shortcut.
    */

    clearTerminal();


    /*
        Phase 3 and later occur AFTER
        the major glitch, so developer
        mode should already look like
        the green security terminal.
    */

    terminalScreen.classList.add(
        "security-mode"
    );


    /* =====================================
       PHASE 1
       FULL EXPERIENCE
    ===================================== */

    if (phase === 1) {

        terminalScreen.classList.remove(
            "security-mode"
        );


        await startExperience();

        return;

    }


    /* =====================================
       PHASE 3
       CONNECTION ANALYSIS
    ===================================== */

    if (phase === 3) {

        await runConnectionPhase();

        return;

    }


    /* =====================================
       PHASE 4
       COMPATIBILITY CHECK
    ===================================== */

    if (phase === 4) {

        await runCompatibilityPhase();

        return;

    }
    /* =====================================
   PHASE 5
   RELATIONSHIP REVIEW
===================================== */

if (phase === 5) {

    await runRelationshipPhase();

    return;

}

/* =====================================
   PHASE 6
   ROMANTIC TRANSITION
===================================== */

if (phase === 6) {

    await runRomanticPhase();

    return;

}

/* =====================================
   PHASE 7
   FINAL QUESTION
===================================== */

if (phase === 7) {

    await runQuestionPhase();

    return;

}


    /* =====================================
       INVALID PHASE
    ===================================== */

    await typeText(
        `Unknown test phase: ${phase}`
    );

}


/* =========================================
   START
========================================= */

startFromSelectedPhase();