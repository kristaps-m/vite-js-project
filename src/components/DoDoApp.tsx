import { useState } from "react";

interface IToDo {
  job: string;
}

// localStorage.setItem("xList", "");
function modifyLocalStorage(theList: IToDo[], j: string) {
  // localStorage.setItem("xList", [...theList.map((x) => `${x?.job}`)]);
  let yolo = theList;
  yolo.push({ job: j });
  const joinedList = [...yolo.map((x) => `${x?.job}`)].join(",");
  localStorage.setItem("xList", joinedList);
}

// function removeFromLocalStorage() {
//   localStorage.removeItem("xList");
// }

// function bigX(params: string): IToDo {
//   return { job: params };
// }

function ToDoApp() {
  // const listFromLocalStorage = localStorage.getItem("xList")?.split(",");
  const [xList, setXList] = useState<IToDo[]>([]); // { job: "Nopirkt sieru!" }
  // if (listFromLocalStorage) {
  //   setXList([...listFromLocalStorage.map((x) => bigX(x))]);
  // }
  // console.log([...listFromLocalStorage]);
  // console.log(listFromLocalStorage);
  const [textInInput, setTextInInput] = useState<string>();
  const [textToBeEdited, setTextToBeEdited] = useState<string>();

  function handleAdd(j: string | undefined) {
    if (j) {
      if (j.length >= 3) {
        setXList([...xList, { job: j }]);
        modifyLocalStorage(xList, j);
        // let yolo = xList;
        // yolo.push({ job: j });
        // const joinedList = [...yolo.map((x) => `${x?.job}`)].join(",");
        // localStorage.setItem("xList", joinedList);
      }
    }
    console.log(j);
  }
  // console.log(localStorage.getItem("xList"));
  function handleDeleteJob(index: number) {
    const isDeleting = confirm(`Do you want to Delete - ${index} -?`);
    if (isDeleting) {
      xList.splice(index, 1);
      setXList([...xList]);
      localStorage.setItem("xList", [...xList.map((x) => `${x?.job}`)]);
    }
  }

  function handleEditJob(index: number, newValue: string | undefined) {
    const areYouSureToEdit = confirm(`Do you want to EDIT - ${index} -?`);
    if (areYouSureToEdit) {
      if (newValue && index >= 0) {
        xList.splice(index, 1, { job: newValue });
        setXList([...xList]);
        localStorage.setItem("xList", [...xList.map((x) => `${x?.job}`)]);
        // modifyLocalStorage(xList, newValue);
      }
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
        <button onClick={() => localStorage.removeItem("xList")}>Cancel</button>
        {xList.map((x, index) => {
          return (
            <div key={index}>
              <div style={{ display: "inline" }}>
                <p style={{ display: "inline-block", margin: "0.5rem" }}>{index}</p>
                <p style={{ display: "inline-block", margin: "0.5rem" }}>{x?.job}</p>
                <button onClick={() => handleDeleteJob(index)}>Delete</button>
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue={x?.job}
                  onChange={(x) => setTextToBeEdited(x.target.value)}
                />
                <button onClick={() => handleEditJob(index, textToBeEdited)}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ToDoApp;
