let quiz = [
    {
        question: "Which is the local currency in Sweden?",
        options: {
            a: "Euro (EUR)",
            b: "Swedish Crowns (SEK)",
            c: "Scandinavian Pound (SCP)"
        },
        rightAnswer: "b"
    },
    {
        question: "What is Kebnekaise?",
        options: {
            a: "Sweden's highest mountain",
            b: "Swedish national dish",
            c: "Troll"
        },
        rightAnswer: "a"
    },
    {
        question: "Choose all the Swedish cities:",
        options: {
            a: "Göteborg",
            b: "Åland",
            c: "Öland",
            d: "Bergen"
        },
        rightAnswer: ["a", "c"]
    },
    {
        question: "When is the National Day of Sweden?",
        options: {
            a: "25 June",
            b: "13 December",
            c: "6 June"
        },
        rightAnswer: "c"
    },
    {
        question: "Which of the following are classic Swedish meals?",
        options: {
            a: "Räksmörgås (shrimp sandwich)",
            b: "Wallenbergare (veal burger)",
            c: "Stegt flæsk med persillesovs (crispy pork with parsley sauce)",
            d: "Köttbullar (meatballs)",
            e: "Kroppkakor (boiled potato dumplings)",
            f: "Poronkäristys (sauteed reindeer)"
        },
        rightAnswer: ["a", "b", "d", "e"]
    },
    {
        question: "What are the vowels in the Swedish language?",
        options: {
            a: "A, E, I, O, U, Å, Ä, Ö",
            b: "A, E, I, O, U",
            c: "A, E, I, O, U, Y, Å, Ä, Ö"
        },
        rightAnswer: "c"
    },
    {
        question: "What is the population in Sweden (2021)?",
        options: {
            a: "Ten million people",
            b: "Five million people",
            c: "Eight million people"
        },
        rightAnswer: "a"
    },
    {
        question: "Which one of the following books are written by Swedish writer Hjalmar Söderberg?",
        options: {
            a: "Den allvarsamma leken (The Serious Game)",
            b: "Inferno",
            c: "Mio, min Mio (Mio, My Son)"
        },
        rightAnswer: "a"
    },
    {
        question: "Is Sweden the country with the highest number of patents per capita in Europe?",
        options: {
            a: "Yes",
            b: "No",
        },
        rightAnswer: "a"
    },
    {
        question: "Two of the following are Swedish inventions, which ones are they?",
        options: {
            a: "Three-point seatbelt",
            b: "Traffic lights",
            c: "Pacemaker",
            d: "Cardiac defibrillators"
        },
        rightAnswer: ["a", "c"]
    }
]

let answers;
let correctAnswers;
let quizFinishedText;

const darkModeButton = document.querySelector("#darkMode");
const checkResultButton = document.querySelector("#checkResult");
const restartQuizButton = document.querySelector("#restartQuiz");
const quizContainer = document.querySelector("#quizContainer");
const questionList = quizContainer.childNodes;
const quizFinished = document.querySelector("#quizFinished");

function darkMode() {
    document.body.classList.toggle("dark-mode");
}

function showQuiz() {
    // Create and show each question
    quiz.forEach((questionAndAnswer, questionNumber) => {
        let questionItem = document.createElement("li");
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        const optionsList = document.createElement("ul");
        legend.innerText = questionAndAnswer.question;

        fieldset.appendChild(legend);
        fieldset.appendChild(optionsList);
        questionItem.appendChild(fieldset);
        quizContainer.appendChild(questionItem);

        // Create and show all options for each question
        for (const option in questionAndAnswer.options) {
            let optionItem = document.createElement("li");
            optionsList.id = "optionsList"; 
            // Create checkbox if there are multiple answers
            if (Array.isArray(questionAndAnswer.rightAnswer) === true) {
                optionItem.innerHTML =
                `<label>
                    <input type="checkbox" name="question-${questionNumber}" value="${questionAndAnswer.options[option]}" id="${option}">
                    ${questionAndAnswer.options[option]}
                </label>`;
            } else {
                // Create radio button if there's one answer
                optionItem.innerHTML =
                `<label>
                    <input type="radio" name="question-${questionNumber}" value="${questionAndAnswer.options[option]}" id="${option}">
                    ${questionAndAnswer.options[option]}
                </label>`;
            }
            optionsList.appendChild(optionItem);
        }
    });
}

