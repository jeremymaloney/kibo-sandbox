// TODO: Add disabled state
// TODO: Add loading state
// TODO: Add button variants (primary, secondary, etc.)

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  borderRadius?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  backgroundColor = '#2563EB',
  borderRadius = '8px',
  className,
  onClick,
}: ButtonProps) {

  const style = {
    backgroundColor,
    borderRadius,
    color: '#fff',
    padding: '0.75rem 2rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <button type="button" style={style} className={className} onClick={onClick}>
      {text}
    </button>
  );
}