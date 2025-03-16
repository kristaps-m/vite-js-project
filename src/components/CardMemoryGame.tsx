import { useState } from "react";

interface IFieldSize {
  w: number;
  h: number;
}

const CardMemoryGame = () => {
  const [fieldSize, setFieldSize] = useState<IFieldSize>({ w: 10, h: 10 });
  const [selectedSize, setSelectedSize] = useState<number>(10); // Temporary selection

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Store selected size but don't apply it yet
    setSelectedSize(parseInt(e.target.value));
    // const size = parseInt(e.target.value);
    // setFieldSize({ w: size, h: size });
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setFieldSize({ w: selectedSize, h: selectedSize }); // Apply selected size on confirm
    console.log("Selected field size:", fieldSize);
  };

  return (
    <>
      <h1>Card Memory Game</h1>
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
      {gameField(fieldSize)}
    </>
  );
};

export default CardMemoryGame;

function gameField(size: IFieldSize) {
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
  let listOfdivs = [];
  for (let theHeight = 0; theHeight < size.h; theHeight++) {
    for (let theWidth = 0; theWidth < size.w; theWidth++) {
      listOfdivs.push(
        <div style={divStyle} key={`${theHeight}-${theWidth}`}>
          {theHeight}-{theWidth}
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
