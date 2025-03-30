import "../../App.css";
import { Dispatch, SetStateAction } from "react";
import { IGameDiv } from "../../interfaces/IGameDiv";
import { IClickedCell } from "../../interfaces/IClickedCell";
import { handleSomethingWithList } from "./CardMemoryHelperFunctions";

function GameField(
  size: number,
  setRealGameFieldBackEnd: Dispatch<SetStateAction<IGameDiv[][]>>,
  fieldList: IGameDiv[][],
  setIsMachedPair: Dispatch<SetStateAction<string>>,
  setToggleTimeStartOrStop: Dispatch<SetStateAction<boolean>>,
  countOpenedCells: number,
  setCountOpenedCells: Dispatch<SetStateAction<number>>,
  listOfClickedCell: IClickedCell[],
  setListOfClickedCell: Dispatch<SetStateAction<IClickedCell[]>>
) {
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto ".repeat(size),
    backgroundColor: "dodgerblue",
    padding: "10px",
  };
  // console.log(size, "size");
  const listOfdivs = [];
  for (let theHeight = 0; theHeight < size; theHeight++) {
    for (let theWidth = 0; theWidth < size; theWidth++) {
      listOfdivs.push(
        <div
          style={{
            backgroundColor: `${
              fieldList[theHeight][theWidth].isGuessed ? "darkgreen" : "var(--bg-color-memoGame)"
            }`,
            border: "1px solid black",
            padding: "6px",
            fontSize: size < 6 ? "28px" : "20px",
            textAlign: "center",
            alignItems: "center",
            width: size < 6 ? "" : "2rem",
            height: size < 6 ? "" : "2rem",
          }}
          className="memoGameDiv"
          key={`${theHeight}-${theWidth}`}
          onClick={() => {
            handleSomethingWithList(
              fieldList,
              setRealGameFieldBackEnd,
              `${theHeight}-${theWidth}`,
              setIsMachedPair,
              setToggleTimeStartOrStop,
              countOpenedCells,
              setCountOpenedCells,
              listOfClickedCell,
              setListOfClickedCell
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

export default GameField;
