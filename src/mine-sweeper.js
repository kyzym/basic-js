const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = [];

  // Iterate through rows
  for (let i = 0; i < matrix.length; i++) {
    result[i] = [];

    // Iterate through columns
    for (let j = 0; j < matrix[i].length; j++) {
      let count = 0;

      // Check neighbors in x-axis
      for (let x = -1; x <= 1; x++) {
        // Check neighbors in y-axis
        for (let y = -1; y <= 1; y++) {
          // Skip the current cell
          if (x === 0 && y === 0) continue;

          const newX = i + x;
          const newY = j + y;

          // Check if coordinates are within matrix bounds
          if (
            newX >= 0 &&
            newX < matrix.length &&
            newY >= 0 &&
            newY < matrix[i].length
          ) {
            // Increase count if neighbor cell has a mine
            if (matrix[newX][newY]) count++;
          }
        }
      }

      // Add count to the result matrix at the current position
      result[i][j] = count;
    }
  }

  // Return the resulting matrix
  return result;
}

module.exports = {
  minesweeper,
};
