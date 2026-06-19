import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppStoreProvider } from './AppStoreProvider';
import { useAppStore } from './useAppStore';

const customInitialState = {
  user: { name: 'Custom User' },
  isAuthenticated: true,
  isAuthLoading: false,
};

function TestConsumer() {
  const { state, setState, resetStore } = useAppStore();

  return (
    <div>
      <p>Authenticated: {String(state.isAuthenticated)}</p>
      <p>User: {state.user?.name ?? 'none'}</p>
      <button
        type="button"
        onClick={() =>
          setState((prev) => ({ ...prev, isAuthenticated: false }))
        }
      >
        Sign out
      </button>
      <button type="button" onClick={resetStore}>
        Reset
      </button>
    </div>
  );
}

describe('AppStoreProvider', () => {
  it('resetStore restores the provided initial state', () => {
    render(
      <AppStoreProvider initialState={customInitialState}>
        <TestConsumer />
      </AppStoreProvider>,
    );

    expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
    expect(screen.getByText('User: Custom User')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(screen.getByText('Authenticated: false')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
    expect(screen.getByText('User: Custom User')).toBeInTheDocument();
  });
});
