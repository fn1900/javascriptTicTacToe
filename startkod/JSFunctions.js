"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {
  checkForGameOver() {
    if (
      checkHorizontal() == 1 ||
      checkVertical() == 1 ||
      checkDiagonal() == 1
    ) {
      console.log("spelare1 vann!");
      return 1;
    } else if (
      checkHorizontal() == 2 ||
      checkVertical() == 2 ||
      checkDiagonal() == 2
    ) {
      console.log("spelare2 vann!");
      return 2;
    } else {
      var full = 0;
      for (var i = 0; i < oGameData.gameField.length; i++) {
        if (oGameData.gameField[i] == "X" || oGameData.gameField[i] == "O") {
          full++;
        }
      }

      if (full > 8) {
        console.log("spelet är oavgjort!");
        return 3;
      } else {
        console.log("ingen spelare har vunnit!");
        return 0;
      }
    }
  },

  validateForm() {
    let p1Name = document.getElementById("nick1").value;
    oGameData.nickNamePlayerOne = p1Name;

    let p2Name = document.getElementById("nick2").value;
    oGameData.nickNamePlayerTwo = p2Name;

    let p1Color = document.getElementById("color1").value;
    oGameData.colorPlayerOne = p1Color;

    let p2Color = document.getElementById("color2").value;
    oGameData.colorPlayerTwo = p2Color;

    try {
      if (
        oGameData.nickNamePlayerOne.length < 5 ||
        oGameData.nickNamePlayerTwo.length < 5
      ) {
        console.log("names are too short");
        throw new UserException("names are too short");
      }
      if (oGameData.nickNamePlayerOne == oGameData.nickNamePlayerTwo) {
        console.log("names are equivalent");
        throw new UserException("names are equivalent");
      }
      if (
        oGameData.colorPlayerOne == "white" ||
        oGameData.colorPlayerOne == "black"
      ) {
        console.log("color not allowed for playerone");
        throw new UserException("color not allowed for playerone");
      }
      if (
        oGameData.colorPlayerTwo == "white" ||
        oGameData.colorPlayerTwo == "black"
      ) {
        console.log("color not allowed playertwo");
        throw new UserException("color not allowed playertwo");
      }
      if (oGameData.colorPlayerOne == oGameData.colorPlayerTwo) {
        console.log("players have the same color");
        throw new UserException("players have the same color");
      }
      oGameData.initiateGame();
    } catch {
      var error = document.getElementById("errorMsg");
      error.textContent = "error, exception(s) have been thrown";
    }
  },
};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function () {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  oGameData.gameField = Array("", "", "", "", "", "", "", "", "");

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
  //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
  //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
  //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
  //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

  //Indikerar tecknet som skall användas för spelare ett.
  oGameData.playerOne = "X";

  //Indikerar tecknet som skall användas för spelare två.
  oGameData.playerTwo = "O";

  //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  //Nickname för spelare ett som tilldelas från ett formulärelement,
  oGameData.nickNamePlayerOne = "";

  //Nickname för spelare två som tilldelas från ett formulärelement.
  oGameData.nickNamePlayerTwo = "";

  //Färg för spelare ett som tilldelas från ett formulärelement.
  oGameData.colorPlayerOne = "";

  //Färg för spelare två som tilldelas från ett formulärelement.
  oGameData.colorPlayerTwo = "";

  //"Flagga" som indikerar om användaren klickat för checkboken.
  oGameData.timerEnabled = false;

  //Timerid om användaren har klickat för checkboxen.
  oGameData.timerId = null;
};

oGameData.initiateGame = function () {
  let form = document.getElementById("divInForm");
  form.classList.add("d-none");

  let gameboard = document.getElementById("gameArea");
  gameboard.classList.remove("d-none");

  let error = document.getElementById("errorMsg");
  error.textContent = "";

  let p1Name = document.getElementById("nick1").value;
  oGameData.nickNamePlayerOne = p1Name;

  let p2Name = document.getElementById("nick2").value;
  oGameData.nickNamePlayerTwo = p2Name;

  let p1Color = document.getElementById("color1").value;
  oGameData.colorPlayerOne = p1Color;

  let p2Color = document.getElementById("color2").value;
  oGameData.colorPlayerTwo = p2Color;

  let tds = document.querySelectorAll("td");
  tds.textContent = "";

  let playerChar;
  let playerName;

  let rand = Math.random();
  if (rand < 0.5) {
    console.log("mindre än noll komma fem!");
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
    let h1Text = document.getElementById("jumbotron-text");
    h1Text.innerText =
      "Aktuell spelare är: " +
      oGameData.nickNamePlayerOne +
      "(" +
      oGameData.currentPlayer +
      ")";
  } else if (rand >= 0.5) {
    console.log("mer än noll komma fem!");
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
    let h1Text = document.getElementById("jumbotron-text");
    h1Text.innerText =
      "Aktuell spelare är: " +
      oGameData.nickNamePlayerTwo +
      "(" +
      oGameData.currentPlayer +
      ")";
  }
};

