import { useDrag } from "react-dnd";
import { IToDo } from "../../interfaces/IToDo";

interface TaskProps {
  task: IToDo;
  handleDeleteJob: (id: string) => void;
  handleEditJob: (id: string, newJob: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, handleDeleteJob, handleEditJob }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const setDragRef = (node: HTMLDivElement | null) => {
    if (node) drag(node); // ✅ Ensures the function does not return anything
  };

  return (
    <div
      ref={setDragRef}
      style={{
        display: "block",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: task?.status === "done" ? "gray" : "white",
        color: task?.status === "done" ? "white" : "black",
        fontWeight: "bold",
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "5px",
        border: "1px solid black",
        borderRadius: "1rem",
        cursor: "grab",
      }}
    >
      <span style={{ marginRight: "1rem" }}>{task?.job.length === 0 ? "New Task" : task?.job}</span>
      <button onClick={() => handleDeleteJob(task?.id)}>Delete</button>
      <button onClick={() => handleEditJob(task?.id, prompt("Edit task", task?.job) || task.job)}>
        Edit
      </button>
    </div>
  );
};

export default Task;
