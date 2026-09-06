/* =========================================
   PHASE 3
   CONNECTION ANALYSIS

   Starts immediately after:
   SOURCE: LOUI
========================================= */


async function runConnectionPhase() {

    /*
        Let SOURCE: LOUI sit there
        for a moment.
    */

    await wait(2200);


    addSpace(12);


    /* =====================================
       BEGIN INVESTIGATION
    ===================================== */

    await typeText(
        "Reviewing connection..."
    );


    await wait(800);


    await loadingBar(
        "Analyzing",
        3200
    );


    await wait(1200);


    /* =====================================
       CONNECTION IS SAFE
    ===================================== */

    await typeText(
        "Connection appears safe."
    );


    await wait(700);


    await typeText(
        "No harmful activity detected."
    );


    await wait(1600);


    addSpace(10);


    /* =====================================
       WHY IS LOUI CONNECTED?
    ===================================== */

    await typeText(
        "Checking reason for connection..."
    );


    await wait(700);


    await loadingBar(
        "Reviewing activity",
        3000
    );


    await wait(1200);


    await typeText(
        "Reason identified."
    );


    await wait(1500);


    await typeText(
        "PERSONAL INTEREST",
        85,
        "big-message"
    );


    await wait(2000);


    /* =====================================
       LOOK DEEPER
    ===================================== */

    await typeText(
        "Looking deeper..."
    );


    await wait(600);


    await loadingBar(
        "Analyzing patterns",
        3400
    );


    await wait(1200);


    /* =====================================
       FIRST ROMANTIC CLUES
    ===================================== */

    await typeText(
        "A lot of thoughts about you detected."
    );


    await wait(1000);


    await typeText(
        "High interest level detected."
    );


    await wait(1000);


    await typeText(
        "A lot of smiling detected."
    );


    await wait(1600);


    addSpace(12);


    /* =====================================
       PREPARE NEXT PHASE
    ===================================== */

    await typeText(
        "More information is required."
    );


    await wait(900);


    await typeText(
        "Preparing compatibility check..."
    );


    await wait(700);


    await loadingBar(
        "Preparing",
        2600
    );


    await wait(1500);


    await typeText(
        "COMPATIBILITY CHECK READY",
        70,
        "big-message"
    );


    /*
        PHASE 3 ENDS HERE.

        Phase 4 will start next:
        compatibility percentages.
    */
        await runCompatibilityPhase();

}