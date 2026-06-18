import { useMemo, useState } from 'react';
import {
  AppStoreContext,
  initialState as initialStateDefault,
} from './context';

export function AppStoreProvider({
  children,
  initialState = initialStateDefault,
}) {
  const [state, setState] = useState(initialState);

  const value = useMemo(
    () => ({
      state,
      setState,
      resetStore: () => setState(initialStateDefault),
    }),
    [state],
  );

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}
