let currentPlayer = 'X'; // To store who is the current player
let otherPlayer = 'O'; //To store the value of other player
let x = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"]
];
let scoreX = 0;
let scoreO = 0;

document.getElementById("newgame").addEventListener("click", ()=>{
    window.location.href = "game.html";
})
document.getElementById("exit").addEventListener("click",()=>{
    window.close();
})

function checkWin()
{
    for ( let i = 0; i<3; i++){
        if (x[i][0] == x[i][1] && x[i][1] == x[i][2]){
            return true;
        }
        else if(x[0][i] == x[1][i] && x[1][i] == x[2][i]){
            return true;
        }
        else if((x[0][0] == x[1][1] && x[1][1] == x[2][2]) || (x[0][2] == x[1][1] && x[1][1] == x[2][0])){
            return true;
        }
    }
    return false;
}

function checkDraw(){
    let ranVar = 0; //A random variable
    for (let i = 0; i<3; i++){
        for (let j = 0; j<3; j++){
            if(x[i][j]!='X' && x[i][j]!= 'O'){
                return false;
            }
        }
    }
    return true;
}


function resetGame(){
    x = [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
    ];
    for (let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            let box = document.getElementById(`r${i}c${j}`);
            box.innerText = " ";
        }
    }
}

function won(){
    let popUp = document.createElement("div");
    document.getElementById("main-div").style.display = "none";
    popUp.classList.add("pop-up");
    popUp.innerText = `Congratulations ! Player ${currentPlayer} won`
    let nextGame = document.createElement("button");
    let exit = document.createElement("button");
    nextGame.innerText = "Next Game";
    exit.innerText = "Main Menu";
    popUp.appendChild(nextGame);
    popUp.appendChild(exit);
    document.body.appendChild(popUp);
    nextGame.addEventListener("click", ()=>{
        popUp.style.display = "none";
        document.getElementById("main-div").style.display = "block";
        resetGame();
    });
    exit.addEventListener("click", ()=>{
        window.location.href = "index.html";
    })
}
function draw(){
    let popUp = document.createElement("div");
    document.getElementById("main-div").style.display = "none";
    popUp.classList.add("pop-up");
    popUp.innerText = "Match drawn";
    let nextGame = document.createElement("button");
    let exit = document.createElement("button");
    nextGame.innerText = "Next Game";
    exit.innerText = "Main Menu";
    popUp.appendChild(nextGame);
    popUp.appendChild(exit);
    document.body.appendChild(popUp);
    nextGame.addEventListener("click", ()=>{
        popUp.style.display = "none";
        document.getElementById("main-div").style.display = "block";
        resetGame();
    });
    exit.addEventListener("click", ()=>{
        window.location.href = "index.html";
    })
}

function move(row, column) {
    if(x[row][column]!="X" &&  x[row][column]!= "O"){
        let box = document.getElementById(`r${row}c${column}`);
        box.innerText = currentPlayer;
        x[row][column] = currentPlayer;
        box.style.color = box.innerText == 'X'? "blue":"yellow";
        if(checkWin()){
            setTimeout(function(){
                won();
            }, 500);
        }
        else if(checkDraw()){
           setTimeout( function(){
               draw();
           }, 500);
        }
        else{
            let temp ;
            temp = currentPlayer;
            currentPlayer = otherPlayer;
            otherPlayer = temp;
            document.getElementById("player-detail").innerText = `Current Player == ${currentPlayer}`;
        }
    }
    else{
        alert("Box already filled");
    }
}
