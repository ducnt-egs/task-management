import PlusIcon from "./icons/PlusIcon";
import DotsIcon from "./icons/DotsIcon";

function ColumnHeader({ title, count, onAddClick }) {
  return (
    <div className="column-header">
      <div className="column-header-left">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{count}</span>
      </div>
      <div className="column-header-right">
        <button className="column-button" onClick={onAddClick}>
          <PlusIcon />
        </button>
        <button className="column-button">
          <DotsIcon />
        </button>
      </div>
    </div>
  );
}

export default ColumnHeader;

