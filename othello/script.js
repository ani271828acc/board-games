generateBoard()
start()

function generateBoard() {
    let score = document.createElement("div")
    score.id = "score"
    document.body.appendChild(score)
    
    let board = document.createElement("table")
    board.id = "board"
    for(let i = 0; i < 8; i++) {
        let row = document.createElement("tr")
        for(let j = 0; j < 8; j++) {
            let cell = document.createElement("td")
            cell.id = i + '' + j
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    document.body.appendChild(board)
    id("33").innerText = "a"
    id("34").innerText = "b"
    id("43").innerText = "b"
    id("44").innerText = "a"
}

function start() {
    let score_a = 2
    let score_b = 2
    updateScores(score_a, score_b)
    let turn = 'a'
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = id(i + '' + j)
            if(check(cell.id, turn).length) {
                cell.style.backgroundColor = "blue"
            }
        }
    }
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = id(i + '' + j)
            cell.addEventListener("click", function clickFunc() {
                if(this.innerText != '') return
                let validSquares = check(this.id, turn)
                let op
                if(turn == 'a') op = 'b'
                else op = 'a'
                //console.log(validSquares)
                if(validSquares.length == 0) {
                   return
                }
                else {
                   for(let i = 0; i < 8; i++) {
                       for(let j = 0; j < 8; j++) {
                           id(i + '' + j).style.backgroundColor = "rgb(66, 66, 66)"
                       }
                   }
                   for(let i = 0; i < validSquares.length; i++) {
                       id(validSquares[i]).innerText = turn
                    }
                    this.innerText = turn
                    if(turn == 'a') {
                        score_a += validSquares.length + 1
                        score_b -= validSquares.length
                    }
                    else {
                        score_b += validSquares.length + 1
                        score_a -= validSquares.length
                    }
                    updateScores(score_a,score_b)
                    //console.log(areThereMoves(turn))
                    if(areThereMoves(op)) turn = op
                    if(!areThereMoves(turn)) endGame(score_a, score_b)
                    for(let i = 0; i < 8; i++) {
                        for(let j = 0; j < 8; j++) {
                            let cell = id(i + '' + j)
                            if(check(cell.id, turn).length) {
                                cell.style.backgroundColor = "blue"
                            }
                        }
                    }
                    // console.log(bestMove(turn, score_a, score_b))
                }
                this.removeEventListener("click", clickFunc)
            })
        }
    }
}

function endGame(score_a, score_b) {
        
}

function areThereMoves(turn) {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let validSquares = check(i + '' + j, turn)
            if(validSquares.length) return true
        }
    }

    return false
}

function updateScores(score_a, score_b) {
    id("score").innerText = score_a + " | " + score_b 
}

function check(iD, turn) {
    let op
    let validSquares = []
    if(id(iD).innerText) return validSquares
    if(turn == "a") {
        op = "b"
    } else {
        op = "a"
    }
    let row = parseInt(iD/10)
    let col = iD%10

    if(id(row+1 + '' + col) && id(row+1 + '' + col).innerText == op) {
        let i = row+1
        let j = col
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i ++
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row-1 + '' + col) && id(row-1 + '' + col).innerText == op) {
        let i = row-1
        let j = col
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i --
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row + '' + (col+1)) && id(row + '' + (col+1)).innerText == op) {
        let i = row
        let j = col+1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            j ++
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row + '' + (col-1)) && id(row + '' + (col-1)).innerText == op) {
        let i = row
        let j = col-1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            j --
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row+1 + '' + (col+1)) && id(row+1 + '' + (col+1)).innerText == op) {
        let i = row+1
        let j = col+1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i ++
            j ++
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row-1 + '' + (col-1)) && id(row-1 + '' + (col-1)).innerText == op) {
        let i = row-1
        let j = col-1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i --
            j --
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row+1 + '' + (col-1)) && id(row+1 + '' + (col-1)).innerText == op) {
        let i = row+1
        let j = col-1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i ++
            j --
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }

    if(id(row-1 + '' + (col+1)) && id(row-1 + '' + (col+1)).innerText == op) {
        let i = row-1
        let j = col+1
        let selected = []
        let possible = false
        while(true) {
            if(!id(i + '' + j) || id(i + '' + j).innerText == '') {
                break
            }
            if(id(i + '' + j).innerText == op) {
                selected.push(i + '' + j)
            }
            if(id(i + '' + j).innerText == turn) {
                possible = true
                break
            }
            i --
            j ++
        }
        if(possible) {
            for(let i = 0; i < selected.length; i++) {
                validSquares.push(selected[i])
            }
        }
    }
    return validSquares
}


function id(params) {
    return document.getElementById(params)
}


//////// MINMAX AI (incomplemte, currently inactive) \\\\\\\\

function bestMove(turn, a, b) {
    let possibleMoves = []
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = id(i + '' + j)
            if(check(cell.id, turn).length) {
                possibleMoves.push(cell.id)
            }
        }
    }
    let best
    let val = -1000000009
    for(let i = 0; i < possibleMoves.length; i++) {
        let cur = minMax(turn, possibleMoves[i], true, 0, a, b)
        if(cur > val) {
            val = cur
            best = possibleMoves[i]
        }
    }
    return best
}

function minMax(turn, move, isMax, depth, a, b) {
    let op
    depth++
    if(turn == 'a') {
        op = 'b'
        a++
    }
    else {
        op = 'a'
        b++
    }
    id(move).innerText = turn

    if((!areThereMoves(turn) && !areThereMoves(op)) || depth > 3) {
        if(isMax) {
            id(move).innerText = ''
            if(turn == 'a') return (a-b)*1000 - depth
            else return (b-a)*1000 - depth
        }
        else {
            id(move).innerText = ''
            if(turn == 'b') return (a-b)*1000 - depth
            else return (b-a)*1000 - depth
        }
    }

    let validMoves = []
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = id(i + '' + j)
            if(check(cell.id, turn).length) {
                validMoves.push(cell.id)
            }
        }
    }
    let val
    if(isMax) val = -1000000009
    else val = 1000000009
    for(let i = 0; i < validMoves.length; i++) {
        if(isMax) {
            cur = minMax(op,validMoves[i],false,depth,a,b)
            if(val > cur) {
                val = cur
            }
        }
        else {
            cur = minMax(op,validMoves[i],true,depth,a,b)
            if(val < cur) {
                val = cur
            }
        }
    }
    id(move).innerText = ''
    return val
}