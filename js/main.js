const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const timeList = document.getElementById("time-list");
const petNumberList = document.getElementById("pets-list");
const timeEl = document.getElementById("time");
const board = document.getElementById("board");

let time = 0;
let pets = 0;
let score = 0;
let petLeft;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("timebtn")) {
    time = Number(event.target.dataset.time);
    event.target.classList.add("hovered");
    petNumberList.addEventListener("click", (event) => {
      if (event.target.classList.contains("petbtn")) {
        pets = Number(event.target.dataset.number);
        event.target.classList.add("hovered");
        setTimeout(() => {
          screens[1].classList.add("up");
          startGame();
        }, 500);
      }
    });
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("pet")) {
    score++;
    petLeft--;
    event.target.remove();
    if (petLeft === 0) {
      setRoom();
      createPets();
    }
  }
});

function createPets() {
  for (let i = 0; i < pets; ++i) {
    createRandomPet();
    petLeft = pets;
  }
}

function startGame() {
  setInterval(decreaseTime, 1000);
  setRoom();
  createPets();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.classList.add("boardFinish");
  board.style.background = "none";
  board.innerHTML = `<h1>Your score is <span class="primary">${score}</span></h1>`;
  setTimeout(() => {
    clearMoveUp();
    location.reload();
  }, 3000);
}
function clearMoveUp() {
  for (screen of screens) {
    screen.classList.remove("hide");
  }
  board.classList.remove("boardFinish");
}

function createRandomPet() {
  const pet = document.createElement("div");
  pet.classList.add("pet");
  const radius = getRandomNumber(40, 70);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(15, width - radius - 10);
  const y = getRandomNumber(15, height - radius - 10);
  pet.style.background = `url(./img/${getRandomNumber(1, 10)}.png)`;
  pet.style.backgroundSize = "cover";
  pet.style.width = `${radius}px`;
  pet.style.height = `${radius}px`;
  pet.style.left = `${x}px`;
  pet.style.top = `${y}px`;
  board.append(pet);
}

function setRoom() {
  board.style.background = `url(./img/${getRandomNumber(11, 20)}.png)`;
  board.style.backgroundSize = "cover";
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
