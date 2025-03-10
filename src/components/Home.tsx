import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";

interface theData {
  id: number;
  name: string;
  lastName: string;
  age: number;
}

const data: theData[] = [
  { id: 1, name: "Kristaps", lastName: "Porzingis", age: 27 },
  { id: 2, name: "Kevin", lastName: "Durant", age: 33 },
];

function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* <Link to="/ToDoApp">Go to To-Do App</Link> */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      {data?.map((d) => {
        return (
          <div key={d?.id}>
            <p>{d?.id}</p>
            <p>{d?.name}</p>
            <p>{d?.lastName}</p>
          </div>
        );
      })}
    </>
  );
}

export default Home;
