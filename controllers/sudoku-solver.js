class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return 'invalid-length'
    } 

    if (/[^1-9\.]/.test(puzzleString)) {
      return 'invalid-characters'
    };
  }

  checkRowPlacement(puzzleString, row, value) {
    let puzzle = this.makeTwoDeeArray(puzzleString);
    let puzzleRow = this.rowIndex(row);

    for (let i = 0; i < 9; i++) {
      
      if (puzzle[puzzleRow][i] == value) {
        return {valid: false, conflict: "row"};
      }
    }

    return true;
  }

  checkColPlacement(puzzleString, column, value) {
    let puzzle = this.makeTwoDeeArray(puzzleString);
    let col = parseInt(column) - 1;

    for (let i = 0; i < 9; i++) {
      if (puzzle[i][col] == value) {

        return {valid: false, conflict: "column"};
      }
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzle = this.makeTwoDeeArray(puzzleString);
    let puzzleRow = this.rowIndex(row);
    let col = column - 1;

    let beginRow = puzzleRow - puzzleRow % 3;
    let beginColumn = col - col % 3;


    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzle[beginRow + i][beginColumn + j] == value) {
          return {valid: false, conflict: "region"};
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    let board = this.makeTwoDeeArray(puzzleString);
    this.playSudoku(board)
  //   for (let row = 0; row < 9; row++) {
  //     for (let col = 0; col < 9; col++) {
  //         if (board[row][col] === 0) {
  //             for (let num = 1; num <= 9; num++) {
  //                 if (safePlacement(board, row, col, num)) {
  //                     board[row][col] = num;
  //                     if (solveSudoku(board)) {
  //                         return true;
  //                     }
  //                     board[row][col] = 0;
  //                 }
  //             }
  //             return false;
  //         }
  //     }
  // }
  // return true;
    let solvedString = board.flat().join("")
    return solvedString;
  }

  makeTwoDeeArray(puzzleString) {
    const DIMENSION = 9;
    const twoDeeArray = []
    
    for (let row = 0; row < DIMENSION; row++) {
      let rowStart = row * DIMENSION;
      let rowEnd = rowStart + DIMENSION;
      twoDeeArray[row] = puzzleString.substring(rowStart, rowEnd).split("")
    }

    return twoDeeArray;
  }

  rowIndex(row) {
    switch(row) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
      case "I":
        return 8;
      case "a":
        return 0;
      case "b":
        return 1;
      case "c":
        return 2;
      case "d":
        return 3;
      case "e":
        return 4;
      case "f":
        return 5;
      case "g":
        return 6;
      case "h":
        return 7;
      case "i":
        return 8;
    }
  }

  safePlacement(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] == num || board[x][col] == num || 
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] == num) {
        return false;
    }
    }
    return true;
  }

  playSudoku(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (board[row][col] === ".") {
              for (let num = 1; num <= 9; num++) { 
                  if (this.safePlacement(board, row, col, num)) {
                      board[row][col] = num.toString();
                      if (this.playSudoku(board)) {
                          return true;
                      }
                      board[row][col] = ".";
                  }
              }
              return false;
          }
      }
  }
  if (board)
  return true;
  }
  
}

module.exports = SudokuSolver;

