import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { LoginRequest, LoginResponse, useAuth, useLogin } from '@my-app/auth';
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const fallback = '/users' as const;

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: (search as { redirect: string }).redirect || fallback,
      });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const { register, handleSubmit } = useForm<LoginRequest>();

  const { login } = useAuth();
  const router = useRouter();
  const search = Route.useSearch<{ redirect: string }>();
  const navigate = Route.useNavigate();

  const handleLoginSuccess = (response: LoginResponse) => {
    login(response.data.tokens);
    setTimeout(() => navigate({ to: search.redirect ?? fallback }), 50);
  };

  const { handleLogin, isPending } = useLogin({
    onCreateSuccess: handleLoginSuccess,
  });

  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    await router.invalidate();
    handleLogin(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', {
          required: true,
          pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
        type="email"
        variant="outlined"
        label="Email"
        size="small"
      />
      <TextField
        {...register('password', {
          required: true,
          minLength: 6,
        })}
        type="password"
        variant="outlined"
        label="Password"
        size="small"
      />

      <Button type="submit">
        {isLoading || isPending ? <CircularProgress size="1.7rem" /> : 'Submit'}
      </Button>
    </form>
  );
}
