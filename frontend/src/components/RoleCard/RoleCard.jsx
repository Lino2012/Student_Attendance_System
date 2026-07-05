import "./RoleCard.css";

function RoleCard({
  icon,
  title,
  selected,
  onClick
}) {
  return (
    <div
      className={
        selected
        ? "role-card active"
        : "role-card"
      }
      onClick={onClick}
    >
      <span>{icon}</span>

      <p>{title}</p>
    </div>
  );
}

export default RoleCard;