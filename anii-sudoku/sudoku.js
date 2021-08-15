
// DATABASE OF PUZZLES (randomly select from these and then shuffle it keepimg the uniqueness intact)
let easy = [
    "....98.1.2..5..3...4....9..1...52...7.84.....329.1.......7....59...31.2.....4....",
    "..814.....2............7.15..5......7..3.2...93.851.....74...9.21.5.8....8..13..4",
    "..........8..........5.9.6819...4.86.6..1.5..2.4....39.......24..3481.5.6....3...",
    "...65...8.......57..21..4.......4.8....72........31..5.2.3...4..17.6..3.4.62..1..",
    ".3.....21.5..7.6.372..6.......72....3......8.............5....2..461.3.5..54.3.17",
  ];

  let easySol = [
    "576398412291574368843126957164952873758463291329817546412789635985631724637245189",
    "578149632123685947496237815865974321741362589932851476357426198214598763689713254",
    "439678215586142973712539468195324786368917542274865139851796324923481657647253891",
    "374652918681943257592178463263594781158726394749831625925317846817469532436285179",
    "436859721958271643721364958589726134317945286642138579193587462874612395265493817",
  ];

  let mid = [
    ".5.8..7............7..2.98474.1..5.8....7..6.1......2....689.....4..125.9...4....",
    ".6..59.3.....4...15....1.....1..4..3..8.1...5....3..9.....8.42.64...2.1.......6..",
    ".......3.576..28.....58.......8....7.549..3..8..7.3.69..7......3.8..762.4..6.....",
    "45.17..2.8.....176............8....7........5...2.4...1.37.8..26..32...1..4..6.3.",
    "..7.92...4..3.8..631....9....62...8......1.........7..8.....3..12.8.....9.46..1..",
  ];

  let midSol = [
    "459816732238497615671325984742163598395278461186954327527689143864731259913542876",
    "164759832293648571587321946951264783438917265726835194375186429649572318812493657",
    "281479536576312894943586271639824157754961382812753469167235948398147625425698713",
    "456173928832495176917682354529831647348967215761254893193748562675329481284516739",
    "657192834492378516318564927736259481549781263281436795865917342123845679974623158",
  ];

  let hard = [
    "......26.........5745.6.....3....5.46.......7....9...15.197...24...261...7.1.3...",
    ".6.54...3.9.2.15...3........1....2....3...8.9....9...4....1..86..56..9.......8.2.",
    ".8.2.....5........369.57...2..5...7....3..8.6...1....5.2..983..1...3...7..5.1....",
    "..42.98.7..8..3..91......3.....729....7..8..1..........4.9.......53.4.1837....5..",
    "18.4.6.2....3..5..4....76..8......5....8.....2.6.7.84........1...4..3....7.128...",
  ];

  let hardSol = [
    "318754269926831745745269813137682594689415327254397681561978432493526178872143956",
    "268547193794231568531869742619483257423756819857192634972315486385624971146978325",
    "784261539512943768369857412296584173451379826873126945627498351148635297935712684",
    "634219857758643129129785436516472983297538641483196275841957362965324718372861594",
    "183456927967312584452987631841239756735864192296571843628745319514693278379128465"
  ];


// SHUFFLE
// take a boardString and shuffle it without affecting it's validity

function shuffle(string, solution) {
    let s = [string, solution];
    console.log(typeof(s[0]));
    let str1 = ""; let str2 = "";
    let ans = [str1,str2];
    console.log(typeof(ans[0]));
    let rowShuffles = Math.floor(Math.random()*10) + 1;
    let colShuffles = Math.floor(Math.random()*10) + 1;
    let rotations = Math.floor(Math.random()*8) + 1;

    // rotate numbers 1 to 9
    for(let i=0;i<2;i++) {
        for(let j=0;j<81;j++) {
           if(s[i][j]!='.') {
               if(parseInt(s[i][j])+rotations > 9) {
                let k = parseInt(s[i][j])+rotations-9;
                ans[i]=ans[i]+''+k;
               } else {
                let k = parseInt(s[i][j])+rotations;
                ans[i]=ans[i]+''+k;
               }
           } else {
               ans[i]=ans[i]+".";
           }
        }
    }  

    // shuffle rows clockwise and randomly break it
    for(let i=0;i<rowShuffles;i++) {
        ans[0] = "" + ans[0].slice(54,81) + ans[0].slice(0,27) + ans[0].slice(27,54);
        ans[1] = "" + ans[1].slice(54,81) + ans[1].slice(0,27) + ans[1].slice(27,54);
        if(Math.floor(Math.random()*2)==1) {
            ans[0] = "" +  ans[0].slice(0,27) + ans[0].slice(54,81) + ans[0].slice(27,54);
            ans[1] = "" +  ans[1].slice(0,27) + ans[1].slice(54,81) + ans[1].slice(27,54);
        }  
    } 
    console.log(ans);
    return ans;
}

