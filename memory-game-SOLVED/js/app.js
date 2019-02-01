



  




//Load javascirpt when page after loading 
window.onload = function() {


//VARIABLES
let starNo =2; // number of stars on the page - index (0-2)
let openCards= []; // list of opened cards
let solvedCards = []; // list of matched cards
let movesCounter = 0; // number of moved player made ( decremnting the stars based on moves counter )
const Cards =   document.querySelectorAll('.card'); // cards 
const SHCards =   document.querySelectorAll('.shuffle'); // for shuffling - 
let CardsClass = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',  'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle' , 'fa-bicycle', 'fa-bomb' , 'fa-bomb'] ; // classes to add to cards 
const Desks = document.querySelectorAll('.desk'); 
const Stars = document.querySelectorAll('.fa-star'); 
let moves = document.querySelector('.moves'); // moves
moves.innerHTML = 0; // set number of the moves to zero 
const Reset = document.querySelector('.restart'); 
let matchedCounter=0;


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

document.body.onload = start(); 
// go to the function first thing after page load

function start(){

    
 //shuffle the classes
     CardsClass = shuffle(CardsClass);   
 //assign class to each card after shuffling   
     for(let i=0 ; i<Cards.length; i++){
     	SHCards[i].classList.add(CardsClass[i]);
      }

   
 }



//Reset all variable and list



	Reset.addEventListener('click', function (event) {

     
	for (let solved of solvedCards){
       solved.classList.remove('open','show','match');

	}
	for (let opened of openCards){
       opened.classList.remove('open','show');

	}
    moves.textContent = 0;	
    movesCounter = 0; 
    solvedCards = [];
    sec=0;
    setInterval(timer);
    openCards = [];
	Stars.forEach(function(star){
	star.style.visibility="visible";
	for(let i=0 ; i<Cards.length; i++){
     	SHCards[i].classList.remove(CardsClass[i]);
      }
	start();

  


        
})


})
 var click=0;
//Card Click 


function clickedCard(event){


}
Cards.forEach(function(card){
	card.addEventListener('click', function (event) {
	// with each click increment moves and open the card	
	moves.textContent++;
	card.style.pointerEvents="none"
    openingCard(card);

         
})
})



// Remove star
 function removeStar(){
 	if(document.querySelector('.fa-star') && starNo != -1){
	   Stars[starNo].style.visibility = 'hidden';
       movesCounter=0;
	   starNo--;
       
	}

 }


// flipped the card
function openingCard(card){

// add open and show classes to the card
    card.classList.add('open','show');
    openCards.push(card);
   
   // compare if the number of card flipped equal 2
    if(openCards.length === 2 ){ 
       
        checkCards(openCards);   
        // after checking empty the list of flipped card
        openCards = [];   
  


}
}


//Check the flipped card if they are the same. 
function checkCards(openCards){

    
	if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
		correctCards(openCards);

	}
	else{
	   // set time of 1 sec before flipping out the card 
	    setTimeout(function()
    {
    wrongCards(openCards)
	},1000);
       
	}
}


function correctCards(openCards){
	// add match class to the equals cards
	openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	// add the card to list of matched cards
	solvedCards.push(...openCards);
    matchedCounter++;
    Congratulation();
    clearInterval ( timer );
   


  
 	if(matchedCounter===8){
	end(); 
	setTimeout(function()
    {
    clearInterval ( timer );
	  Congratulation()},1000);

       
	}

}
	

//

 function wrongCards(openCards){

// if wrong increment the moveCounter, if right it does not increment
    movesCounter++;


// One star removed for 2 wronged moves
       if(movesCounter%5 ===0 &&  movesCounter>0){

        console.log("remove!")
    	removeStar();
    }
 // flipped out the card
	openCards[0].classList.remove('open','show');
    openCards[1].classList.remove('open','show');
    openCards[0].style.pointerEvents="auto";
    openCards[1].style.pointerEvents="auto";

	}


// Timer function from https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    var timer = setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);

            

function Congratulation() {
  var txt;
   starNo++;


	    swal({
      title: "Congratulation!!",
	  text: "You solved it. \n you have "+starNo+" stars. \n In "+ document.getElementById("minutes").innerHTML +":" +document.getElementById("seconds").innerHTML+" seconds.", 
  	  type: "success",
  	   confirmButtonText: 'Reset',
      showCancelButton: true
    }, function() {
      location.reload();
      
    });
  }

}    
