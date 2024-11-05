const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let invalidString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A';
let invalidLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
let completedString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        let test = solver.solve(puzzleString)
        assert.equal(test, completedString, 'test sudoku solver')
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        let test = solver.validate(invalidString)
        assert.equal(test, 'invalid-characters', 'test sudoku validate')
    })

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        let test = solver.validate(invalidLength)
        assert.equal(test, 'invalid-length', 'test sudoku validate')
    })
    test('Logic handles a valid row placement', () => {
        let test = solver.checkRowPlacement(puzzleString, 'a', 3)
        assert.equal(test, true, 'test sudoku row check')
    })
    test('Logic handles an invalid row placement', () => {
        let test = solver.checkRowPlacement(puzzleString, 'a', 5)
        assert.equal(test.valid, false, 'test sudoku row check')
    })
    test('Logic handles a valid column placement', () => {
        let test = solver.checkColPlacement(puzzleString, 2, 3)
        assert.equal(test, true, 'test sudoku column check')
    })
    test('Logic handles an invalid column placement', () => {
        let test = solver.checkColPlacement(puzzleString, 2, 6)
        assert.equal(test.valid, false, 'test sudoku column check')
    })
    test('Logic handles a valid region (3x3 grid) placement', () => {
        let test = solver.checkRegionPlacement(puzzleString, 'a', 2, 3)
        assert.equal(test, true, 'test sudoku region check')
    })
    test('Logic handles an invalid region (3x3 grid) placement', () => {
        let test = solver.checkRegionPlacement(puzzleString, 'a', 2, 5)
        assert.equal(test.valid, false, 'test sudoku region check')
    })
    test('Valid puzzle strings pass the solver', () => {
        let puzzStr;
        let test = solver.solve(puzzleString)

        if (test == completedString) {
            puzzStr = true;
        }

        assert.equal(puzzStr, true, 'test sudoku solver')
    })
    test('Invalid puzzle strings fail the solver', () => {
        let puzzStr
        let test = solver.validate(invalidString)
        if (test == 'invalid-characters') {
            puzzStr = false
        }
        assert.equal(puzzStr, false, 'test sudoku solver')
    })

    test('Solver returns the expected solution for an incomplete puzzle', () => {
        let test = solver.solve(puzzleString)
        assert.equal(test, completedString, 'test sudoku solver')
    })
});
