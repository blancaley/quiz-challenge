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
        question: "What is the name of the King of Sweden?",
        options: {
            a: "Carl IXV Gustaf",
            b: "Carl VIX Gustaf",
            c: "Carl XVI Gustaf"
        },
        rightAnswer: "c"
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
const quizContainer = document.querySelector("#quizContainer");
const checkResultButton = document.querySelector("#checkResult");
const restartQuizButton = document.querySelector("#restartQuiz");
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
    let questionList = quizContainer.childNodes;
    // Reset array
    answers = [];

    // Go through each question
    questionList.forEach((question, questionNumber) => { 
        // Find selected answers
        let selectedAnswerElement = document.querySelectorAll(`input[name="question-${questionNumber}"]:checked`);
        let selectedAnswerLetters = [];

        // TODO: Catch error if there's no selected answer. If selectedAnswerElement.length is 0 print message to select an option.

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
    showResult();
}

function showResult() {
    // Clear previous results
    if (quizFinishedText) {
        quizFinished.removeChild(quizFinishedText);
    }

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
    let allCheckboxes = document.querySelectorAll("input");
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;}
    )
}

showQuiz();

darkModeButton.addEventListener("click", darkMode);
checkResultButton.addEventListener("click", checkAnswers);
restartQuizButton.addEventListener("click", restartQuiz);