oGameData.executeMove = function(item){

if(item.textContent == "X" || item.textContent == "O"){
  return;
}
let id = item.getAttribute('data-id');
oGameData.gameField[id] = oGameData.currentPlayer;
console.log("gamefield[" + id + "] = " + oGameData.gameField[id]);
if(oGameData.currentPlayer == "X"){
  item.style.backgroundColor = oGameData.colorPlayerOne;
  item.textContent = "X";
  oGameData.currentPlayer = "O";
}
else if(oGameData.currentPlayer == "O"){
  item.style.backgroundColor = oGameData.colorPlayerTwo;
  item.textContent = "O";
  oGameData.currentPlayer = "X";
}


let h1Text = document.getElementById("jumbotron-text");
var currentNickname;
if(oGameData.currentPlayer == "X"){
  currentNickname = oGameData.nickNamePlayerOne;
}
else if(oGameData.currentPlayer == "O"){
  currentNickname = oGameData.nickNamePlayerTwo;
}
h1Text.innerText =
"Aktuell spelare är: " +
currentNickname +
"(" +
oGameData.currentPlayer +
")";

if(oGameData.checkForGameOver() == 1 || oGameData.checkForGameOver() == 2 || oGameData.checkForGameOver() == 3){
  if(oGameData.checkForGameOver() == 1){
    h1Text.innerText = "Vinnare är " + oGameData.nickNamePlayerOne + "(X)! Spela igen?";
  }

  else if(oGameData.checkForGameOver() == 2){
    h1Text.innerText = "Vinnare är " + oGameData.nickNamePlayerTwo + "(O)! Spela igen?";
  }

  else if(oGameData.checkForGameOver() == 3){
    h1Text.innerText = "Spelet är oavgjort! Spela igen?";
  }

  let items = document.querySelectorAll("td");
  for(var i = 0; i < 9; i++){
      items[i].removeEventListener("click", function move(){
          return oGameData.executeMove(event.currentTarget);
      });
      items[i].textContent = "";
      items[i].style.backgroundColor = "";
  }

  let form = document.getElementById("divInForm");
  form.classList.remove("d-none");

  let gameboard = document.getElementById("gameArea");
  gameboard.classList.add("d-none");

  oGameData.initGlobalObject();
}


};

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */

function checkHorizontal() {
  var player1 = 1;
  var player2 = 2;
  var x = 0;
  for (var i = 0; i < 3; i++) {
    if (
      oGameData.gameField[x] == "O" &&
      oGameData.gameField[x + 1] == "O" &&
      oGameData.gameField[x + 2] == "O"
    ) {
      return player2;
    } else if (
      oGameData.gameField[x] == "X" &&
      oGameData.gameField[x + 1] == "X" &&
      oGameData.gameField[x + 2] == "X"
    ) {
      return player1;
    }
    x += 3;
  }
  return null;
}

function checkVertical() {
  var player1 = 1;
  var player2 = 2;
  var x = 0;
  for (var i = 0; i < 3; i++) {
    if (
      oGameData.gameField[x] == "O" &&
      oGameData.gameField[x + 3] == "O" &&
      oGameData.gameField[i + 6] == "O"
    ) {
      return player2;
    }
    if (
      oGameData.gameField[x] == "X" &&
      oGameData.gameField[x + 3] == "X" &&
      oGameData.gameField[i + 6] == "X"
    ) {
      return player1;
    }
    x++;
  }
  return null;
}

function checkDiagonal() {
  var player1 = 1;
  var player2 = 2;
  if (
    oGameData.gameField[0] == "O" &&
    oGameData.gameField[4] == "O" &&
    oGameData.gameField[8] == "O"
  ) {
    return player2;
  } else if (
    oGameData.gameField[0] == "X" &&
    oGameData.gameField[4] == "X" &&
    oGameData.gameField[8] == "X"
  ) {
    return player1;
  }

  if (
    oGameData.gameField[2] == "O" &&
    oGameData.gameField[4] == "O" &&
    oGameData.gameField[6] == "O"
  ) {
    return player2;
  } else if (
    oGameData.gameField[2] == "X" &&
    oGameData.gameField[4] == "X" &&
    oGameData.gameField[6] == "X"
  ) {
    return player1;
  }
  return null;
}
