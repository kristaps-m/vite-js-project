import { useState, useEffect } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { gameFieldBackEnd } from "./GameDiv";
import {
  isGameWon,
  countOpenedButNotGuessedCells,
} from "./CardMemoryHelperFunctions";
import { IClickedCell } from "../../interfaces/IClickedCell";
import GameField from "./GameField";
import {
  CAN_GAME_BEGIN_STR,
  CARD_GAME_LEVELS,
  FIELD_SIZE_STR,
  HIGHSCORE_STR,
  MEMO_GAME_CARDS_STR,
  TIME_PASSED_STR,
} from "../../constants";
import { useMemoryGame } from "./MemoryGameContext";

const CardMemoryGame = () => {
  const { testMode } = useMemoryGame();
  const [fieldSize, setFieldSize] = useState<number>(() => {
    const fS = localStorage.getItem(FIELD_SIZE_STR);
    return fS ? parseInt(fS) : 5;
  });
  const [selectedSize, setSelectedSize] = useState<number>(); // Temporary selection
  const [realGameFieldBackEnd, setRealGameFieldBackEnd] = useState<
    IGameDiv[][]
  >(() => {
    const savedGameField = localStorage.getItem(MEMO_GAME_CARDS_STR);
    return savedGameField
      ? JSON.parse(savedGameField)
      : gameFieldBackEnd(fieldSize, testMode);
  });
  const [isMachedPair, setIsMachedPair] = useState<string>(
    "Hey try to find a matching pair!"
  );
  const [canGameBegin, setCanGameBegin] = useState<string>(() => {
    const savedCanGameBegin = localStorage.getItem(CAN_GAME_BEGIN_STR);
    return savedCanGameBegin ? savedCanGameBegin : "false";
  });
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };
  const [countOpenedCells, setCountOpenedCells] = useState(0);
  const [listOfClickedCell, setListOfClickedCell] = useState<IClickedCell[]>(
    []
  );

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setCanGameBegin("true");
    setFieldSize(selectedSize ? selectedSize : CARD_GAME_LEVELS.easy);
    setCountOpenedCells(0);
    setListOfClickedCell([]);
    setTimePassed(0);
    setIsMachedPair("Hey try to find a matching pair!");
    setRealGameFieldBackEnd(
      gameFieldBackEnd(
        selectedSize ? selectedSize : CARD_GAME_LEVELS.easy,
        testMode
      )
    );
    setToggleTimeStartOrStop(false);
    const localStorageHighscore = localStorage.getItem(
      HIGHSCORE_STR + selectedSize
    );
    setHighscore(localStorageHighscore ? localStorageHighscore : "0");
  };

  //  FOR TIMER
  const [isTimeStarted, setToggleTimeStartOrStop] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState(() => {
    const localStorageTimePassed = localStorage.getItem(TIME_PASSED_STR);
    return localStorageTimePassed ? parseInt(localStorageTimePassed) : 0;
  });
  const [highscore, setHighscore] = useState(() => {
    const localStorageHighscore = localStorage.getItem(
      HIGHSCORE_STR + fieldSize
    );
    return localStorageHighscore ? localStorageHighscore : "0";
  });

  useEffect(() => {
    localStorage.setItem(CAN_GAME_BEGIN_STR, canGameBegin.toString());
    localStorage.setItem(
      MEMO_GAME_CARDS_STR,
      JSON.stringify(realGameFieldBackEnd)
    );
    localStorage.setItem(TIME_PASSED_STR, timePassed.toString());
    localStorage.setItem(FIELD_SIZE_STR, fieldSize.toString());
  }, [canGameBegin, realGameFieldBackEnd, timePassed, fieldSize]);

  useEffect(() => {
    const c = countOpenedButNotGuessedCells(realGameFieldBackEnd, fieldSize);
    let interval: number;

    if (isTimeStarted && c === 2) {
      setIsMachedPair("PAIR NOT FOUND!!!");

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
        console.log(
          "Cards where not equal they are turned over after 3 seconds!"
        );
        setCountOpenedCells(0);
        localStorage.setItem(
          MEMO_GAME_CARDS_STR,
          JSON.stringify(realGameFieldBackEnd)
        );
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
        localStorage.setItem(HIGHSCORE_STR + fieldSize, timePassed.toString());
        setHighscore(timePassed.toString());
      } else if (timePassed < parseInt(highscore)) {
        localStorage.setItem(HIGHSCORE_STR + fieldSize, timePassed.toString());
        setHighscore(timePassed.toString());
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeStarted, realGameFieldBackEnd, fieldSize]);

  return (
    <div
      style={{
        // margin from top depending on gameSize so that text "Card Memory Game" is visible.
        // 5x5 = 20, 30x30 = 90, 10x10 = 35
        marginTop: `${fieldSize < 6 ? 20 : fieldSize >= 30 ? 90 : 35}rem`,
      }}
    >
      <h1>Card Memory Game</h1>
      {testMode ? <p style={{ backgroundColor: "red" }}>TEST MODE</p> : null}
      {/* <button
        onClick={() => {
          console.log(realGameFieldBackEnd.map((l) => [...l.map((o) => o.theValue)]));
        }}
      >
        Print Field Maped
      </button> */}
      <h5>
        highscore {fieldSize}x{fieldSize}:{" "}
        {new Date(parseInt(highscore) * 1000).toISOString().substring(11, 19)}
      </h5>
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
          <option value={CARD_GAME_LEVELS.easy}>5 x 5</option>
          <option value={CARD_GAME_LEVELS.medium}>10 x 10</option>
          <option value={CARD_GAME_LEVELS.hard}>30 x 30</option>
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
