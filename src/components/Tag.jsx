function Tag({ text, color = "#3B82F6" }) {
  return (
    <span
      className="tag"
      style={{
        backgroundColor: color,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}

export default Tag;

