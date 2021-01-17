let openCards = []; //List to push opened cards to
let match = [];
const deck = document.querySelector('.deck');
let moveCount = document.querySelector('.moves');
let moves = 0;
const restart = document.querySelector('.restart');

/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.deck li');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayShuffle() {
  let arrayCards = [];
  for(card of cards) {
    arrayCards.push(card);
  }
  let shuffled = shuffle(arrayCards);
  for(card of shuffled) {
    deck.appendChild(card);
  }
}
displayShuffle();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cardClicked = function(evt) { //functionality after card is clicked
  const clickedCard = evt.target;
  if (clockOn === false) {
    timer();
    clockOn = true;
  }
  if (openCards.length < 2) {
    showCard(clickedCard);
    addOpenCard(clickedCard);
    if (openCards.length === 2) {
      checkMatchCard(clickedCard);
      moveCounter();
      checkMoves();
    }
  };
};

cards.forEach(function (card) { //Loops through cards and add eventListener
  card.addEventListener('click', cardClicked);
});


function showCard(clickedCard) {
  clickedCard.classList.toggle('show');
  clickedCard.classList.toggle('open');
  clickedCard.removeEventListener('click', cardClicked);
}

function addOpenCard(clickedCard) {
  openCards.push(clickedCard);
}

function checkMatchCard(clickedCard) {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    match.push(...openCards);
    openCards = [];
  } else {
    closeCards(clickedCard);
  }
}

function closeCards(clickedCard) { // Close cards if cards don't match
  setTimeout(function() {
    showCard(openCards[0]);
    showCard(openCards[1]);
    openCards[0].addEventListener('click', cardClicked);
    openCards[1].addEventListener('click', cardClicked);
    openCards = [];
  }, 1000);
}

function moveCounter() {
  moves++
  moveCount.innerHTML = moves;
}

function checkMoves() {
  if (moves === 9 || moves === 12 || moves === 17) {
    removeStar();
	}
	if (match.length === 16) {
    gameComplete();
  }
}

function removeStar() {
  const star = document.querySelector('.stars li');
  // const finalStar = document.querySelector('.final-star');
  star.remove();
  // finalStar.remove();
}

function addStar() {
  let starList = document.querySelector('.stars');
  let createStar = document.createElement('li');
  createStar.insertAdjacentHTML('afterbegin', '<img src="assets/icons/002-popsicle.png" class="life-icon">');
  starList.appendChild(createStar);

  // let finalStarList = document.querySelector('.winning-stars');
	// let img = document.createElement('img');
	// if (moves >= 17) {
	// 	img.src = "assets/046-popsicle-5-3star.svg";
	// } else if (moves >= 12 && moves < 17) {
	// 	img.src = "assets/046-popsicle-5-2star.svg";
	// } else if (moves >= 9 && moves < 12) {
	// 	img.src = "assets/046-popsicle-5-1star.svg";
	// } else {

	// }
  // img.setAttribute('class', 'final-star');
  // finalStarList.appendChild(img);
}

//CREATE TIMER
const scorePanel = document.querySelector('.score-panel');
const clockDiv = document.createElement('div');
clockDiv.setAttribute('class', 'timer');
clockDiv.setAttribute('style', 'float: right; padding-right: 10px;');
clockDiv.textContent = '00:00';
scorePanel.appendChild(clockDiv);
let setTime;
let clockOn = false;
let sec = 0;
let min = 0;
//

function timer() {
  setTime = setInterval(function() {
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    } else {
      min = min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    clockDiv.innerHTML = min +":"+ sec;
  }, 1000);
}

function stopTime() {
  clearInterval(setTime);
}

restart.addEventListener('click', restartGame);

function restartGame() {
  //board
  displayShuffle();
  for (card of cards) {
    card.className = 'card';
    card.addEventListener('click', cardClicked);
  }
  openCards = [];
  match = [];
  //timer
  stopTime();
  clockOn = false;
  sec = 0;
  min = 0;
  clockDiv.innerHTML = "00:00";
	//stars
  if (moves >= 17) {
		addStar();
    addStar();
    addStar();
  } else if (moves >= 12 && moves < 17) {
		addStar();
    addStar();
  } else if (moves >= 9 && moves < 12) {
		addStar();
  } else {
		
	}
	//moves
	moves = 0;
	moveCount.innerHTML = moves;
}

function gameComplete(){
	stopTime();
	//Update UI
	for (card of cards) {
		card.classList.add('hide');
		card.classList.remove('card', 'show', 'open', 'match');
	}
  modalA();
}

function modalA(){
	const modalB = document.getElementById('modal-container');
	const modalC = new bootstrap.Modal(modalB)
	modalB.addEventListener('show.bs.modal', function (event) {
		// do something...
		modalStats();
	})
	modalC.show();
  // modal.classList.toggle('hide');
}

function modalStats(){
  const finalTime = document.querySelector('.modal-time');
  const timerTime = clockDiv.innerHTML;
  const finalMoves = document.querySelector('.modal-moves');
  finalTime.innerHTML = 'TIME: ' +timerTime;
  finalMoves.innerHTML = 'MOVES: ' +moves;
	const congrats = document.querySelector('.congrats');
	let finalStarList = document.querySelector('.winning-stars');

  if (moves > 9 && moves < 12) {
		congrats.innerHTML = 'EXCELLENT!';
		finalStarList.innerHTML = '<img class="final-star" src="assets/046-popsicle-5-2star.svg" alt="star">';
  } else if (moves >= 12 && moves < 17) {
		congrats.innerHTML = 'GOOD JOB!';
		finalStarList.innerHTML = '<img class="final-star" src="assets/046-popsicle-5-1star.svg" alt="star">';
  } else if (moves >= 17) {
		congrats.innerHTML = 'TRY AGAIN';
		finalStarList.innerHTML = '<img class="final-star" src="assets/icons/039-ice-cream-14.svg" alt="star">';
  } else {
    
	}
}

document.querySelector('.modal-play-again').addEventListener('click', function(){
  restartGame();
  modalA();
});