// Self-contained practice text: no dependency on an external quote API.
const quoteDisplayElement = document.querySelector("#quoteDisplay");
const quoteInputElement = document.querySelector("#quoteInput");
const timerElement = document.querySelector("#timer");
const wordsPerMinuteElement = document.querySelector("#wpm");
const divider = document.querySelector("hr");

quoteInputElement.addEventListener("input", () => {
  const quoteArray = quoteDisplayElement.querySelectorAll("span");
  const valueArray = quoteInputElement.value.split("");
  let right = true;
  let count = 0;

  quoteArray.forEach((characterSpan, i) => {
    const character = valueArray[i];

    if (character == null) {
      characterSpan.classList.remove("right");
      characterSpan.classList.remove("wrong");
      right = false;
    } else if (character === characterSpan.textContent) {
      characterSpan.classList.add("right");
      characterSpan.classList.remove("wrong");
      divider.classList.remove("halp");
      count++;
    } else {
      characterSpan.classList.remove("right");
      characterSpan.classList.add("wrong");
      divider.classList.add("halp");
      right = false;
    }
  });

  let randomNumber = Math.round(count * 60  / (getTimerTime() * 5) * 10) / 10;

  if (!Number.isFinite(randomNumber)) {
    wordsPerMinuteElement.textContent = "0";
  } else {
    wordsPerMinuteElement.textContent = randomNumber;
  }

  if (right) getNextQuote();
});

function getRandomQuote() {
  const quotes = [
    'Music brings people together. Keep practicing, one word at a time.',
    'A little progress every day builds confidence for tomorrow.',
    'Take a breath, find your rhythm, and enjoy the next challenge.',
    'Create something you love and share it with the world.'
  ];
  return Promise.resolve(quotes[Math.floor(Math.random() * quotes.length)]);
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.textContent = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
let timerInterval;
function startTimer() {
  timerElement.textContent = 0;
  startTime = new Date();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerElement.textContent = getTimerTime();
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

getNextQuote();