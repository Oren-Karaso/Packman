'use strict'
const PACMAN = '🐱‍💻';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isPower: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isPower) eatGhost(nextLocation, true);
        else gameOver();
        return;
    }
    if (nextCell === CHERRY) {
        gGame.score += 10;
        gGame.foodCounter += 10;
    }

    if (nextCell === FOOD) {
        updateScore(1);
        if (gGame.foodCounter === gGame.score) isWon();
    }
    if (nextCell === POWERFOOD) {
        if (!gPacman.isPower) powerFood();
        else return;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // Move the pacman
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)

}

function getNextLocation(eventKeyboard) {
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        default: return null

    }
    return nextLocation;
}