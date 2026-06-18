import { createContext } from 'react';

export const AppStoreContext = createContext(null);

export const initialState = {
  user: null,
  isAuthenticated: false,
};
