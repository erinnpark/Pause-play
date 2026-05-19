const draggableWords = document.querySelectorAll(".draggable-word");
const sentenceBox = document.getElementById("sentenceBox");
const placeholder = document.querySelector(".placeholder");
const clearBtn = document.getElementById("clearBtn");
const sparkleContainer = document.getElementById("sparkleContainer");

let draggedWord = null;
let sentenceWords = [];
let hasPlayedCompletionMusic = false;

const correctSentence = [
  "I'm",
  "at",
  "a",
  "payphone",
  "trying",
  "to",
  "call",
  "home"
];

const powerSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "sawtooth"
  },
  envelope: {
    attack: 0.03,
    decay: 0.25,
    sustain: 0.55,
    release: 1.4
  }
}).toDestination();

const bassSynth = new Tone.Synth({
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.02,
    decay: 0.2,
    sustain: 0.45,
    release: 1.1
  }
}).toDestination();

const sparkleSynth = new Tone.Synth({
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.005,
    decay: 0.12,
    sustain: 0.05,
    release: 0.4
  }
}).toDestination();

const wrongSynth = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope: {
    attack: 0.01,
    decay: 0.15,
    sustain: 0.05,
    release: 0.2
  }
}).toDestination();

powerSynth.volume.value = -7;
bassSynth.volume.value = -9;
sparkleSynth.volume.value = -16;
wrongSynth.volume.value = -18;

const wordSounds = {
  "I'm": "C6",
  at: "E6",
  a: "G6",
  payphone: "B6",
  trying: "C7",
  to: "A6",
  call: "G6",
  home: "E6"
};

function createBackgroundSparkles() {
  for (let i = 0; i < 120; i++) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("background-sparkle");

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomSize = Math.random() * 18 + 6;
    const randomDelay = Math.random() * 3;
    const randomDuration = Math.random() * 2 + 1.4;

    sparkle.style.left = `${randomX}px`;
    sparkle.style.top = `${randomY}px`;
    sparkle.style.width = `${randomSize}px`;
    sparkle.style.height = `${randomSize}px`;
    sparkle.style.animationDelay = `${randomDelay}s`;
    sparkle.style.animationDuration = `${randomDuration}s`;

    document.body.appendChild(sparkle);
  }
}

createBackgroundSparkles();

async function startTone() {
  if (Tone.context.state !== "running") {
    await Tone.start();
  }
}

async function playWordTone(word) {
  await startTone();

  const note = wordSounds[word] || "G4";
  sparkleSynth.triggerAttackRelease(note, "8n");
}

async function playWrongSound() {
  await startTone();

  wrongSynth.triggerAttackRelease("C2", "8n");

  if ("speechSynthesis" in window) {
    const noVoice = new SpeechSynthesisUtterance("no");
    noVoice.rate = 0.9;
    noVoice.pitch = 0.8;
    noVoice.volume = 0.7;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(noVoice);
  }

  sentenceBox.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 260,
      easing: "ease"
    }
  );
}

async function playCompletionMusic() {
  await startTone();

  const now = Tone.now();

  bassSynth.triggerAttackRelease("C2", "2n", now);
  powerSynth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "4n", now);
  powerSynth.triggerAttackRelease(["G3", "B3", "D4", "G4"], "4n", now + 0.32);

  bassSynth.triggerAttackRelease("A1", "2n", now + 0.62);
  powerSynth.triggerAttackRelease(["A3", "C4", "E4", "A4"], "4n", now + 0.62);
  powerSynth.triggerAttackRelease(["F3", "A3", "C4", "F4"], "2n", now + 0.98);

  bassSynth.triggerAttackRelease("F1", "2n", now + 0.98);
  powerSynth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "1n", now + 1.35);
  bassSynth.triggerAttackRelease("C2", "1n", now + 1.35);

  createBigSparkleMoment();
}

function updateSentenceBoxSize() {
  sentenceBox.classList.remove("many-words", "full-words");

  if (sentenceWords.length >= 8) {
    sentenceBox.classList.add("many-words");
  }

  if (sentenceWords.length >= 14) {
    sentenceBox.classList.add("full-words");
  }
}

function checkSentence() {
  if (sentenceWords.length !== correctSentence.length) {
    return;
  }

  const isCorrect = sentenceWords.every((word, index) => {
    return word === correctSentence[index];
  });

  if (isCorrect && !hasPlayedCompletionMusic) {
    hasPlayedCompletionMusic = true;
    playCompletionMusic();

    placeholder.style.display = "block";
    placeholder.textContent = "The sentence is complete.";
  }
}

draggableWords.forEach((word) => {
  word.addEventListener("dragstart", () => {
    draggedWord = word.textContent;
    word.classList.add("dragging");
  });

  word.addEventListener("dragend", () => {
    word.classList.remove("dragging");
  });
});

sentenceBox.addEventListener("dragover", (event) => {
  event.preventDefault();
  sentenceBox.classList.add("drag-over");
});

sentenceBox.addEventListener("dragleave", () => {
  sentenceBox.classList.remove("drag-over");
});

sentenceBox.addEventListener("drop", (event) => {
  event.preventDefault();
  sentenceBox.classList.remove("drag-over");

  if (draggedWord) {
    addWordToSentence(draggedWord);
    draggedWord = null;
  }
});

function addWordToSentence(word) {
  const nextCorrectWord = correctSentence[sentenceWords.length];

  if (word !== nextCorrectWord) {
    playWrongSound();
    return;
  }

  placeholder.style.display = "none";

  const newWord = document.createElement("span");
  newWord.classList.add("sentence-word");
  newWord.textContent = word;

  sentenceBox.appendChild(newWord);
  sentenceWords.push(word);

  updateSentenceBoxSize();

  playWordTone(word);
  createSparklesAroundElement(newWord);

  newWord.addEventListener("click", () => {
    playWordTone(word);
    createSparklesAroundElement(newWord);
  });

  checkSentence();
}

clearBtn.addEventListener("click", async () => {
  await startTone();

  const sentenceWordElements = document.querySelectorAll(".sentence-word");

  sentenceWordElements.forEach((word) => {
    word.remove();
  });

  sentenceWords = [];
  hasPlayedCompletionMusic = false;
  updateSentenceBoxSize();

  placeholder.textContent =
    "Drop words here to create a sentence... When it is right, music will play!";
  placeholder.style.display = "block";

  sparkleSynth.triggerAttackRelease("C4", "8n");
});

function createSparkle(x, y) {
  const sparkle = document.createElement("span");
  sparkle.classList.add("sparkle");

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1200);
}

function createSparklesAroundElement(element) {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    const randomX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 120;
    const randomY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 70;

    setTimeout(() => {
      createSparkle(randomX, randomY);
    }, i * 60);
  }
}

function createBigSparkleMoment() {
  const blink = document.createElement("div");
  blink.classList.add("screen-blink");
  document.body.appendChild(blink);

  setTimeout(() => {
    blink.remove();
  }, 1400);

  for (let i = 0; i < 90; i++) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("big-sparkle");

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomSize = Math.random() * 28 + 16;
    const randomDelay = Math.random() * 900;

    sparkle.style.left = `${randomX}px`;
    sparkle.style.top = `${randomY}px`;
    sparkle.style.width = `${randomSize}px`;
    sparkle.style.height = `${randomSize}px`;
    sparkle.style.animationDelay = `${randomDelay}ms`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 2600);
  }

  for (let i = 0; i < 60; i++) {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    setTimeout(() => {
      createSparkle(randomX, randomY);
    }, i * 25);
  }
}
