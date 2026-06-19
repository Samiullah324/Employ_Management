import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppStoreProvider } from '../store';
import { theme } from '../theme';
import LoginPage from './LoginPage';

function renderLoginPage(initialState, initialRoute = '/login') {
  return render(
    <ThemeProvider theme={theme}>
      <AppStoreProvider initialState={initialState}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<h1>Dashboard</h1>} />
          </Routes>
        </MemoryRouter>
      </AppStoreProvider>
    </ThemeProvider>,
  );
}

describe('LoginPage', () => {
  it('redirects authenticated users away from the login page', () => {
    renderLoginPage({
      user: { name: 'Test User' },
      isAuthenticated: true,
      isAuthLoading: false,
    });

    expect(
      screen.getByRole('heading', { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /sign in/i }),
    ).not.toBeInTheDocument();
  });

  it('renders the sign-in form for unauthenticated users', () => {
    renderLoginPage({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    });

    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
  });
});
