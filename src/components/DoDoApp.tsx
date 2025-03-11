import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { IToDo } from "../interfaces/IToDo";

function ToDoApp() {
  const [tasks, setTasks] = useState<IToDo[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Ensure it's an array
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd(j: string | undefined) {
    const newJobText = j ? j : "";

    setTasks([...tasks, { id: crypto.randomUUID(), job: newJobText, status: "todo" }]);
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
      <button
        onClick={() => {
          console.log(tasks);
        }}
      >
        Print Tasks
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("tasks");
        }}
      >
        DEL localStorage
      </button>
      <h1>To Do App</h1>
      <div>
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
