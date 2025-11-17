import EditIcon from "./icons/EditIcon";
import PaperclipIcon from "./icons/PaperclipIcon";
import FlagIcon from "./icons/FlagIcon";
import ClockIcon from "./icons/ClockIcon";
import Tag from "./Tag";

function TaskCard({ task, user, flag }) {
  const formatDate = (date) => {
    const d = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  const attachmentCount = task.attachmentCount || 0;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <button className="task-card-edit">
          <EditIcon />
        </button>
      </div>
      <p className="task-card-description">{task.description}</p>
      <div className="task-card-tag">
        <Tag text={user?.name || "Unknown"} color="#3B82F6" />
      </div>
      <div className="task-card-footer">
        <div className="task-card-icon-group">
          <PaperclipIcon />
          <span>{attachmentCount}</span>
        </div>
        <div className="task-card-icon-group">
          <FlagIcon color={flag?.color || "#FF0000"} />
        </div>
        <div className="task-card-icon-group">
          <ClockIcon />
          <span>{formatDate(task.deadline)}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

