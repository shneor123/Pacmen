'use strict'
const WALL = '🍫';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '&#127873;'
const CHERRY = '🍒'

var gFoodCount = 0;
var gIntervalCheery = null;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    document.querySelector('.victory-modal').style.display = 'none'
    gFoodCount = 0;
    updateScore(0)
    // console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    createPowerFood(gBoard)

    printMat(gBoard, '.board-container')
    gIntervalCheery = setInterval(createCheery, 15000)
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--
            }
        }
    }
    return board;
}

function createCheery() {
    var emptyCell = getEmptyCell(gBoard)
    if (!emptyCell.length) return
    var emptyCell = emptyCell.pop();
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY)
}

function getEmptyCell(board) {
    var res = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY) {
                var location = {
                    i: i,
                    j: j,
                }
                res.push(location)
            }
        }
    }
    shuffle(res)
    return res
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function gameOver() {
    var elModal = document.querySelector('.victory-modal')
    var elModalSpan = document.querySelector('.victory-modal span')

    elModalSpan.innerText = (gGame.score === gFoodCount) ? 'VICTORY!! \n' : 'GAME-OVER \n';
    elModal.style.display = 'block';

    gGame.score = 0;
    gGame.isOn = false;
    // playAudio()
    // console.log('Game Over');
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCheery);
    // update the Modal;
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the Dom;
    renderCell(gPacman.location, EMPTY);
}

function createPowerFood(board) {
    board[1][1] = POWER_FOOD;
    board[1][board[0].length - 2] = POWER_FOOD;
    board[board.length - 2][board[0].length - 2] = POWER_FOOD;
    board[board.length - 2][1] = POWER_FOOD;
    gFoodCount -= 4;
}

function playAudio() {
    var audio = new Audio('sound/loss.mp4');
    audio.play();
}

