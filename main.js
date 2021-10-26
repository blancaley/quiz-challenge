let quiz = [
    {
        id: 1,
        question: "Which is the local currency in Sweden?",
        options: {
            a: "Euro (EUR)",
            b: "Swedish Crowns (SEK)",
            c: "Scandinavian Pound (SCP)"
        },
        rightAnswer: "b"
    },
    {
        id: 2,
        question: "What is the name of the King of Sweden?",
        options: {
            a: "Carl IXV Gustaf",
            b: "Carl VIX Gustaf",
            c: "Carl XVI Gustaf"
        },
        rightAnswer: "c"
    },
    {
        id: 3,
        question: "What is Kebnekaise?",
        options: {
            a: "Sweden's highest mountain",
            b: "Swedish national dish",
            c: "Troll"
        },
        rightAnswer: "a"
    },
    {
        id: 4,
        question: "I'm a multiple choice question",
        options: {
            a: "Correct",
            b: "Correct",
            c: "Wrong"
        },
        rightAnswer: ["a", "b"]
    }
]

let answers = [];

const darkModeButton = document.querySelector("#darkMode");
const quizContainer = document.querySelector("#quizContainer");
const checkResultButton = document.querySelector("#checkResult");

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

// Compare results from 2 arrays 
function checkAnswers() {
    //Save total correct answers
    let correctAnswers = 0;

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
}

showQuiz();

darkModeButton.addEventListener("click", darkMode);