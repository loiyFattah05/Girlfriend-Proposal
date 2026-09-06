/* =========================================
   PHASE 7
   THE QUESTION

   Starts when she taps:
   Continue ❤️
========================================= */


/* =========================================
   PERSONALIZE THIS
========================================= */

const HER_NAME = "Hulu";


/* =========================================
   MAIN PHASE
========================================= */

async function runQuestionPhase() {

    const romanticScreen =
        document.getElementById(
            "romantic-screen"
        );


    const questionScreen =
        document.getElementById(
            "question-screen"
        );


    /* =====================================
       FADE OUT ROMANTIC SCREEN
    ===================================== */

    romanticScreen.classList.add(
        "fade-out"
    );


    await wait(700);


    romanticScreen.classList.remove(
        "active",
        "fade-out"
    );


    /* =====================================
       PREPARE QUESTION SCREEN
    ===================================== */

    questionScreen.innerHTML = "";


    questionScreen.classList.add(
        "active",
        "question-fade-in"
    );


    await wait(900);


    /* =====================================
       HER NAME
    ===================================== */

    await writeQuestionText(
        questionScreen,
        HER_NAME + ",",
        "question-name",
        95
    );


    await wait(1000);


    /* =====================================
       ACTUAL QUESTION
    ===================================== */

    await writeQuestionText(
        questionScreen,
        "Can I Be Your Boyfriend? :)",
        "question-main",
        80
    );


    await wait(1700);


    /* =====================================
       HEART
    ===================================== */

    const heart =
        document.createElement("div");


    heart.classList.add(
        "question-heart"
    );


    heart.textContent =
        "❤️";


    questionScreen.appendChild(
        heart
    );


    requestAnimationFrame(() => {

        heart.classList.add(
            "show"
        );

    });


    await wait(1400);


    /* =====================================
       BUTTON CONTAINER
    ===================================== */

    const buttonContainer =
        document.createElement("div");


    buttonContainer.classList.add(
        "question-buttons"
    );


    /* =====================================
       YES BUTTON
    ===================================== */

    const yesButton =
        document.createElement("button");


    yesButton.classList.add(
        "question-button",
        "yes-button"
    );


    yesButton.textContent =
        "Yes ❤️";


    /* =====================================
       NO BUTTON
    ===================================== */

    const noButton =
        document.createElement("button");


    noButton.classList.add(
        "question-button",
        "no-button"
    );


    noButton.textContent =
        "No";


    /* =====================================
       ADD BUTTONS
    ===================================== */

    buttonContainer.appendChild(
        yesButton
    );


    buttonContainer.appendChild(
        noButton
    );


    questionScreen.appendChild(
        buttonContainer
    );


    requestAnimationFrame(() => {

        buttonContainer.classList.add(
            "show"
        );

    });


    /* =====================================
       YES BUTTON

       Important:
       Audio gets initialized directly
       from her tap for iPhone Safari.
    ===================================== */

    yesButton.addEventListener(
        "click",
        async () => {

            yesButton.disabled =
                true;


            noButton.disabled =
                true;


            /* =================================
               PREPARE CONFETTI SOUND
            ================================= */

            const celebrationSound =
                new Audio(
                    "assets/sounds/confetti.mp3"
                );


            celebrationSound.volume =
                0.75;


            /*
                iPhone Safari often requires
                audio to be activated during
                a direct user interaction.

                We briefly start it muted,
                then reset it so Phase 8
                can play it later.
            */

            try {

                celebrationSound.muted =
                    true;


                await celebrationSound.play();


                celebrationSound.pause();


                celebrationSound.currentTime =
                    0;


                celebrationSound.muted =
                    false;

            }

            catch (error) {

                console.log(
                    "Celebration audio could not be preloaded.",
                    error
                );

            }


            /*
                Make the sound available
                to Phase 8.
            */

            window.celebrationSound =
                celebrationSound;


            /* =================================
               START PHASE 8
            ================================= */

            if (
                typeof runSuccessPhase ===
                "function"
            ) {

                await runSuccessPhase();

            }

            else {

                await showTemporaryYesMessage(
                    questionScreen
                );

            }

        },

        { once: true }

    );


    /* =====================================
       RUNAWAY NO BUTTON
    ===================================== */

    setupRunawayNoButton(
        questionScreen,
        buttonContainer,
        yesButton,
        noButton
    );

}


/* =========================================
   WRITE QUESTION TEXT

   Same handwritten animation
   as the romantic section.
========================================= */

