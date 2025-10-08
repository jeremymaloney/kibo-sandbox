// TODO: Add onSubmit handler
// TODO: Add className prop for styling
// TODO: Add validation
// TODO: Add error handling
// TODO: Add loading state

interface FormProps {
  children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
  return <form>{children}</form>;
}