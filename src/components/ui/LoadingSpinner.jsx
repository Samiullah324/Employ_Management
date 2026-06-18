import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner({
  fullScreen = false,
  size = 40,
  label = 'Loading...',
}) {
  return (
    <Box
      role="status"
      aria-label={label}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullScreen && {
          minHeight: '100vh',
          width: '100%',
        }),
        ...(!fullScreen && {
          py: 4,
        }),
      }}
    >
      <CircularProgress size={size} color="primary" />
    </Box>
  );
}

export default LoadingSpinner;
