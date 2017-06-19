#!/usr/bin/env node
var chalk       = require('chalk');
var clear       = require('clear');
var figlet      = require('figlet');
var prompt = require('prompt');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Tic Tac Toe', { horizontalLayout: 'full' })
  )
);

var board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};
// winning combinations 
var combos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function makeBoard() {
    console.log('\n' +
        '  ' + board[1] + '  |  ' + board[2] + '  |  ' + board[3] + '\n' +
        ' --------------- \n' +
        '  ' + board[4] + '  |  ' + board[5] + '  |  ' + board[6] + '\n' +
        ' --------------- \n' +
        '  ' + board[7] + '  |  ' + board[8] + '  |  ' + board[9] + '\n');

}

function makeMove(position, item) {
    board[position] = item;
}

function validInput(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

// make sure its a legal move
function validateMove(position) {
    if (validInput(position) === true && board[position] === ' ') {
        return true;
    }
    return false;
}

// is the current player a winner?
function didWin(player) {
    for (var i = 0; i < combos.length; i++) {
        var count = 0;
        for (var k = 0; k < combos[i].length; k++) {
            if (board[combos[i][k]] === player) {
                count++;
            }
            if (count === 3) {
                return true;
            }
        }
    }
    return false;
}

function playTurn(player) {

    console.log('Player ' + player + "'s turn");
    prompt.start();
    prompt.get(['position'], function (err, result) {

        if (validateMove(result.position) === true) {
            makeMove(result.position, player);
            makeBoard();
            if (didWin(player) === true) {
                console.log( player + ' Wins!');
                return;
            }
            if (player === 'X') {
                playTurn('O');
            } else {
                playTurn('X');
            }
        } else {
            console.log('try again...');
            playTurn(player);
        }
    });
}

console.log(
    '  1  |  2  |  3  \n' +
    ' --------------- \n' +
    '  4  |  5  |  6  \n' +
    ' --------------  \n' +
    '  7  |  8  |  9  \n');

playTurn('X');


