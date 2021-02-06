'use strict'
const WALL = '💩'
const FOOD = '🍕'
const EMPTY = ' ';
const POWERFOOD = '🥩';
const CHERRY = '🍒';
const SIZE = 10;


var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodCounter: -1,
    cherryInterval: null
}

function init() {
    console.log('hello')
    gGame.cherryInterval = null;
    document.querySelector('.modal').style.display = 'none';
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.foodCounter = 56;
    // console.log('Totall pizzas:', gGame.foodCounter);
    gGame.cherryInterval = setInterval(getRandomCherry, 15000);
    gGame.isOn = true
    gPacman.isPower = false;
    gGame.score = 0;

}

function buildBoard() {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gGame.foodCounter++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gGame.foodCounter--;
            }

            if (((i === 1) && (j === 1)) || ((i === 1) && (j === SIZE - 2)) ||
                ((i === SIZE - 2) && (j === 1)) || ((i === SIZE - 2) && (j === SIZE - 2))) {
                board[i][j] = POWERFOOD;
                gGame.foodCounter--;
            }
        }
    }
    console.log(board)
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    renderCell(gPacman.location, EMPTY)
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.modal h1').innerText = 'I\'m sorry...You have lost. play again?';
}

function isWon() {

    // console.log('Win?');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.modal h1').innerText =
        'Congratualtions! you have won! play again ?';
}

function powerFood() {
    // console.log('In powerfood function');
    gPacman.isPower = true;
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'white';
    }
    setTimeout(function () {
        gPacman.isPower = false;
        if (gDeletedGhosts) {
            for (var i = 0; i < gDeletedGhosts.length; i++) {
                var ghostToRevive = gDeletedGhosts.pop();
                gGhosts.push(ghostToRevive);
            }
        }
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor();
        }
    }, 5000);

}

function eatGhost(locationGhostPac, isPacman) {
    console.log('Ghost loc:', locationGhostPac);

    for (var i = 0; i < gGhosts.length; i++) {
        if ((gGhosts[i].location.i === locationGhostPac.i) && (gGhosts[i].location.j === locationGhostPac.j)) {
            var deletedGhost = gGhosts.splice(i, 1);
            console.log('deletedghost:', deletedGhost);
            gDeletedGhosts.push(deletedGhost[0]);
            if (!isPacman) renderCell(deletedGhost[0].location, deletedGhost[0].currCellContent);
            else renderCell(deletedGhost[0].location, EMPTY);
        }
    }
    console.log('gDeletedGhosts:', gDeletedGhosts);
    return;
}

function getRandomCherry() {
    var emptyArr = getEmptyCellIdx(gBoard);
    var emptyCell = emptyArr[getRandomInt(0, emptyArr.length - 1)];
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
}

