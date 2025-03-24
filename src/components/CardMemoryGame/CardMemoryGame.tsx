import { useState, Dispatch, SetStateAction, useEffect } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { generateField } from "./GameDiv";
import { isGameWon, countOpenedButNotGuessedCells } from "./CardMemoryHelperFunctions";
let countOpenedCells = 0;
let listOfClickedCell: IClickedCell[] = [];

interface IClickedCell {
  v: number;
  h: number;
  w: number;
}

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ w: 5, h: 5 });
  const game2dList: IGameDiv[][] = generateField(fieldSize.h);
  const [selectedSize, setSelectedSize] = useState<number>(5); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<IGameDiv[][]>(game2dList);
  const [isMachedPair, setIsMachedPair] = useState<string>("Hey try to find a matching pair!");

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setFieldSize({ w: selectedSize, h: selectedSize }); // Apply selected size on confirm
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState<boolean>(false);
  // const timePassed = TheTimer({ isTimeStarted: isTimeStarted }).realSeconds;

  useEffect(() => {
    const c = countOpenedButNotGuessedCells(realGameFieldBackEnd, fieldSize);
    // console.log(`opened Cels :  ${c}`);
    let interval: number;

    if (isTimeStarted && c === 2) {
      setIsMachedPair("PAIR NOT FOUND!!!");

      interval = setInterval(() => {
        for (let theHeight = 0; theHeight < fieldSize.h; theHeight++) {
          for (let theWidth = 0; theWidth < fieldSize.w; theWidth++) {
            if (
              realGameFieldBackEnd[theHeight][theWidth].isOpened &&
              !realGameFieldBackEnd[theHeight][theWidth].isGuessed
            ) {
              realGameFieldBackEnd[theHeight][theWidth].isOpened = false;
            }
          }
        }
        console.log("Howdy");
        countOpenedCells = 0;
      }, 3000);
    }
    const isVictory = isGameWon(realGameFieldBackEnd, fieldSize);
    if (isVictory) {
      console.log("GAME IS WON CONGRATULATIONS!!!");
      setToggleTimeStartOrStop(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeStarted, realGameFieldBackEnd, fieldSize]);

  return (
    <>
      <h1>Card Memory Game</h1>
      <button
        onClick={() => {
          console.log(realGameFieldBackEnd);
        }}
      >
        Print Field
      </button>
      <button
        onClick={() => {
          console.log(realGameFieldBackEnd.map((l) => [...l.map((o) => o.theValue)]));
        }}
      >
        Print Field Maped
      </button>
      {/* <button onClick={() => setToggleTimeStartOrStop(true)}>Start</button>
      <button onClick={() => setToggleTimeStartOrStop(false)}>Stop</button> */}
      <h3>{TheTimer({ isTimeStarted: isTimeStarted }).timeString}</h3>
      {/* <h3>TIME PASED = {timePassed}</h3> */}
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
          {/* <option value="50">50x50</option> */}
        </select>
        <button type="submit">Confirm</button>
      </form>
      {gameField(
        fieldSize,
        setRealGameFieldBackEnd,
        realGameFieldBackEnd,
        setIsMachedPair,
        setToggleTimeStartOrStop
      )}
    </>
  );
};

export default CardMemoryGame;

function gameField(
  size: IFieldSize,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  fieldList: IGameDiv[][],
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>
) {
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto ".repeat(size.w),
    backgroundColor: "dodgerblue",
    padding: "10px",
  };

  const divStyle: React.CSSProperties = {
    backgroundColor: "#f1f1f1",
    border: "1px solid black",
    padding: "10px",
    fontSize: "30px",
    textAlign: "center",
  };
  const listOfdivs = [];
  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      listOfdivs.push(
        <div
          style={divStyle}
          key={`${theHeight}-${theWidth}`}
          onClick={() => {
            handleSomethingWithList(
              fieldList,
              setRealGameFieldBackEnd,
              `${theHeight}-${theWidth}`,
              setIsMachedPair,
              setToggleTimeStartOrStop
            );

            // console.log(`clicked <div> ${theHeight}-${theWidth}`);
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

function handleSomethingWithList(
  l: IGameDiv[][],
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  id: string,
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>
) {
  setToggleTimeStartOrStop(true);
  // condition to allow open?!
  let clickedCell: IClickedCell = { v: -1, h: -1, w: -1 };
  // let openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
  const theH = parseInt(id.split("-")[0]);
  const theW = parseInt(id.split("-")[1]);
  if (countOpenedCells === 0 && !l[theH][theW].isGuessed && !l[theH][theW].isOpened) {
    const tempList = [...l];
    tempList[theH][theW].isOpened = true;
    clickedCell = {
      v: tempList[theH][theW].theValue,
      h: theH,
      w: theW,
    };
    listOfClickedCell.push(clickedCell);
    setRealGameFieldBackEnd([...tempList]);
    countOpenedCells++;
    // console.log(listOfClickedCell);
  } else if (
    countOpenedCells === 1 &&
    // prevents from clicking same cell as first time!
    !(listOfClickedCell[0].h === theH && listOfClickedCell[0].w === theW) &&
    !l[theH][theW].isGuessed &&
    !l[theH][theW].isOpened
  ) {
    const tempList = [...l];
    tempList[theH][theW].isOpened = true;
    clickedCell = {
      v: tempList[theH][theW].theValue,
      h: theH,
      w: theW,
    };
    listOfClickedCell.push(clickedCell);
    setRealGameFieldBackEnd([...tempList]);
    countOpenedCells++;
    // console.log("second click!", listOfClickedCell, theH, theW);
    if (listOfClickedCell[0].v === listOfClickedCell[1].v) {
      // console.log("SAME VALUE");
      const tempList = [...l];
      tempList[listOfClickedCell[0].h][listOfClickedCell[0].w].isGuessed = true;
      tempList[listOfClickedCell[1].h][listOfClickedCell[1].w].isGuessed = true;
      setRealGameFieldBackEnd([...tempList]);
      setIsMachedPair("You Found A Pair! Congrats!" + `< ${clickedCell.v} >`);

      if (countOpenedCells >= 2) {
        countOpenedCells = 0;
        // console.log("cop", countOpenedCells);
      }
    }
    listOfClickedCell = [];
  }

  // console.log("START - countOpenedCells", countOpenedCells, clickedCell);
}
