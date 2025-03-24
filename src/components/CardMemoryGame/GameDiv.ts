import { IGameDiv } from "../../interfaces/IGameDiv";

export class GameDiv implements IGameDiv {
  constructor(theValue: number = 0, isOpened: boolean = false, isGuessed: boolean = false) {
    this.theValue = theValue;
    this.isOpened = isOpened;
    this.isGuessed = isGuessed;
  }
  theValue: number;
  isOpened: boolean;
  isGuessed: boolean;
}

// export const gameFieldBackEnd: IGameDiv[][] = [
//   [new GameDiv(1), new GameDiv(1), new GameDiv(2), new GameDiv(2), new GameDiv(11)],
//   [new GameDiv(3), new GameDiv(3), new GameDiv(4), new GameDiv(4), new GameDiv(11)],
//   [new GameDiv(5), new GameDiv(5), new GameDiv(6), new GameDiv(6), new GameDiv(12)],
//   [new GameDiv(7), new GameDiv(7), new GameDiv(8), new GameDiv(8), new GameDiv(12)],
//   [new GameDiv(9), new GameDiv(9), new GameDiv(10), new GameDiv(10), new GameDiv(-10)],
// ];
export const gameFieldBackEnd = (n: number) => generateField(n);
export function generateField(size: number) {
  const gameField: IGameDiv[][] = []; //new Array(size).fill(new Array(size).fill(new GameDiv()));
  let startingValue = 1;
  for (let theHeight = 0; theHeight < size; theHeight++) {
    const tempList: IGameDiv[] = [];
    for (let theWidth = 0; theWidth < size; theWidth++) {
      // console.log(startingValue);
      // gameField[theHeight][theWidth] = new GameDiv(startingValue);
      tempList.push(new GameDiv(0));
      // startingValue++;
    }
    gameField.push(tempList);
  }
  while (startingValue <= Math.floor((size * size) / 2)) {
    const randH = randomInt(0, size);
    const randW = randomInt(0, size);
    if (gameField[randH][randW].theValue === 0) {
      gameField[randH][randW].theValue = startingValue;
      // console.log(startingValue);
    }
    if (countValue(size, gameField, startingValue) === 2) {
      startingValue++;
    }
    // randH = randomInt(0, size);
    // randW = randomInt(0, size);
    // if (gameField[randH][randW].theValue === 0) {
    //   gameField[randH][randW].theValue = startingValue;
    //   startingValue++;
    // }
  }

  return gameField;
}

function countValue(size: number, gameField: IGameDiv[][], v: number) {
  let c = 0;
  for (let theHeight = 0; theHeight < size; theHeight++) {
    for (let theWidth = 0; theWidth < size; theWidth++) {
      if (gameField[theHeight][theWidth].theValue === v) {
        c++;
      }
      if (c == 2) {
        break;
      }
    }
  }

  return c;
}

// get random int from min (inlusive) to max (exclusive) f(0,100) return 0-99
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * max + 1) + min - 1;
}
