import Grid from "./Grid";

describe("Connect 4", () => {
  it("When player 1 an coin on col 1, it should be at 0,0", () => {
    const grid = new Grid();

    grid.player1Action(0);

    expect(grid.cells[0][0]).toBe(1);
  });

  it("Given player 1 placed a coin on col 1, when player 2 place a coin on col 1, it should be at 1,0", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);

    /* When */
    grid.player2Action(0);

    expect(grid.cells[1][0]).toBe(2);
  });

  it("Test for player 1 to win", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);
    grid.player2Action(1);
    grid.player1Action(0);
    grid.player2Action(1);
    grid.player1Action(0);
    grid.player2Action(1);

    /* When */
    const row = grid.player1Action(0);
    const winner = grid.checkWinner(row, 0);

    expect(winner).toBe(1);
  });

  it("Test for player 1 to win in horizontal", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);
    grid.player2Action(0);
    grid.player1Action(1);
    grid.player2Action(1);
    grid.player1Action(2);
    grid.player2Action(2);

    /* When */
    const row = grid.player1Action(3);
    const winner = grid.checkWinner(row, 3);

    expect(winner).toBe(1);
  });

  it("Test for player 2", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);
    grid.player2Action(1);
    grid.player1Action(4);
    grid.player2Action(1);
    grid.player1Action(3);
    grid.player2Action(1);
    grid.player1Action(3);
    grid.player2Action(1);

    /* When */
    const row = grid.player2Action(1);
    const winner = grid.checkWinner(row, 1);

    expect(winner).toBe(2);
  });

  it("Test not placable column", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);
    grid.player2Action(0);
    grid.player1Action(0);
    grid.player2Action(0);
    grid.player1Action(0);
    grid.player2Action(0);
    
    /* When */
    const row = grid.player1Action(0);

    expect(row).toBeNull();
  });

  it("Test for diagonal", () => {
    /* Given */
    const grid = new Grid();
    grid.player1Action(0);
    grid.player2Action(0);
    grid.player1Action(1);
    grid.player2Action(5);
    grid.player1Action(1);
    grid.player2Action(4);
    grid.player1Action(2);
    grid.player2Action(3);
    grid.player1Action(3);
    grid.player2Action(2);
    grid.player1Action(2);
    grid.player2Action(3);

    /* When */
    const row = grid.player1Action(3);
    const winner = grid.checkWinner(row, 3);

    expect(winner).toBe(1);
  });
});
