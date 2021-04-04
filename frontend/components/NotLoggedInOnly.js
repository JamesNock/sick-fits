import { useUser } from './User';

export default function NotLoggedInOnly({ children }) {
  const me = useUser();
  if (me) return null;
  return children;
}
