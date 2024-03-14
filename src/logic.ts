import { MATRIX } from "./ui";

export module POSITION {
  export const getAllEmptyPosition = (ui: MATRIX.Matrix) => {
    const emptyPosition: number[][] = [];
    for (let i = 0; i < ui.length; i++) {
      for (let j = 0; j < ui.length; j++) {
        if (ui[i][j] === MATRIX.EMPTY_POSITION)
          emptyPosition.push([i + 1, j + 1]);
      }
    }

    return emptyPosition;
  };

  export const showAllNextMove = (ui: MATRIX.Matrix) => {
    const allEmptyPosition = getAllEmptyPosition(ui);
    console.log("All moves you can type:\n");
    allEmptyPosition.forEach((emptyPosition) => console.log(emptyPosition));
    console.log("\nWhat is your move?");
  };
}


