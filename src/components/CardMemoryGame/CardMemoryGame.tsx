import { useState, Dispatch, SetStateAction, useEffect } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { gameFieldBackEnd } from "./GameDiv";
import {
  isGameWon,
  countOpenedButNotGuessedCells,
  handleSomethingWithList,
} from "./CardMemoryHelperFunctions";
// import { IClickedCell } from "../../interfaces/IClickedCell";
// let countOpenedCells = 0;
// let listOfClickedCell: IClickedCell[] = [];

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ sideLen: 5 });
  const [selectedSize, setSelectedSize] = useState<number>(fieldSize.sideLen); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<IGameDiv[][]>(
    gameFieldBackEnd(fieldSize.sideLen)
  );
  const [isMachedPair, setIsMachedPair] = useState<string>("Hey try to find a matching pair!");
  const [canGameBegin, setCanGameBegin] = useState(false);
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };
  const [countOpenedCells, setCountOpenedCells] = useState(0);
  // const [listOfClickedCell, setListOfClickedCell] = useState<IClickedCell[]>([]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setCanGameBegin(true);
    setFieldSize({ sideLen: selectedSize }); // Apply selected size on confirm
    // setCountOpenedCells(0);
    // setListOfClickedCell([]);
    setTimePassed(0);
    setIsMachedPair("Hey try to find a matching pair!");
    setRealGameFieldBackEnd(gameFieldBackEnd(selectedSize));
    setToggleTimeStartOrStop(false);
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    const c = countOpenedButNotGuessedCells(realGameFieldBackEnd, fieldSize);
    let interval: number;

    if (isTimeStarted && c === 2) {
      setIsMachedPair("PAIR NOT FOUND!!!");

      interval = setInterval(() => {
        for (let theHeight = 0; theHeight < fieldSize.sideLen; theHeight++) {
          for (let theWidth = 0; theWidth < fieldSize.sideLen; theWidth++) {
            if (
              realGameFieldBackEnd[theHeight][theWidth].isOpened &&
              !realGameFieldBackEnd[theHeight][theWidth].isGuessed
            ) {
              realGameFieldBackEnd[theHeight][theWidth].isOpened = false;
            }
          }
        }
        console.log("Howdy");
        setCountOpenedCells(0);
        // countOpenedCells = 0;
      }, 3000);
    }
    const isVictory = isGameWon(realGameFieldBackEnd, fieldSize);
    if (isVictory) {
      console.log("GAME IS WON CONGRATULATIONS!!!");
      setIsMachedPair("Hey try to find a matching pair!");
      setToggleTimeStartOrStop(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeStarted, realGameFieldBackEnd, fieldSize]);

  return (
    <div
      style={{
        marginTop: `${fieldSize.sideLen < 6 ? 20 : fieldSize.sideLen > 40 ? 220 : 50}rem`,
      }}
    >
      <h1>Card Memory Game</h1>
      <button
        onClick={() => {
          console.log(realGameFieldBackEnd);
        }}
      >
        Print Field
      </button>
      <button onClick={() => console.log(countOpenedCells)}>Click Count</button>
      <button
        onClick={() => {
          console.log(realGameFieldBackEnd.map((l) => [...l.map((o) => o.theValue)]));
        }}
      >
        Print Field Maped
      </button>
      <h3>
        {
          TheTimer({
            isTimeStarted: isTimeStarted,
            setTimePassed: setTimePassed,
            timePassed: timePassed,
          }).timeString
        }
      </h3>
      <h3>--{isMachedPair}--</h3>
      <form onSubmit={handleConfirm}>
        <label htmlFor="gameDifficulty">Choose a Difficulty:</label>
        <select
          id="gameDifficulty"
          name="gameDifficulty"
          onChange={handleDifficultyChange}
          defaultValue={selectedSize}
        >
          <option value="5">5 x 5</option>
          <option value="10">10 x 10</option>
          <option value="50">50x50</option>
        </select>
        <button type="submit">Confirm</button>
      </form>
      {canGameBegin ? (
        gameField(
          fieldSize,
          setRealGameFieldBackEnd,
          realGameFieldBackEnd,
          setIsMachedPair,
          setToggleTimeStartOrStop,
          countOpenedCells,
          setCountOpenedCells
          // listOfClickedCell,
          // setListOfClickedCell
        )
      ) : (
        <h1>Select Difficulty</h1>
      )}
    </div>
  );
};

