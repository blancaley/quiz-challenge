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
    }
]

let answers = [];

let quizContainer = document.querySelector("#quizContainer");

// Dark mode toggle
function darkMode() {
    document.body.classList.toggle("dark-mode");
}
const darkModeButton = document.querySelector("#darkMode");
darkModeButton.addEventListener("click", darkMode);

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
            optionItem.innerHTML = 
            `<label>
                <input type="radio" name="question-${questionNumber}" value="${questionAndAnswer.options[option]}" id="${option}">
                ${questionAndAnswer.options[option]}
            </label>`;
            optionsList.appendChild(optionItem);
        }
    });
}

function saveAnswers() {
    let questionList = quizContainer.childNodes;
    // Go through each question
    questionList.forEach((question, questionNumber) => { 
        // Find selected answer
        let selectedAnswer = document.querySelector(`input[name="question-${questionNumber}"]:checked`);
        //Save it to answers array
        if (selectedAnswer !== null) {
            //Get question text
            answers.push({selected: selectedAnswer.id
                });
        }
    })
}

showQuiz();