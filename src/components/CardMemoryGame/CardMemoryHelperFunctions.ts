import { Dispatch, SetStateAction } from "react";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IClickedCell } from "../../interfaces/IClickedCell";

export function countOpenedButNotGuessedCells(l: IGameDiv[][], size: IFieldSize) {
  let openedCellsCount = 0;
  // let clickedCell: IClickedCell = { v: -1, h: -1, w: -1 };

  for (let theHeight = 0; theHeight < size.sideLen; theHeight++) {
    for (let theWidth = 0; theWidth < size.sideLen; theWidth++) {
      if (l[theHeight][theWidth].isOpened && !l[theHeight][theWidth].isGuessed) {
        openedCellsCount++;
      }
    }
  }

  return openedCellsCount;
}

export function isGameWon(l: IGameDiv[][], size: IFieldSize) {
  let openedAndGuessedCount = 0;
  // let clickedCell: IClickedCell = { v: -1, h: -1, w: -1 };

  for (let theHeight = 0; theHeight < size.sideLen; theHeight++) {
    for (let theWidth = 0; theWidth < size.sideLen; theWidth++) {
      if (l[theHeight][theWidth].isOpened && l[theHeight][theWidth].isGuessed) {
        openedAndGuessedCount++;
      }
    }
  }
  // console.log(listOfClickedCell2);
  return size.sideLen * size.sideLen - 1 === openedAndGuessedCount;
}
// let countOpenedCells = 0;
let listOfClickedCell: IClickedCell[] = [];
export function handleSomethingWithList(
  l: IGameDiv[][],
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  id: string,
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>,
  countOpenedCells: number,
  setCountOpenedCells: Dispatch<SetStateAction<number>>
  // listOfClickedCell: IClickedCell[],
  // setListOfClickedCell: Dispatch<SetStateAction<IClickedCell[]>>
) {
  setToggleTimeStartOrStop(true);
  // condition to allow open?!
  let clickedCell: IClickedCell = { v: -1, h: -1, w: -1 };
  const theH = parseInt(id.split("-")[0]);
  const theW = parseInt(id.split("-")[1]);
  // console.log(countOpenedCells, "countOpenedCells Begining");
  if (countOpenedCells === 0 && !l[theH][theW].isGuessed && !l[theH][theW].isOpened) {
    // const tempList = [...l];
    // tempList[theH][theW].isOpened = true;
    l[theH][theW].isOpened = true;
    clickedCell = {
      v: l[theH][theW].theValue,
      h: theH,
      w: theW,
    };
    listOfClickedCell.push(clickedCell);
    // console.log(listOfClickedCell);
    // const tl = [...listOfClickedCell];
    // tl.push(clickedCell);
    // setListOfClickedCell(tl);
    // setListOfClickedCell((currentClicks) => [...currentClicks, clickedCell]);
    // console.log(clickedCell, countOpenedCells, listOfClickedCell);

    setRealGameFieldBackEnd([...l]);
    // console.log("L: l", l);
    // setRealGameFieldBackEnd([...tempList]);
    setCountOpenedCells(1);
    // countOpenedCells++;
    // console.log(countOpenedCells, "countOpenedCells", listOfClickedCell, "listOfClickedCell");
    // console.log(
    //   countOpenedCells === 1,
    //   !(listOfClickedCell[0].h === theH && listOfClickedCell[0].w === theW),
    //   !l[theH][theW].isGuessed,
    //   !l[theH][theW].isOpened
    // );
  } else if (
    countOpenedCells === 1 &&
    // prevents from clicking same cell as first time!
    !(listOfClickedCell[0].h === theH && listOfClickedCell[0].w === theW) &&
    !l[theH][theW].isGuessed &&
    !l[theH][theW].isOpened
  ) {
    // console.log("---------------I am here");
    const tempList = [...l];
    tempList[theH][theW].isOpened = true;
    l[theH][theW].isOpened = true;
    clickedCell = {
      v: l[theH][theW].theValue,
      h: theH,
      w: theW,
    };
    listOfClickedCell.push(clickedCell);
    // const tl = [...listOfClickedCell];
    // tl.push(clickedCell);
    // setListOfClickedCell((currentClicks) => [...currentClicks, clickedCell]);
    // setListOfClickedCell([...listOfClickedCell]);
    // setRealGameFieldBackEnd([...tempList]);
    setRealGameFieldBackEnd([...l]);
    setCountOpenedCells(2);
    // countOpenedCells++;
    // console.log(countOpenedCells, listOfClickedCell);
    if (listOfClickedCell[0].v === listOfClickedCell[1].v) {
      // const tempList = [...l];
      l[listOfClickedCell[0].h][listOfClickedCell[0].w].isGuessed = true;
      l[listOfClickedCell[1].h][listOfClickedCell[1].w].isGuessed = true;
      setRealGameFieldBackEnd([...l]);
      setIsMachedPair("You Found A Pair! Congrats!" + `< ${clickedCell.v} >`);
      // console.log("BEFORE  2> - setCountOpenedCells(0)", countOpenedCells);

      if (countOpenedCells >= 1) {
        // console.log("setCountOpenedCells(0)", countOpenedCells);
        setCountOpenedCells(0);
        // countOpenedCells = 0;
      }
    }
    listOfClickedCell = [];
    // console.log("Function: setListOfClickedCell", setListOfClickedCell);
    // setListOfClickedCell(listOfClickedCell);
  }
  // console.log("END OF FUNCTION!");
}

