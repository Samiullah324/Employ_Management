import { NavLink, Outlet } from 'react-router-dom';
import { APP_NAME } from '../utils';

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/employees', label: 'Employees' },
  { to: '/attendance', label: 'Attendance' },
  { to: '/payroll', label: 'Payroll' },
];

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>{APP_NAME}</h1>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
