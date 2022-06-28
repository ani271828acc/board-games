let mode
let symbols = ['X','O','$','@','#']
let positionVals = [3, -1, 5, -1, 6, 0, 4, 0, 5]
let filled = []
let disable = true
let currentPlayer=0
let check = 0
let s1
let s2
let t1
let t2

let huPlayer = "P"
let aiPlayer = "C"

let players = [
    {
        name : "player1",
        type : "human",
        test : "1",
        symbol : 0,
        taken : [],
        makeMove : function () {
            
        }
    },
    {
        name : "player2",
        type : "human",
        test : "2",
        symbol : 1,
        taken : [],
        makeMove : function () {
            
        }
    },
]

window.onload = function () {
    makeGrid()
    updateS1()
    updateS2()
    updateT1()
    updateT2()
}

function makeGrid() {
    for(let i=0;i<9;i++) {
        let cell = document.createElement("span");
        cell.id = i+1
        cell.classList.add("cell")
        cell.addEventListener("click",function () {
            if(!disable) {
                fillCell(this.id)
                players[currentPlayer].taken.push(parseInt(this.id));
                filled.push(parseInt(this.id))
                console.log(filled)
                console.log(players[currentPlayer].taken);
                if(checkWin()) {
                    console.log("player " + (currentPlayer+1) + " wins");
                    alert("player " + (currentPlayer+1) + " wins")
                    disable = true
                }

                else if(complete()) {
                    alert("It's a draw")
                    disable = true
                }
                let opp = currentPlayer

                if(currentPlayer == 0) {
                    currentPlayer = 1
                }
                else if(currentPlayer == 1) {
                    currentPlayer = 0
                }

                let board = [0,1,2,3,4,5,6,7,8]
                for(let i=0;i<players[currentPlayer].taken.length;i++) {
                    board[players[currentPlayer].taken[i]-1] = "C"
                }
                for(let i=0;i<players[opp].taken.length;i++) {
                    board[players[opp].taken[i]-1] = "P"
                }
                
                let bestMove = minimax(board,aiPlayer,0)

                if(players[currentPlayer].type == "noobBot") {
                    noobBot()
                } else if(players[currentPlayer].type == "godBot") {
                    let idx = bestMove.index
                    id(idx+1).click()
                }
            }
        });
        id("grid").appendChild(cell)
    }
}

function start() {
    destroy()
    updateS1();
    updateS2();
    updateT1();
    updateT2();
    if(id("selectT1").value=="human" && id("selectT2").value == "human") {
        console.log("twoplayer")
        twoPlayer()
    }
    else if(id("selectT1").value == "human" || id("selectT2").value == "human") {
        console.log("oneplayer")
        onePlayer()
    }
    else {
        console.log("zeroplayer")
        zeroPlayer()
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function twoPlayer() {
    disable = false
}

function onePlayer() {
    disable = false
    if(players[0].type == "noobBot") {
        noobBot()
    } else if(players[0].type == "godBot") {
        godBot()
    }
}

function zeroPlayer() {
    console.log("zeroP")
    disable = false
    noobBot()
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function noobBot() {
    let r = parseInt(Math.random()*9) + 1;
    while(filled.includes(r)) {
        r = parseInt(Math.random()*9) + 1;
    }
    console.log(r);
    id(r).click();
}

function godBot() {
    let moves = [1,3,5,7,9]
    let move = parseInt(Math.random()*5)
    id(moves[move]).click()
}

function fillCell(x) {
    let y = parseInt(x);
    let old_element = id(y);
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    if(players[currentPlayer].symbol == 0) {
        id(y).style.backgroundImage = "url('./images/X.png')";
    }
    if(players[currentPlayer].symbol == 1) {
        id(y).style.backgroundImage = "url('./images/O.png')";
    }
    if(players[currentPlayer].symbol == 2) {
        id(y).style.backgroundImage = "url('./images/K.png')";
    }
    if(players[currentPlayer].symbol == 3) {
        id(y).style.backgroundImage = "url('./images/I.png')";
    }
    if(players[currentPlayer].symbol == 4) {
        id(y).style.backgroundImage = "url('./images/M.png')";
    }
}


function minimax(reboard, player, depth) {

    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
      return {
        score: -100 + depth
      };
    } else if (winning(reboard, aiPlayer)) {
      return {
        score: 100 - depth
      };
    } else if (array.length === 0) {
      return {
        score: 0 - player==aiPlayer?depth:- depth
      };
    }
  
    var moves = [];
    for (var i = 0; i < array.length; i++) {
      var move = {};
      move.index = reboard[array[i]];
      reboard[array[i]] = player;
  
      if (player == aiPlayer) {
        var g = minimax(reboard, huPlayer, depth+1);
        move.score = g.score
      } else {
        var g = minimax(reboard, aiPlayer, depth+1);
        move.score = g.score
      }
      reboard[array[i]] = move.index;
      moves.push(move);
    }
  
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score + positionVals[moves[i].index]> bestScore) {
          bestScore = moves[i].score + positionVals[moves[i].index]
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score + positionVals[moves[i].index]< bestScore) {
          bestScore = moves[i].score + positionVals[moves[i].index]
          bestMove = i
        }
      }
    }
    if(bestScore < 0 && bestScore > -10 && reboard[4]==0) {
        return {
            index: 4,
            score: 0
        }
    }
    return moves[bestMove];
  }
  
  //available spots
  function avail(reboard) {
    return reboard.filter(s => s != "P" && s != "C");
  }
  
  // winning combinations
  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }


