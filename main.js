const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const data = [
    {
        stt: 1,
        question: `Ai là triệu phú?`,
        answers: [
            {
                answer: `ba Huynh`,
                correct: true,
            },
            {
                answer: `Truong The Vinh`,
                correct: false,
            },
            {
                answer: `Ba Dao`,
                correct: false,
            },
            {
                answer: `Huy Huu`,
                correct: false,
            },
        ],
    },
    {
        stt: 2,
        question: `Người tham gia giao thông có được uống rượu bia không?`,
        answers: [
            {
                answer: `ba Huynh`,
                correct: false,
            },
            {
                answer: `Truong The Vinh`,
                correct: true,
            },
            {
                answer: `Ba Dao`,
                correct: false,
            },
            {
                answer: `Huy Huu`,
                correct: false,
            },
        ],
    },
    {
        stt: 3,
        question: `Ai là triệu phú?`,
        answers: [
            {
                answer: `ba Huynh`,
                correct: true,
            },
            {
                answer: `Truong The Vinh`,
                correct: false,
            },
            {
                answer: `Ba Dao`,
                correct: false,
            },
            {
                answer: `Huy Huu`,
                correct: false,
            },
        ],
    },
    {
        stt: 4,
        question: `Ai là triệu phú?`,
        answers: [
            {
                answer: `ba Huynh`,
                correct: true,
            },
            {
                answer: `Truong The Vinh`,
                correct: false,
            },
            {
                answer: `Ba Dao`,
                correct: false,
            },
            {
                answer: `Huy Huu`,
                correct: false,
            },
        ],
    },
];

const blockQuestion = $(".block-question");
const blockChoice = $$(".choice");
const showResultBtn = $("#show-result");
const blockResult = $(".block-result");
const nextBtn = $("#next");
let begin = 0; //khoi tao luot cau "hoi dau tien

const alertCorrectOrIncorrect = $("#alert-correct-or-incorrect");

const letters = [`A`, `B`, `C`, `D`];

// function init
function init(begin) {
    blockQuestion.textContent = `Câu ${data[begin].stt}/30: ${data[begin].question}`;
    blockChoice.forEach((choice, index) => {
        choice.innerHTML = `<span class="letter">${letters[index]}</span>
                    <span class="text-choice">${data[begin].answers[index].answer}</span>`;
    });
    showResultBtn.setAttribute("hidden", true);
    blockResult.setAttribute("hidden", true);
    nextBtn.setAttribute("hidden", true);
    alertCorrectOrIncorrect.setAttribute("hidden", true);
}

// reset
function reset() {
    blockChoice.forEach((choice) => {
        choice.classList.remove("green-correct", "red-incorrect");
        isClick = false;
    });
}

// function next question

function next() {
    begin++;
    init(begin);
    reset();
}

nextBtn.addEventListener("click", () => {
    next();
});

// function check answer correct

let isClick = false;

blockChoice.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        //  only click once time
        if (isClick) return;
        isClick = true;
        // correct set green
        if (data[begin].answers[index].correct === true) {
            choice.classList.add("green-correct");
            alertCorrectOrIncorrect.innerText = " Chính xác";
            alertCorrectOrIncorrect.style.color = "#34cc11";
            alertCorrectOrIncorrect.removeAttribute("hidden");
            nextBtn.removeAttribute("hidden");

            //  other incorrect set red
        } else {
            // add red incorrect
            choice.classList.add("red-incorrect");
            alertCorrectOrIncorrect.innerText = `Rất tiếc!`;
            alertCorrectOrIncorrect.style.color = "red";
            alertCorrectOrIncorrect.removeAttribute("hidden");
            nextBtn.removeAttribute("hidden");

            // add green correct
            blockChoice.forEach((otherChoice, otherIndex) => {
                if (data[begin].answers[otherIndex].correct === true) {
                    otherChoice.classList.add("green-correct");
                }
            });
        }
        if (begin == data.length - 1) {
            showResultBtn.removeAttribute("hidden");
            nextBtn.setAttribute("hidden", true);
        }
    });
});

//  function see result

function showResult() {
    blockQuestion.classList.add("hide");
    blockChoice.forEach((choice) => {
        choice.classList.add("hide");
    });
    alertCorrectOrIncorrect.classList.add("hide");
    showResultBtn.classList.add("hide");
    blockResult.removeAttribute("hidden");
}

showResultBtn.addEventListener("click", showResult);

// khoi tao
init(begin);
