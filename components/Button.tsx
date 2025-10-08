// TODO: Add onClick handler
// TODO: Add className prop for styling
// TODO: Add disabled state
// TODO: Add loading state
// TODO: Add button variants (primary, secondary, etc.)

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return <button>{text}</button>;
}