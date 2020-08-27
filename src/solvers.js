/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //chess piece count set at n to begin with
  let board = new Board({n});
  let solution = board.rows();
  let chessPieces = n;
  // base case - when there are no chess pieces left
  //average
  // loop through the board to access the rows

  for (var row = 0; row < solution.length; row++) {
    //loop through the current row (get cols)
    for (var col = 0; col < solution[row].length; col++) {
      //check if the current row[col] is empty (aka 0);
      board.togglePiece(row, col);
      //decrement piece count
      chessPieces--;
      if (board.hasAnyRooksConflicts()) {
        //check if there are any rook conflicts
        //if yes, remove piece and increment--;
        board.togglePiece(row, col);
        chessPieces++;
      } else {
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));

  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  //   [0,0,1,0,0]    // [0,1,0,0,0]   // [0,0,1,0,0]    // [0,0,0,1,0] //
  //   [0,1,0,0,0]    // [0,0,1,0,0]   // [0,0,0,1,0]
  //-> [1,0,0,0,0]    // [1,0,0,0,0]
  //-> [0,0,0,0,0]    // [1,0,0,0,0]

  let backtracking = function(board, count, rowIndex) {
    if (count === 0) {
      solutionCount++;
    } else {
      for (let colIndex = 0; colIndex < board.rows().length; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyRooksConflicts()) {
          backtracking(board, count - 1, rowIndex + 1);
        }
        board.togglePiece(rowIndex, colIndex);
      }
    }
  };

  backtracking(new Board({n}), n, 0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
