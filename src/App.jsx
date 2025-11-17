import { useEffect } from "react";
import Board from "./components/Board";
import { tasks as initialTasks, taskStatus, users, flags } from "./assets/data";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  // Use custom hook to save tasks to localStorage
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);

  // Ensure initial data is loaded from data.js if localStorage is empty
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) {
      // If localStorage is empty, set tasks from data.js
      setTasks(initialTasks);
    }
  }, [setTasks]);

  // Function to add a new task
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      taskId: Date.now(), // Generate unique ID
    };
    setTasks([...tasks, taskWithId]);
  };

  return (
    <div className="app">
      <Board
        tasks={tasks}
        statuses={taskStatus}
        users={users}
        flags={flags}
        onAddTask={addTask}
      />
    </div>
  );
}

export default App;
