/* =========================================
   PHASE 5
   RELATIONSHIP STATUS REVIEW

   Starts after:
   Relationship review required.
========================================= */


async function runRelationshipPhase() {

    /*
        Let the Phase 4 warning sit
        for a moment.
    */

    await wait(2000);


    addSpace(12);


    /* =====================================
       REVIEW CURRENT STATUS
    ===================================== */

    await typeText(
        "Reviewing relationship status..."
    );


    await wait(800);


    await loadingBar(
        "Checking current status",
        3000
    );


    await wait(1400);


    /* =====================================
       CURRENT STATUS
    ===================================== */

    await typeText(
        "CURRENT STATUS:",
        65,
        "warning"
    );


    await wait(700);


    await typeText(
        "Dating",
        100,
        "big-message"
    );


    /*
        Let her register this.
    */

    await wait(2200);


    addSpace(10);


    /* =====================================
       COMPARE WITH RESULTS
    ===================================== */

    await typeText(
        "Comparing status with results..."
    );


    await wait(700);


    await loadingBar(
        "Comparing",
        3200
    );


    await wait(1500);


    /* =====================================
       MISMATCH
    ===================================== */

    await typeText(
        "STATUS MISMATCH DETECTED",
        80,
        "big-message"
    );


    await wait(1800);


    await typeText(
        "Current status does not match the results."
    );


    await wait(1100);


    await typeText(
        "An update may be required."
    );


    await wait(1900);


    addSpace(12);


    /* =====================================
       FIND RECOMMENDED STATUS
    ===================================== */

    await typeText(
        "Determining recommended status..."
    );


    await wait(700);


    await loadingBar(
        "Processing",
        3500
    );


    await wait(1700);


    /* =====================================
       GIRLFRIEND REVEAL
    ===================================== */

    await typeText(
        "RECOMMENDED STATUS:",
        70,
        "warning"
    );


    await wait(900);


    await typeText(
        "Girlfriend",
        120,
        "big-message"
    );


    /*
        Major reveal.
        Give this more time than normal.
    */

    await wait(3000);


    addSpace(12);


    /* =====================================
       AUTHORIZATION
    ===================================== */

    await typeText(
        "Update cannot be completed automatically."
    );


    await wait(1200);


    await typeText(
        "Authorization is required."
    );


    await wait(1800);


    addSpace(8);


    await typeText(
        "Preparing final request..."
    );


    await wait(700);


    await loadingBar(
        "Preparing",
        3000
    );


    await wait(1700);


    await typeText(
        "FINAL REQUEST READY",
        80,
        "big-message"
    );


    /*
        PHASE 5 ENDS HERE.

        Phase 6 will handle the
        transition away from the terminal.
    */
   /* =====================================
   HAND OFF TO PHASE 6
===================================== */

await runRomanticPhase();

}