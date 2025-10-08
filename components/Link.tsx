// TODO: Add className prop for styling
// TODO: Add target prop for opening in new tab
// TODO: Add rel prop for security
// TODO: Add active state styling

interface LinkProps {
  href: string;
  text: string;
}

export default function Link({ href, text }: LinkProps) {
  return <a href={href}>{text}</a>;
}