import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  GraduationCap,
  Briefcase,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  HelpCircle
} from 'lucide-react';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { MOCK_PENDING_REGISTRATIONS, DEPARTMENTS_LIST } from '../data/mockData';
import './AdminPages.css';

export const PendingRegistrationsPage = () => {
  const [applicants, setApplicants] = useState(MOCK_PENDING_REGISTRATIONS);
  const [selectedIds, setSelectedIds] = useState(['app-1', 'app-2', 'app-3', 'app-5', 'app-8']); // Default selection matching screenshot (5 selected)
  const [assignRole, setAssignRole] = useState('student'); // 'student' or 'faculty'
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  // Toggle selection for individual applicants
  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Toggle selection for all applicants
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplicants.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Action handlers (UI only for now)
  const handleApproveSelected = () => {
    alert(`Approving ${selectedIds.length} applicants as ${assignRole.toUpperCase()}... (UI Action Only)`);
  };

  const handleRejectSelected = () => {
    alert(`Rejecting ${selectedIds.length} selected applicants... (UI Action Only)`);
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedObjects = applicants.filter((app) => selectedIds.includes(app.id));

  return (
    <div className="campus-pending-page">
      {/* Header matching screenshot */}
      <div className="campus-pending-header">
        <div>
          <Badge variant="admin" size="sm" style={{ marginBottom: 6 }}>
            Admin Control &gt; Pending Registrations
          </Badge>
          <h1 className="campus-pending-title">Pending Registrations</h1>
          <p className="campus-pending-subtitle">
            Review submitted student and faculty applications, assign verified academic roles, and activate collegiate workspace credentials.
          </p>
        </div>
      </div>

      {/* Overview Metric Chips */}
      <div className="campus-pending-metrics-row">
        <Card className="campus-pending-metric-card">
          <div className="campus-pending-metric-icon campus-pending-metric-icon--red">
            <Clock size={20} />
          </div>
          <div>
            <span className="campus-pending-metric-label">Total Pending</span>
            <strong className="campus-pending-metric-value">{applicants.length}</strong>
          </div>
        </Card>

        <Card className="campus-pending-metric-card">
          <div className="campus-pending-metric-icon campus-pending-metric-icon--blue">
            <GraduationCap size={20} />
          </div>
          <div>
            <span className="campus-pending-metric-label">Applied as Student</span>
            <strong className="campus-pending-metric-value">18</strong>
          </div>
        </Card>

        <Card className="campus-pending-metric-card">
          <div className="campus-pending-metric-icon campus-pending-metric-icon--purple">
            <Briefcase size={20} />
          </div>
          <div>
            <span className="campus-pending-metric-label">Applied as Faculty</span>
            <strong className="campus-pending-metric-value">10</strong>
          </div>
        </Card>

        <Card className="campus-pending-metric-card">
          <div className="campus-pending-metric-icon campus-pending-metric-icon--amber">
            <AlertCircle size={20} />
          </div>
          <div>
            <span className="campus-pending-metric-label">In Review</span>
            <strong className="campus-pending-metric-value">6</strong>
          </div>
        </Card>
      </div>

      {/* Main Split Layout: Table Left, Approval Action Panel Right */}
      <div className="campus-pending-split">
        {/* Left Side: Applicants Table */}
        <div className="campus-pending-table-area">
          <Card padding="sm" className="campus-pending-filters">
            <Input
              type="text"
              placeholder="Search by name, email, department..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              options={['All Departments', ...DEPARTMENTS_LIST]}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              fullWidth={false}
            />
            <Select
              options={['Role Intended: All', 'Student', 'Faculty']}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              fullWidth={false}
            />
          </Card>

          <Card padding="none" className="campus-pending-table-card">
            <div className="campus-pending-table-wrapper">
              <table className="campus-table">
                <thead>
                  <tr>
                    <th style={{ width: 40, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredApplicants.length && filteredApplicants.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>APPLICANT DETAILS</th>
                    <th>COLLEGE & DEPARTMENT</th>
                    <th>APPLIED AS (FROM SIGNUP)</th>
                    <th>TARGET ROLE / YEAR</th>
                    <th>SUBMISSION TIME</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((app) => {
                    const isSelected = selectedIds.includes(app.id);
                    return (
                      <tr
                        key={app.id}
                        className={isSelected ? 'campus-pending-row--selected' : ''}
                      >
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(app.id)}
                          />
                        </td>
                        <td>
                          <div className="campus-app-user-cell">
                            <div className="campus-app-user-avatar">{app.initials}</div>
                            <div>
                              <strong className="campus-app-user-name">{app.name}</strong>
                              <span className="campus-app-user-email">{app.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="campus-app-college">{app.college}</span>
                            <span className="campus-app-dept">{app.department}</span>
                          </div>
                        </td>
                        <td>
                          <Badge
                            variant={app.requestedRole === 'Student' ? 'student' : 'faculty'}
                            size="sm"
                          >
                            {app.requestedRole}
                          </Badge>
                        </td>
                        <td>
                          <span className="campus-app-target">{app.targetYear}</span>
                        </td>
                        <td>
                          <div>
                            <span className="campus-app-time">{app.submissionTime}</span>
                            <span className="campus-app-time-sub">{app.timeAgo}</span>
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="campus-table-action-btn" title="Options">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer matching screenshot */}
            <div className="campus-pending-table-footer">
              <span>Showing 1 - {filteredApplicants.length} of 28 pending registrations</span>
              <div className="campus-pagination">
                <button className="campus-page-btn"><ChevronLeft size={16} /></button>
                <button className="campus-page-btn campus-page-btn--active">1</button>
                <button className="campus-page-btn">2</button>
                <button className="campus-page-btn">3</button>
                <button className="campus-page-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Admin Approval Drawer matching reference screenshot */}
        <Card className="campus-pending-approval-drawer">
          <div className="campus-drawer-header">
            <div className="campus-drawer-title-row">
              <CheckCircle2 size={20} className="campus-drawer-check" />
              <h3>Selected Applicants ({selectedIds.length})</h3>
            </div>
            <p className="campus-drawer-sub">Review the selected users and choose the role to approve.</p>
          </div>

          {/* Selected Applicants List */}
          <div className="campus-drawer-users-list">
            {selectedObjects.map((user) => (
              <div key={user.id} className="campus-drawer-user-item">
                <div className="campus-drawer-user-avatar">{user.initials}</div>
                <div className="campus-drawer-user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <Badge
                  variant={user.requestedRole === 'Student' ? 'student' : 'faculty'}
                  size="sm"
                >
                  {user.requestedRole}
                </Badge>
              </div>
            ))}
          </div>

          {/* CRITICAL ROLE ASSIGNMENT CONTROLS */}
          <div className="campus-drawer-role-section">
            <div className="campus-drawer-role-title">
              <strong>Assign Role for Selected Users</strong>
              <HelpCircle size={14} className="campus-drawer-help" />
            </div>
            <p className="campus-drawer-override-hint">
              This will override the users' original selection.
            </p>

            <div className="campus-drawer-role-options">
              <label
                className={`campus-drawer-role-card ${assignRole === 'student' ? 'campus-drawer-role-card--active' : ''}`}
                onClick={() => setAssignRole('student')}
              >
                <input
                  type="radio"
                  name="assignRole"
                  value="student"
                  checked={assignRole === 'student'}
                  onChange={() => setAssignRole('student')}
                />
                <GraduationCap size={20} className="campus-drawer-role-icon" />
                <div>
                  <strong>Approve all as Student</strong>
                  <p>Give access to study materials, AI tutor, quizzes, reading sets, practice tools, etc.</p>
                </div>
              </label>

              <label
                className={`campus-drawer-role-card ${assignRole === 'faculty' ? 'campus-drawer-role-card--active' : ''}`}
                onClick={() => setAssignRole('faculty')}
              >
                <input
                  type="radio"
                  name="assignRole"
                  value="faculty"
                  checked={assignRole === 'faculty'}
                  onChange={() => setAssignRole('faculty')}
                />
                <Briefcase size={20} className="campus-drawer-role-icon" />
                <div>
                  <strong>Approve all as Faculty</strong>
                  <p>Give access to upload materials, manage subjects, create courses, etc.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons matching screenshot */}
          <div className="campus-drawer-actions">
            <Button
              variant="navy"
              size="lg"
              fullWidth
              icon={CheckCircle2}
              onClick={handleApproveSelected}
              disabled={selectedIds.length === 0}
            >
              Approve & Activate ({selectedIds.length} as {assignRole === 'student' ? 'Student' : 'Faculty'})
            </Button>

            <div className="campus-drawer-subactions">
              <Button
                variant="destructive"
                size="md"
                icon={XCircle}
                onClick={handleRejectSelected}
                disabled={selectedIds.length === 0}
                style={{ flex: 1 }}
              >
                Reject Selected ({selectedIds.length})
              </Button>
              <Button variant="outline" size="md" style={{ flex: 1 }}>
                Request Info
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
