const readline = require("readline-sync");

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SCORE = 1;
const WINNING_FORMATIONS = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];
const WHO_STARTS = "computer"; // can be changed to "choose" to let user choose or to "computer"

const scoreKeeper = {
  playerScore: 0,
  computerScore: 0
}
function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board) {

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

// set initial board markers to empty string
function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}
initializeBoard()

//Identify all empty squares for player to choose
function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}

// Ouput remaining player choices as string
function joinOr (array, delimeter = ", ", word = "or") {
  let output = "";
  if (array.length === 0) return output;
  
  if (array.length === 1) {
    output = String(array[0]);
  }
  else if (array.length === 2) {
    output = String(array[0]) + " " + word + " " + String(array[1])
  }
  else {
    for(let idx = 0; idx < array.length -1; idx++) {
      output += String(array[idx]) + delimeter 
    }
    output += word + " " + String(array[array.length -1])
  }
  
  return output;
  }
 
function userChoosesStarter(){
  let starter = "";

  while (true){
  prompt("Who should start? Type '1' for yourself and '2' for computer")
  answer = readline.question();
  if(answer === '1') starter = "player" 
  break;
  if (answer === '2') starter = "computer"  
  break;

  prompt("Sorry, that's not a valid choice.");
  }
  return starter;
}  

function defineStarter(currentSetting) {
  let starter = ""

  if(currentSetting === "choose") {
    starter = userChoosesStarter();
  } else {
    starter = WHO_STARTS;
  }
  
  return starter;
}
function playerChoosesSquare(board) {
  let square;

  while (true) {
   prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

// plays until someone wins one game
function playRound(board, starter) {
  if(starter === "player"){
    while(true) {
      displayBoard(board);
      playerChoosesSquare(board);
      if(someoneWon(board) || boardFull(board)) break;
  
      computerChoosesSquare(board);
      if(someoneWon(board) || boardFull(board)) break;
  }
  } else {
    while(true) {
      computerChoosesSquare(board);
      displayBoard(board);
      if(someoneWon(board) || boardFull(board)) break;

      
      playerChoosesSquare(board);
      if(someoneWon(board) || boardFull(board)) break;
  }
  }
}

// computer chooses including defense and attack mechanism 
function computerChoosesSquare(board) {
  
  let defenseNeeded = defendSquare(board);
  let attackNeeded = attackSquare(board);
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];

  if(attackNeeded) {
    board[attackNeeded] = COMPUTER_MARKER;
  } else if(defenseNeeded) {
    board[defenseNeeded] = COMPUTER_MARKER;
  } else if (board[5] === " ") {
    board[5] = COMPUTER_MARKER;
  } else {
    board[square] = COMPUTER_MARKER;
  }
} 


function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return detectWinner(board);
}
 
// adjusting match score after each game
function winnerGetsPoint(board) {
  switch(detectWinner(board)) {
    case 'Player':
      scoreKeeper[`playerScore`] += 1
      prompt(`You won! Your score is ${scoreKeeper[`playerScore`]}. Computers score is ${scoreKeeper[`computerScore`]}.`);
      break;
    case 'Computer':
      scoreKeeper[`computerScore`] += 1
      prompt(`You lost! Your score is ${scoreKeeper[`playerScore`]}. Computers score is ${scoreKeeper[`computerScore`]}.`);
      break;
    default:
      prompt("It's a tie!"); 
  }
}

// identifying square that computer needs to defend 
function defendSquare(board) {
 
  let squareToDefend = 0;
  
  WINNING_FORMATIONS.forEach(formation => {
    let currentFormation = board[String(formation[0])] + board[String(formation[1])] + board[String(formation[2])];
  
    switch (currentFormation) {
    case ' XX':
      squareToDefend = formation[0];
      break;
    case 'X X':
      squareToDefend = formation[1];
      break;
    case 'XX ':
      squareToDefend = formation[2];
      break;
  } } )
  return squareToDefend;
  }

  // identifying square that computer needs to attack
  function attackSquare(board) {
 
    let squareToAttack = 0;
    
    WINNING_FORMATIONS.forEach(formation => {
      let currentFormation = board[String(formation[0])] + board[String(formation[1])] + board[String(formation[2])];
    
      switch (currentFormation) {
      case ' OO':
        squareToAttack = formation[0];
        break;
      case 'O O':
        squareToAttack = formation[1];
        break;
      case 'OO ':
        squareToAttack = formation[2];
        break;
    } } )
    return squareToAttack;
    }

function detectWinner(board) {

  for (let line = 0; line < WINNING_FORMATIONS.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_FORMATIONS[line];

    if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function playAgain(){
  let answer;
while(true){
  prompt('Play again? Enter Y or N');
  answer = readline.question().toLowerCase()[0];
  if (['y', 'n'].includes(answer)) break;
  prompt('This was not a valid entry. Please try again.')
}
return answer;
}

while (true) {
 console.clear();
 scoreKeeper[`playerScore`] = 0;
 scoreKeeper[`computerScore`] = 0;
 let starter = defineStarter(WHO_STARTS)

  while(true) {

  let board = initializeBoard();

  playRound(board, starter);

  displayBoard(board);
  winnerGetsPoint(board);

if(scoreKeeper[`computerScore`] === WINNING_SCORE){
  prompt ('You lost this match :('); break;
} 
if(scoreKeeper[`playerScore`] === WINNING_SCORE) {
  prompt ('You won the entire match, well done!'); break;
}
  }

let playerDecision = playAgain();
if (playerDecision === 'n') break;
}

prompt('Thanks for playing Tic Tac Toe!')








