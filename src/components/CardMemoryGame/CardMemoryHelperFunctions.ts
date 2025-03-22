import { IFieldSize } from "../../interfaces/IFieldSize";
import { IGameDiv } from "../../interfaces/IGameDiv";

export function countOpenedButNotGuessedCells(l: IGameDiv[][], size: IFieldSize) {
  let openedCellsCount = 0;
  // let clickedCell: IClickedCell = { v: -1, h: -1, w: -1, time: 0 };

  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      if (l[theHeight][theWidth].isOpened && !l[theHeight][theWidth].isGuessed) {
        openedCellsCount++;
        // clickedCell = { v: -1, h: theHeight, w: theWidth, time: 0 };
        // listOfClickedCell2.push(clickedCell);
      }
    }
  }
  // console.log(listOfClickedCell2);
  return openedCellsCount;
}

export function isGameWon(l: IGameDiv[][], size: IFieldSize) {
  let openedAndGuessedCount = 0;
  // let clickedCell: IClickedCell = { v: -1, h: -1, w: -1, time: 0 };

  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      if (l[theHeight][theWidth].isOpened && l[theHeight][theWidth].isGuessed) {
        openedAndGuessedCount++;
      }
    }
  }
  // console.log(listOfClickedCell2);
  return size.h * size.w - 1 === openedAndGuessedCount;
}
