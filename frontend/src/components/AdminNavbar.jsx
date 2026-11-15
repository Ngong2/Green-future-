import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Leaf, LogOut, Menu, X, FileText } from 'lucide-react';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/admin', { replace: true });
  };

  const links = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/posts', label: 'Manage Posts', icon: FileText },
    { to: '/admin/posts/create', label: 'Create Post', icon: Leaf },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === path;
    if (path === '/admin/posts') {
      return location.pathname === path
        || (location.pathname.startsWith('/admin/posts/') && location.pathname !== '/admin/posts/create');
    }
    return location.pathname === path;
  };

  const linkClass = (path) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive(path)
      ? 'bg-white/15 text-white'
      : 'text-green-100 hover:bg-white/10 hover:text-white'
  }`;

  return (
    <header className="sticky top-0 z-50 border-b border-green-800 bg-green-950 text-white shadow-lg">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/admin" className="flex items-center" aria-label="Admin dashboard">
          <span>
            <span className="block text-sm font-bold leading-tight sm:text-base">Green Future</span>
            <span className="block text-xs text-green-200">Admin Console</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Admin navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="max-w-40 truncate text-sm text-green-100">
            {user?.name || 'Administrator'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-red-400 hover:bg-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 text-green-100 transition-colors hover:bg-white/10 md:hidden"
          aria-label={isOpen ? 'Close admin menu' : 'Open admin menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-green-800 bg-green-950 px-4 py-3 md:hidden" aria-label="Admin navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setIsOpen(false)} className={linkClass(to)}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-green-800 pt-3">
              <span className="max-w-48 truncate text-sm text-green-100">
                {user?.name || 'Administrator'}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-red-400 hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AdminNavbar;
