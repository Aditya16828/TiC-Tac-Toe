/**
 * Initialization of the board on clicks
 * check winner at at each steps/clicks
 * check for draw
 * freeze board and disable clicks after result
 */

// grab the td tags
let td = document.getElementsByTagName('td');
console.log(td);
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X', winner = false;
let declare = document.getElementsByTagName('h3')[0];

function offclick(){
    for(let i = 0;i < td.length;i++){
        td[i].style.pointerEvents = 'none';
    }
}

function checkWinner() {
    winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]];
    let currp = currentPlayer;
    for (let i = 0; i < winConditions.length; i++) {
        let a = winConditions[i][0];
        let b = winConditions[i][1];
        let c = winConditions[i][2];
        // console.log(a, b, c);

        if (gameBoard[a] == currp && gameBoard[b] == currp && gameBoard[c] == currp) {
            declare.innerText = `Winner is ${currp}`;
            winner = true;
            offclick();
            break;
        }
    }
}

function checkDraw() {
    if (!gameBoard.includes('') && winner) {
        declare.innerText = 'Game Draw';
        offclick();
    }
}

function clickHandler() {
    let current_td = event.target;
    let index = current_td.getAttribute('index');
    // console.log(current_td);
    if (current_td.innerText == '') {
        current_td.innerText = currentPlayer;
        gameBoard[index] = currentPlayer;

        // winner and draw check
        checkWinner();
        checkDraw();

        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    }
    console.log(gameBoard);
}

for (let i = 0; i < td.length; i++) {
    td[i].addEventListener('click', clickHandler);
}