import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>
          Sorry, a token must be supplied. You can use the form below to request
          one.
        </p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
