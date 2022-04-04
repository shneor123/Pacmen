'use strict'

const GHOST = '&#9781;';

var gGhosts;
var gGhostsDeads = [];
var gIntervalGhosts;


function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: generateRandomColor(),
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
    // console.log('gGhosts',gGhosts);
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
        }
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location.i = nextLocation.i;
    ghost.location.j = nextLocation.j;
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) return `<span style="color:green">${GHOST}</span>`;
    return `<span style="color:${ghost.color}" >${GHOST}</span>`;

}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i === location.i &&
            currGhost.location.j === location.j) {
            checkingCell(currGhost)

            var ghostGone = gGhosts.splice(i, 1)[0]
            console.log('gGhostsDead', ghostGone);
            gGhostsDeads.push(ghostGone)
        }
    }
}

function checkingCell(ghost) {
    if (ghost.currCellContent === FOOD) {
        updateScore(1)
        ghost.currCellContent === EMPTY;
    } else if (currGhost.currCellContent === POWER_FOOD) {
        updateScore(10)
        ghost.currCellContent === EMPTY;
    }
}

function reviveGhoste() {
    for (var i = 0; i < gGhostsDeads.length; i++) {
        var currghost = gGhostsDeads[i]
        gGhosts.push(currghost)
    }
    gGhostsDeads = [];
}