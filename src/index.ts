import Grid, { MAX_NUMBER_OF_COL, MAX_NUMBER_OF_ROW } from "./Grid";
import ask from "./lib/ask";

const main = async () => {
  const grid = new Grid();

  let winner;
  let playerMove = 1;
  let numberOfMoves = 0;
  do {
    let row;
    let column;

    do {
      column = await ask<number>(`Input the column that Player ${playerMove} moves (1-7): `, (answer): answer is number => {
        const parsed = parseInt(answer, 10);
        return !Number.isNaN(parsed) && parsed > 0 && parsed <= MAX_NUMBER_OF_COL;
      }, (answer) => parseInt(answer));
      
      
      if (playerMove === 1) {
        row = grid.player1Action(column - 1);
      } else {
        row = grid.player2Action(column - 1);
      }

      if (row == null) {
        console.log("The column is full. Please choose another column.");
      }
    } while (row == null);

    console.log(grid.print());
    winner = grid.checkWinner(row, column - 1);
    console.log('winner', winner);

    playerMove = playerMove === 1 ? 2 : 1;
    numberOfMoves += 1;
  } while (winner == null && numberOfMoves < MAX_NUMBER_OF_COL * MAX_NUMBER_OF_ROW);

  if (winner == null) {
    console.log('All the cells are filled. The game is a draw.');
  } else {
    console.log(`Player ${winner} wins!`);
  }
};

main();