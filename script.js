/*
 * Create a list that holds all of your cards
 */
let openCards = [];
let card = document.getElementsByClassName('card');
let cards = [...card];
let movesCounter = document.querySelector('.moves');
let deck = document.querySelector('.deck');
let shuffledCards = [];
let moves = 0;
let match = 0;
let sec = 0;
let min = 0;
let timeCounter = document.querySelector('.timer');
let timer = '';
let timerDelay = 0;
let modal = document.querySelector('.modal');
let stat = document.querySelector('.end-msg');
let timerText = '';
let modalMsg = '';
let restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);
let stars = document.querySelector(".stars").getElementsByTagName("li");
let starCount = 3;
let statMsg = document.querySelector('.stats');

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


setDeck();

/**
* Shuffle cards on deck and display face down
* call to initialize moves at move-counter on webpage
* call to start the game
*/
function setDeck() {
 console.log("shuffle");
 shuffledCards = shuffle(cards);
 for(let i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
    shuffledCards[i].classList.remove('open','show','match','shake');
  }
   setMoves();
   showFirst();
     /* setTimeout(hideCards(),10000); */
     setTimeout(function() {
           hideCards();
           startGame();
       },500);
}


/**
 * showFirst - shows all the cards
 *
 * @param  card shuffled card list
 */
function showFirst() {
  console.log("show");
  for(let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].classList.add('open','show');
  }	
   
}

/**
 * hideCards - hides all the cards
 *
 * @param  card shuffled card list
 */
function hideCards() {
  console.log("hide");
  for(let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].classList.remove('open','show');
  }
}


/**
 * Sets move counter to current moves done
 */
function setMoves() {
  movesCounter.textContent = moves;
}


/**
* Game starts when a card is clicked
*/

function startGame() {
 for(let i = 0; i < cards.length; i++) {
   shuffledCards[i].addEventListener('click', flipCardUp);
 }
}


/**
* Shows card-symbol at click
* Adds card to openCards list
* If it's first card - start timer
* If there are 2 cards on list - call to compare symbols
* If all cards are matched, call to end game
* @param  {type} event clicked card
*/

function flipCardUp(event) {
 event.target.classList.remove('shake');
 showCard(event);
 addToOpenCards(event.target);
 timerDelay++;

 if(timerDelay === 1) {
   startTimer();
 }

 if(openCards.length === 2) {
   let prev = openCards[0];
   let curr = openCards[1];
   checkMatch(prev,curr);
 }

 if(match === 8) {
   endGame();
 }
}


/**
* Checks the symbol of current and previous cards from list
* If match - call to change card style
* If not a match - call to flip card down
* Afterwards, call to increment moves and check star rating-status
* Reset openCards list
* @param  {type} prev 1st card on list
* @param  {type} curr 2nd card of list
*/
function checkMatch(prev,curr) {
  if(prev.innerHTML === curr.innerHTML)  {
        isMatch(prev,curr);
  }
  else {
           notMatch(prev,curr);
  }

 incrementMoves();
 starRating();
 openCards = [];
}



   /**
    * Lock card in open position and change styles
    * Increment match number
 * @param  {type} prev 1st card on list
 * @param  {type} curr 2nd card of list
    */
   function isMatch(prev,curr) {
       prev.classList.add('match');
  curr.classList.add('match');
  match++;
   }



   /**
    * Flip card back down and add style 	 *
 * @param  {type} prev 1st card on list
 * @param  {type} curr 2nd card of list
    */
   function notMatch(prev,curr) {
       setTimeout(function () {
    prev.classList.add('shake');
    curr.classList.add('shake');
    prev.classList.remove('open','show');
          curr.classList.remove('open','show');
  }, 300);
   }


/**
 * Increment moves by 1
 */
function incrementMoves() {
  moves++;
  setMoves();
}


/**
 * Determine the star rating based on moves made
 * For less than 12 moves - star is 3
 * For more than 12 moves - star is 2
 * For more than 22 moves - star is 1
 */
