const dr = [1,1,1,-1,-1,-1,0,0];
const dc = [1,-1,0,1,-1,0,1,-1];
const inf = Math.floor(1e9);
// const assert=require("assert");

let isBot=1, botTurn=-1;

function start(board) {
    let turn=1,n=board.length,disabled=0;
    display(board,turn);
    // add click listeners to all cells
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            let cell=id(i,j,n);
            cell.addEventListener("click", function clickEvent() {
                if(disabled||board[i][j]!=0) 
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

                disabled=isBot;
                let bb=copyBoard(board);
                let bM=minMax(bb,turn,4);
                console.log("best move is: ", bM);
                if(turn == botTurn && bM[1]!=-1)
                    id(bM[1],bM[2],n).classList.add("bestMove");
                setTimeout(function(){
                    disabled=0;
                    id(bM[1],bM[2],n).classList.remove("bestMove");
                    if(isBot && turn==botTurn && bM[1]!=-1) {
                        id(bM[1],bM[2],n).click();
                    } 
                },2000);
                console.log("evalstatic is: ",evalStatic(board));
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
    if(!res.length)
        return res;
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
    // by this move excluding clicked sqaure
    // console.log(move);
    console.assert(board[move[0]][move[1]]==0, "whywhywgywywhyy");
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
            if(!bound(rr,cc,n) || board[rr][cc]!=turn*-1) {
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
    // console.log(res);
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

function display(board, turn) {
    // console.log(turn);
    let sc_a=0,sc_b=0;
    let n=board.length;
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            sc_a+=board[i][j]>0;
            sc_b+=board[i][j]<0;
            let cell=id(i,j,n);
            cell.classList.remove("candidate");
            if(!board[i][j])
                continue;
            cell.classList.remove("p"+(board[i][j]*-1));
            cell.classList.add("p"+(board[i][j]));
        }
    }
    updateScores(sc_a,sc_b,turn);
    let moves=validMoves(board, turn);
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

function updateScores(score_a, score_b, turn=1) {
    let scorecard=document.getElementById("score");
    scorecard.classList.remove("p"+(turn*-1));
    scorecard.classList.add("p"+(turn));
    scorecard.innerText = score_a + " | " + score_b 
}

function bound(r, c, n) {
    if(r<0||c<0||r>n-1||c>n-1) {
        return false;
    }
    return true;
}

start(generateBoard(8));
// display(randomBoard(8));

// find best move: minmax

function copyBoard(board) {
    let n=board.length;
    let res=emptyBoard(n);
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            res[i][j]=board[i][j];
        }
    }
    return res;
}

function minMax(board, turn, depth) {
    let cb=copyBoard(board);
    // turm 1: maximise, turn=-1: minimise
    // console.log(depth);
    let n=board.length;
    let moves=validMoves(board, turn);
    if(!depth||!moves.length)
        return [evalStatic(board),-1,-1];
    let eval=-inf; let bestMove=[-1,-1];
    for(let i=0;i<moves.length;i++) {
        let move=moves[i];
        // if()
        let changed=makeMove(board,move,turn);
        for(let j=0;j<changed.length;j++) {
            if(board[changed[j][0]][changed[j][1]]==0) {
                throw new Error("bamboo");
            }
            board[changed[j][0]][changed[j][1]]=turn;
        }
        board[move[0]][move[1]]=turn;
        let subtreeScore=minMax(board,turn*-1,depth-1)[0];

        for(let j=0;j<changed.length;j++) {
            board[changed[j][0]][changed[j][1]]=turn*-1;
        }
        board[move[0]][move[1]]=0

        let bad=0;
        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                bad|=cb[i][j]!=board[i][j];
            }
        }
        if(bad) {
            console.error("original board was ", cb);
            console.error("somehow changed to", board);
            console.error("move was ", move,"turn was ",turn);
            console.error("changed was", changed);
            throw new Error("lmao get rekt");
        }
        if(subtreeScore*turn>eval) {
            eval=subtreeScore*turn;
            bestMove=moves[i];
        }
    }

    return [eval*turn,bestMove[0],bestMove[1]];
}

function evalStatic(board) {
    // todo: give more weightage to corners and edges
    let res=0,n=board.length;
    for(let i=0;i<n;i++) {
        for(let j=0;j<n;j++) {
            let w=1;
            if((i==0&&j==0)||(i==0&&j==n-1)||(i==n-1&&j==0)||(i==n-1&&j==n-1)) {
                w=8;
            } else if(i==0||i==n-1||j==0||j==n-1) {
                w=4;
            }
            res+=board[i][j]*w;
        }
    }
    return res;
}