// export function handleSomethingWithList(
//   l: IGameDiv[][],
//   setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
//   id: string,
//   setIsMachedPair: Dispatch<SetStateAction<string>>,
//   setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>,
//   countOpenedCells: number,
//   setCountOpenedCells: Dispatch<SetStateAction<number>>,
//   listOfClickedCell: IClickedCell[],
//   setListOfClickedCell: Dispatch<SetStateAction<IClickedCell[]>>
// ) {
//   setToggleTimeStartOrStop(true);
//   // condition to allow open?!
//   let clickedCell: IClickedCell = { v: -1, h: -1, w: -1 };
//   const theH = parseInt(id.split("-")[0]);
//   const theW = parseInt(id.split("-")[1]);
//   console.log(countOpenedCells, "countOpenedCells Begining");
//   if (countOpenedCells === 0 && !l[theH][theW].isGuessed && !l[theH][theW].isOpened) {
//     // const tempList = [...l];
//     // tempList[theH][theW].isOpened = true;
//     l[theH][theW].isOpened = true;
//     clickedCell = {
//       v: l[theH][theW].theValue,
//       h: theH,
//       w: theW,
//     };
//     listOfClickedCell.push(clickedCell);
//     console.log(listOfClickedCell);
//     // const tl = [...listOfClickedCell];
//     // tl.push(clickedCell);
//     // setListOfClickedCell(tl);
//     // setListOfClickedCell((currentClicks) => [...currentClicks, clickedCell]);
//     console.log(clickedCell, countOpenedCells, listOfClickedCell);

//     setRealGameFieldBackEnd([...l]);
//     console.log("L: l", l);
//     // setRealGameFieldBackEnd([...tempList]);
//     // setCountOpenedCells((p) => p + 1);
//     countOpenedCells++;
//     console.log(countOpenedCells, "countOpenedCells", listOfClickedCell, "listOfClickedCell");
//     console.log(
//       countOpenedCells === 1,
//       !(listOfClickedCell[0].h === theH && listOfClickedCell[0].w === theW),
//       !l[theH][theW].isGuessed,
//       !l[theH][theW].isOpened
//     );
//   } else if (
//     countOpenedCells === 1 &&
//     // prevents from clicking same cell as first time!
//     !(listOfClickedCell[0].h === theH && listOfClickedCell[0].w === theW) &&
//     !l[theH][theW].isGuessed &&
//     !l[theH][theW].isOpened
//   ) {
//     console.log("---------------I am here");
//     // const tempList = [...l];
//     // tempList[theH][theW].isOpened = true;
//     l[theH][theW].isOpened = true;
//     clickedCell = {
//       v: l[theH][theW].theValue,
//       h: theH,
//       w: theW,
//     };
//     listOfClickedCell.push(clickedCell);
//     // const tl = [...listOfClickedCell];
//     // tl.push(clickedCell);
//     // setListOfClickedCell((currentClicks) => [...currentClicks, clickedCell]);
//     setListOfClickedCell([...listOfClickedCell]);
//     // setRealGameFieldBackEnd([...tempList]);
//     setRealGameFieldBackEnd([...l]);
//     // setCountOpenedCells((p) => p + 1);
//     countOpenedCells++;
//     console.log(countOpenedCells, listOfClickedCell);
//     if (listOfClickedCell[0].v === listOfClickedCell[1].v) {
//       // const tempList = [...l];
//       l[listOfClickedCell[0].h][listOfClickedCell[0].w].isGuessed = true;
//       l[listOfClickedCell[1].h][listOfClickedCell[1].w].isGuessed = true;
//       setRealGameFieldBackEnd([...l]);
//       setIsMachedPair("You Found A Pair! Congrats!" + `< ${clickedCell.v} >`);

//       if (countOpenedCells >= 2) {
//         setCountOpenedCells(0);
//       }
//     }
//     listOfClickedCell = [];
//     console.log("Function: setListOfClickedCell", setListOfClickedCell);
//     setListOfClickedCell(listOfClickedCell);
//   }
//   console.log("END OF FUNCTION!");
// }
