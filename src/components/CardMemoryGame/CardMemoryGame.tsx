import { useState, Dispatch, SetStateAction } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { gameFieldBackEnd } from "./GameDiv";
let countOpenedCells = 0;
let listOfClickedCell: IClickedCell[] = [];

interface IClickedCell {
  v: number;
  h: number;
  w: number;
  time: number;
}

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ w: 5, h: 5 });
  const [selectedSize, setSelectedSize] = useState<number>(5); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] =
    useState<IGameDiv[][]>(gameFieldBackEnd);
  const [isMachedPair, setIsMachedPair] = useState<string>(
    "Hey try to find a matching pair!"
  );

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setFieldSize({ w: selectedSize, h: selectedSize }); // Apply selected size on confirm
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState(false);
  const timePassed = TheTimer({ isTimeStarted: isTimeStarted }).realSeconds;

  return (
    <>
      <h1>Card Memory Game</h1>
      <button
        onClick={() => {
          console.log(gameFieldBackEnd);
        }}
      >
        Print Field
      </button>
      <button onClick={() => setToggleTimeStartOrStop(true)}>Start</button>
      <button onClick={() => setToggleTimeStartOrStop(false)}>Stop</button>

      {/* <TheTimer isTimeStarted={isTimeStarted} /> */}
      <h3>{TheTimer({ isTimeStarted: isTimeStarted }).timeString}</h3>
      <h3>TIME PASED = {timePassed}</h3>
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
        timePassed
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
  timeInSec: number
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
              size,
              setRealGameFieldBackEnd,
              `${theHeight}-${theWidth}`,
              setIsMachedPair,
              timeInSec
            );

            // console.log(`clicked <div> ${theHeight}-${theWidth}`);
          }}
          id={`${theHeight}-${theWidth}`}
        >
          {fieldList[theHeight][theWidth].isOpened
            ? fieldList[theHeight][theWidth].theValue
            : "?"}
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
  size: IFieldSize,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  id: string,
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  timeInSec: number
) {
  // condition to allow open?!
  let clickedCell: IClickedCell = { v: -1, h: -1, w: -1, time: 0 };
  let canYouResetList = false;
  // let openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
  const theH = parseInt(id.split("-")[0]);
  const theW = parseInt(id.split("-")[1]);
  if (
    countOpenedCells === 0 &&
    !l[theH][theW].isGuessed &&
    !l[theH][theW].isOpened
  ) {
    const tempList = [...l];
    tempList[theH][theW].isOpened = true;
    clickedCell = {
      v: tempList[theH][theW].theValue,
      h: theH,
      w: theW,
      time: timeInSec,
    };
    listOfClickedCell.push(clickedCell);
    setRealGameFieldBackEnd([...tempList]);
    countOpenedCells++;
    console.log(listOfClickedCell);
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
      time: timeInSec,
    };
    listOfClickedCell.push(clickedCell);
    setRealGameFieldBackEnd([...tempList]);
    countOpenedCells++;
    console.log("second click!", listOfClickedCell, theH, theW);
    if (listOfClickedCell[0].v === listOfClickedCell[1].v) {
      console.log("SAME VALUE");
      const tempList = [...l];
      tempList[listOfClickedCell[0].h][listOfClickedCell[0].w].isGuessed = true;
      tempList[listOfClickedCell[1].h][listOfClickedCell[1].w].isGuessed = true;
      setRealGameFieldBackEnd([...tempList]);
    } else {
      // sleep(2000).then(() => {
      if (Math.abs(timeInSec - listOfClickedCell[0].time) >= 2) {
        tempList[listOfClickedCell[0].h][listOfClickedCell[0].w].isOpened =
          false;
        tempList[listOfClickedCell[1].h][listOfClickedCell[1].w].isOpened =
          false;
        // console.log(11111111111);
        setRealGameFieldBackEnd([...tempList]);
      }
      // canYouResetList = true;
      // });
      // setInterval(() => {
      // }, 2000);
    }
    // if (canYouResetList) {
    listOfClickedCell = [];
    // }
    // console.log(22222222, "-", listOfClickedCell.length);
  }
  if (countOpenedCells >= 2) {
    countOpenedCells = 0;
    console.log("cop", countOpenedCells);
  }
  console.log("START - countOpenedCells", countOpenedCells, clickedCell);

  // for (let theHeight = 0; theHeight < size.h; theHeight++) {
  //   for (let theWidth = 0; theWidth < size.w; theWidth++) {
  //     if (l[theHeight][theWidth].isOpened && !l[theHeight][theWidth].isGuessed) {
  //       if (countOpenedCells === 0) {
  //         openedCells.a = l[theHeight][theWidth].theValue;
  //         openedCells.ha = theHeight;
  //         openedCells.wa = theWidth;
  //         countOpenedCells++;
  //       } else if (countOpenedCells === 1) {
  //         openedCells.b = l[theHeight][theWidth].theValue;
  //         openedCells.hb = theHeight;
  //         openedCells.wb = theWidth;
  //         countOpenedCells++;
  //       }
  //       // countOpenedCells++;
  //     }
  //   }
  // }
  // console.log("MID - countOpenedCells", countOpenedCells);

  // for (let theHeight = 0; theHeight < size.h; theHeight++) {
  //   for (let theWidth = 0; theWidth < size.w; theWidth++) {
  //     if (openedCells.a === openedCells.b && openedCells.a !== 9999) {
  //       const tempField = [...l];
  //       tempField[openedCells.ha][openedCells.wa].isGuessed = true;
  //       tempField[openedCells.hb][openedCells.wb].isGuessed = true;
  //       tempField[openedCells.ha][openedCells.wa].isOpened = true;
  //       tempField[openedCells.hb][openedCells.wb].isOpened = true;
  //       setIsMachedPair("You Found A Pair! Congrats!" + `< ${openedCells.a} >`);
  //       openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
  //       countOpenedCells = 0;
  //       setRealGameFieldBackEnd([...tempField]);
  //       alert("You have found 2 matching Cards!");
  //     } else if (openedCells.a !== openedCells.b && countOpenedCells !== 1) {
  //       const tempField = [...l];
  //       setIsMachedPair("PAIR NOT FOUND!!!");
  //       setTimeout(function () {
  //         if (
  //           tempField[openedCells.ha][openedCells.wa].isGuessed === false &&
  //           tempField[openedCells.hb][openedCells.wb].isGuessed === false
  //         ) {
  //           tempField[openedCells.ha][openedCells.wa].isOpened = false;
  //           tempField[openedCells.hb][openedCells.wb].isOpened = false;
  //         }
  //         openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
  //         setRealGameFieldBackEnd([...tempField]);
  //         countOpenedCells = 0;
  //       }, 2000);
  //     }
  //   }
  // }
  // console.log("countOpenedCells", countOpenedCells);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
