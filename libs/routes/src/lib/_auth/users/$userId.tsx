import Typography from '@mui/material/Typography';
import { useGetUser } from '@my-app/users';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/users/$userId')({
  component: UserRoute,
});

function UserRoute() {
  const { userId } = Route.useParams();
  const { data: user } = useGetUser(userId);

  return <Typography>{JSON.stringify(user, null, 2)}</Typography>;
}
