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



setDeck();


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



function showFirst() {
  console.log("show");
  for(let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].classList.add('open','show');
  }	
   
}


function hideCards() {
  console.log("hide");
  for(let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].classList.remove('open','show');
  }
}



function setMoves() {
  movesCounter.textContent = moves;
}



function startGame() {
 for(let i = 0; i < cards.length; i++) {
   shuffledCards[i].addEventListener('click', flipCardUp);
 }
}



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



   
   function isMatch(prev,curr) {
       prev.classList.add('match');
  curr.classList.add('match');
  match++;
   }



   
   function notMatch(prev,curr) {
       setTimeout(function () {
    prev.classList.add('shake');
    curr.classList.add('shake');
    prev.classList.remove('open','show');
          curr.classList.remove('open','show');
  }, 300);
   }



function incrementMoves() {
  moves++;
  setMoves();
}



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



function addToOpenCards(c) {
 openCards.push(c);
}



function showCard(event) {
 event.target.classList.add('open','show');
}



function startTimer() {
 timer = setInterval(buildTimer,1000);
}



function buildTimer() {
 ++sec;
 min = Math.floor(sec / 60);
 sec = Math.floor(sec % 60);
 timerText = pad(min) + ":" +
 pad(sec);
 timeCounter.innerHTML = timerText;
}



function pad(value) {
 var string = value + "";
 if(string.length < 2) {
   return "0" + string;
 }
 else return string;
}



function stopTimer() {
  clearInterval(timer);
  sec = 0;
  min = 0;
  timerText = '';
}



function buildModalMsg() {
  modalMsg = "<p>You made " + moves + " moves in " + min + " minutes " + sec + " seconds!</p>" + "<p>You Received " + starCount + " star</p>";
}



function buildModal() {
  statMsg.innerHTML = '';
  statMsg.innerHTML = modalMsg ;
}



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



function runClick() {
  document.querySelector('#ok').onclick= hideModal;

  document.querySelector('#play-again').onclick= resetGame;

}



function hideModal() {
  modal.style.display = 'none';
}



 function resetModalStat() {
   statMsg.innerHTML = '';
 }


function endGame() {
  buildModalMsg();
  stopTimer();
  showModal();
}



function resetGame() {
  hideModal();
  resetStaring();
  setDeck();
  reInit();
}



function reInit() {
  movesCounter.innerHTML = '';
  timeCounter.innerHTML = '';
  moves = 0;
  match = 0;
  timerDelay = 0;
}



function resetStaring() {
  starCount = 3;
  for(let i = 1; i < stars.length; i++) {
    if(stars[i].classList.contains('zoomOut')) {
      stars[i].classList.remove('zoomOut');
    }
  }
}



function restartGame() {
  stopTimer();
  resetModalStat();
  resetStaring();
  reInit();
  setDeck();
}



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
