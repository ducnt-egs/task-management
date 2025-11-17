import SearchIcon from "./icons/SearchIcon";

function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Items"
        className="search-input"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

