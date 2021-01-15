'use strict'
document.addEventListener("DOMContentLoaded", function () {

});

let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let score = 0;
let $game_time = document.querySelector('#game-time');
let $time = document.querySelector('#timer');
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
	setGameTime();
	score = 0;
	isGameStarted = true;
	$game.style.backgroundColor = "#fff";
	$start.classList.add('hide');
	document.querySelector('.app__score-header').classList.remove('hide');

	let interval = setInterval((function () {
		let time = parseFloat($time.textContent);
		if (time <= 0) {
			endGame();
			clearInterval(interval);
		} else {
			$time.textContent = (time - 0.1).toFixed(1);
		}
	}), 100);

	renderBox();
}

function handleBoxClick(event) {
	if (!isGameStarted) {
		return;
	}
	if (event.target.dataset.box) {
		renderBox();
		score += 1;
		document.getElementById('score').innerHTML = score;
	}
}

function renderBox() {
	$game.innerHTML = "";
	let box = document.createElement('div');
	let boxSize = getRandom(30, 100);
	let gameSize = $game.getBoundingClientRect();
	let maxTop = gameSize.height - boxSize;
	let maxLeft = gameSize.width - boxSize;

	box.style.width = box.style.height = boxSize + "px";;
	box.style.position = "absolute";
	box.style.top = getRandom(0, maxTop) + "px";
	box.style.left = getRandom(0, maxLeft) + "px";
	box.style.backgroundColor = "#000";
	box.style.cursor = "pointer";
	box.setAttribute('data-box', 'true');
	$game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
	isGameStarted = false;
	$game.style.backgroundColor = "#ccc";
	$start.classList.remove('hide');
	$game.innerHTML = "";

}

function setGameTime() {
	let time = +$game_time.value;
	$time.textContent = time.toFixed(1);
}

