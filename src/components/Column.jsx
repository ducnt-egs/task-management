import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

function Column({ status, tasks, users, flags }) {
  const handleAddClick = () => {
    console.log(`Add task to ${status.name}`);
  };

  return (
    <div className="column">
      <ColumnHeader
        title={status.name}
        count={tasks.length}
        onAddClick={handleAddClick}
      />
      <div className="column-tasks">
        {tasks.map((task) => {
          const user = users.find((u) => u.userId === task.assignedTo);
          const flag = flags.find((f) => f.flagId === task.flagId);
          return (
            <TaskCard key={task.taskId} task={task} user={user} flag={flag} />
          );
        })}
      </div>
    </div>
  );
}

export default Column;

