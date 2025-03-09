import { useState } from "react";

interface IToDo {
  job: string;
}

function modifyLocalStorage(theList: IToDo[], j: string) {
  // localStorage.setItem("xList", [...theList.map((x) => `${x?.job}`)]);
  const tempList = theList;
  tempList.push({ job: j });
  const joinedList = [...tempList.map((x) => `${x?.job}`)].join(",");
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
  const [theToDoList, setXList] = useState<IToDo[]>([]); // { job: "Nopirkt sieru!" }
  const [inProgressList, setInProgressList] = useState<IToDo[]>([
    { job: "Nopirkt sieru!" },
    { job: "Nopirkt sieru! #2" },
  ]); // { job: "Nopirkt sieru!" }
  const [inDoneList, setInDoneList] = useState<IToDo[]>([
    { job: "Nopirkt sieru! Done?" },
    { job: "Nopirkt sieru! Done? #2" },
  ]); // { job: "Nopirkt sieru!" }
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
        setXList([...theToDoList, { job: j }]);
        modifyLocalStorage(theToDoList, j);
      }
    }
    console.log(j);
  }
  // console.log(localStorage.getItem("xList"));
  function handleDeleteJob(index: number) {
    const isDeleting = confirm(`Do you want to Delete - ${index} -?`);
    if (isDeleting) {
      theToDoList.splice(index, 1);
      setXList([...theToDoList]);
      localStorage.setItem("xList", [...theToDoList.map((x) => `${x?.job}`)]);
    }
  }

  function handleEditJob(index: number, newValue: string | undefined) {
    const areYouSureToEdit = confirm(`Do you want to EDIT - ${index} -?`);
    if (areYouSureToEdit) {
      if (newValue && index >= 0) {
        theToDoList.splice(index, 1, { job: newValue });
        setXList([...theToDoList]);
        localStorage.setItem("xList", [...theToDoList.map((x) => `${x?.job}`)]);
      }
    }
  }

  function dragstartHandler(ev: unknown) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }

  function doSomethingIguess(id: number) {
    window.addEventListener("DOMContentLoaded", () => {
      // Get the element by id
      const element = document.getElementById(id);
      // Add the ondragstart event listener
      element.addEventListener("dragstart", dragstartHandler);
    });
  }

  function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  function dropHandler(ev, id: number) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
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
            console.log(theToDoList);
          }}
        >
          Print List
        </button>
        <button onClick={() => localStorage.removeItem("xList")}>Cancel</button>
        {theToDoList?.map((x, index) => {
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
        <div className="toDoColums">
          <div className="toDo">
            <h2>To Do</h2>
            {theToDoList?.map((x, index) => {
              return (
                <>
                  <p
                    key={index}
                    id={`${index}`}
                    draggable="true"
                    onMouseDown={() => doSomethingIguess(index)}
                  >
                    {x?.job}
                  </p>
                </>
              );
            })}
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
          <div
            className="inProgress"
            id="target"
            onDrop={() => dropHandler(event)}
            onDragOver={() => dragoverHandler(event)}
          >
            <h2>In Progress</h2>
            {inProgressList?.map((x, index) => {
              return (
                <>
                  <p
                    key={index}
                    // onMouseDown={() => {
                    //   console.log("Mouse Down in 'In Progress'");
                    // }}
                  >
                    {x?.job}
                  </p>
                </>
              );
            })}
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
          <div className="Done">
            <h2>Done</h2>
            {inDoneList?.map((x, index) => {
              return (
                <>
                  <p
                    key={index}
                    onMouseDown={() => {
                      console.log("Mouse Down in 'In Done!!!'");
                    }}
                  >
                    {x?.job}
                  </p>
                </>
              );
            })}
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoApp;
