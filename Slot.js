//1.Deposit Money
//2.Determine what line you're betting on
//3.Collect a bet amount
//4.Spin the slot machine
//5. Check if user won
//6. give the user winnings
//7. play again

const prompt = require("prompt-sync")();//Insert node.js package for user input

const ROWS = 3;
const COLS = 3;

//Represents each slot
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};

//Multiplier for each symbol
const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
};


const deposit = () => { // function to establish the balance
    while(true){
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
    
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid amount, try again.");
    } else {
        return numberDepositAmount;
    }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numLines = parseFloat(lines);
        
        if(isNaN(numLines) || numLines <= 0 || numLines > 3){
            console.log("Invalid amount, try again.");
        } else {
            return numLines;
        }
        }
}

const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numBet = parseFloat(bet);
        
        if(isNaN(numBet) || numBet <= 0 || numBet > balance / lines){
            console.log("Invalid bet, try again.");
        } else {
            return numBet;
        }
        }
}

const spin = () => { //cycle through the random symbols to simulate each slot
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = []; 
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
           const randomIndex = Math.floor(Math.random() * reelSymbols.length); //picks random index - 1 of the symbols var 
           const selected = reelSymbols[randomIndex]; //select element from reelssymbols array
           reels[i].push(selected); //adds 
           reelSymbols.splice(randomIndex, 1); //removes one random element so it is not selected again
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
};

const printRows = (rows) => { //formatting rows into styled format
    for (const row of rows){
        let rowString = "";
        for(const [i, symbol] of rows.entries()){ //loop through the elements that exist in the row
            rowString += symbol;
            if(i != rows.length - 1){
                rowString += " | ";
            }
    
        }
        console.log(rowString)
    }

};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let match = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                match = false;
                break;
            }
        }
        if (match){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {

    let balance = deposit();
    while(true){
    console.log("You have a balance of $" + balance);
    const numLines = getNumberOfLines();
    const bet = getBet(balance, numLines);
    balance -= bet * numLines
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0 ){
        console.log("Ran out of money.")
        break;
    }

    const playagain = prompt("Do you wnat to play again (y/n)? ");
    if (playagain != 'y') break;
  }
};

game();