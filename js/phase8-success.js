/* =========================================
   PHASE 8
   SUCCESS / CELEBRATION

   Starts when she taps:
   YES ❤️
========================================= */


async function runSuccessPhase() {

    const questionScreen =
        document.getElementById(
            "question-screen"
        );


    const successScreen =
        document.getElementById(
            "success-screen"
        );


    /* =====================================
       FADE OUT QUESTION SCREEN
    ===================================== */

    questionScreen.classList.add(
        "fade-out"
    );


    await wait(700);


    questionScreen.classList.remove(
        "active",
        "fade-out"
    );


    questionScreen.innerHTML =
        "";


    /* =====================================
       PREPARE SUCCESS SCREEN
    ===================================== */

    successScreen.innerHTML =
        "";


    successScreen.classList.add(
        "active",
        "success-fade-in"
    );


    await wait(600);


    /* =====================================
       REQUEST ACCEPTED
    ===================================== */

    const acceptedMessage =
        document.createElement("div");


    acceptedMessage.classList.add(
        "success-accepted"
    );


    acceptedMessage.textContent =
        "REQUEST ACCEPTED ❤️";


    successScreen.appendChild(
        acceptedMessage
    );


    requestAnimationFrame(() => {

        acceptedMessage.classList.add(
            "show"
        );

    });


    await wait(1800);


    /* =====================================
       UPDATE STATUS
    ===================================== */

    const updatingMessage =
        document.createElement("div");


    updatingMessage.classList.add(
        "success-updating"
    );


    updatingMessage.textContent =
        "Updating relationship status...";


    successScreen.appendChild(
        updatingMessage
    );


    await wait(700);


    /* =====================================
       LOADING BAR
    ===================================== */

    await createSuccessLoadingBar(
        successScreen,
        3200
    );


    await wait(1100);


    /* =====================================
       UPDATE COMPLETE
    ===================================== */

    updatingMessage.textContent =
        "Update complete.";


    await wait(1200);


    /* =====================================
       CELEBRATION SOUND
    ===================================== */

    if (
        window.celebrationSound
    ) {

        try {

            window.celebrationSound.currentTime =
                0;


            await window.celebrationSound.play();

        }

        catch (error) {

            console.log(
                "Celebration sound could not play.",
                error
            );

        }

    }


    /* =====================================
       HUGE CONFETTI CELEBRATION

       Three separate waves.
    ===================================== */

    createConfetti(
        220
    );


    /*
        Second wave.
    */

    setTimeout(() => {

        createConfetti(
            140
        );

    }, 650);


    /*
        Third wave.
    */

    setTimeout(() => {

        createConfetti(
            100
        );

    }, 1450);


    await wait(900);


    /* =====================================
       FINAL RELATIONSHIP CARD
    ===================================== */

    const finalCard =
        document.createElement("div");


    finalCard.classList.add(
        "final-relationship-card"
    );


    /* =====================================
       HEART
    ===================================== */

    const heart =
        document.createElement("div");


    heart.classList.add(
        "final-heart"
    );


    heart.textContent =
        "❤️";


    /* =====================================
       NAMES
    ===================================== */

    const names =
        document.createElement("div");


    names.classList.add(
        "final-names"
    );


    names.textContent =
        `Lulu + ${HER_NAME}`;


    /* =====================================
       LABEL
    ===================================== */

    const label =
        document.createElement("div");


    label.classList.add(
        "final-status-label"
    );


    label.textContent =
        "Relationship Status";


    /* =====================================
       STATUS
    ===================================== */

    const status =
        document.createElement("div");


    status.classList.add(
        "final-status"
    );


    status.textContent =
        "Girlfriend";


    /* =====================================
       EFFECTIVE
    ===================================== */

    const effective =
        document.createElement("div");


    effective.classList.add(
        "final-effective"
    );


    effective.textContent =
        "Effective immediately ❤️";


    /* =====================================
       BUILD CARD
    ===================================== */

    finalCard.appendChild(
        heart
    );


    finalCard.appendChild(
        names
    );


    finalCard.appendChild(
        label
    );


    finalCard.appendChild(
        status
    );


    finalCard.appendChild(
        effective
    );


    successScreen.appendChild(
        finalCard
    );


    requestAnimationFrame(() => {

        finalCard.classList.add(
            "show"
        );

    });


    await wait(2200);


    /* =====================================
       FINAL MESSAGE
    ===================================== */


    await writeSuccessMessage(
        successScreen,
        "Best update I've ever made. ❤️"
    );
    
    await wait(1800);
    
    await writeSuccessMessage(
        successScreen,
        "I love you, GIRLFRIEND ❤️"
    );
    
    await wait(1800);
    
    await writeSuccessMessage(
        successScreen,
        "Now let's go to our favorite spot ;)"
    );

}


