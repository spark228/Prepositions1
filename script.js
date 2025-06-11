// script.js
const answers = [];
const trueAnswers = [
  "on", "to", "to", "to", "on", "into", "from", "in", "by", "on",
  "---", "for", "to", "of", "at", "to", "for", "into", "into", "on",
  "of", "of", "by", "to", "out of", "in", "in", "of", "at", "for",
  "of", "with", "into", "for", "in", "with", "---", "into"
];

const options = ["to", "on", "into", "of", "in", "for", "from", "---", "with", "by"];
let currentSlide = 0;

const img = document.getElementById("slide-image");
const buttonsContainer = document.getElementById("buttons-container");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const progressNum = document.getElementById("progress-num");
const progressTotal = document.getElementById("progress-total");
const resultModal = document.getElementById("result-modal");
const resultTable = document.getElementById("result-table");
const scoreDiv = document.getElementById("score");
const closeBtn = document.getElementById("close-btn");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadSlide() {
  img.src = `./image (${currentSlide + 1}).png`;
  progressNum.textContent = currentSlide + 1;
  nextBtn.disabled = true;
  buttonsContainer.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => handleAnswer(btn, option);
    buttonsContainer.appendChild(btn);
  });
  finishBtn.style.display = currentSlide === 37 ? "inline-block" : "none";
}

function handleAnswer(button, answer) {
  const allButtons = buttonsContainer.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  const correct = trueAnswers[currentSlide];
  if (answer === correct) {
    button.classList.add("correct");
    correctSound.play();
  } else {
    button.classList.add("incorrect");
    wrongSound.play();
    const correctBtn = Array.from(allButtons).find(b => b.textContent === correct);
    if (correctBtn) correctBtn.classList.add("correct");
  }

  answers[currentSlide] = answer;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  if (currentSlide < 37) {
    currentSlide++;
    loadSlide();
  }
};

finishBtn.onclick = () => {
  let correctCount = 0;
  resultTable.innerHTML = "<tr><th>#</th><th>Ответ</th><th>Правильно</th></tr>";

  trueAnswers.forEach((correct, i) => {
    const user = answers[i] || "";
    const isCorrect = user === correct;
    const row = document.createElement("tr");
    row.classList.add(isCorrect ? "correct" : "incorrect");
    row.innerHTML = `<td>${i + 1}</td><td>${user}</td><td>${correct}</td>`;
    resultTable.appendChild(row);
    if (isCorrect) correctCount++;
  });

  scoreDiv.textContent = `Результат: ${correctCount} из 38 (${Math.round((correctCount / 38) * 100)}%)`;
  resultModal.classList.add("show");
};

closeBtn.onclick = () => {
  resultModal.classList.remove("show");
  currentSlide = 0;
  answers.length = 0;
  loadSlide();
};

window.onload = () => {
  progressTotal.textContent = "38";
  loadSlide();
};
