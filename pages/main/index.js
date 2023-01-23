import {
  TABLE_WH,
  MOBILE_WH,
  DESKTOP_COUNT,
  TABLE_COUNT,
  MOBILE_COUNT,
} from "../constant.js";
const hamburger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const blackout = document.querySelectorAll(".blackout");
const bodyTeg = document.body;
const navLink = document.querySelector(".nav__list");
const logo = document.querySelector(".logo");

function toggleMenu() {
  menu.classList.toggle("nav-active");
  hamburger.classList.toggle("burger-active");
  blackout[0].classList.toggle("blackout-active");
  bodyTeg.classList.toggle("look");
  logo.classList.toggle("logo-active");
}
hamburger.addEventListener("click", toggleMenu);
navLink.addEventListener("click", toggleMenu);
blackout[0].addEventListener("click", toggleMenu);

/*создание карты*/

function creatCard(item, blok) {
  let img;
  let namePet;
  let card;
  let btn;
  card = document.createElement(`div`);
  card.dataset.id = item.id;
  card.classList.add("pets__card");
  blok.append(card);
  img = document.createElement(`img`);
  img.classList.add("pets__img");
  img.src = item.img;
  card.append(img);
  namePet = document.createElement(`h3`);
  namePet.classList.add("title");
  namePet.classList.add("pets_name");
  namePet.innerText = item.name;
  card.append(namePet);
  btn = document.createElement(`button`);
  btn.classList.add("button_secondary");
  btn.innerText = "Learn more";
  card.append(btn);
}

/*из массива petsArray в block добавляется numberCard с индексами отличными от prevSet*/
function geratioCards(data, blok, numberCard, prevSet) {
  let indexArr = new Set();
  let max = data.length;
  while (indexArr.size < numberCard) {
    let index = Math.floor(Math.random() * max);
    if (!prevSet.has(index)) {
      indexArr.add(index);
    }
  }
  for (let i of indexArr) {
    creatCard(data[i], blok);
  }
  indexItem = indexArr;
}

function countCards() {
  let win = window.innerWidth;

  if (win < MOBILE_WH) {
    return MOBILE_COUNT;
  } else if (win < TABLE_WH) {
    return TABLE_COUNT;
  } else {
    return DESKTOP_COUNT;
  }
}

async function getQuotes(blok, prevSet) {
  const quotes = "../../assets/pets.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const numberCard = countCards();
  geratioCards(data, blok, numberCard, prevSet);
}

let indexItA = [];
let indexItL = [];
let indexItR = [];

function ramdomGeneration(max) {
  while (indexItA.length < 3) {
    let index = Math.floor(Math.random() * max);
    if (!indexItA.includes(index)) {
      indexItA.push(index);
    }
  }

  while (indexItL.length < 3) {
    let index = Math.floor(Math.random() * max);
    if (!indexItL.includes(index) && !indexItA.includes(index)) {
      indexItL.push(index);
    }
  }

  while (indexItR.length < 3) {
    let index = Math.floor(Math.random() * max);
    if (!indexItR.includes(index) && !indexItA.includes(index)) {
      indexItR.push(index);
    }
  }
}

async function randomArray() {
  const quotes = "../../assets/pets.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const numberCard = countCards();
  let max = data.length;
  ramdomGeneration(max);
}
randomArray();

/**/
async function getFirstQuotes() {
  const quotes = "../../assets/pets.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const numberCard = countCards();
  let max = data.length;
  sliderActive.innerHTML = "";
  sliderLeft.innerHTML = "";
  sliderRight.innerHTML = "";
  for (let i = 0; i < numberCard; i++) {
    creatCard(data[indexItA[i]], sliderActive);
    creatCard(data[indexItL[i]], sliderLeft);
    creatCard(data[indexItR[i]], sliderRight);
  }
}

window.addEventListener("load", getFirstQuotes);
const slider = document.querySelector(".slider__content");
const sliderActive = document.querySelector("#slider-active");
let indexActiv = new Set(indexItA);
const sliderLeft = document.querySelector("#slider-left");
let indexLeft = new Set(indexItL);
const sliderRight = document.querySelector("#slider-right");
let indexRight = new Set(indexItR);

function getCardsIdBlok(block) {
  let setItem = new Set();
  let items = block.querySelectorAll(".pets__card");
  items.forEach((card) => {
    setItem.add(+card.dataset.id);
  });
  return setItem;
}

function getCardsId() {
  indexLeft = getCardsIdBlok(sliderLeft);
  indexRight = getCardsIdBlok(sliderRight);
  indexActiv = getCardsIdBlok(sliderActive);
}

const btnNext = document.querySelector(".right-arrow");
const btnPrev = document.querySelector(".left-arrow");

const moveLeft = () => {
  slider.classList.add("transition-left");
  btnPrev.removeEventListener("click", moveLeft);
  btnNext.removeEventListener("click", moveRight);
};

const moveRight = () => {
  slider.classList.add("transition-right");
  btnPrev.removeEventListener("click", moveLeft);
  btnNext.removeEventListener("click", moveRight);
};

btnPrev.addEventListener("click", moveLeft);
btnNext.addEventListener("click", moveRight);

slider.addEventListener("animationend", (animationEvent) => {
  getCardsId();

  let changedItem;
  let indexItem;
  if (animationEvent.animationName === "move-left") {
    slider.classList.remove("transition-left");
    indexActiv = indexRight;
    changedItem = sliderRight;
    document.querySelector("#slider-active").innerHTML = sliderRight.innerHTML;
  } else {
    slider.classList.remove("transition-right");
    indexRight = indexActiv;
    indexActiv = indexLeft;
    changedItem = sliderLeft;
    document.querySelector("#slider-active").innerHTML = sliderLeft.innerHTML;
  }
  changedItem.innerHTML = "";
  getQuotes(changedItem, indexActiv);

  btnPrev.addEventListener("click", moveLeft);
  btnNext.addEventListener("click", moveRight);
});

const popup = document.querySelector(".pop");
const closePopBtn = document.querySelector(".pop__close");

function generatePop(item) {
  const img = document.querySelector('[data-key="img"]');
  img.src = item.img;
  const textArray = document.querySelectorAll("[data-key]");
  textArray.forEach((element) => {
    element.textContent = item[element.dataset.key];
  });
}
async function popOpen(event) {
  const quotes = "../../assets/pets.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const INDEX = event.target.parentNode.dataset.id;
  const item = data[INDEX];
  generatePop(item);
  popup.classList.add("pop-active");
  popup.classList.add("transition-opaque");
  blackout[1].classList.add("blackout-active");
  bodyTeg.classList.add("look");
}

function popClose() {
  popup.classList.add("transition-opacity");
  popup.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "opacity-window") {
      popup.classList.remove("pop-active");
      popup.classList.remove(".transition-opaque");
      blackout[1].classList.remove("blackout-active");
      bodyTeg.classList.remove("look");
      popup.classList.remove("transition-opacity");
    }
  });
}

sliderActive.addEventListener("click", popOpen);
closePopBtn.addEventListener("click", popClose);
blackout[1].addEventListener("click", popClose);
