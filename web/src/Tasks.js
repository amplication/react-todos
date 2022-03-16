import Task from "./Task";

export default function Tasks({ tasks, toggleCompleted }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} toggleCompleted={toggleCompleted} />
      ))}
    </ul>
  );
}