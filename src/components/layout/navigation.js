import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/employees', label: 'Employees', icon: PeopleIcon },
  { to: '/attendance', label: 'Attendance', icon: EventAvailableIcon },
  { to: '/payroll', label: 'Payroll', icon: PaymentsIcon },
];
