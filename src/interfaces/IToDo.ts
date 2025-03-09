export interface IToDo {
  id: string;
  job: string;
  status: "todo" | "inProgress" | "done";
}
