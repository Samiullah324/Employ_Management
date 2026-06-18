import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';
import { LoadingSpinner } from '../ui';
import AppLayout from './AppLayout';

function ProtectedLayout() {
  const { state } = useAppStore();
  const location = useLocation();

  if (state.isAuthLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
}

export default ProtectedLayout;
