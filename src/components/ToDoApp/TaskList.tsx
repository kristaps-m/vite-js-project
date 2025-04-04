import { useDrop } from "react-dnd";
import Task from "./Task";
import { IToDo } from "../../interfaces/IToDo";

interface ListProps {
  tasks: IToDo[];
  status: "todo" | "inProgress" | "done";
  onDrop: (taskId: string, newStatus: "todo" | "inProgress" | "done") => void;
  bColor: string;
  handleDeleteJob: (id: string) => void;
  handleEditJob: (id: string, newJob: string) => void;
}

const TaskList: React.FC<ListProps> = ({
  tasks,
  status,
  onDrop,
  bColor,
  handleDeleteJob,
  handleEditJob,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const setDropRef = (node: HTMLDivElement | null) => {
    if (node) drop(node); // ✅ Ensures the function does not return anything
  };

  return (
    <div
      ref={setDropRef}
      style={{
        padding: "20px",
        minHeight: "200px",
        minWidth: "250px",
        backgroundColor: isOver ? `rgba(${bColor}, 0.4)` : `rgba(${bColor}, 1)`,
        borderRadius: "0.5rem",
      }}
    >
      <h3>{status.toUpperCase()}</h3>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          handleDeleteJob={handleDeleteJob}
          handleEditJob={handleEditJob}
        />
      ))}
    </div>
  );
};

export default TaskList;