export default CardMemoryGame;

function gameField(
  size: IFieldSize,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  fieldList: IGameDiv[][],
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>,
  countOpenedCells: number,
  setCountOpenedCells: Dispatch<SetStateAction<number>>
  // listOfClickedCell: IClickedCell[],
  // setListOfClickedCell: Dispatch<SetStateAction<IClickedCell[]>>
) {
  // console.log(fieldList);
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto ".repeat(size.sideLen),
    backgroundColor: "dodgerblue",
    padding: "10px",
  };

  const listOfdivs = [];
  for (let theHeight = 0; theHeight < size.sideLen; theHeight++) {
    for (let theWidth = 0; theWidth < size.sideLen; theWidth++) {
      listOfdivs.push(
        <div
          style={{
            backgroundColor: `${
              fieldList[theHeight][theWidth].isGuessed ? "lightgreen" : "#f1f1f1"
            }`,
            border: "1px solid black",
            padding: "10px",
            fontSize: "30px",
            textAlign: "center",
          }}
          key={`${theHeight}-${theWidth}`}
          onClick={() => {
            handleSomethingWithList(
              fieldList,
              setRealGameFieldBackEnd,
              `${theHeight}-${theWidth}`,
              setIsMachedPair,
              setToggleTimeStartOrStop,
              countOpenedCells,
              setCountOpenedCells
              // listOfClickedCell,
              // setListOfClickedCell
            );
          }}
          id={`${theHeight}-${theWidth}`}
        >
          {fieldList[theHeight][theWidth].isOpened ? fieldList[theHeight][theWidth].theValue : "?"}
        </div>
      );
    }
  }
  return (
    <div style={containerStyle}>
      {listOfdivs.map((x) => {
        return x;
      })}
    </div>
  );
}

// function handleSomethingWithList(
//   l: IGameDiv[][],
//   setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
//   id: string,
//   setIsMachedPair: Dispatch<SetStateAction<string>>,
//   setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>
//   // countOpenedCells: number,
//   // setCountOpenedCells: Dispatch<SetStateAction<number>>,
//   // listOfClickedCell: IClickedCell[],
//   // setListOfClickedCell: Dispatch<SetStateAction<IClickedCell[]>>
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
//     // console.log(listOfClickedCell);
//     // const tl = [...listOfClickedCell];
//     // tl.push(clickedCell);
//     // setListOfClickedCell(tl);
//     // setListOfClickedCell((currentClicks) => [...currentClicks, clickedCell]);
//     // console.log(clickedCell, countOpenedCells, listOfClickedCell);

//     setRealGameFieldBackEnd([...l]);
//     // console.log("L: l", l);
//     // setRealGameFieldBackEnd([...tempList]);
//     // setCountOpenedCells((p) => p + 1);
//     countOpenedCells++;
//     // console.log(countOpenedCells, "countOpenedCells", listOfClickedCell, "listOfClickedCell");
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
//     const tempList = [...l];
//     tempList[theH][theW].isOpened = true;
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
//     // setListOfClickedCell([...listOfClickedCell]);
//     // setRealGameFieldBackEnd([...tempList]);
//     setRealGameFieldBackEnd([...l]);
//     // setCountOpenedCells((p) => p + 1);
//     countOpenedCells++;
//     // console.log(countOpenedCells, listOfClickedCell);
//     if (listOfClickedCell[0].v === listOfClickedCell[1].v) {
//       // const tempList = [...l];
//       l[listOfClickedCell[0].h][listOfClickedCell[0].w].isGuessed = true;
//       l[listOfClickedCell[1].h][listOfClickedCell[1].w].isGuessed = true;
//       setRealGameFieldBackEnd([...l]);
//       setIsMachedPair("You Found A Pair! Congrats!" + `< ${clickedCell.v} >`);

//       if (countOpenedCells >= 2) {
//         // setCountOpenedCells(0);
//         countOpenedCells = 0;
//       }
//     }
//     listOfClickedCell = [];
//     // console.log("Function: setListOfClickedCell", setListOfClickedCell);
//     // setListOfClickedCell(listOfClickedCell);
//   }
//   console.log("END OF FUNCTION!");
// }
