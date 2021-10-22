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

const darkModeButton = document.querySelector("#darkMode");

function darkMode() {
    document.body.classList.toggle("dark-mode");
}

darkModeButton.addEventListener("click", darkMode);

function showQuiz() {
    const quizContainer = document.querySelector("#quizContainer");
    quiz.forEach(questionAndAnswer => {
        let li = document.createElement("li");
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = questionAndAnswer.question;

        fieldset.appendChild(legend);
        li.appendChild(fieldset);
        quizContainer.appendChild(li);

    })






}