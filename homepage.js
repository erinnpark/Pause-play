const introPopup = document.querySelector("#intro-popup");
const introOverlay = document.querySelector("#intro-overlay");
const topics = document.querySelector(".topics");
const sparkleContainer = document.getElementById("sparkleContainer");
const topicItems = document.querySelectorAll(".item");

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

createBackgroundSparkles();

introPopup.addEventListener("click", () => {
	createSparklesAroundElement(introPopup);
	introOverlay.classList.add("hidden");
	topics.classList.add("visible");
});

topicItems.forEach((item) => {
	item.addEventListener("mouseenter", () => {
		createSparklesAroundElement(item);
	});
});