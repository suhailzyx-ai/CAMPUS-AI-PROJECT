import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  BookOpen,
  Bookmark,
  Clock,
  User,
  Upload,
  Users,
  Building2,
  CheckSquare,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Badge } from '../ui/Card';
import './Navigation.css';

export const StudentLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', path: '/student', icon: Home },
    { label: 'My Documents', path: '/student/documents', icon: FileText },
    { label: 'Subjects', path: '/student/subjects', icon: BookOpen },
    { label: 'Bookmarks', path: '/student/bookmarks', icon: Bookmark },
    { label: 'Recent', path: '/student/recent', icon: Clock },
    { label: 'Profile', path: '/student/profile', icon: User }
  ];

  return (
    <div className="campus-app-layout">
      {/* Top Navbar Header */}
      <header className="campus-header">
        <div className="campus-header__left">
          <button
            className="campus-header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo variant="default" showSubtitle={false} />
        </div>

        <div className="campus-header__right">
          <div className="campus-header__user">
            <div className="campus-header__avatar campus-header__avatar--student">
              <User size={18} />
            </div>
            <div className="campus-header__user-info">
              <span className="campus-header__user-name">Suhail S</span>
              <Badge variant="student" size="sm">Student</Badge>
            </div>
          </div>
          <button
            className="campus-header__logout"
            onClick={() => navigate('/login')}
            title="Log Out"
            aria-label="Log out of account"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="campus-app-body">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            className="campus-sidebar-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`campus-sidebar ${mobileMenuOpen ? 'campus-sidebar--mobile-open' : ''}`}>
          <div className="campus-sidebar__top-mobile-header">
            <Logo variant="default" showSubtitle={false} />
            <button
              className="campus-sidebar__close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="campus-sidebar__nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/student'}
                  className={({ isActive }) =>
                    `campus-sidebar__item ${isActive ? 'campus-sidebar__item--active' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className="campus-sidebar__item-icon" />
                  <span className="campus-sidebar__item-label">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="campus-sidebar__banner">
            <GraduationCap size={24} className="campus-sidebar__banner-icon" />
            <h4>Learn. Understand. Grow.</h4>
            <p>with Campus AI Study Assistant</p>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="campus-main-content">{children}</main>
      </div>
    </div>
  );
};

export const FacultyLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', path: '/faculty', icon: Home },
    { label: 'My Documents', path: '/faculty/documents', icon: FileText },
    { label: 'Upload Document', path: '/faculty/upload', icon: Upload },
    { label: 'Profile', path: '/faculty/profile', icon: User }
  ];

  return (
    <div className="campus-app-layout">
      <header className="campus-header">
        <div className="campus-header__left">
          <button
            className="campus-header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo variant="default" showSubtitle={false} />
          <Badge variant="faculty" size="md" className="campus-header__role-badge">Faculty Portal</Badge>
        </div>

        <div className="campus-header__right">
          <div className="campus-header__user">
            <div className="campus-header__avatar campus-header__avatar--faculty">
              <User size={18} />
            </div>
            <div className="campus-header__user-info">
              <span className="campus-header__user-name">Dr. Arvind Sharma</span>
              <span className="campus-header__user-sub">Faculty • Computer Science</span>
            </div>
          </div>
          <button
            className="campus-header__logout"
            onClick={() => navigate('/login')}
            title="Log Out"
            aria-label="Log out of account"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="campus-app-body">
        {mobileMenuOpen && (
          <div
            className="campus-sidebar-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside className={`campus-sidebar ${mobileMenuOpen ? 'campus-sidebar--mobile-open' : ''}`}>
          <div className="campus-sidebar__top-mobile-header">
            <Logo variant="default" showSubtitle={false} />
            <button
              className="campus-sidebar__close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="campus-sidebar__nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/faculty'}
                  className={({ isActive }) =>
                    `campus-sidebar__item ${isActive ? 'campus-sidebar__item--active' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className="campus-sidebar__item-icon" />
                  <span className="campus-sidebar__item-label">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </aside>

        <main className="campus-main-content">{children}</main>
      </div>
    </div>
  );
};

export const AdminLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: Home },
    { label: 'Pending Registrations', path: '/admin/pending-registrations', icon: CheckSquare, badge: '28' },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Departments', path: '/admin/departments', icon: Building2 },
    { label: 'Documents', path: '/admin/documents', icon: FileText },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { label: 'Notifications', path: '/admin/notifications', icon: Bell },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="campus-app-layout">
      <header className="campus-header">
        <div className="campus-header__left">
          <button
            className="campus-header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo variant="default" showSubtitle={false} />
          <Badge variant="admin" size="md" className="campus-header__role-badge">ADMIN WORKSPACE</Badge>
        </div>

        <div className="campus-header__right">
          <div className="campus-header__user">
            <div className="campus-header__avatar campus-header__avatar--admin">
              <User size={18} />
            </div>
            <div className="campus-header__user-info">
              <span className="campus-header__user-name">Suhail (Admin)</span>
              <span className="campus-header__user-sub">Super Admin</span>
            </div>
          </div>
          <button
            className="campus-header__logout"
            onClick={() => navigate('/login')}
            title="Log Out"
            aria-label="Log out of account"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="campus-app-body">
        {mobileMenuOpen && (
          <div
            className="campus-sidebar-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside className={`campus-sidebar ${mobileMenuOpen ? 'campus-sidebar--mobile-open' : ''}`}>
          <div className="campus-sidebar__top-mobile-header">
            <Logo variant="default" showSubtitle={false} />
            <button
              className="campus-sidebar__close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="campus-sidebar__section-title">NAVIGATION</div>
          <div className="campus-sidebar__nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `campus-sidebar__item ${isActive ? 'campus-sidebar__item--active' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className="campus-sidebar__item-icon" />
                  <span className="campus-sidebar__item-label">{item.label}</span>
                  {item.badge && <span className="campus-sidebar__badge">{item.badge}</span>}
                </NavLink>
              );
            })}
          </div>

          <div className="campus-sidebar__version">
            <span className="campus-sidebar__version-dot"></span>
            <div>
              <strong>Core Engine v2.4</strong>
              <p>Academic knowledge sync active.</p>
            </div>
          </div>
        </aside>

        <main className="campus-main-content">{children}</main>
      </div>
    </div>
  );
};