function movesLeft(board) {
    if(board.length == 9) {
        return false;
    }
    return true;
}



////////////////////////////////////////////////////////////////////////////////////////////

function id(id) {
    return document.getElementById(id);
}

function checkWin() {
    let ar = players[currentPlayer].taken;
    let win = false;
    if(ar.includes(1)&&ar.includes(2)&&ar.includes(3)) {
        win = true;
    }
    if(ar.includes(4)&&ar.includes(5)&&ar.includes(6)) {
        win = true;
    }
    if(ar.includes(7)&&ar.includes(8)&&ar.includes(9)) {
        win = true;
    }
    if(ar.includes(1)&&ar.includes(4)&&ar.includes(7)) {
        win = true;
    }
    if(ar.includes(2)&&ar.includes(5)&&ar.includes(8)) {
        win = true;
    }
    if(ar.includes(3)&&ar.includes(6)&&ar.includes(9)) {
        win = true;
    }
    if(ar.includes(1)&&ar.includes(5)&&ar.includes(9)) {
        win = true;
    }
    if(ar.includes(3)&&ar.includes(5)&&ar.includes(7)) {
        win = true;
    }

    return win;
}

function destroy() {
    for(let i=1;i<=9;i++) {
        if(id(i)) {
            let old_element = id(i);
            let new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
            id(i).style.background = 'none';
            let cell = id(i);
            cell.remove();
        }
    }
    makeGrid();
    // updateS1();
    // updateS2();
    // updateT1();
    // updateT2();
    players[0].taken = [];
    players[1].taken = [];
    filled = [];
    currentPlayer = 0;
    disable = true;
}

function complete() {
    if(filled.length == 9) {
        return true;
    }
    return false;
}




function qs(query) {
    return document.querySelector(query);
}

function updateS1() {
    destroy()
    if(id("selectS1").value && id("selectS1").value!=id("selectS2").value) {
        players[0].symbol = parseInt(id("selectS1").value);
    }
    id("selectS1").value = players[0].symbol;
    
    console.log(symbols[players[0].symbol]);
}

function updateS2() {
    destroy()
    if(id("selectS2").value && id("selectS1").value!=id("selectS2").value) {
        players[1].symbol = parseInt(id("selectS2").value);
    }
    id("selectS2").value = players[1].symbol;
    
    console.log(symbols[players[1].symbol]);
}

function updateT1() {
    destroy()
    if(id("selectT1").value) {
        players[0].type = id("selectT1").value;
    }
    id("selectT1").value = players[0].type;
    console.log(players[0].type);
}

function updateT2() {
    destroy()
    if(id("selectT2").value) {
        players[1].type = id("selectT2").value;
    }
    id("selectT2").value = players[1].type;
    console.log(players[1].type);
}






































////////////////////////NAVIGATION/////////////////////////////////////////////////////
function Nav() {
    if(!check) {
        check=1;
        document.getElementById("settings").style.width="350px";
    } 

    else {    
        check=0;
        document.getElementById("settings").style.width="0px";
    }
}