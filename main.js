const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const soundCorrect = new Audio("./sound/correct.mp3");
const soundWrong = new Audio("./sound/wrong.mp3");
const soundClick = new Audio("./sound/click.mp3");
const soundCheer = new Audio("./sound/cheer.mp3");
const soundSad = new Audio("./sound/sad.mp3");
// bien phan modal hien thi loi giai
const explanationLink = $("#explanation-link");
const explanationModal = $("#explanation-modal");
const explanationImage = $("#explanation-image");

// fetch data from quiz json
let startIndex = 0; //không được xóa vì liên quan đến fetch
let endIndex = 10; //không được xóa vì liên quan đến fetch
let data = [];
let dataOfQuestionSet = [];

fetch("./quizData.json")
  .then((res) => res.json())
  .then((result) => {
    data = result;
    dataOfQuestionSet = data.slice(startIndex, endIndex);
    start();
  })
  .catch((err) => {
    console.error("Lỗi khi load quizData.json:", err);
  });
//----------------------------------------------------------------------------------
const listQuestionBlock = $(".list-question-block");
const let100ToPass = $(".thong-bao-100-de-pass-bo-de");
// function hiển thị số lượng bộ đề
function createNumberOderQuestionSet() {
  let num = Math.ceil(data.length / 10); // luôn chuẩn rồi. ko được chỉnh, cứ thêm 10 câu hỏi thì tạo 1 bộ đề
  for (let i = 0; i < num; i++) {
    listQuestionBlock.innerHTML += `<span class="list-question" data-number="${i}">Đề số ${
      i + 1
    }</span>`;
  }
}

// --------------------------------------------------------------------
// function tăng startIndex và endIndex lên mỗi lần 10
function raiseStartEndIndex(num) {
  startIndex = num * 10;
  endIndex = startIndex + 10;
  dataOfQuestionSet = data.slice(startIndex, endIndex);
}

//------------------------------------------------------------------
//  tra loi xong quay lai man hinh chinh
const chooseListQuestionBtn = $(".btn-chooseListQuestion"); // nút chọn đề

chooseListQuestionBtn.addEventListener("click", () => {
  soundClick.play();
  start();
  explanationLink.classList.add("hide");
});
// -------------------------------------------------------------------------

// -----------------------------------------------------------------------------------
// function man hinh chinh (start())
const blockAnswer = $(".block-answer");

function start() {
  listQuestionBlock.innerHTML = ""; // reset giao diện
  let100ToPass.classList.remove("hide");
  createNumberOderQuestionSet(); // tạo lại các bộ đề

  const listQuestion = $$(".list-question"); // lấy danh sách sau khi đã tạo

  const allResults = JSON.parse(localStorage.getItem("pass")) || {};

  listQuestion.forEach((question, index) => {
    if (allResults.hasOwnProperty(index)) {
      if (allResults[index] === 100) {
        question.style.color = "aqua";
        question.innerHTML = `✓ Đề số ${index + 1}`;
      } else {
        question.style.color = "#ff6b3eff";
        question.innerHTML = `✗ Đề số ${index + 1}`;
      }
    } else {
      question.style.color = "";
      question.innerHTML = `Đề số ${index + 1}`;
    }

    question.addEventListener("click", () => {
      let100ToPass.classList.add("hide");
      soundClick.play();
      raiseStartEndIndex(index);
      init(begin);
      localStorage.setItem("selected index", JSON.stringify(index));
      blockAnswer.classList.remove("hide");
      blockQuestion.classList.remove("hide");
      nextBtn.classList.add("hide");
      alertCorrectOrIncorrect.classList.add("hide");
      blockChoice.forEach((choice) => {
        choice.classList.remove("hide");
      });
    });
  });

  begin = 0;
  score = 0;
  isClick = false;
  reset();

  blockAnswer.classList.add("hide");
  blockQuestion.classList.add("hide");
  nextBtn.classList.add("hide");
  alertCorrectOrIncorrect.classList.add("hide");
  blockResult.classList.add("hide");
  showResultBtn.classList.add("hide");
}

