function Button({ text, onClick, variant = "primary" }) {
  const baseStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#3B82F6",
      color: "white",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#6B7280",
      border: "1px solid #E5E7EB",
    },
    icon: {
      backgroundColor: "transparent",
      color: "#6B7280",
      padding: "4px",
    },
  };

  const style = { ...baseStyle, ...variantStyles[variant] };

  return (
    <button onClick={onClick} style={style} className="button">
      {text}
    </button>
  );
}

export default Button;