/*************************************************************************************************************************** */
let check = 0;
let puzzle;
let solution;
let spaceCount = 0;
let disable;
let time = 180;
let lives = 10;
let currentLives;
let currentTime;
let selectedNum;
let selectedCell;
let timer;

window.onload = function() {
    initialSetup();
    updateLevel();
    updateLives();
    updateTime();
    disable = true;
}
function initialSetup() {
    // generate empty board and keypad
    for(let i =0;i < 81; i++) {
        let cell = document.createElement("span");
        cell.classList.add("cell");
        if(parseInt(i/9)==2 || parseInt(i/9)==5) {
            cell.classList.add("btm");
        }
        if((i+1)%9==3 || (i+1)%9==6) {
            cell.classList.add("rt");
        }
        cell.id=i;
        id("board").appendChild(cell);
        if((i+1)%9==0) {
            let brk = document.createElement("br");
            id("board").appendChild(brk);
        }
    }


    // keypad with disabled selecting
    for(let i=1;i<=9;i++)
    {
        let cell = document.createElement("span");
        cell.classList.add("cell");
        cell.textContent=i;
        cell.id=-i;
        cell.addEventListener("click",keypadEvent);
        id("keypad").appendChild(cell);
    }
}


/*********************************************** */
function startGame() {
    destroy();
    updateLevel();
    updateLives();
    currentTime = time;
    currentlives = lives;
    disable=false;
    spaceCount = 0;
    console.log(puzzle);
    for(let i=0;i<81;i++) {
        if(puzzle[i]!='.'){
            id(i).innerText = puzzle[i];
        }
        else {
            console.log("***" + i + "***");
            spaceCount++;
            id(i).addEventListener("click", function () {
                if(!disable) {
                    if(this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        selectedCell = null;
                    }
                    else {
                        for(let j=0;j<81;j++) {
                            id(j).classList.remove("selected");
                        }
                        this.classList.add("selected");
                        selectedCell = parseInt(this.id);
                        updateMove();
                    }
                }
            })
        }
    }
    startTimer();
}

/*************************************************************************************************** */

function startTimer() {
    timer = setInterval(function () {
        currentTime--;
        if(currentTime==0) {
            endGame();
        }
        id("timer").innerText=parseInt(currentTime/60)+'m'+" "+currentTime%60+'s';
    },1000)
    
}

function id(id) {
    return document.getElementById(id);    
}

function updateMove() {
    if(selectedCell!=null&&selectedNum) {
        console.log(selectedNum);
        console.log(selectedCell);
        id(selectedCell).textContent = selectedNum;
        if(selectedNum==solution[selectedCell]) {
           spaceCount--;
           if(spaceCount==0) {
               endGame();
           }
           id(selectedCell).classList.remove("selected");
           id(selectedCell).classList.add("correct");
           let old_element = id(selectedCell);
           let new_element = old_element.cloneNode(true);
           old_element.parentNode.replaceChild(new_element, old_element);
           id(selectedCell).innerText=selectedNum;
           disable=true;
           setTimeout(function () {
            id(selectedCell).classList.remove("correct");
            id(-selectedNum).classList.remove("selected");
            id(selectedCell).classList.remove("selected");
            selectedNum = null;
            selectedCell = null;
            disable = false;
           },1000);
        } else {
            disable = true;
            id(selectedCell).classList.add("incorrect");
            setTimeout(function () {
                id(selectedCell).classList.remove("incorrect");
                id(-selectedNum).classList.remove("selected");
                id(selectedCell).classList.remove("selected");
                id(selectedCell).textContent="";
                selectedNum = null;
                selectedCell = null;
                currentlives--;
                id("lives").innerText="lives: " + currentlives;
                if(currentlives==0){ console.log("end"); endGame();}
                else disable = false;
               },1000);

        }

    }    
    resolve();
}

