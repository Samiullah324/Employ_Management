import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockMatchMedia } from '../../test/matchMedia';
import { theme } from '../../theme';
import AppLayout from './AppLayout';

function renderAppLayout(initialRoute = '/') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppLayout />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AppLayout', () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it('renders sidebar navigation links', () => {
    renderAppLayout();
    expect(
      screen.getByRole('navigation', { name: /main navigation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /employees/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /attendance/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /payroll/i })).toBeInTheDocument();
  });

  it('renders the mobile menu toggle on small screens', () => {
    mockMatchMedia(false);
    renderAppLayout();
    expect(
      screen.getByRole('button', { name: /open navigation menu/i }),
    ).toBeInTheDocument();
  });
});
