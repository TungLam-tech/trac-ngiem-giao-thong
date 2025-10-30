const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const data = [
  {
    numberOrder: 1,
    question: "",
    urlImage: "./image/305.png",
    answers: [
      {
        answer: "Biển 1",
        correct: true,
      },
      {
        answer: "Biển 2",
        correct: false,
      },
      {
        answer: "Biển 1 và 3",
        correct: false,
      },
      {
        answer: "Cả 3 biển",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 2,
    question: "",
    urlImage: "./image/312.png",
    answers: [
      {
        answer: "Biển 1 và 2",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: false,
      },
      {
        answer: "Biển 1 và 3",
        correct: true,
      },
      {
        answer: "Biển 2 và 3",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 3,
    question: "",
    urlImage: "./image/326.png",
    answers: [
      {
        answer: "Biển 1",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: true,
      },
      {
        answer: "Không biển nào",
        correct: false,
      },
      {
        answer: "Cả 2 biển",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 4,
    question: "",
    urlImage: "./image/333.png",
    answers: [
      {
        answer: "Biển 1",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: false,
      },
      {
        answer: "Cả ba Biển",
        correct: true,
      },
      {
        answer: "Biển 3",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 5,
    question: "",
    urlImage: "./image/369.png",
    answers: [
      {
        answer: "Biển 1",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: true,
      },
      {
        answer: "Cả biển 1 và biển 2",
        correct: false,
      },
      {
        answer: "Không biển nào",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 6,
    question: "",
    urlImage: "./image/372.png",
    answers: [
      {
        answer: "Biển 1",
        correct: false,
      },
      {
        answer: "Biển 1 và 3",
        correct: false,
      },
      {
        answer: "Biển 3",
        correct: true,
      },
      {
        answer: "Cả ba biển",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 7,
    question: "",
    urlImage: "./image/387.png",
    answers: [
      {
        answer: "Biển 1 và 3",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: true,
      },
      {
        answer: "Biển 3",
        correct: false,
      },
      {
        answer: "Không biển nào",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 8,
    question: "",
    urlImage: "./image/396.png",
    answers: [
      {
        answer: "Biển 1",
        correct: false,
      },
      {
        answer: "Biển 2",
        correct: true,
      },
      {
        answer: "Biển 3",
        correct: false,
      },
      {
        answer: "Cả 3 biển",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 9,
    question: "",
    urlImage: "./image/432.png",
    answers: [
      {
        answer: "Biển 1",
        correct: true,
      },
      {
        answer: "Biển 2",
        correct: false,
      },
      {
        answer: ".",
        correct: false,
      },
      {
        answer: ".",
        correct: false,
      },
    ],
  },
  {
    numberOrder: 10,
    question: "",
    urlImage: "./image/435.png",
    answers: [
      {
        answer: "Chỉ hướng đi phải theo",
        correct: false,
      },
      {
        answer:
          "Biển báo hiệu cho người lái xe biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường phải theo",
        correct: true,
      },
      {
        answer: "Chỉ hướng đường phải theo",
        correct: false,
      },
      {
        answer: ".",
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
const imgElement = $(".image");
// -------------------------------------------------------------------
// function init
function init(begin) {
  blockQuestion.innerText = `Câu ${data[begin].numberOrder}/${data.length}: ${data[begin].question}
`;
  imgElement.src = data[begin].urlImage;
  blockQuestion.appendChild(imgElement);
  blockChoice.forEach((choice, index) => {
    choice.innerHTML = `<div class="letter">${letters[index]}</div>
                    <div class="text-choice">${data[begin].answers[index].answer}</div>`;
  });
  showResultBtn.setAttribute("hidden", true);
  blockResult.setAttribute("hidden", true);
  nextBtn.setAttribute("hidden", true);
  alertCorrectOrIncorrect.setAttribute("hidden", true);
}
// ----------------------------------------------------------------------------
// reset
function reset() {
  blockChoice.forEach((choice) => {
    choice.classList.remove("green-correct", "red-incorrect");
    isClick = false;
  });
}

// function next question
const stt = $(".stt");
function next() {
  begin++;
  init(begin);
  reset();
  stt.scrollIntoView(true);
  alertYouChoose.classList.add("hide");
}

nextBtn.addEventListener("click", next);
//----------------------------------------------------------------------------------
// function check answer correct
let score = 0; // count score from 0
let isClick = false;
const alertYouChoose = $(".alert-you-choose");

blockChoice.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    //  only click once time
    if (isClick) return;
    isClick = true;
    alertYouChoose.innerText = `Bạn chọn ${letters[index]}`;
    alertYouChoose.classList.remove("hide");
    // correct set green
    if (data[begin].answers[index].correct === true) {
      choice.classList.add("green-correct");
      alertCorrectOrIncorrect.innerText = " Đúng!";
      alertCorrectOrIncorrect.style.color = "#2fff00ff";
      alertCorrectOrIncorrect.removeAttribute("hidden");
      nextBtn.removeAttribute("hidden");
      score++; // correct raise score by 1
      alertCorrectOrIncorrect.scrollIntoView(true); // view focus in true or false

      //  other incorrect set red
    } else {
      // add red incorrect
      choice.classList.add("red-incorrect");
      alertCorrectOrIncorrect.innerText = `Sai!`;
      alertCorrectOrIncorrect.style.color = "#ff8800ff";
      alertCorrectOrIncorrect.removeAttribute("hidden");
      nextBtn.removeAttribute("hidden");

      // add green correct
      blockChoice.forEach((otherChoice, otherIndex) => {
        if (data[begin].answers[otherIndex].correct === true) {
          otherChoice.classList.add("green-correct");
        }
      });
      alertCorrectOrIncorrect.scrollIntoView(true); //view focus in true or false
    }
    // Nếu chưa phải câu cuối
    if (begin == data.length - 1) {
      showResultBtn.removeAttribute("hidden");
      nextBtn.setAttribute("hidden", true);
    }
  });
});
// ------------------------------------------------------------------------------
//  function see result

function showResult() {
  blockQuestion.classList.add("hide");
  blockChoice.forEach((choice) => {
    choice.classList.add("hide");
  });
  alertCorrectOrIncorrect.classList.add("hide");
  showResultBtn.classList.add("hide");
  blockResult.removeAttribute("hidden");
  showScore();
  alertYouChoose.classList.add("hide");
}

showResultBtn.addEventListener("click", showResult);
// -----------------------------------------------------------------

// function close-and-again

const closeBtn = $(".btn-close");

closeBtn.addEventListener("click", () => {
  begin = 0; // quay về câu đầu
  isClick = false; // cho phép click lại
  score = 0;
  // ẩn phần kết quả
  blockResult.setAttribute("hidden", true);

  // hiển thị lại các phần đã bị .hide
  blockQuestion.classList.remove("hide");
  blockChoice.forEach((choice) => choice.classList.remove("hide"));
  alertCorrectOrIncorrect.classList.remove("hide");
  showResultBtn.classList.remove("hide");

  // khởi tạo lại quiz
  init(begin);
  reset();
});
// --------------------------------------------------------------------

// function hien thi diem
let percentScore = 0;
const scoreBlock = $("#score");
const paraScore = $(".para-score");
const conclusionBlock = $(".conclusion");
function showScore() {
  percentScore = Math.round((score / data.length) * 100);
  scoreBlock.innerText = `${percentScore}%`;
  scoreBlock.style.color = percentScore >= 80 ? "#3967e6ff" : "red";
  paraScore.innerText = `Bạn đã trả lời đúng ${score} trên ${data.length} câu hỏi`;
  // conclusionBlock.innerText = percentScore >= 50 ? `Bạn đã đỗ` : `Bạn đã trượt`;
}
// --------------------------------------------------------------------------
//  pháo hoa

// khoi tao
init(begin);
