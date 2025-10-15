// TODO: Add disabled state
// TODO: Add loading state
// TODO: Add button variants (primary, secondary, etc.)

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  borderRadius?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  backgroundColor = "#2563EB",
  borderRadius = "8px",
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const style = {
    backgroundColor,
    borderRadius,
    color: "#fff",
    padding: "0.75rem 2rem",
    fontWeight: 600,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <button
      type="button"
      style={style}
      className={className}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {text}
    </button>
  );
}
