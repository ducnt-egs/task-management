import Button from "./Button";

function NewItemButton({ onClick }) {
  return <Button text="New Item" onClick={onClick} variant="primary" />;
}

export default NewItemButton;

