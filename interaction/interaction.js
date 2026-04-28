let container = document.querySelector('.container');
let numberOfInteractions = 0;

function runAway() {
	container.style.transform = `translate(${Math.random()*100-50}vw, ${Math.random()*100-50}vh)`;
	numberOfInteractions++;
}

container.innerHTML = "<div class='dot' style='left: 0px; top: 0px; background-color: #f6c94d;'></div><div class='dot' style='left: 70px; top: 0px; background-color: #f7f4d5;'></div><div class='dot' style='left: 140px; top: 0px; background-color: #a7c7e4;'></div><div class='dot' style='left: 210px; top: 0px; background-color: #5d7b3d;'></div>";

container.addEventListener('mouseenter', runAway);


