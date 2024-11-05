'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        return res.json({ error: 'Required field(s) missing' })
      }
      let suddokuString = solver.validate(req.body.puzzle);

      if (suddokuString == 'invalid-length') {
        return res.json({error: 'Expected puzzle to be 81 characters long'})
      }

      if (suddokuString == 'invalid-characters') {
        return res.json({error: 'Invalid characters in puzzle'})
      }

      if (req.body.coordinate.length > 2) {
        return res.json({ error: 'Invalid coordinate'})
      }
      let row = req.body.coordinate.split("")[0];
      let col = req.body.coordinate.split("")[1];



      if (/[^a-i]/i.test(row) || /[^1-9]/.test(col)) {
        return res.json({ error: 'Invalid coordinate'})
      }

      if (/[^1-9]/.test(req.body.value)) {
        return res.json({ error: 'Invalid value' })
      }
    
      let row1 = solver.rowIndex(row);
      let col1 = parseInt(col) - 1;
      let puzzle1 = solver.makeTwoDeeArray(req.body.puzzle);
      console.log(row1, col1)
      console.log(puzzle1[row1][col1], req.body.value)
      if (puzzle1[row1][col1] == req.body.value) {
        return res.json({valid: true})
      }

      let rowCheck = solver.checkRowPlacement(req.body.puzzle, row, req.body.value);
      let columnCheck = solver.checkColPlacement(req.body.puzzle, col, req.body.value);
      let regionCheck = solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value);

      if (rowCheck.valid == false || columnCheck.valid == false || regionCheck.valid == false) {
        let failObject = {valid: false, conflict: []};

        if (rowCheck.valid == false) {
          failObject.conflict.push(rowCheck.conflict);
        }

        if (columnCheck.valid == false) {
          failObject.conflict.push(columnCheck.conflict)
        }

        if (regionCheck.valid == false) {
          failObject.conflict.push(regionCheck.conflict)
        }
  
        return res.json(failObject);
      }
      return res.json({valid: true})
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let sud = req.body.puzzle;
      // validate if input is valid
      if (req.body.puzzle == undefined || req.body.puzzle == '') {
        res.json({error: 'Required field missing'})
      }
      let suddokuString = solver.validate(req.body.puzzle);

      if (suddokuString == 'invalid-length') {
        res.json({error: 'Expected puzzle to be 81 characters long'})
      }

      if (suddokuString == 'invalid-characters') {
        res.json({error: 'Invalid characters in puzzle'})
      }

      let solved = solver.solve(sud);
    
      if (solved.includes(".")) {
        return res.json({ error: 'Puzzle cannot be solved' })
      }
      return res.json({solution: solved})
    });
};
