import { useUser } from './User';

export default function LoggedInOnly({ children }) {
  const me = useUser();
  if (!me) return null;
  return children;
}
