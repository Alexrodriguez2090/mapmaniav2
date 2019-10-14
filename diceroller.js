function rollDice() {
    document.getElementById("dice1").innerHTML = Math.floor(Math.random()*6) + 1;
    document.getElementById("dice2").innerHTML = Math.floor(Math.random()*6) + 1;
}