import SearchBar from "./SearchBar";
import NewItemButton from "./NewItemButton";

function Header({ onSearch, onNewItem }) {
  return (
    <div className="header">
      <SearchBar onSearch={onSearch} />
      <NewItemButton onClick={onNewItem} />
    </div>
  );
}

export default Header;

