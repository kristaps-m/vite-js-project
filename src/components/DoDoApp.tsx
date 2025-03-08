import { useState } from "react";

interface IToDo {
  job: string;
}

function ToDoApp() {
  const [xList, setXList] = useState<IToDo[]>([{ job: "Nopirkt sieru!" }]);
  const [textInInput, setTextInInput] = useState<string>();
  function handleAdd(j: string | undefined) {
    if (j) {
      if (j.length >= 3) {
        setXList([...xList, { job: j }]);
      }
    }
    console.log(j);
  }

  function handleDeleteJob(index: number) {
    // let oldList = xList.splice(index, 1);
    const isDeleting = confirm(`Do you want to Delete - ${index} -?`);
    if (isDeleting) {
      xList.splice(index, 1);
      setXList([...xList]);
    }
  }

  return (
    <>
      <h1>To Do App</h1>
      <div>
        <input type="text" onChange={(x) => setTextInInput(x.target.value)} />
        <p>t= {textInInput}</p>
        <br />
        <button
          onClick={() => {
            handleAdd(textInInput);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            console.log(xList);
          }}
        >
          Print List
        </button>
        <button>Cancel</button>
        {xList.map((x, index) => {
          return (
            <div key={index}>
              <div style={{ display: "inline" }}>
                <p style={{ display: "inline-block", margin: "0.5rem" }}>{index}</p>
                <p style={{ display: "inline-block", margin: "0.5rem" }}>{x?.job}</p>
                <button onClick={() => handleDeleteJob(index)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ToDoApp;
