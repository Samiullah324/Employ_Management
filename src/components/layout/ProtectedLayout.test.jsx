import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppStoreProvider } from '../../store';
import { mockMatchMedia } from '../../test/matchMedia';
import { theme } from '../../theme';
import ProtectedLayout from './ProtectedLayout';

function renderProtectedRoute(initialState, initialRoute = '/') {
  function TestApp() {
    return (
      <ThemeProvider theme={theme}>
        <AppStoreProvider initialState={initialState}>
          <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
              <Route path="/login" element={<h1>Login Page</h1>} />
              <Route element={<ProtectedLayout />}>
                <Route index element={<h1>Protected Content</h1>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </AppStoreProvider>
      </ThemeProvider>
    );
  }

  return render(<TestApp />);
}

describe('ProtectedLayout', () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it('redirects unauthenticated users to login', () => {
    renderProtectedRoute({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    });

    expect(
      screen.getByRole('heading', { name: /login page/i }),
    ).toBeInTheDocument();
  });

  it('shows a loading spinner while auth state is loading', () => {
    renderProtectedRoute({
      user: null,
      isAuthenticated: false,
      isAuthLoading: true,
    });

    expect(
      screen.getByRole('status', { name: /loading/i }),
    ).toBeInTheDocument();
  });

  it('renders the dashboard layout for authenticated users', () => {
    renderProtectedRoute({
      user: { name: 'Test User' },
      isAuthenticated: true,
      isAuthLoading: false,
    });

    expect(
      screen.getByRole('heading', { name: /protected content/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /main navigation/i }),
    ).toBeInTheDocument();
  });
});
