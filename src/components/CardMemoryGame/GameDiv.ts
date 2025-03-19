import { IGameDiv } from "../../interfaces/IGameDiv";

export class GameDiv implements IGameDiv {
  constructor(theValue: number, isOpened: boolean, isGuessed: boolean) {
    this.theValue = theValue;
    this.isOpened = isOpened;
    this.isGuessed = isGuessed;
  }
  theValue: number;
  isOpened: boolean;
  isGuessed: boolean;
}

export const gameFieldBackEnd: IGameDiv[][] = [
  [
    new GameDiv(1, false, false),
    new GameDiv(1, false, false),
    new GameDiv(2, false, false),
    new GameDiv(2, false, false),
    new GameDiv(11, false, false),
  ],
  [
    new GameDiv(3, false, false),
    new GameDiv(3, false, false),
    new GameDiv(4, false, false),
    new GameDiv(4, false, false),
    new GameDiv(11, false, false),
  ],
  [
    new GameDiv(5, false, false),
    new GameDiv(5, false, false),
    new GameDiv(6, false, false),
    new GameDiv(6, false, false),
    new GameDiv(12, false, false),
  ],
  [
    new GameDiv(7, false, false),
    new GameDiv(7, false, false),
    new GameDiv(8, false, false),
    new GameDiv(8, false, false),
    new GameDiv(12, false, false),
  ],
  [
    new GameDiv(9, false, false),
    new GameDiv(9, false, false),
    new GameDiv(10, false, false),
    new GameDiv(10, false, false),
    new GameDiv(9999, false, false),
  ],
];
