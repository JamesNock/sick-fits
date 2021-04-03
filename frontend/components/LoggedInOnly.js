import { useUser } from './User';
import SignIn from './SignIn';

export default function LoggedInOnly({ children }) {
  const me = useUser();
  if (!me) return null;
  return children;
}
