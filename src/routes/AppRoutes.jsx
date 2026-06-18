import { Route, Routes } from 'react-router-dom';
import { ProtectedLayout } from '../components';
import {
  AttendancePage,
  EmployeesPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PayrollPage,
} from '../pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="payroll" element={<PayrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
