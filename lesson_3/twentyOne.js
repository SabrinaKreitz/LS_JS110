const readline = require("readline-sync");

const MIN_POINTS_DEALER = 17;
const WINNING_POINTS = 21;
let player;
let dealer;
let deck;

function prompt(message) {
  console.log(`=> ${message}`);
}

function initializeDeck() {
  let suits = ["Spades", "Diamonds", "Clubs", "Heart"];
  let values = ["2", "3", "4","5","6","7","8","9","10","J","Q","K","A"];
  let deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push([suit, value]);
    });
  });
  return deck;
}

function assignInitialCards(deck) {
  let cards = [];
  for (let idx = 0; idx < 2; idx++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    cards.push(deck[randomIndex]);
    deck.splice(deck[randomIndex], 1);
  }
  return cards;
}

function hit(deck) {
  let randomIndex = Math.floor(Math.random() * deck.length);
  let card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card;
}

function busted(cards) {
  return calculateTotal(cards) > WINNING_POINTS;
}

function playersTurn() {
  while (true) {
    prompt("Do you want to hit or stay?");
    let answer = readline.question();

    if (answer === "hit") {
      player.push(hit(deck));
      prompt(`Your current hand is ${player.join(" ")}.`);
      if (busted(player)) break;
    }

    else if (answer === "stay") {
      prompt("You decided to stay!");
      break;
    }
    else {
      prompt("This was not a valid entry. Please try again");
    } 
  }
}
function dealersTurn() {
  while (calculateTotal(dealer) < MIN_POINTS_DEALER) {
    dealer.push(hit(deck));
  }
}

function calculateTotal(cards) {
  let values = cards.map((card) => card[1]);

  let sum = 0;
  values.forEach((value) => {
    if (value === "A") {
      sum += 11;
    } else if (["J", "Q", "K"].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  values
    .filter((value) => value === "A")
    .forEach((_) => {
      if (sum > WINNING_POINTS) sum -= 10;
    });

  return sum;
}

function declareWinner() {
  let playersTotal = calculateTotal(player);
  let dealersTotal = calculateTotal(dealer);

  if (playersTotal > dealersTotal) {
    prompt(
      `You have ${playersTotal} points. The dealer has ${dealersTotal} points. You won!`
    );
  } else if (playersTotal < dealersTotal) {
    prompt(
      `You have ${playersTotal} points. The dealer has ${dealersTotal} points. You lost!`
    );
  } else {
    prompt(`You both have ${playersTotal} points. It's a tie!`);
  }
}

while (true) {
  prompt("Welcome to twenty-one. Let us play!");
  deck = initializeDeck();

  player = assignInitialCards(deck);
  prompt(`Your current hand is ${player.join(" ")}`);
  dealer = assignInitialCards(deck);
  prompt(`The dealers card is ${dealer[0].join(" ")}`);

  while (true) {
    playersTurn();
    if (busted(player)) {
      prompt("You got busted and lost!");
      break;
    }

    dealersTurn();
    if (busted(dealer)) {
      prompt("The dealer got busted and you won!");
      break;
    }

    declareWinner();
    break;
  }

  prompt("Do you want to play again? Hit n to exit the game or any other key to continue.");
  let answer = readline.question().toLowerCase();
  if (answer === "n") break;
}
