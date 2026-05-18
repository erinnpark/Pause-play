function changeLinkSizes() {
	let allItems = document.querySelectorAll('.item');
	allItems.forEach((element) => {
		let randomShadow = Math.random() * 20;
		element.style.boxShadow = randomShadow + "px " + randomShadow + "px 0px #000000";
	})
}

setInterval(changeLinkSizes, 1000);

let introPopup = document.querySelector('#intro-popup');
let introOverlay = document.querySelector('#intro-overlay');
let topics = document.querySelector('.topics');

introPopup.addEventListener('click', () => {
	introOverlay.classList.add('hidden');
	topics.classList.add('visible');
});