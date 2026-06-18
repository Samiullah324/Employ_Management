import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with accessible loading status', () => {
    render(<LoadingSpinner label="Loading dashboard" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Loading dashboard',
    );
  });

  it('renders full-screen layout when requested', () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    expect(container.firstChild).toHaveStyle({ minHeight: '100vh' });
  });
});
