import { useState } from "react";

export default function Task({ task, toggleCompleted }) {
  const [completed, setCompleted] = useState(task.completed);

  return (
    <li className={completed ? "completed" : "incompleted"}>
      <span>{task.text}</span>
      <input
        type="checkbox"
        checked={completed}
        onClick={() => toggleCompleted(task)}
        onChange={() => setCompleted(!task.completed)}
        readOnly
      />
    </li>
  );
}
