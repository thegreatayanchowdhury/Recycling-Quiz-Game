window.onload = function () {
    const originalQuestions = [
        {
            question: "Which of the following items is recyclable?",
            options: ["Plastic bags", "Glass bottles", "Styrofoam"],
            correctAnswer: "Glass bottles"
        },
        {
            question: "What should you do before recycling a plastic container?",
            options: ["Rinse it", "Throw it directly", "Leave it as it is"],
            correctAnswer: "Rinse it"
        },
        {
            question: "Which bin is used for paper and cardboard recycling?",
            options: ["Green bin", "Blue bin", "Yellow bin"],
            correctAnswer: "Blue bin"
        },
        {
            question: "What is the primary benefit of recycling?",
            options: ["Reduces pollution", "Increases waste", "Saves energy"],
            correctAnswer: "Reduces pollution"
        },
        {
            question: "Which material takes the longest to decompose in a landfill?",
            options: ["Paper", "Plastic", "Glass"],
            correctAnswer: "Plastic"
        },
        {
            question: "What can you do with old electronics instead of throwing them away?",
            options: ["Donate or recycle", "Bury in the backyard", "Burn them"],
            correctAnswer: "Donate or recycle"
        },
        {
            question: "Which of the following is a renewable source of energy?",
            options: ["Coal", "Solar power", "Natural gas"],
            correctAnswer: "Solar power"
        },
        {
            question: "What is the purpose of the recycling symbol on plastic products?",
            options: ["Indicates it's non-recyclable", "Provides product information", "Identifies recyclable materials"],
            correctAnswer: "Identifies recyclable materials"
        },
        {
            question: "How can you reduce water usage at home?",
            options: ["Leave faucets running", "Fix leaks promptly", "Water the garden daily"],
            correctAnswer: "Fix leaks promptly"
        },
        {
            question: "What is composting?",
            options: ["Recycling metal", "Turning organic waste into nutrient-rich soil", "Burning waste"],
            correctAnswer: "Turning organic waste into nutrient-rich soil"
        }
    ];
    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Clone the original array and shuffle the cloned array
    const shuffledQuestions = [...originalQuestions];
    shuffleArray(shuffledQuestions);

    // Declare the questions variable with let (no redeclaration)
    let questions = shuffledQuestions;

    // Other global variables
    let currentQuestion = 0;
    let attendedCount = 0;
    let score = 0;
    let playerName = "";
    let playerAge = 0;
    let playerPlace = "";
    let timer;

    // Function to start the quiz
    document.getElementById("start-button").onclick = function () {
        playerName = document.getElementById("name").value;
        playerAge = document.getElementById("age").value;
        playerPlace = document.getElementById("place").value;

        if (playerName && playerAge && playerPlace) {
            document.getElementById("start-container").style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            loadQuestion();
        } else {
            alert("Please fill in all the details.");
        }
    };

    // Function to load a question
    const loadQuestion = () => {
        resetTimer();
        startTimer();

        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");

        // Display question number and text
        questionElement.innerHTML = `<p>${currentQuestion + 1}. ${questions[currentQuestion].question}</p>`;

        optionsElement.innerHTML = "";

        questions[currentQuestion].options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsElement.appendChild(button);
        });

        document.getElementById("result").textContent = "";
        document.getElementById("attended-count").textContent = `Attended: ${attendedCount}`;
    };

    // Function to start the timer
    function startTimer() {
        let seconds = 15; // Set the time limit per question (adjust as needed)

        timer = setInterval(function () {
            document.getElementById("timer").innerText = `Time left: ${seconds} seconds`;

            if (seconds <= 0) {
                clearInterval(timer);
                skipQuestion();
            }

            seconds--;
        }, 1000);
    }

    // Function to check the answer
    function checkAnswer(selectedOption) {
        resetTimer();

        attendedCount++;

        if (selectedOption === questions[currentQuestion].correctAnswer) {
            score++;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResult();
        }
    }

    // Function to move to the next question
    function nextQuestion() {
        resetTimer();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
            document.getElementById("prev-button").disabled = false; // Enable the "Previous" button
        } else {
            showResult();
        }
    }

    // Function to move to the previous question
    function previousQuestion() {
        resetTimer();

        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
            document.getElementById("prev-button").disabled = (currentQuestion === 0); // Disable "Previous" button if at the first question
        }
    }

    // Function to skip to the next question
    function skipQuestion() {
        resetTimer();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
            document.getElementById("prev-button").disabled = false; // Enable the "Previous" button
        } else {
            showResult();
        }
    }

    // Function to reset the timer
    function resetTimer() {
        clearInterval(timer);
    }

    // Function to show the result
const showResult = () => {
    const congratsContainer = document.getElementById("congrats-container");
    const congratsName = document.getElementById("congrats-name");
    const congratsScore = document.getElementById("congrats-score");

    congratsName.textContent = playerName;

    // Display the result as the number of correct answers out of the total number of questions
    congratsScore.textContent = `${score}/${originalQuestions.length}`;

    document.getElementById("quiz-container").style.display = "none";
    congratsContainer.style.display = "block";
};

    // Function to restart the quiz
    document.getElementById("restart-button").onclick = function () {
        currentQuestion = 0;
        attendedCount = 0;
        score = 0;
        playerName = "";
        playerAge = 0;
        playerPlace = "";

        document.getElementById("congrats-container").style.display = "none";
        document.getElementById("start-container").style.display = "block";

        // Refresh the page
        location.reload();
    };

    // Function to move to the next question
    document.getElementById("next-button").onclick = function () {
        resetTimer();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResult();
        }
    };

    // Function to move to the previous question
    document.getElementById("prev-button").onclick = function () {
        resetTimer();

        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    };

    // Function to skip to the next question
    document.getElementById("skip-button").onclick = function () {
        resetTimer();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResult();
        }
    };
};