import { useState } from "react";
import TaskList from "./TaskList";
import { IToDo } from "../interfaces/IToDo";

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
  const [tasks, setTasks] = useState<IToDo[]>([]);
  const theToDoList = tasks.filter((task) => task.status === "todo");
  // if (listFromLocalStorage) {
  //   setXList([...listFromLocalStorage.map((x) => bigX(x))]);
  // }

  function handleAdd(j: string | undefined) {
    const newJobText = j ? j : "";

    setTasks([...theToDoList, { id: crypto.randomUUID(), job: newJobText, status: "todo" }]);
    modifyLocalStorage(theToDoList, newJobText);
  }

  const handleDeleteJob = (id: string) => {
    const isDeleting = confirm(`Do you want to Delete - ${id} -?`);

    if (isDeleting) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  function handleEditJob(id: string, newValue: string | undefined) {
    if (newValue) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, job: newValue } : task))
      );
    }
  }

  const handleDrop = (taskId: string, newStatus: "todo" | "inProgress" | "done") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          handleAdd("");
        }}
        style={{ float: "right" }}
      >
        New Task
      </button>
      <h1>To Do App</h1>
      <div>
        {/* <button onClick={() => localStorage.removeItem("xList")}>Cancel</button> */}
        <div style={{ display: "flex", gap: "2.5rem" }}>
          <TaskList
            tasks={tasks.filter((t) => t.status === "todo")}
            status="todo"
            onDrop={handleDrop}
            bColor="226, 191, 191"
            handleDeleteJob={handleDeleteJob}
            handleEditJob={handleEditJob}
          />
          <TaskList
            tasks={tasks.filter((t) => t.status === "inProgress")}
            status="inProgress"
            onDrop={handleDrop}
            bColor="209, 209, 209"
            handleDeleteJob={handleDeleteJob}
            handleEditJob={handleEditJob}
          />
          <TaskList
            tasks={tasks.filter((t) => t.status === "done")}
            status="done"
            onDrop={handleDrop}
            bColor="180, 208, 186"
            handleDeleteJob={handleDeleteJob}
            handleEditJob={handleEditJob}
          />
        </div>
      </div>
    </div>
  );
}

export default ToDoApp;
