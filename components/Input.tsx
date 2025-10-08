// TODO: Add onChange handler
// TODO: Add value prop for controlled component
// TODO: Add type prop (text, email, password, etc.)
// TODO: Add className prop for styling
// TODO: Add error state
// TODO: Add label prop

interface InputProps {
  placeholder: string;
}

export default function Input({ placeholder }: InputProps) {
  return <input placeholder={placeholder} />;
}