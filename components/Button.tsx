// TODO: Add onClick handler
// TODO: Add disabled state
// TODO: Add loading state
// TODO: Add button variants (primary, secondary, etc.)

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  borderRadius?: string;
  className?: string;
}

export default function Button({
  text,
  backgroundColor = '#2563EB',
  borderRadius = '8px',
  className,
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
    <button type="button" style={style} className={className}>
      {text}
    </button>
  );
}