/* =========================================
   SUCCESS LOADING BAR
========================================= */

async function createSuccessLoadingBar(
    screen,
    duration = 3000
) {

    const container =
        document.createElement("div");


    container.classList.add(
        "success-loading-container"
    );


    const bar =
        document.createElement("div");


    bar.classList.add(
        "success-loading-bar"
    );


    const fill =
        document.createElement("div");


    fill.classList.add(
        "success-loading-fill"
    );


    const percentage =
        document.createElement("div");


    percentage.classList.add(
        "success-loading-percentage"
    );


    percentage.textContent =
        "0%";


    bar.appendChild(
        fill
    );


    container.appendChild(
        bar
    );


    container.appendChild(
        percentage
    );


    screen.appendChild(
        container
    );


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
   FINAL HANDWRITTEN MESSAGE
========================================= */

async function writeSuccessMessage(
    screen,
    text
) {

    const message =
        document.createElement("div");


    message.classList.add(
        "success-message"
    );


    const textContainer =
        document.createElement("span");


    const cursor =
        document.createElement("span");


    cursor.classList.add(
        "handwriting-cursor"
    );


    message.appendChild(
        textContainer
    );


    message.appendChild(
        cursor
    );


    screen.appendChild(
        message
    );


    message.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    await wait(400);


    /* =====================================
       HANDWRITE MESSAGE
    ===================================== */

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const character =
            text[i];


        textContainer.textContent +=
            character;


        if (
            character === "." ||
            character === "!" ||
            character === "?"
        ) {

            await wait(
                220
            );

        }

        else if (
            character === ","
        ) {

            await wait(
                120
            );

        }

        else {

            await wait(
                65
            );

        }

    }


    await wait(700);


    cursor.remove();

}


/* =========================================
   CONFETTI GENERATOR
========================================= */

function createConfetti(
    amount = 180
) {

    const colors = [

        "#ff7fa8",
        "#ffffff",
        "#ffb6cc",
        "#ff4f87",
        "#ffd6e3",
        "#ff94b7",
        "#f7c6d9",
        "#ff2f75"

    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.classList.add(
            "confetti-piece"
        );


        /* =================================
           RANDOM LOCATION
        ================================= */

        piece.style.left =
            `${Math.random() * 100}%`;


        /* =================================
           RANDOM SIZE
        ================================= */

        const width =
            Math.random() * 8 + 5;


        const height =
            Math.random() * 12 + 8;


        piece.style.width =
            `${width}px`;


        piece.style.height =
            `${height}px`;


        /* =================================
           RANDOM COLOR
        ================================= */

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        /* =================================
           SOME PIECES ARE ROUND
        ================================= */

        if (
            Math.random() > 0.72
        ) {

            piece.style.borderRadius =
                "50%";

        }


        /* =================================
           RANDOM FALL TIMING
        ================================= */

        piece.style.animationDelay =
            `${Math.random() * 1.5}s`;


        piece.style.animationDuration =
            `${2.7 + Math.random() * 2.4}s`;


        /* =================================
           RANDOM SIDEWAYS DRIFT
        ================================= */

        piece.style.setProperty(
            "--confetti-x",
            `${Math.random() * 160 - 80}px`
        );


        /* =================================
           RANDOM ROTATION
        ================================= */

        piece.style.setProperty(
            "--confetti-rotation",
            `${Math.random() * 1080 + 360}deg`
        );


        document.body.appendChild(
            piece
        );


        /* =================================
           CLEANUP
        ================================= */

        setTimeout(() => {

            piece.remove();

        }, 6500);

    }

}