// ------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
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
  listQuestionBlock.innerHTML = ""; // để bộ câu hỏi ẩn đi
  blockQuestion.innerText = `Câu số ${dataOfQuestionSet[begin].numberOrder}: ${dataOfQuestionSet[begin].question}
`;
  imgElement.src = dataOfQuestionSet[begin].urlImage;
  blockQuestion.appendChild(imgElement);
  blockChoice.forEach((choice, index) => {
    choice.innerHTML = `<div class="letter">${letters[index]}</div>
                    <div class="text-choice">${dataOfQuestionSet[begin].answers[index].answer}</div>`;
  });
  showResultBtn.classList.add("hide");
  blockResult.classList.add("hide");
  nextBtn.classList.add("hide");
  alertCorrectOrIncorrect.classList.add("hide");
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
  soundClick.play();
  // Ẩn bằng fade
  blockQuestion.classList.remove("visible");
  blockAnswer.classList.remove("visible");
  blockQuestion.classList.add("fade");
  blockAnswer.classList.add("fade");

  setTimeout(() => {
    begin++;
    init(begin);
    reset();

    // Hiện lại bằng fade-in
    blockQuestion.classList.remove("fade");
    blockAnswer.classList.remove("fade");
    blockQuestion.classList.add("visible");
    blockAnswer.classList.add("visible");

    stt.scrollIntoView(true);
    alertYouChoose.classList.add("hide");
  }, 400);
  explanationLink.classList.add("hide");
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
    if (dataOfQuestionSet[begin].answers[index].correct === true) {
      soundCorrect.play();

      choice.classList.add("green-correct");
      alertCorrectOrIncorrect.innerText = " Đúng!";
      alertCorrectOrIncorrect.style.color = "#2fff00ff";
      alertCorrectOrIncorrect.classList.remove("hide");
      nextBtn.classList.remove("hide");
      score++; // correct raise score by 1
      alertCorrectOrIncorrect.scrollIntoView(true); // view focus in true or false

      //  other incorrect set red
    } else {
      // add red incorrect

      choice.classList.add("red-incorrect");

      alertCorrectOrIncorrect.innerText = `Sai!`;
      alertCorrectOrIncorrect.style.color = "#ff9100ff";
      alertCorrectOrIncorrect.classList.remove("hide");
      nextBtn.classList.remove("hide");
      soundWrong.play();

      // đặt ngay sau âm thanh để đồng bộ âm thanh và rung
      if ("vibrate" in navigator) {
        navigator.vibrate(100);
      } // rung nhẹ 200ms

      // add green correct
      blockChoice.forEach((otherChoice, otherIndex) => {
        if (dataOfQuestionSet[begin].answers[otherIndex].correct === true) {
          otherChoice.classList.add("green-correct");
        }
      });
      alertCorrectOrIncorrect.scrollIntoView(true); //view focus in true or false
    }
    // Nếu chưa phải câu cuối
    if (begin == dataOfQuestionSet.length - 1) {
      showResultBtn.classList.remove("hide");
      nextBtn.classList.add("hide");
    }
    //  đoạn này là phần hiển thị modal giải thích lời giải
    explanationLink.classList.remove("hide");
    explanationLink.onclick = () => {
      soundClick.play();
      explanationImage.src = dataOfQuestionSet[begin].explanation;
      explanationModal.classList.remove("hide");
    };
    //  đoạn này là click vào modal thì sẽ đóng lại modal
    explanationModal.addEventListener("click", () => {
      explanationModal.classList.add("hide");
    });
  });
});
// ------------------------------------------------------------------------------
//  function see result

function showResult() {
  blockQuestion.classList.add("hide");
  explanationLink.classList.add("hide");
  blockChoice.forEach((choice) => {
    choice.classList.add("hide");
  });
  alertCorrectOrIncorrect.classList.add("hide");
  showResultBtn.classList.add("hide");
  blockResult.classList.remove("hide");
  showScore();
  alertYouChoose.classList.add("hide");
}

showResultBtn.addEventListener("click", showResult);
// -----------------------------------------------------------------

// function nút làm lại

const closeAgainBtn = $(".btn-close");

closeAgainBtn.addEventListener("click", () => {
  soundClick.play();
  begin = 0; // quay về câu đầu
  isClick = false; // cho phép click lại
  score = 0;
  // ẩn phần kết quả
  blockResult.classList.add("hide");

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
  percentScore = Math.round((score / dataOfQuestionSet.length) * 100);
  scoreBlock.innerText = `${percentScore}%`;
  scoreBlock.style.color = percentScore >= 80 ? "#3967e6ff" : "red";
  paraScore.innerText = `Bạn đã trả lời đúng ${score} trên ${dataOfQuestionSet.length} câu hỏi`;

  const selectedIndex = JSON.parse(localStorage.getItem("selected index"));
  let allResults = JSON.parse(localStorage.getItem("pass")) || {};
  allResults[selectedIndex] = percentScore;
  localStorage.setItem("pass", JSON.stringify(allResults));
  if (percentScore === 100) {
    soundCheer.play();
  } else {
    soundSad.play();
  }
}

// --------------------------------------------------------------------------
//  pháo hoa
//------------------------------------------------------------------------------------
//