function endGame() {
    disable = true;
    destroy();
    if(spaceCount) {
        for(let i=0;i<81;i+=9) {
            id(i).innerText = 'Y';
            id(i+1).innerText = 'O';
            id(i+2).innerText = 'U';
            id(i+5).innerText = 'L';
            id(i+6).innerText = 'O';
            id(i+7).innerText = 'S';
            id(i+8).innerText = 'E';
        }
    } else {
        for(let i=0;i<81;i+=9) {
            id(i+1).innerText = 'Y';
            id(i+2).innerText = 'O';
            id(i+3).innerText = 'U';
            id(i+5).innerText = 'W';
            id(i+6).innerText = 'I';
            id(i+7).innerText = 'N';
        }
    }

}

function autofill() {
    if(!disable) {
        for(let i=0;i<81&&spaceCount>1;i++) {
            if(puzzle[i]=='.'&&id(i).innerText=="") {
                id(i).innerText=solution[i];
                spaceCount--;
            }
        }
    }

}



function destroy() {
    disable = true;
    clearInterval(timer);
    id("timer").innerText=parseInt(time/60)+'m'+" "+time%60+'s';
    for(let i=0;i<81;i++) {
        id(i).textContent = "";
        if(id(i).classList.contains("selected")) {
            id(i).classList.remove("selected");
        }
        let old_element = id(i);
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }
    selectedNum = null;
    selectedCell = null;
    for(let i=-1;i>=-9;i--) {
        if(id(i).classList.contains("selected")) {
            id(i).classList.remove("selected");
        }
       // id(i).textContent = "";
        // let old_element = id(i);
        // let new_element = old_element.cloneNode(true);
        // old_element.parentNode.replaceChild(new_element, old_element);
        // id(i).textContent=-i;
    }
 }
 
 function updateLevel() {
    let lev = id("selectLevel").value;
    if(lev=="easy") {
        let n =Math.floor(Math.random()*5);
        let curSt = shuffle(easy[n],easySol[n]);
        puzzle = curSt[0];
        solution = curSt[1];
    }
    else if(lev=="mid") {
        let n =Math.floor(Math.random()*5);
        let curSt = shuffle(mid[n],midSol[n]);
        puzzle = curSt[0];
        solution = curSt[1];
    }
    else {
        let n =Math.floor(Math.random()*5);
        let curSt = shuffle(hard[n],hardSol[n]);
        puzzle = curSt[0];
        solution = curSt[1];
    }
    console.log(puzzle);
    console.log(solution);
}


function updateTime() {
    if(id("selectTime").value) {
        time = parseInt(id("selectTime").value);
    }
    if(time<0) {
        id("selectTime").textContent=0;
        time = 0;
    }
    id("selectTime").value=time;
    id("timer").innerText=parseInt(time/60)+'m'+" "+time%60+'s';
    console.log(parseInt(time/60)+'m'+" "+time%60+'s');
}
function updateLives() {
    if(id("selectLives").value) {
        lives = parseInt(id("selectLives").value);
    }
    if(time<0) {
        id("selectLives").textContent=0;
        lives = 0;
    }
    id("selectLives").value=lives;
    id("lives").innerText="lives left:  " + lives;
    console.log(lives); 
}


 function keypadEvent() {
    if(!disable) {
        if(this.classList.contains("selected")) {
            this.classList.remove("selected");
            selectedNum = null;
        }
        else {
            for(let j=1;j<=9;j++) {
               id(-j).classList.remove("selected");
            }
            this.classList.add("selected");
            selectedNum=parseInt(this.textContent);
            updateMove();
        }
    } 
 }

 function cellEvent(i) {
    if(!disable) {
        if(id(i).classList.contains("selected")) {
            id(i).classList.remove("selected");
            selectedCell = null;
        }
        else {
            for(let j=0;j<81;j++) {
                id(j).classList.remove("selected");
            }
            id(i).classList.add("selected");
            selectedCell = parseInt(this.id);
            updateMove();
        }
    }
}

















































 function Nav() {
    if(!check) {
        console.log(check);
        check=1;
        document.getElementById("settings").style.width="250px";
    } 

    else {
        console.log(check);
        check=0;
        document.getElementById("settings").style.width="0px";
    }
}