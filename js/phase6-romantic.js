/* =========================================
   PHASE 6
   TERMINAL -> ROMANTIC TRANSITION

   Starts after:
   FINAL REQUEST READY
========================================= */


async function runRomanticPhase() {

    const romanticScreen =
        document.getElementById(
            "romantic-screen"
        );


    /* =====================================
       LET FINAL REQUEST SIT
    ===================================== */

    await wait(2200);


    addSpace(12);


    /* =====================================
       CONTROLLED TERMINAL SHUTDOWN
    ===================================== */

    await typeText(
        "Final request requires a different interface."
    );


    await wait(1200);


    await typeText(
        "Closing security mode..."
    );


    await wait(1000);


    addSpace(10);


    await typeText(
        "Security scan ............. complete"
    );


    await wait(450);


    await typeText(
        "Connection analysis ....... complete"
    );


    await wait(450);


    await typeText(
        "Compatibility check ....... complete"
    );


    await wait(450);


    await typeText(
        "Relationship review ....... complete"
    );


    await wait(1500);


    addSpace(10);


    /* =====================================
       SWITCH INTERFACE
    ===================================== */

    await loadingBar(
        "Switching interface",
        3200
    );


    await wait(1600);


    clearTerminal();


    /* =====================================
       FINAL TERMINAL MESSAGE
    ===================================== */

    await wait(700);


    await typeText(
        "One more thing...",
        75
    );


    await wait(1900);


    await typeText(
        "This part doesn't need a computer.",
        70
    );


    /*
        Let this line land.
    */

    await wait(2600);


    /* =====================================
       TERMINAL FADES OUT
    ===================================== */

    terminalScreen.classList.add(
        "fade-out"
    );


    await wait(700);


    terminalScreen.classList.remove(
        "active",
        "fade-out",
        "security-mode"
    );


    clearTerminal();


    /*
        Short black pause.
    */

    await wait(900);


    /* =====================================
       OPEN ROMANTIC SCREEN
    ===================================== */

    romanticScreen.innerHTML = "";


    romanticScreen.classList.add(
        "active",
        "fade-in"
    );


    await wait(900);


    /* =====================================
       MESSAGE 1
    ===================================== */

    await showRomanticMessage(
        romanticScreen,
        "Somewhere along the way, I realized this became more than just me liking you."
    );


    await wait(2200);


    /* =====================================
       PHOTO 1
    ===================================== */

    await showRomanticPhoto(
        romanticScreen,
        "assets/images/photo1.jpg"
    );


    await wait(2400);


    /* =====================================
       MESSAGE 2
    ===================================== */

    await showRomanticMessage(
        romanticScreen,
        "You became someone I genuinely look forward to seeing, talking to, and making memories with."
    );


    await wait(2400);


    /* =====================================
       PHOTO 2
    ===================================== */

    await showRomanticPhoto(
        romanticScreen,
        "assets/images/photo2.jpg"
    );


    await wait(2400);


    /* =====================================
       MESSAGE 3
    ===================================== */

    await showRomanticMessage(
        romanticScreen,
        "And I realized I don't want this to just stay where it is."
    );


    await wait(2400);


    /* =====================================
       PHOTO 3
    ===================================== */

    await showRomanticPhoto(
        romanticScreen,
        "assets/images/photo3.jpg"
    );


    await wait(2400);


    /* =====================================
       FINAL LEAD-IN
    ===================================== */

    await showRomanticMessage(
        romanticScreen,
        "There's something I've been wanting to ask you."
    );


    await wait(1700);


    /* =====================================
       CONTINUE BUTTON
    ===================================== */

    const continueButton =
        document.createElement("button");


    continueButton.classList.add(
        "romantic-continue"
    );


    continueButton.textContent =
        "Continue ❤️";


    romanticScreen.appendChild(
        continueButton
    );


    continueButton.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    /*
        Temporary behavior until
        Phase 7 is added.
    */

        continueButton.addEventListener(
            "click",
            async () => {
        
                continueButton.disabled =
                    true;
        
        
                await runQuestionPhase();
        
            },
        
            { once: true }
        );

}


/* =========================================
   HANDWRITTEN ROMANTIC MESSAGE

   Writes the sentence onto the screen
   one character at a time.
========================================= */

async function showRomanticMessage(
    screen,
    text,
    writingSpeed = 58
) {

    const message =
        document.createElement("div");


    message.classList.add(
        "romantic-message"
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


    /*
        Move new message into view
        before it starts writing.
    */

    message.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    await wait(400);


    /* =====================================
       WRITE CHARACTER BY CHARACTER
    ===================================== */

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const currentCharacter =
            text[i];


        textContainer.textContent +=
            currentCharacter;


        /*
            Longer pauses at punctuation
            make the writing feel less
            mechanical.
        */

        if (
            currentCharacter === "." ||
            currentCharacter === "!" ||
            currentCharacter === "?"
        ) {

            await wait(
                writingSpeed * 4
            );

        }

        else if (
            currentCharacter === ","
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


        /*
            Keep longer messages visible
            as they're being written.
        */

        if (
            i > 0 &&
            i % 8 === 0
        ) {

            message.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    }


    /*
        Leave the writing cursor
        visible briefly after finishing.
    */

    await wait(700);


    cursor.remove();


    await wait(300);

}


/* =========================================
   ROMANTIC PHOTO
========================================= */

async function showRomanticPhoto(
    screen,
    source
) {

    const wrapper =
        document.createElement("div");


    wrapper.classList.add(
        "romantic-photo-wrapper"
    );


    const image =
        document.createElement("img");


    image.classList.add(
        "romantic-photo"
    );


    image.src =
        source;


    image.alt =
        "A memory together";


    /*
        If an image is missing,
        hide the wrapper instead
        of showing a broken icon.
    */

    image.addEventListener(
        "error",
        () => {

            wrapper.style.display =
                "none";

        },

        { once: true }

    );


    wrapper.appendChild(
        image
    );


    screen.appendChild(
        wrapper
    );


    /*
        Trigger fade/scale animation.
    */

    requestAnimationFrame(() => {

        wrapper.classList.add(
            "show"
        );

    });


    wrapper.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    await wait(900);

}