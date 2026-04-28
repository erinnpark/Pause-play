function changeLinkSizes() {
	let allItems = document.querySelectorAll('.item');
	allItems.forEach((element) => {
		let randomShadow = Math.random() * 20;
		element.style.boxShadow = randomShadow + "px " + randomShadow + "px 0px #000000";
	})
}

setInterval(changeLinkSizes, 1000);