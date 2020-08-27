// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //input: row index
      //output: boolean
      //no out of bound cases..

      //set row by calling get method on input rowIndex
      //var count = 0;
      //iterate through row and for each index
      //if index variable equals to one, increment count;
      //if count is greater than one return true;


      let row = this.get(rowIndex);
      let count = 0;

      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get all the rows by calling the rows()
      let board = this.rows();
      //loop through the array of rows
      for (var i = 0; i < board.length; i++) {
        //for each index (i) call the hasRowConflictAt method (and if the result is true return true)
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //input Col index
      //output boolean

      //get board;
      let board = this.rows();
      //get count;
      let count = 0;
      //iterate throw all rows in the board
      for (let row of board) {
        if (row[colIndex] === 1) {
          //if value in index equals to one, increment count
          count++;
        }
        //if count>1 return true
        if (count > 1) { return true; }
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //input nothing;
      //output boolean;

      //get board
      let board = this.rows();

      for (let i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          //loop over columns of all rows
          //iterate throw board[i] = row
          return true;
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //get board
      const board = this.rows();
      //create count
      let count = 0;
      //starting row = 0
      let startingRow = 0;
      //starting index = input index
      let startingIndex = majorDiagonalColumnIndexAtFirstRow;
      //if the starting(input) is less that 0
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        //starting row is then reset to the absoulte value of the index
        //starting index = 0;
        startingRow = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        startingIndex = 0;
      }
      //then loop with i being set to the starting row, continues while less than vboar lenght; i++
      for (var i = startingRow; i < board.length; i++) {
        //check if the row at the startingindex is equal to one
        if (board[i][startingIndex] === 1) {
          count++;
          //yes, increment count
          //check if count is more than 1
          //if yes, return true
          if (count > 1) {
            return true;
          }
        }
        //stating index ++
        startingIndex++;
      }
      // i=0, j=0;
      // count =
      // i++, j++;
      // isinBound? ???
      // [[1,2,3,4]
      //  [6,7,8,9]
      // [11,12,13,14]
      //   [16,17,18,19]
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get the board with rows()
      const board = this.rows();
      //set the starting index to 0 - the board length - 1 (worst case scenario)
      const startingIndex = 0 - (board.length - 1);
      // loop starting at the startingIndex , to continue while the the i is less the the board with each loop, with increment the i
      for (var i = startingIndex; i < board.length; i++) {
        // call the hasMajorCOnflictAt with the argument i passed in
        //check if the return of that function call is true
        if (this.hasMajorDiagonalConflictAt(i)) {
          //if its true, return true
          return true;
        }
      }
      // i-0, j-0, = 0
      // i-1, j-0, = 1;
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let board = this.rows();
      let i = 0;
      let j = board.length - 1 - minorDiagonalColumnIndexAtFirstRow;
      let count = 0;
      while (i < board.length && j >= 0) {
        if (board[i][j] === 1) {
          count++;
          if (count > 1) {
            return true;
          }
        }
        i++;
        j--;
      }
      count = 0;
      i = minorDiagonalColumnIndexAtFirstRow;
      j = board.length - 1;
      while (i < board.length && j >= 0) {
        if (board[i][j] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
        i++;
        j--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let board = this.rows();
      let length = board.length;
      for (let i = 0; i < length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());




