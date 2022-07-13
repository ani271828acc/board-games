const dr = [1,1,1,-1,-1,-1,0,0];
const dc = [1,-1,0,1,-1,0,1,-1];
const inf = Math.floor(1e9);


function start(board) {
    let sa=2,sb=2,turn=1,n=board.length;
    updateScores(sa,sb);
    display(board,turn);
    // add click listeners to all cells
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            let cell=id(i,j,n);
            cell.addEventListener("click", function clickEvent() {
                if(board[i][j]!=0) 
                    return;
                let changed = makeMove(board,[i,j],turn);
                if(!changed.length)
                    return;
                for(let i=0;i<changed.length;i++) {
                    board[changed[i][0]][changed[i][1]]=turn;
                }
                board[i][j]=turn;
                turn*=-1;
                display(board,turn);
                // console.log(turn);
            });
        }
    }
}

function validMoves(board, turn) {
    let n=board.length, opp=turn*-1;
    let res = [];
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            if(board[i][j]!=turn) {
                continue;
            }
            // we want: turn opp opp opp opp opp.. unoccupied
            for(let d=0;d<8;d++) {
                let ii=i+dr[d], jj=j+dc[d];
                if(!bound(ii,jj,n)||board[ii][jj]!=opp) {
                    continue;
                }
                while(1) {
                    if(!bound(ii,jj,n)||board[ii][jj]==turn) {
                        break;
                    }
                    if(!board[ii][jj]) {
                        res.push(ii + n*jj);
                        break;
                    }
                    ii+=dr[d];
                    jj+=dc[d];
                }
            }
        }
    }
    res.sort();
    uniq=[[res[0]%n, Math.floor(res[0]/n)]];
    for(let i=1;i<res.length;i++) {
        if(res[i]!=res[i-1]) {
            uniq.push([res[i]%n, Math.floor(res[i]/n)]);
        }
    }
    return uniq;
}

function makeMove(board, move, turn) {
    // returns a list of squares that would be changed to turn
    // by this move
    // console.log(move);
    let n=board.length, r=move[0], c=move[1];
    let res=[];
    for(let d=0;d<8;d++) {
        // empty opp opp opp...opp turn
        let rr=r+dr[d],cc=c+dc[d];
        if(!bound(rr,cc,n) || board[rr][cc]!=turn*-1) {
            continue;
        }
        let cur=[];
        while(true) {
            if(!bound(rr,cc,n) || board[rr][cc]==turn) {
                break;
            } else {
                cur.push([rr,cc]);
                rr=rr+dr[d],cc=cc+dc[d];
            }
        }
        if(bound(rr,cc,n)&&board[rr][cc]==turn) {
            for(let i=0;i<cur.length;i++) {
                res.push(cur[i]);
            }
        }
    }
    console.log(res);
    return res;
}

function generateBoard(n) {
    let score = document.createElement("div");
    score.id = "score";
    document.body.appendChild(score);

    let displayBoard = document.createElement("table");
    displayBoard.id = "board";
    for(let i = 0; i < n; i++) {
        let row = document.createElement("tr");
        for(let j = 0; j < n; j++) {
            let cell = document.createElement("td");
            cell.id = 'c'+(i + n*j);
            row.appendChild(cell);
        }
        displayBoard.appendChild(row);
    }
    document.body.appendChild(displayBoard)
    let board=emptyBoard(n);
    for(let i=0;i<2;i++) {
        for(let j=0;j<2;j++) {
            board[n/2-1+i][n/2-1+j]=(i+j)%2?1:-1;
        }
    }
    // display(board);
    return board;
}

// board[i][j]: 1:player0 -1:player1
function display(board, turn) {
    console.log(turn);
    let n=board.length;
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            let cell=id(i,j,n);
            cell.classList.remove("candidate");
            if(!board[i][j])
                continue;
            cell.classList.remove("p"+(board[i][j]*-1));
            cell.classList.add("p"+(board[i][j]));
        }
    }
    let moves=validMoves(board, turn);
    console.log(moves);
    for(let i=0;i<moves.length;i++) {
        let move=moves[i];
        let cell=id(move[0],move[1],n);
        // console.log(move, cell);
        cell.classList.add("candidate");
    }
    // change the display based on board
}

function id(i, j, n) {
    // row: id%n col: id/n
    return document.getElementById('c'+(i + n*j));
}

function emptyBoard(n) {
    res=[];
    for(let i=0;i<n;i++) {
        let row=[];
        for(let i=0;i<n;i++) {
            row.push(0);
        }
        res.push(row);
    }
    return res;
}

function randomBoard(n) {
    res=emptyBoard(n);
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            res[i][j]=(Math.floor(Math.random()*3)-1);
        }
    }
    return res;
}

function updateScores(score_a, score_b) {
    document.getElementById("score").innerText = score_a + " | " + score_b 
}

function bound(r, c, n) {
    if(r<0||c<0||r>n-1||c>n-1) {
        return false;
    }
    return true;
}

start(generateBoard(8));
// display(randomBoard(8));