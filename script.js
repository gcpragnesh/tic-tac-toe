const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winProbability = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let CurrPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    boxes.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${CurrPlayer}'s turn`;
    running = true;
}
function boxClicked(){
    const boxIndex = this.getAttribute("boxIndex");

    if(options[boxIndex] != "" || !running){
        return;
    }

    updatebox(this, boxIndex);
    checkWinner();
}
function updatebox(box, index){
    options[index] = CurrPlayer;
    box.textContent = CurrPlayer;
}
function changePlayer(){
    CurrPlayer = (CurrPlayer == "X") ? "O" : "X";
    statusText.textContent = `${CurrPlayer}'s turn`;
}
function checkWinner(){
    let won = false;

    for(let i = 0; i < winProbability.length; i++){
        const condition = winProbability[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            won = true;
            break;
        }
    }

    if(won){
        statusText.textContent = `${CurrPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    CurrPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${CurrPlayer}'s turn`;
    boxes.forEach(box => box.textContent = "");
    running = true;
}