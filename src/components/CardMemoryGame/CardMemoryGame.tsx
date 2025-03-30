import { useState, useEffect } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { gameFieldBackEnd } from "./GameDiv";
import { isGameWon, countOpenedButNotGuessedCells } from "./CardMemoryHelperFunctions";
import { IClickedCell } from "../../interfaces/IClickedCell";
import GameField from "./GameField";
const MEMO_GAME_STR_NAME = "memoryGameCards";
const CAN_GAME_BEGIN_STR = "canGameBegin";
const TIME_PASSED_STR = "timePassed";

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<number>(() => {
    const fS = localStorage.getItem("fieldSize");
    return fS ? parseInt(fS) : 5;
  });
  const [selectedSize, setSelectedSize] = useState<number>(); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<IGameDiv[][]>(() => {
    const savedGameField = localStorage.getItem(MEMO_GAME_STR_NAME);
    return savedGameField ? JSON.parse(savedGameField) : gameFieldBackEnd(fieldSize);
  });
  const [isMachedPair, setIsMachedPair] = useState<string>("Hey try to find a matching pair!");
  const [canGameBegin, setCanGameBegin] = useState<string>(() => {
    const savedCanGameBegin = localStorage.getItem(CAN_GAME_BEGIN_STR);
    return savedCanGameBegin ? savedCanGameBegin : "false";
  });
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };
  const [countOpenedCells, setCountOpenedCells] = useState(0);
  const [listOfClickedCell, setListOfClickedCell] = useState<IClickedCell[]>([]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setCanGameBegin("true");
    setFieldSize(selectedSize ? selectedSize : 5);
    setCountOpenedCells(0);
    setListOfClickedCell([]);
    setTimePassed(0);
    setIsMachedPair("Hey try to find a matching pair!");
    setRealGameFieldBackEnd(gameFieldBackEnd(selectedSize ? selectedSize : 5));
    setToggleTimeStartOrStop(false);
    const localStorageHighscore = localStorage.getItem("highscore" + selectedSize);
    setHighscore(localStorageHighscore ? localStorageHighscore : "0");
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState(() => {
    const localStorageTimePassed = localStorage.getItem(TIME_PASSED_STR);
    return localStorageTimePassed ? parseInt(localStorageTimePassed) : 0;
  });
  const [highscore, setHighscore] = useState(() => {
    const localStorageHighscore = localStorage.getItem("highscore" + selectedSize);
    return localStorageHighscore ? localStorageHighscore : "0";
  });

  useEffect(() => {
    localStorage.setItem(CAN_GAME_BEGIN_STR, canGameBegin.toString());
    localStorage.setItem(MEMO_GAME_STR_NAME, JSON.stringify(realGameFieldBackEnd));
    localStorage.setItem(TIME_PASSED_STR, timePassed.toString());
    localStorage.setItem("fieldSize", fieldSize.toString());
  }, [canGameBegin, realGameFieldBackEnd, timePassed, fieldSize]);

  useEffect(() => {
    const c = countOpenedButNotGuessedCells(realGameFieldBackEnd, fieldSize);
    console.log(c, isTimeStarted);
    let interval: number;

    if (isTimeStarted && c === 2) {
      setIsMachedPair("PAIR NOT FOUND!!!");
      // console.log("Before Howdy");

      interval = setInterval(() => {
        for (let theHeight = 0; theHeight < fieldSize; theHeight++) {
          for (let theWidth = 0; theWidth < fieldSize; theWidth++) {
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
        localStorage.setItem(MEMO_GAME_STR_NAME, JSON.stringify(realGameFieldBackEnd));
        // setRealGameFieldBackEnd(realGameFieldBackEnd);
      }, 3000);
    }
    const isVictory = isGameWon(realGameFieldBackEnd, fieldSize);
    if (isVictory) {
      // alert("GAME IS WON CONGRATULATIONS!!!");
      console.log("console says: 'GAME IS WON CONGRATULATIONS!!!'");
      setIsMachedPair("GAME IS WON CONGRATULATIONS!!!");
      setCountOpenedCells(0);
      setToggleTimeStartOrStop(false);
      if (highscore === "0") {
        localStorage.setItem("highscore" + selectedSize, timePassed.toString());
        setHighscore(timePassed.toString());
      } else if (timePassed < parseInt(highscore)) {
        localStorage.setItem("highscore" + selectedSize, timePassed.toString());
        setHighscore(timePassed.toString());
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeStarted, realGameFieldBackEnd, fieldSize]); // , timePassed, highscore, selectedSize
  // console.log(fieldSize, " fieldSize", realGameFieldBackEnd);
  return (
    <div
      style={{
        // margin from top depending on gameSize so that text "Card Memory Game" is visible.
        // 5x5 = 20, 30x30 = 90, 10x10 = 35
        marginTop: `${fieldSize < 6 ? 20 : fieldSize >= 30 ? 90 : 35}rem`,
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
      <button
        onClick={() => {
          console.log(realGameFieldBackEnd.map((l) => [...l.map((o) => o.theValue)]));
        }}
      >
        Print Field Maped
      </button>
      <h6>highscore: {new Date(parseInt(highscore) * 1000).toISOString().substring(11, 19)}</h6>
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
          <option value="30">30x30</option>
        </select>
        <button type="submit">Confirm</button>
      </form>
      {canGameBegin === "true" ? (
        GameField(
          fieldSize,
          setRealGameFieldBackEnd,
          realGameFieldBackEnd,
          setIsMachedPair,
          setToggleTimeStartOrStop,
          countOpenedCells,
          setCountOpenedCells,
          listOfClickedCell,
          setListOfClickedCell
        )
      ) : (
        <h1>Select Difficulty</h1>
      )}
    </div>
  );
};

export default CardMemoryGame;
