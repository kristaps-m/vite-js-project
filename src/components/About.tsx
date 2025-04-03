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
import { useMemoryGame } from "./CardMemoryGame/MemoryGameContext";

interface ILocalStorageItem {
  localItem: string;
  toDelete: boolean;
}

const About = () => {
  const { testMode, setTestMode } = useMemoryGame();
  const [localDBitems, setLocalDBitems] = useState<ILocalStorageItem[]>([
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
    <div>
      <h2>Welcome to about page</h2>
      <p>
        This project is created in year 2025 using{" "}
        <a href="http://vite.dev/guide">vite.dev/guide</a>
      </p>
      <p>
        It contains simple challeging tasks like "ToDoApp" and "CardMemoryGame". States of these
        games are saved in browsers localStorage.
      </p>
      <p>You can navigate through components using navigation buttons on top of page.</p>
      <p>You I included some testing features here in About page.</p>
      <p>
        You can "Disable Test Mode" or "Enable Test Mode". If enabled it will help you solve Memory
        game faster. Go check it out :). Also you can clear whats saved in localStorage here in
        about page. For example you added to many tasks, here you can delete them all at once.
      </p>
      <button
        style={{ backgroundColor: testMode ? "red" : "" }}
        onClick={() => setTestMode(!testMode)}
      >
        {testMode ? "Disable Test Mode" : "Enable Test Mode"}
      </button>
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
    </div>
  );
};

export default About;
