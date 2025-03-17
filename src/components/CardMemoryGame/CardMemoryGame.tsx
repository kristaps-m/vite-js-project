import { useState, Dispatch, SetStateAction } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { gameFieldBackEnd } from "./GameDiv";

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ w: 5, h: 5 });
  const [selectedSize, setSelectedSize] = useState<number>(5); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<IGameDiv[][]>(gameFieldBackEnd);
  const [isMachedPair, setIsMachedPair] = useState<string>("Hey try to find a matching pair!");

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setFieldSize({ w: selectedSize, h: selectedSize }); // Apply selected size on confirm
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState(false);

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

      <TheTimer isTimeStarted={isTimeStarted} />
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
      {gameField(fieldSize, setRealGameFieldBackEnd, realGameFieldBackEnd, setIsMachedPair)}
    </>
  );
};

export default CardMemoryGame;

function gameField(
  size: IFieldSize,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  fieldList: IGameDiv[][],
  setIsMachedPair: Dispatch<SetStateAction<string>>
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
              setIsMachedPair
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
  size: IFieldSize,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  id: string,
  setIsMachedPair: Dispatch<SetStateAction<string>>
) {
  const theH = parseInt(id.split("-")[0]);
  const theW = parseInt(id.split("-")[1]);
  const tempList = [...l];
  tempList[theH][theW].isOpened = true;
  setRealGameFieldBackEnd([...tempList]);
  let countOpenedCells = 0;
  let openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      if (l[theHeight][theWidth].isOpened && !l[theHeight][theWidth].isGuessed) {
        if (countOpenedCells === 0) {
          openedCells.a = l[theHeight][theWidth].theValue;
          openedCells.ha = theHeight;
          openedCells.wa = theWidth;
        } else if (countOpenedCells === 1) {
          openedCells.b = l[theHeight][theWidth].theValue;
          openedCells.hb = theHeight;
          openedCells.wb = theWidth;
        }
        countOpenedCells++;
      }
    }
  }

  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      if (openedCells.a === openedCells.b && openedCells.a !== 9999) {
        const tempField = [...l];
        tempField[openedCells.ha][openedCells.wa].isGuessed = true;
        tempField[openedCells.hb][openedCells.wb].isGuessed = true;
        tempField[openedCells.ha][openedCells.wa].isOpened = true;
        tempField[openedCells.hb][openedCells.wb].isOpened = true;
        setIsMachedPair("You Found A Pair! Congrats!" + `< ${openedCells.a} >`);
        openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
        countOpenedCells = 0;
        setRealGameFieldBackEnd([...tempField]);
        alert("You have found 2 matching Cards!");
      } else if (openedCells.a !== openedCells.b && countOpenedCells !== 1) {
        const tempField = [...l];
        setIsMachedPair("PAIR NOT FOUND!!!");
        setTimeout(function () {
          if (
            tempField[openedCells.ha][openedCells.wa].isGuessed === false &&
            tempField[openedCells.hb][openedCells.wb].isGuessed === false
          ) {
            tempField[openedCells.ha][openedCells.wa].isOpened = false;
            tempField[openedCells.hb][openedCells.wb].isOpened = false;
          }
          openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
          countOpenedCells = 0;
          setRealGameFieldBackEnd([...tempField]);
        }, 2000);
      }
    }
  }
  // console.log("countOpenedCells", countOpenedCells);
}
