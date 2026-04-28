let container = document.querySelector(".container");

let randomWords = [
  "･ﾟ ･ﾟ·:｡･ﾟﾟ･",
  "｡𖦹°‧",
  "∘˙○˚.•",
  "｡˚",
  "｡˚ ｡˚",
  "｡𖦹°‧",
  "･ﾟ ･ﾟ·: ･ﾟﾟ･",
  ".･:･:･:･:･:.",
  "𓈒𓏸.°•",
  ".°•"
];

let randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];

container.innerHTML = "<span class='dot'>" + randomWord + "</span>";

document.querySelector(".dot").style.left = Math.random() * window.innerWidth + "px";
document.querySelector(".dot").style.top = Math.random() * window.innerHeight + "px";
document.querySelector(".dot").style.fontSize = Math.random() * 120 + 40 + "px";
