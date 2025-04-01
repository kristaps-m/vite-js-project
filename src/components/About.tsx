import { useState } from "react";
import {
  CAN_GAME_BEGIN_STR,
  CARD_GAME_LEVELS,
  FIELD_SIZE_STR,
  HIGHSCORE_STR,
  MEMO_GAME_CARDS_STR,
  TASKS_STR,
  TIME_PASSED_STR,
} from "../constants";
import { useCardGame } from "./TestGlobalThing";

interface ILocalItem {
  localItem: string;
  toDelete: boolean;
}

const About = () => {
  const { themeTest, toggleOpenAndGuessCells } = useCardGame();
  const [localDBitems, setLocalDBitems] = useState<ILocalItem[]>([
    { localItem: CAN_GAME_BEGIN_STR, toDelete: false },
    { localItem: FIELD_SIZE_STR, toDelete: false },
    { localItem: HIGHSCORE_STR + CARD_GAME_LEVELS.easy, toDelete: false },
    { localItem: HIGHSCORE_STR + CARD_GAME_LEVELS.medium, toDelete: false },
    { localItem: HIGHSCORE_STR + CARD_GAME_LEVELS.hard, toDelete: false },
    { localItem: MEMO_GAME_CARDS_STR, toDelete: false },
    { localItem: TIME_PASSED_STR, toDelete: false },
    { localItem: TASKS_STR, toDelete: false },
  ]);

  function handleSubmit() {
    const areYouSure = confirm("Are you sure?");
    if (areYouSure) {
      // Remove items marked for deletion from localStorage
      localDBitems.forEach((item) => {
        if (item.toDelete) {
          localStorage.removeItem(item.localItem);
        }
      });

      console.log("Remaining items:", localDBitems);
    }
  }

  function handleCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target; // Extract values properly
    setLocalDBitems((prevItems) =>
      prevItems.map((item) => (item.localItem === name ? { ...item, toDelete: checked } : item))
    );
  }

  const handleCheckAllItems = () => {
    setLocalDBitems((prevItems) =>
      prevItems.map((x) => ({
        ...x,
        toDelete: x.toDelete === true ? false : true,
      }))
    );
  };

  return (
    <>
      <h1>Welcome to about page {`${themeTest}`}</h1>
      <button onClick={toggleOpenAndGuessCells}>Click Me</button>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          handleSubmit();
        }}
      >
        <label>
          <input type="checkbox" onClick={handleCheckAllItems} />
          Check All
        </label>
        <fieldset>
          <legend>Choose localStorage item</legend>
          {localDBitems.map((li, i) => {
            return (
              <div key={i}>
                <label>
                  <input
                    type="checkbox"
                    id={li.localItem}
                    name={li.localItem}
                    checked={li.toDelete}
                    onChange={handleCheckBoxChange}
                  />
                  {li.localItem}
                </label>
              </div>
            );
          })}
          <div>
            <button type="submit">Clear checked Items.</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default About;