function saveAnswers() {
    // Reset array
    answers = [];

    // Go through each question
    questionList.forEach((question, questionNumber) => { 
        // Find selected answers
        let selectedAnswerElement = document.querySelectorAll(`input[name="question-${questionNumber}"]:checked`);
        let selectedAnswerLetters = [];

        // Save multiple choice answers as array       
        if(selectedAnswerElement.length >= 2) {
            selectedAnswerElement.forEach(element => {
                let selectedAnswerLetter = element.id;
                selectedAnswerLetters.push(selectedAnswerLetter);
            })
        } else {
        // Get the letter selected for single answer
            selectedAnswerLetters = selectedAnswerElement[0].id;
        }

        // Save selected answer(s) to array
        answers.push(selectedAnswerLetters);
    });
}

function checkAnswers() {
    saveAnswers();
    // Reset counter
    correctAnswers = 0;

    for (let i = 0; i < quiz.length; i++ ) {
        let rightAnswer = quiz[i].rightAnswer;
        let selectedAnswer = answers[i];

        // Check for multiple correct answers
        if (Array.isArray(rightAnswer)) {
            if (JSON.stringify(rightAnswer) === JSON.stringify(selectedAnswer)) {
                correctAnswers++;
            }
        // Check for single correct answer
        } else if (rightAnswer === selectedAnswer) {
            correctAnswers++;
        }
    }
    restartQuizButton.hidden = false;
    showResult();
}

function showResult() {
    deleteScoreMessage();
    // Create and show score
    quizFinishedText = document.createElement("h2");
    quizFinishedText.innerText = `You scored ${correctAnswers}/${quiz.length}`;
    quizFinished.appendChild(quizFinishedText);

    let score = correctAnswers*100/quiz.length;
    if (score > 75) {
        quizFinishedText.classList.add("over-75");
    } else if (score > 50) {
        quizFinishedText.classList.add("over-50");
    }
}

function restartQuiz() {
    answers = [];
    deleteScoreMessage();
    let allCheckboxes = document.querySelectorAll("input");
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;}
    )
    checkResultButton.hidden = true;
    unfinishedQuizMessage.classList.remove("hide");
    restartQuizButton.hidden = true;
}

function deleteScoreMessage() {
    if (quizFinishedText) {
        quizFinished.removeChild(quizFinishedText);
    }
}

function isQuizComplete() {
    let answeredQuestionsCounter = 0;
     // Go through each question to find how many are answered
     questionList.forEach((question, questionNumber) => { 
        // Find if there is a selected answer
        let selectedAnswerElement = document.querySelector(`input[name="question-${questionNumber}"]:checked`);
        // If there is a selected answer add to the total of answered questions. If there is no selected answer (null), don't count it.
        if (selectedAnswerElement !== null) {
            answeredQuestionsCounter++;
        }
    })
    if (answeredQuestionsCounter === quiz.length) {
    // When all questions are answered, save them, show Check Answers button and hide feedback message
        saveAnswers();
        checkResultButton.hidden = false;
        unfinishedQuizMessage.classList.add("hide");
    } else {
    // If there are unanswered questions left, hide the Check Answers button and show feedback message
        checkResultButton.hidden = true;
        unfinishedQuizMessage.classList.remove("hide");
    } 
}

showQuiz();

darkModeButton.addEventListener("click", darkMode);
checkResultButton.addEventListener("click", checkAnswers);
restartQuizButton.addEventListener("click", restartQuiz);

const allOptions = document.querySelectorAll("input");
allOptions.forEach(option => {
    option.addEventListener("change", isQuizComplete)
    }
)