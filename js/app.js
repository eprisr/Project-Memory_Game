let openCards = []; //List to push opened cards to
let match = [];
const deck = document.querySelector('.deck');
let moves = 0;

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
  if (match.length === 16) {
    console.log("CONGRATULATIONS!!!")
    //gameComplete();
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
  let moveCount = document.querySelector('.moves');
  moveCount.innerHTML = moves;
}

function checkMoves() {
  if (moves === 9 || moves === 12 || moves === 17) {
    removeStar();
  }
}

function removeStar() {
  const star = document.querySelector('.fa-star');
  star.remove();
}
/*
function timer() {

}

function restart() {

}

function gameComplete(){

}
*/