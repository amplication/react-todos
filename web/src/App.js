import { useState, useEffect } from "react";
import "./App.css";

import { me } from "./lib/auth";

import Auth from "./Auth";
import CreateTask from "./CreateTask";
import Tasks from "./Tasks";

function App() {
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getUser() {
      const result = await me();
      setUser(result);
    }
    getUser();
  }, [setUser]);

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
      {user ? (
        <div>
          <CreateTask addTask={addTask} />
          <Tasks tasks={tasks} toggleCompleted={toggleCompleted} />
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default App;
