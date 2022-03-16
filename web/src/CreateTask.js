import { useState } from "react";

export default function CreateTask({ addTask }) {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TODO"
        value={task}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
