/* =========================================
   PHASE 4
   COMPATIBILITY CHECK

   Starts after:
   COMPATIBILITY CHECK READY
========================================= */


async function runCompatibilityPhase() {

    /*
        Let the ready message sit
        for a moment.
    */

    await wait(1800);


    addSpace(12);


    /* =====================================
       BEGIN TEST
    ===================================== */

    await typeText(
        "Starting compatibility check..."
    );


    await wait(700);


    await loadingBar(
        "Initializing",
        2400
    );


    await wait(1200);


    addSpace(8);


    /* =====================================
       COMPATIBILITY SCORES

       Each label stays on ONE line.
       Only the percentage changes.
    ===================================== */


    await score(
        "Chemistry",
        100,
        2300
    );


    await wait(450);


    await score(
        "Making Me smile",
        100,
        2200
    );


    await wait(450);


    await score(
        "Wanting to see you",
        100,
        2200
    );


    await wait(450);


    await score(
        "Thinking about you",
        99,
        2300
    );


    await wait(450);


    await score(
        "Missing you",
        200,
        2200
    );


    await wait(450);


    await score(
        "Interest in other girls",
        0,
        900
    );


    /* =====================================
       PAUSE AFTER RESULTS
    ===================================== */

    await wait(1800);


    addSpace(12);


    /* =====================================
       FINAL ANALYSIS
    ===================================== */

    await typeText(
        "Analyzing results..."
    );


    await wait(700);


    await loadingBar(
        "Calculating compatibility",
        3400
    );


    await wait(1400);


    await typeText(
        "FINAL COMPATIBILITY: 99.9%",
        75,
        "big-message"
    );


    await wait(2200);


    addSpace(10);


    /* =====================================
       SOMETHING DOESN'T MATCH
    ===================================== */

    await typeText(
        "Something does not match."
    );


    await wait(900);


    await typeText(
        "Current relationship status may be outdated."
    );


    await wait(1700);


    await typeText(
        "Relationship review required.",
        65,
        "warning"
    );


    /*
        PHASE 4 ENDS HERE.

        Phase 5:
        current status vs recommended status.
    */
   /* =====================================
   HAND OFF TO PHASE 5
===================================== */

await runRelationshipPhase();

}