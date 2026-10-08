import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  Building,
  BookOpen,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  TrendingUp
} from 'lucide-react';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { UploadModal } from '../components/faculty/UploadModal';
import { MOCK_FACULTY_DASHBOARD, DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../data/mockData';
import './FacultyDashboard.css';

export const FacultyDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const navigate = useNavigate();
  const data = MOCK_FACULTY_DASHBOARD;

  const filteredDocs = data.documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="campus-faculty-dash">
      {/* Faculty Header & Upload Action */}
      <div className="campus-faculty-header">
        <div>
          <Badge variant="faculty" size="sm" style={{ marginBottom: 6 }}>
            FACULTY DASHBOARD • ACADEMIC YEAR 2026–27
          </Badge>
          <h1 className="campus-faculty-title">Welcome back, {data.facultyName}</h1>
          <p className="campus-faculty-subtitle">
            Manage your academic materials, syllabus-aligned lecture modules, and distribute vetted learning resources to students.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={Plus}
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Document
        </Button>
      </div>

      {/* Stats Cards Row matching screenshot */}
      <div className="campus-faculty-stats-grid">
        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Published Documents</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--navy">
              <FileText size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{data.stats.publishedDocuments}</div>
          <div className="campus-faculty-stat-badge">
            <TrendingUp size={12} /> {data.stats.publishedThisMonth}
          </div>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Departments</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--amber">
              <Building size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{data.stats.departmentsCount}</div>
          <span className="campus-faculty-stat-sub">{data.stats.departmentsList}</span>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Active Subjects</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--navy">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{data.stats.activeSubjectsCount}</div>
          <span className="campus-faculty-stat-sub">{data.stats.subjectsDetail}</span>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Student Views</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--amber">
              <Eye size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{data.stats.studentViews}</div>
          <span className="campus-faculty-stat-sub">{data.stats.readRate}</span>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card padding="sm" className="campus-faculty-filter-bar">
        <div className="campus-faculty-filter-left">
          <div className="campus-faculty-search-input">
            <Input
              type="text"
              placeholder="Search documents by name, code..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            options={['All Departments', ...DEPARTMENTS_LIST]}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            fullWidth={false}
          />
          <Select
            options={['All Years', ...ACADEMIC_YEARS_LIST]}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            fullWidth={false}
          />
        </div>
      </Card>

      {/* Uploaded Documents Table Section */}
      <Card className="campus-faculty-table-card">
        <div className="campus-faculty-table-header">
          <div>
            <h3 className="campus-faculty-table-title">Recent Documents</h3>
            <p className="campus-faculty-table-sub">View and manage your uploaded academic notes and study materials.</p>
          </div>
        </div>

        <div className="campus-faculty-table-wrapper">
          <table className="campus-table">
            <thead>
              <tr>
                <th>DOCUMENT NAME</th>
                <th>DEPARTMENT</th>
                <th>YEAR</th>
                <th>SUBJECT</th>
                <th>PUBLISHED DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="campus-doc-cell">
                      <div className="campus-doc-cell-icon">
                        <FileText size={18} />
                      </div>
                      <div>
                        <strong className="campus-doc-cell-title">{doc.title}</strong>
                        <span className="campus-doc-cell-sub">
                          {doc.fileType} • {doc.fileSize} • {doc.pages} pages
                        </span>
                      </div>
                    </div>
                  </td>
                  <td><Badge variant="slate" size="sm">{doc.department}</Badge></td>
                  <td>{doc.year}</td>
                  <td>{doc.subject}</td>
                  <td>{doc.publishedDate}</td>
                  <td><Badge variant="success" size="sm">• {doc.status}</Badge></td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="campus-table-actions">
                      <button
                        className="campus-table-action-btn"
                        onClick={() => navigate(`/documents/${doc.id}`)}
                        title="View Document"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="campus-table-action-btn" title="Edit Metadata">
                        <Edit2 size={16} />
                      </button>
                      <button className="campus-table-action-btn" title="Options">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Document Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
};
