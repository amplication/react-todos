import { useState } from "react";
import "./App.css";

import CreateTask from "./CreateTask";
import Tasks from "./Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (text, id) => ({
    id,
    text,
    completed: false,
  });

  const addTask = (task) => {
    const temp = [...tasks];
    temp.push(createTask(task, tasks.length));
    setTasks(temp);
  };

  const toggleCompleted = (id) => {
    let temp = [...tasks];
    const i = temp.findIndex((t) => t.id === id);
    temp[i].completed = !temp[i].completed;
    setTasks(temp);
  };

  return (
    <div>
      <CreateTask addTask={addTask} />
      <Tasks tasks={tasks} toggleCompleted={toggleCompleted} />
    </div>
  );
}

export default App;
