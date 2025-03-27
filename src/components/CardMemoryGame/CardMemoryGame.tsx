import { useState, useEffect } from "react";
import TheTimer from "./TheTimer";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IFieldSize } from "../../interfaces/IFieldSize";
import { gameFieldBackEnd } from "./GameDiv";
import { isGameWon, countOpenedButNotGuessedCells } from "./CardMemoryHelperFunctions";
import { IClickedCell } from "../../interfaces/IClickedCell";
import GameField from "./GameField";

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
  const [listOfClickedCell, setListOfClickedCell] = useState<IClickedCell[]>([]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setCanGameBegin(true);
    setFieldSize({ sideLen: selectedSize }); // Apply selected size on confirm
    setCountOpenedCells(0);
    setListOfClickedCell([]);
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
      }, 3000);
    }
    const isVictory = isGameWon(realGameFieldBackEnd, fieldSize);
    if (isVictory) {
      // alert("GAME IS WON CONGRATULATIONS!!!");
      console.log("console says: 'GAME IS WON CONGRATULATIONS!!!'");
      setIsMachedPair("GAME IS WON CONGRATULATIONS!!!");
      setCountOpenedCells(0);
      setToggleTimeStartOrStop(false);
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
        marginTop: `${fieldSize.sideLen < 6 ? 20 : fieldSize.sideLen >= 30 ? 90 : 35}rem`,
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
      <button onClick={() => console.log(countOpenedCells, listOfClickedCell)}>Click Count</button>
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
          <option value="30">30x30</option>
        </select>
        <button type="submit">Confirm</button>
      </form>
      {canGameBegin ? (
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
