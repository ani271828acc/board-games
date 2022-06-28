let found,ans,rct,cct,sct,diff;
const LEVEL= [27, 35, 43, 51, 60, 75];

function solve(g,r,c) {
    if(found)
        return;
    if(r==g.length) {
        for(let i=0;i<9;i++) 
            for(let j=0;j<9;j++)
                ans[i][j]=g[i][j];
        found=true;
        return;
    }
    diff++;
    let cc=(c==g.length-1?0:c+1);
    let rr=(c==g.length-1?r+1:r);
    if(g[r][c]!=0) {
		solve(g,rr,cc); return;
    }
    let dig=randomPerm(9);

	for(let i=0;i<9;i++) {
        let d=dig[i];
        let s = Math.floor(r/3) + 3*Math.floor(c/3);
		if(rct[r][d]>0||cct[c][d]>0||sct[s][d]>0)
			continue;
		rct[r][d]++; cct[c][d]++; sct[s][d]++;
		g[r][c]=d+1;
		solve(g,rr,cc);
		rct[r][d]--; cct[c][d]--; sct[s][d]--;
		g[r][c]=0;
	}
}

function solveSudoku(g) {
    found=false, diff=0;
    ans=emptBoard(9,9,0);
    rct=emptBoard(9,9,0);
    cct=emptBoard(9,9,0);
    sct=emptBoard(9,9,0);
	for(let r=0;r<9;r++) {
		for(let c=0;c<9;c++) {
			if(g[r][c]==0) 
				continue;
			let d=g[r][c]-1;
            let s = Math.floor(r/3) + 3*Math.floor(c/3);
			rct[r][d]++; cct[c][d]++; sct[s][d]++;
		}
	}
    solve(g,0,0);
    return ans;
}

function getBoard() {
    let g=emptBoard(9,9,0);  
    return solveSudoku(g); 
}

function emptBoard(n,m,val) {
    let res=[];
    for(let i=0;i<n;i++) {
        res.push([]);
        for(let j=0;j<m;j++) 
            res[i].push(val);
    }
    return res;
}

function randomPerm(n) {
    let res=[];
    for(let i=0;i<n;i++) 
        res.push(i);
    shuffke(res);
    return res;
}

function shuffke(ar) {
    let n=ar.length;
    for(let i=n-1;i>=0;i--) {
        let ii=Math.floor(Math.random()*i);
        let t=ar[i]; ar[i]=ar[ii]; ar[ii]=t;
    }
}

function generate(difficulty) {
    let g=getBoard();
    let res=[];
    for(let i=0;i<9;i++) {
        for(let j=0;j<9;j++) {
            res[9*i+j]=1;
        }
    }
    for(let i=0;i<LEVEL[difficulty];i++) {
        res[i]=0;
    }

    shuffke(res);
    let res_="",sol_="";
    for(let i=0;i<9;i++) {
        for(let j=0;j<9;j++) {
            if(res[i*9+j]==0) {
                res_+='.';
            } else {
                res_+=g[i][j];
            }
            sol_+=g[i][j];
        }
    }
    console.log(res);
    // console.log(sol_);
    return [res_,sol_];
}

console.log(generate(0));
console.log(diff);


export { generate };