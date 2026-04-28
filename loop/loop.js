let allDots = document.querySelectorAll(".dot");

for (let index = 0; index < allDots.length; index++) {
  let currentDot = allDots[index];
  currentDot.style.left = Math.random() * window.innerWidth + "px";
  currentDot.style.top = Math.random() * window.innerHeight + "px";
}

function moveDots() {
  for (let index = 0; index < allDots.length; index++) {
    let currentDot = allDots[index];
    currentDot.style.left = Math.random() * window.innerWidth + "px";
    currentDot.style.top = Math.random() * window.innerHeight + "px";
  }
}

setInterval(moveDots, 2000);