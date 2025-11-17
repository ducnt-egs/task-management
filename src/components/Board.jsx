import { useState } from "react";
import Header from "./Header";
import Column from "./Column";
import AddTaskForm from "./AddTaskForm";

function Board({ tasks, statuses, users, flags, onAddTask }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNewItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (newTask) => {
    onAddTask(newTask);
  };

  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="board">
      <Header onSearch={handleSearch} onNewItem={handleNewItem} />
      <div className="board-columns">
        {statuses.map((status) => {
          const statusTasks = filteredTasks.filter(
            (task) => task.statusId === status.statusId
          );
          return (
            <Column
              key={status.statusId}
              status={status}
              tasks={statusTasks}
              users={users}
              flags={flags}
            />
          );
        })}
      </div>
      <AddTaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        users={users}
        statuses={statuses}
        flags={flags}
      />
    </div>
  );
}

export default Board;