function starRating() {
  if(moves > 16) {
    stars[2].classList.add('zoomOut');
    starCount = 2;
    console.log(starCount);
  }

  if(moves > 22) {
    stars[1].classList.add('zoomOut');
    starCount = 1;
    console.log(starCount);
  }
}


/**
* Add currently clicked card to openCards list
* @param  {type} c clicked card
*/
function addToOpenCards(c) {
 openCards.push(c);
}


/**
* Shows card symbol
* @param  {type} event clicked card
*/
function showCard(event) {
 event.target.classList.add('open','show');
}


/**
* Start the timer
* Store timer in a temporary variable
*/
function startTimer() {
 timer = setInterval(buildTimer,1000);
}


/**
* Pre-increment seconds on every time function is called
* Calculate minute and second and store in variables
* Format time in 00:00 and set it in variable
* Show final formatted time to time-counter on webpage
*/
function buildTimer() {
 ++sec;
 min = Math.floor(sec / 60);
 sec = Math.floor(sec % 60);
 timerText = pad(min) + ":" +
 pad(sec);
 timeCounter.innerHTML = timerText;
}


/**
* Pad the time in 00 format
* Convert time value to string
* If digit is less than 2, add 0 infront
* @param  {type} value time value
* @return {type} string expression of time value
*/
function pad(value) {
 var string = value + "";
 if(string.length < 2) {
   return "0" + string;
 }
 else return string;
}


/**
 * Stops timer from running
 * Clears minute,second, and time string
 */
function stopTimer() {
  clearInterval(timer);
  sec = 0;
  min = 0;
  timerText = '';
}


/**
 * Creates statistic text and sets to modalMsg
 */
function buildModalMsg() {
  modalMsg = "<p>You made " + moves + " moves in " + min + " minutes " + sec + " seconds!</p>" + "<p>You Received " + starCount + " star</p>";
}


/**
 * Creates paragraph element
 * Calls to set statistic text to paragraph
 * Add the paragraph below end-greeting and above buttons
 */
function buildModal() {
  statMsg.innerHTML = '';
  statMsg.innerHTML = modalMsg ;
}


/**
 * Display modal
 * Clicking outside the modal box closes modal
 * Call to set fuctions to modal buttons
 */
function showModal() {
  buildModal();

  runClick();
  window.onclick = function(event) {
    if(event.target == modal) {
      hideModal();
    }
  };

  modal.style.display = 'block';
}


/**
 * Clicking on "OK" closes modal
 * Clicking on "Play Again" restarts game
 */
function runClick() {
  document.querySelector('#ok').onclick= hideModal;

  document.querySelector('#play-again').onclick= resetGame;

}


/**
 * Hides modal
 */
function hideModal() {
  modal.style.display = 'none';
}


/**
 * Reset the modal statistic msg on webpage
 */
 function resetModalStat() {
   statMsg.innerHTML = '';
 }

/**
 * Call to create statistic text for modal
 * Call to show modal contents
 * Stop timer from running
 */
function endGame() {
  buildModalMsg();
  stopTimer();
  showModal();
}


/**
 * Reset everything
 * Event - when "Restart" is clicked
 * Call to hide modal
 * Call to shuffle and set cards to deck
 * Call to reinitialize temporary variables
 */
function resetGame() {
  hideModal();
  resetStaring();
  setDeck();
  reInit();
}


/**
 * Reinitialize moves and match numbers
 * Reset move and timer text on webpage
 */
function reInit() {
  movesCounter.innerHTML = '';
  timeCounter.innerHTML = '';
  moves = 0;
  match = 0;
  timerDelay = 0;
}


/**
 * Reset star rating status
 * Display all 3 stars as defualt
 */
function resetStaring() {
  starCount = 3;
  for(let i = 1; i < stars.length; i++) {
    if(stars[i].classList.contains('zoomOut')) {
      stars[i].classList.remove('zoomOut');
    }
  }
}


/**
 * Restart the game by resetting everything
 * Event - when "Play Again" is clicked
 */
function restartGame() {
  stopTimer();
  resetModalStat();
  resetStaring();
  reInit();
  setDeck();
}

/* Given by Udacity
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