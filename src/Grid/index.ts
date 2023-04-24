export const MAX_NUMBER_OF_ROW = 6;
export const MAX_NUMBER_OF_COL = 7
export const WINNER_CONDITION = 4;

class Grid {
  cells: number[][] = []

  constructor() {
    for (let i = 0; i < MAX_NUMBER_OF_ROW; i++) {
      this.cells[i] = [];
      for (let j = 0; j < MAX_NUMBER_OF_COL; j++) {
        this.cells[i][j] = null;
      }
    }
  }

  putCoin = (playerNumber: number, column: number): number | null => {
    for (let i = 0; i < MAX_NUMBER_OF_ROW; i++) {
      if (this.cells[i][column] == null) {
        this.cells[i][column] = playerNumber;
        return i;
      }
    }

    return null;
  }

  player1Action = (column: number): number | null => {
    return this.putCoin(1, column);
  }

  player2Action = (column: number): number | null => {
    return this.putCoin(2, column);
  }

  checkHorizontal = (player: number, row: number, column: number): number | null => {
    for (let i = 0; i < WINNER_CONDITION; i++) {
      if (column - i >= 0 && column - i <= MAX_NUMBER_OF_COL - WINNER_CONDITION) {
        let firstCoin = this.cells[row][column - i];

        if (firstCoin == player) {
          let count = 0;
          for (let j = 0; j < WINNER_CONDITION; j++) {
            if (this.cells[row][column - i + j] == player) {
              count += 1;
            }
          }

          if (count === WINNER_CONDITION) {
            return player;
          }
        }
      }
    }

    return null;
  }

  checkVertically = (player: number, row: number, column: number): number | null => {
    if (row >= WINNER_CONDITION - 1) {
      let count = 0;
      for (let i = 0; i < WINNER_CONDITION; i++) {
        if (this.cells[row - i][column] == player) {
          count += 1;
        }
      }

      if (count === WINNER_CONDITION) {
        return player;
      }
    }

    return null;
  }

  checkDiagonal = (player: number, row: number, column: number): number | null => {
    for (let k = 0; k < 2; k++) {
      const isLeftToRight = k === 0 ? true : false;

      for (let i = 0; i < WINNER_CONDITION; i++) {
        let count = 0;
        const [startRowPos, startColPos] = isLeftToRight ? [row - i, column - i] : [row + i, column - i];

        if (startRowPos >= 0 && startColPos >= 0) {
          for (let j = 0; j < WINNER_CONDITION; j++) {
            const nextRowPos = (startRowPos + (isLeftToRight ? j : -j));
            const nextColPos = startColPos + j;

            if (
              nextRowPos >= 0
              && nextColPos >= 0
              && nextRowPos < MAX_NUMBER_OF_ROW
              && nextColPos < MAX_NUMBER_OF_COL
              && this.cells[nextRowPos][nextColPos] === player
            ) {
              count += 1;
            }
          }

          if (count === 4) {
            return player;
          }
        }
      }
    }

    return null;
  }

  checkWinner = (row: number, column: number): number | null => {
    let player = this.cells[row][column];

    if (this.checkHorizontal(player, row, column) != null) {
      return player;
    }

    if (this.checkVertically(player, row, column) != null) {
      return player;
    }

    if (this.checkDiagonal(player, row, column) != null) {
      return player;
    }

    return null;
  }

  print = () => {
    let output = '';

    for (let i = 0; i < MAX_NUMBER_OF_ROW; i++) {
      for (let j = 0; j < MAX_NUMBER_OF_COL; j++) {
        if (this.cells[MAX_NUMBER_OF_ROW - 1 - i][j] == null) {
          output += '.';
        } else if (this.cells[MAX_NUMBER_OF_ROW - 1 - i][j] === 1) {
          output += 'x';
        } else {
          output += 'o';
        }
      }

      output += '\n';
    }

    return output;
  }
}

export default Grid;