async function writeQuestionText(
    screen,
    text,
    className,
    writingSpeed = 75
) {

    const container =
        document.createElement("div");


    container.classList.add(
        className
    );


    const textContainer =
        document.createElement("span");


    const cursor =
        document.createElement("span");


    cursor.classList.add(
        "handwriting-cursor"
    );


    container.appendChild(
        textContainer
    );


    container.appendChild(
        cursor
    );


    screen.appendChild(
        container
    );


    container.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    await wait(300);


    /* =====================================
       WRITE LETTER BY LETTER
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
            character === "?" ||
            character === "!" ||
            character === "."
        ) {

            await wait(
                writingSpeed * 4
            );

        }

        else if (
            character === ","
        ) {

            await wait(
                writingSpeed * 2
            );

        }

        else {

            await wait(
                writingSpeed
            );

        }

    }


    await wait(650);


    cursor.remove();

}


/* =========================================
   RUNAWAY NO BUTTON
========================================= */

function setupRunawayNoButton(
    questionScreen,
    buttonContainer,
    yesButton,
    noButton
) {

    let noEscapeCount =
        0;


    const maxEscapes =
        3;


    /* =====================================
       MOVE NO BUTTON
    ===================================== */

    function moveNoButton() {

        /*
            Once it has escaped enough,
            return it as a real option.
        */

        if (
            noEscapeCount >=
            maxEscapes
        ) {

            noButton.textContent =
                "Fine 😭";


            noButton.classList.remove(
                "no-running"
            );


            noButton.style.left =
                "";


            noButton.style.top =
                "";


            if (
                noButton.parentElement !==
                buttonContainer
            ) {

                buttonContainer.appendChild(
                    noButton
                );

            }


            return;

        }


        noEscapeCount++;


        /* =================================
           BUTTON SIZE
        ================================= */

        const buttonRect =
            noButton.getBoundingClientRect();


        /*
            Leave plenty of safe space
            for Safari controls,
            Dynamic Island,
            and home indicator.
        */

        const horizontalPadding =
            24;


        const topPadding =
            120;


        const bottomPadding =
            140;


        const viewportWidth =
            window.visualViewport
                ? window.visualViewport.width
                : window.innerWidth;


        const viewportHeight =
            window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;


        const availableWidth =
            Math.max(
                0,
                viewportWidth -
                buttonRect.width -
                horizontalPadding * 2
            );


        const availableHeight =
            Math.max(
                0,
                viewportHeight -
                buttonRect.height -
                topPadding -
                bottomPadding
            );


        const randomX =
            horizontalPadding +
            Math.random() *
            availableWidth;


        const randomY =
            topPadding +
            Math.random() *
            availableHeight;


        /* =================================
           MOVE BUTTON TO BODY
        ================================= */

        noButton.classList.add(
            "no-running"
        );


        if (
            noButton.parentElement !==
            document.body
        ) {

            document.body.appendChild(
                noButton
            );

        }


        noButton.style.left =
            `${randomX}px`;


        noButton.style.top =
            `${randomY}px`;


        /* =================================
           TEXT CHANGES
        ================================= */

        if (
            noEscapeCount === 1
        ) {

            noButton.textContent =
                "No 😭";

        }

        else if (
            noEscapeCount === 2
        ) {

            noButton.textContent =
                "Are you sure?";

        }

        else if (
            noEscapeCount === 3
        ) {

            noButton.textContent =
                "Really? 😭";

        }


        /*
            After the third escape,
            wait briefly and return it.
        */

        if (
            noEscapeCount ===
            maxEscapes
        ) {

            setTimeout(() => {

                noButton.classList.remove(
                    "no-running"
                );


                noButton.style.left =
                    "";


                noButton.style.top =
                    "";


                noButton.textContent =
                    "Fine 😭";


                buttonContainer.appendChild(
                    noButton
                );

            }, 900);

        }

    }


    /* =====================================
       IPHONE TOUCH
    ===================================== */

    noButton.addEventListener(
        "touchstart",
        event => {

            if (
                noEscapeCount <
                maxEscapes
            ) {

                event.preventDefault();


                moveNoButton();

            }

        },

        {
            passive: false
        }

    );


    /* =====================================
       DESKTOP MOUSE
    ===================================== */

    noButton.addEventListener(
        "mouseenter",
        () => {

            if (
                noEscapeCount <
                maxEscapes
            ) {

                moveNoButton();

            }

        }

    );


    /* =====================================
       ACTUAL CLICK
    ===================================== */

    noButton.addEventListener(
        "click",
        async event => {

            if (
                noEscapeCount <
                maxEscapes
            ) {

                event.preventDefault();


                moveNoButton();


                return;

            }


            yesButton.disabled =
                true;


            noButton.disabled =
                true;


            await showNoResponse(
                questionScreen,
                buttonContainer,
                noButton
            );

        }

    );

}


/* =========================================
   TEMP YES RESPONSE
========================================= */

async function showTemporaryYesMessage(
    screen
) {

    const buttons =
        screen.querySelector(
            ".question-buttons"
        );


    if (buttons) {

        buttons.classList.add(
            "fade-out"
        );


        await wait(500);


        buttons.remove();

    }


    await writeQuestionText(
        screen,
        "❤️",
        "temporary-yes",
        100
    );

}


/* =========================================
   NO RESPONSE
========================================= */

async function showNoResponse(
    screen,
    buttons,
    noButton
) {

    /*
        Clean up runaway button.
    */

    if (
        noButton &&
        noButton.parentElement ===
        document.body
    ) {

        noButton.remove();

    }


    buttons.classList.add(
        "fade-out"
    );


    await wait(500);


    buttons.remove();


    const response =
        document.createElement("div");


    response.classList.add(
        "no-response"
    );


    response.textContent =
        "That's okay ❤️";


    screen.appendChild(
        response
    );


    requestAnimationFrame(() => {

        response.classList.add(
            "show"
        );

    });

}