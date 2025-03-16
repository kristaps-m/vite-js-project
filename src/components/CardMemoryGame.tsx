import { useEffect, useState } from "react";

interface IFieldSize {
  w: number;
  h: number;
}

interface IGameDiv {
  theValue: number;
  isOpened: boolean;
  isGuessed: boolean;
}
class GameDiv implements IGameDiv {
  constructor(theValue, isOpened, isGuessed) {
    this.theValue = theValue;
    this.isOpened = isOpened;
    this.isGuessed = isGuessed;
  }
  theValue: number;
  isOpened: boolean;
  isGuessed: boolean;
}
// const gameFieldBackEnd: number[][] = [
//   [1, 1, 2, 2, 11],
//   [3, 3, 4, 4, 11],
//   [5, 5, 6, 6, 12],
//   [7, 7, 8, 8, 12],
//   [9, 9, 10, 10, 99],
// ];
// {theValue:1, isOpened:false, isGuessed:false}
const gameFieldBackEnd: IGameDiv[][] = [
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

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ w: 5, h: 5 });
  const [selectedSize, setSelectedSize] = useState<number>(5); // Temporary selection
  // const [sCells, setSCells] = useState<number[]>([]);
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<IGameDiv[][]>(gameFieldBackEnd);

  // useEffect(() => {
  //   // console.log(realGameFieldBackEnd);
  //   handleSomethingWithList(realGameFieldBackEnd, fieldSize, setRealGameFieldBackEnd);
  // }, []);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setFieldSize({ w: selectedSize, h: selectedSize }); // Apply selected size on confirm
    console.log("Selected field size:", fieldSize);
  };

  // const toggleOneDivChange: (id: string) => void = (id: string) => {
  //   const d = document.getElementById(id);
  //   // d.textContent = `${Math.random()}`.slice(2, 7);
  //   console.log(id, id.split("-"));
  //   const theH = parseInt(id.split("-")[0]);
  //   const theW = parseInt(id.split("-")[1]);
  //   d.textContent = `${gameFieldBackEnd[theH][theW]}`;
  // };

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
        //  toggleOneDivChange,
        setRealGameFieldBackEnd,
        realGameFieldBackEnd
      )}
    </>
  );
};

export default CardMemoryGame;

function gameField(
  size: IFieldSize,
  // toggleOneDivChange: (id: string) => void,
  setRealGameFieldBackEnd,
  fieldList: IGameDiv[][]
) {
  // console.log(fieldList);
  // let tempNumbersColector = [];
  // const handleSetSCells = () => {
  //   if (tempNumbersColector.length === 2) {
  //     setSCells(tempNumbersColector);
  //     console.log(tempNumbersColector);
  //     tempNumbersColector = [];
  //   }
  // };
  function handleEditGameDiv(id: string) {
    const theH = parseInt(id.split("-")[0]);
    const theW = parseInt(id.split("-")[1]);
    const tempList = [...fieldList];
    tempList[theH][theW].isOpened = true;
    setRealGameFieldBackEnd([...tempList]);
  }

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "auto ".repeat(size.w),
    backgroundColor: "dodgerblue",
    padding: "10px",
  };

  const divStyle = {
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
            // toggleOneDivChange(`${theHeight}-${theWidth}`);
            // setSCells([]);
            // tempNumbersColector.push(gameFieldBackEnd[theHeight][theWidth]);
            // handleSetSCells;
            // handleEditGameDiv(`${theHeight}-${theWidth}`);
            handleSomethingWithList(
              fieldList,
              size,
              setRealGameFieldBackEnd,
              `${theHeight}-${theWidth}`
            );

            console.log(`clicked <div> ${theHeight}-${theWidth}`);
          }}
          id={`${theHeight}-${theWidth}`}
        >
          {/* {theHeight}-{theWidth} */}
          {/* {gameFieldBackEnd[theHeight][theWidth]} */}
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
  setRealGameFieldBackEnd,
  id: string
) {
  // console.log(l, size, id);
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
        openedCells = { a: 9999, b: 9999, ha: 0, wa: 0, hb: 0, wb: 0 };
        countOpenedCells = 0;
        setRealGameFieldBackEnd([...tempField]);
      } else if (openedCells.a !== openedCells.b && countOpenedCells !== 1) {
        const tempField = [...l];
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
  console.log("countOpenedCells", countOpenedCells);
}
