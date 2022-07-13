// given a board, find the best move for current player

// board[i][j]: 1 , 0, -1
// 0: unoccupied

const dr = [1,1,1,-1,-1,-1,0,0];
const dc = [1,-1,0,1,-1,0,1,-1];
const inf = Math.floor(1e9);

function bound(r, c, n) {
    if(r<0||c<0||r>n-1||c>n-1) {
        return false;
    }
    return true;
}

function print(row) {
    res = "";
    for(let i=0;i<row.length;i++) {
        if(row[i]!=-1) {
            res+=" ";
        }
        res+=row[i];
        res+="  ";
    }
    console.log(res);
}

function makeMove(board, move, turn) {
    let n=board.length, r=move[0], c=move[1];
    for(let d=0;d<8;d++) {
        // empty opp opp opp...opp turn
        let rr=r+dr[d],cc=c+dc[d];
        if(!bound(rr,cc,n)) {
            continue;
        }
        while(true) {
            if(board[rr][cc]==turn) {
                break;
            } else {
                board[rr][cc]=turn;
                rr=rr+dr[d],cc=cc+dc[d];
            }
        }
    }
}

function valid(board, turn) {
    // array of all valid moves
    // turn: 1/-1
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

function randomBoard(n) {
    res=[];
    for(let i=0;i<n;i++) {
        let row=[];
        for(let j=0;j<n;j++) {
            row.push(Math.floor(Math.random()*3)-1);
        }
        res.push(row);
    }
    return res;
}

function bestMove(board, depth, turn) {
    // board: 2d 8 * 8 array
    // depth: int 
    // turn: 0/ 1
    // first get all the valid moves
    let n=board.length;
    if(!depth) {
        let res=0;
        for(let i=0;i<n;i++) {
            for(let j=0;j<n;j++) {
                res+=board[i][j];
            }
        }
        return res*turn;
    }

    let moves = valid(board,turn);
    let eval = -inf;
    for(move in moves) {

    }
}

let b = randomBoard(8);
for(let i=0;i<b.length;i++) {
    print(b[i]);
}
console.log(valid(b,1));