import { useState } from "react";
import FlagIcon from "./icons/FlagIcon";
import Modal from "./Modal";

function AddTaskForm({ isOpen, onClose, onSave, users, statuses, flags }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assign, setAssign] = useState(users[0]?.userId || "");
  const [status, setStatus] = useState("");
  const [flagId, setFlagId] = useState(1);
  const [titleError, setTitleError] = useState("");

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const parseDateFromInput = (dateString) => {
    if (!dateString) return new Date();
    // Format: "15 / 06 / 2024"
    const parts = dateString.split(" / ").map((p) => parseInt(p.trim()));
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return new Date();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      deadline: parseDateFromInput(endDate),
      assignedTo: parseInt(assign),
      statusId: status ? parseInt(status) : 1, // Default to "To Do"
      flagId: flagId,
      attachmentCount: 0,
    };

    onSave(newTask);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setEndDate("");
    setAssign(users[0]?.userId || "");
    setStatus("");
    setFlagId(1);
    setTitleError("");
    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError && e.target.value.trim()) {
      setTitleError("");
    }
  };

  const handleFlagClick = () => {
    // Cycle through flags: Low -> Medium -> High -> Low
    const currentIndex = flags.findIndex((f) => f.flagId === flagId);
    const nextIndex = (currentIndex + 1) % flags.length;
    setFlagId(flags[nextIndex].flagId);
  };

  const selectedFlag = flags.find((f) => f.flagId === flagId);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="modal-header">
        <div className="modal-header-left">
          <button
            type="button"
            className="flag-button-header"
            onClick={handleFlagClick}
            title="Click to change priority"
          >
            <FlagIcon color={selectedFlag?.color || "#00FF00"} />
          </button>
          <h2 className="modal-title">Save task</h2>
        </div>
        <button className="modal-close" onClick={handleClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${titleError ? "error" : ""}`}
                placeholder="Type title of task"
                value={title}
                onChange={handleTitleChange}
              />
              {titleError && <span className="error-message">{titleError}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Type description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Choose status</option>
                {statuses.map((statusOption) => (
                  <option key={statusOption.statusId} value={statusOption.statusId}>
                    {statusOption.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="text"
                className="form-input"
                placeholder="DD / MM / YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign</label>
              <select
                className="form-select"
                value={assign}
                onChange={(e) => setAssign(e.target.value)}
              >
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn-save">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddTaskForm;

