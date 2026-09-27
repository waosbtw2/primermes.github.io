
"use strict";

const alphabet = [
  ["A","ei"],["B","bi"],["C","si"],["D","di"],["E","i"],["F","ef"],
  ["G","yi"],["H","eich"],["I","ai"],["J","yei"],["K","kei"],["L","el"],
  ["M","em"],["N","en"],["O","ou"],["P","pi"],["Q","kiu"],["R","ar"],
  ["S","es"],["T","ti"],["U","iu"],["V","vi"],["W","dábol iu"],["X","eks"],
  ["Y","uai"],["Z","zi (EE. UU.) / zed (Reino Unido)"]
];

const numberWords = [
  "one","two","three","four","five","six","seven","eight","nine","ten",
  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty",
  "twenty-one","twenty-two","twenty-three","twenty-four","twenty-five","twenty-six","twenty-seven","twenty-eight","twenty-nine","thirty",
  "thirty-one","thirty-two","thirty-three","thirty-four","thirty-five","thirty-six","thirty-seven","thirty-eight","thirty-nine","forty",
  "forty-one","forty-two","forty-three","forty-four","forty-five","forty-six","forty-seven","forty-eight","forty-nine","fifty",
  "fifty-one","fifty-two","fifty-three","fifty-four","fifty-five","fifty-six","fifty-seven","fifty-eight","fifty-nine","sixty",
  "sixty-one","sixty-two","sixty-three","sixty-four","sixty-five","sixty-six","sixty-seven","sixty-eight","sixty-nine","seventy",
  "seventy-one","seventy-two","seventy-three","seventy-four","seventy-five","seventy-six","seventy-seven","seventy-eight","seventy-nine","eighty",
  "eighty-one","eighty-two","eighty-three","eighty-four","eighty-five","eighty-six","eighty-seven","eighty-eight","eighty-nine","ninety",
  "ninety-one","ninety-two","ninety-three","ninety-four","ninety-five","ninety-six","ninety-seven","ninety-eight","ninety-nine","one hundred"
];

function renderAlphabet() {
  const grid = document.getElementById("alphabetGrid");
  if (!grid) return;
  const fragment = document.createDocumentFragment();
  alphabet.forEach(([letter, pronunciation]) => {
    const item = document.createElement("div");
    item.className = "letter";
    const strong = document.createElement("strong");
    strong.textContent = letter;
    const small = document.createElement("span");
    small.textContent = pronunciation;
    item.append(strong, small);
    fragment.append(item);
  });
  grid.append(fragment);
}

function renderNumbers() {
  const grid = document.getElementById("numberGrid");
  if (!grid) return;
  const fragment = document.createDocumentFragment();
  numberWords.forEach((word, index) => {
    const item = document.createElement("div");
    item.className = "number";
    const number = document.createElement("strong");
    number.textContent = String(index + 1);
    const spelling = document.createElement("span");
    spelling.textContent = word;
    item.append(number, spelling);
    fragment.append(item);
  });
  grid.append(fragment);
}

function checkQuiz() {
  const questions = [...document.querySelectorAll(".quiz-question")];
  let score = 0;
  questions.forEach((question) => {
    const selected = question.querySelector("input:checked");
    const feedback = question.querySelector(".feedback");
    if (!feedback) return;
    if (selected && selected.value === question.dataset.answer) {
      score += 1;
      feedback.textContent = "¡Correcto!";
      feedback.className = "feedback correct";
    } else {
      feedback.textContent = selected
        ? "Respuesta incorrecta. Repasa el tema e inténtalo otra vez."
        : "Selecciona una respuesta.";
      feedback.className = "feedback incorrect";
    }
  });
  const output = document.getElementById("score");
  if (output) output.textContent = `Resultado: ${score} de ${questions.length} respuestas correctas.`;
}

function resetQuiz() {
  document.querySelectorAll(".feedback").forEach((feedback) => {
    feedback.textContent = "";
    feedback.className = "feedback";
  });
  const output = document.getElementById("score");
  if (output) output.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderAlphabet();
  renderNumbers();
  const checkButton = document.getElementById("checkQuiz");
  const form = document.getElementById("quizForm");
  if (checkButton) checkButton.addEventListener("click", checkQuiz);
  if (form) form.addEventListener("reset", () => window.setTimeout(resetQuiz, 0));
});
