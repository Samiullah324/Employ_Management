import { Box, Button, Paper, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

function LoginPage() {
  const { state, setState } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (state.isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSignIn = () => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isAuthLoading: false,
      user: { name: 'Demo User' },
    }));
    navigate(from, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 420, width: '100%' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Sign in
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Authentication will be integrated in a future task. Use the button
          below to access the protected dashboard layout.
        </Typography>
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Continue to dashboard
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginPage;
