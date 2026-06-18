import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import {
  AttendancePage,
  EmployeesPage,
  HomePage,
  NotFoundPage,
  PayrollPage,
} from '../pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
