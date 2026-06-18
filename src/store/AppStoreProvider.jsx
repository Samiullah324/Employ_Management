import { useMemo, useState } from 'react';
import { AppStoreContext, initialState } from './context';

export function AppStoreProvider({ children }) {
  const [state, setState] = useState(initialState);

  const value = useMemo(
    () => ({
      state,
      setState,
      resetStore: () => setState(initialState),
    }),
    [state],
  );

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}
