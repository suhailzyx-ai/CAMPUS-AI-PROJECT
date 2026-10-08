import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CheckSquare,
  GraduationCap,
  Briefcase,
  FileText,
  Building,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MOCK_ADMIN_DASHBOARD } from '../data/mockData';
import './AdminPages.css';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const data = MOCK_ADMIN_DASHBOARD;

  return (
    <div className="campus-admin-dash">
      {/* Admin Header matching screenshot */}
      <div className="campus-admin-header">
        <div>
          <Badge variant="admin" size="sm" style={{ marginBottom: 6 }}>
            ADMIN DASHBOARD / OVERVIEW
          </Badge>
          <h1 className="campus-admin-title">Welcome, Admin</h1>
          <p className="campus-admin-subtitle">
            Monitor registrations, manage users, and oversee academic resources.
          </p>
        </div>

        <div className="campus-admin-session-box">
          <Badge variant="success" size="sm">• Session: Super Admin (L3)</Badge>
          <Button variant="outline" size="sm" icon={RefreshCw}>
            Refresh Sync
          </Button>
        </div>
      </div>

      {/* Admin Stat Overview Cards matching screenshot */}
      <div className="campus-admin-stats-grid">
        <Card hoverable onClick={() => navigate('/admin/users')}>
          <div className="campus-admin-stat-top">
            <span>Total Users</span>
            <div className="campus-admin-stat-icon"><Users size={20} /></div>
          </div>
          <div className="campus-admin-stat-num">{data.stats.totalUsers.toLocaleString()}</div>
          <span className="campus-admin-stat-sub">All registered accounts</span>
        </Card>

        {/* CRITICAL PENDING APPROVAL CARD */}
        <Card
          hoverable
          onClick={() => navigate('/admin/pending-registrations')}
          className="campus-admin-stat-card--highlight"
        >
          <div className="campus-admin-stat-top">
            <span className="campus-admin-stat-label--highlight">Pending Approvals</span>
            <Badge variant="destructive" size="sm">Action required</Badge>
          </div>
          <div className="campus-admin-stat-num" style={{ color: 'var(--color-destructive)' }}>
            {data.stats.pendingApprovals}
          </div>
          <span className="campus-admin-stat-sub">Awaiting review</span>
        </Card>

        <Card hoverable onClick={() => navigate('/admin/users')}>
          <div className="campus-admin-stat-top">
            <span>Active Students</span>
            <div className="campus-admin-stat-icon"><GraduationCap size={20} /></div>
          </div>
          <div className="campus-admin-stat-num">{data.stats.activeStudents.toLocaleString()}</div>
          <span className="campus-admin-stat-sub">Approved accounts</span>
        </Card>

        <Card hoverable onClick={() => navigate('/admin/users')}>
          <div className="campus-admin-stat-top">
            <span>Active Faculty</span>
            <div className="campus-admin-stat-icon"><Briefcase size={20} /></div>
          </div>
          <div className="campus-admin-stat-num">{data.stats.activeFaculty}</div>
          <span className="campus-admin-stat-sub">Approved accounts</span>
        </Card>

        <Card hoverable onClick={() => navigate('/admin/documents')}>
          <div className="campus-admin-stat-top">
            <span>Published Documents</span>
            <div className="campus-admin-stat-icon"><FileText size={20} /></div>
          </div>
          <div className="campus-admin-stat-num">{data.stats.publishedDocuments}</div>
          <span className="campus-admin-stat-sub">Available to students</span>
        </Card>

        <Card hoverable onClick={() => navigate('/admin/departments')}>
          <div className="campus-admin-stat-top">
            <span>Departments</span>
            <div className="campus-admin-stat-icon"><Building size={20} /></div>
          </div>
          <div className="campus-admin-stat-num">{data.stats.departments}</div>
          <span className="campus-admin-stat-sub">Configured departments</span>
        </Card>
      </div>

      {/* Action Banner to Pending Registrations Screen */}
      <Card className="campus-admin-action-banner">
        <div className="campus-admin-action-banner__left">
          <div className="campus-admin-action-badge">
            <CheckSquare size={20} />
          </div>
          <div>
            <h3>28 Pending User Registration Requests</h3>
            <p>Review submitted student and faculty applications, assign verified roles, and activate workspace credentials.</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/admin/pending-registrations')}
        >
          Manage Registrations
        </Button>
      </Card>
    </div>
  );
};
