let questions = [
    {
    id: 1,
    question: "",
    options: {
        a: "",
        b: "",
        c: ""
    },
    rightAnswer: ""
    },
]

const darkModeButton = document.querySelector("#darkMode");

function darkMode() {
    document.body.classList.toggle("dark-mode");
}

darkModeButton.addEventListener("click", darkMode);