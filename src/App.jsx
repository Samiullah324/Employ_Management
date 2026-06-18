import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppStoreProvider } from './store';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppStoreProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppStoreProvider>
    </ThemeProvider>
  );
}

export default App;
