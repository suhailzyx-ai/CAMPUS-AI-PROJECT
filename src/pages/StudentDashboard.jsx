import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Calendar,
  Grid,
  List,
  FileText,
  User,
  Eye,
  Bookmark,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { MOCK_STUDENT_DASHBOARD, DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../data/mockData';
import './StudentDashboard.css';

export const StudentDashboard = () => {
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS_LIST[0]);
  const [selectedYear, setSelectedYear] = useState('2nd Year');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const navigate = useNavigate();
  const data = MOCK_STUDENT_DASHBOARD;

  // Filter documents dynamically for search/filters UI feedback
  const filteredDocs = data.recentDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="campus-student-dash">
      {/* Welcome Header Bar */}
      <div className="campus-student-welcome">
        <div className="campus-student-welcome__left">
          <h1 className="campus-student-welcome__title">
            Welcome back, {data.studentName} 👋
          </h1>
          <p className="campus-student-welcome__subtitle">
            Find the notes and academic materials you need.
          </p>
        </div>

        <div className="campus-student-welcome__right">
          <Card padding="sm" className="campus-student-semester-badge">
            <Calendar size={20} className="campus-student-sem-icon" />
            <div className="campus-student-sem-text-group">
              <div className="campus-student-sem-top">
                <strong>{data.semester}</strong>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <span className="campus-student-sem-sub">{data.department} • {data.academicYear}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Course & Filter Controls Bar Matching Visual Reference */}
      <Card className="campus-student-filter-card">
        <div className="campus-student-filter-grid">
          <Select
            label="Department"
            icon={BookOpen}
            options={DEPARTMENTS_LIST}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          />

          <Select
            label="Subject"
            icon={BookOpen}
            options={['All Subjects', 'Data Structures', 'DBMS', 'OOP Java', 'Operating Systems', 'Networks']}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          />

          <div className="campus-student-year-tabs-group">
            <label className="campus-input__label">Academic Year</label>
            <div className="campus-student-year-tabs">
              {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`campus-student-year-btn ${selectedYear === yr ? 'campus-student-year-btn--active' : ''}`}
                  onClick={() => setSelectedYear(yr)}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Status & Search Row */}
        <div className="campus-student-filter-subrow">
          <div className="campus-student-meta-summary">
            <span className="campus-student-meta-dot"></span>
            <strong>{selectedYear}</strong>
            <span className="campus-student-meta-divider">|</span>
            <span>{data.totalSubjects} subjects</span>
            <span className="campus-student-meta-divider">|</span>
            <span>{data.totalDocumentsAvailable} documents available</span>
          </div>

          <div className="campus-student-search-box">
            <Input
              type="text"
              placeholder="Search title, unit, subject code..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Study Materials Grid Section */}
      <div className="campus-student-section-header">
        <div className="campus-student-section-header__text">
          <h2 className="campus-student-section-title">Study Materials</h2>
          <p className="campus-student-section-subtitle">
            Official notes and academic materials published by your faculty.
          </p>
        </div>

        <div className="campus-student-view-toggle">
          <button
            className={`campus-student-toggle-btn ${viewMode === 'grid' ? 'campus-student-toggle-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
            aria-label="Grid view"
          >
            <Grid size={16} />
          </button>
          <button
            className={`campus-student-toggle-btn ${viewMode === 'list' ? 'campus-student-toggle-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Documents Grid View */}
      {viewMode === 'grid' && (
        <div className="campus-student-docs-grid">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} hoverable className="campus-student-doc-card">
              <div className="campus-student-doc-card__header">
                <Badge variant="navy" size="sm">{doc.subjectCode}</Badge>
                <div className="campus-student-doc-card__tags">
                  <Badge variant="slate" size="sm">{doc.department}</Badge>
                  <Badge variant="slate" size="sm">{doc.year}</Badge>
                </div>
              </div>

              <div className="campus-student-doc-card__body">
                <div className="campus-student-doc-icon">
                  <FileText size={24} />
                </div>
                <div className="campus-student-doc-info">
                  <h3 className="campus-student-doc-title">{doc.title}</h3>
                  <p className="campus-student-doc-desc">{doc.description}</p>
                </div>
              </div>

              <div className="campus-student-doc-faculty">
                <User size={14} />
                <span>{doc.facultyName}</span>
              </div>

              <div className="campus-student-doc-footer">
                <div className="campus-student-doc-fileinfo">
                  <Badge variant="amber" size="sm">{doc.fileType}</Badge>
                  <span className="campus-student-doc-size">{doc.fileSize}</span>
                  <span className="campus-student-doc-time">• {doc.uploadedTime}</span>
                </div>

                <div className="campus-student-doc-actions">
                  <button
                    className={`campus-student-bookmark-btn ${doc.isBookmarked ? 'campus-student-bookmark-btn--active' : ''}`}
                    title={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    aria-label={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Bookmark size={16} />
                  </button>
                  <Button
                    variant="navy"
                    size="sm"
                    icon={Eye}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                  >
                    Open
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Documents List View */}
      {viewMode === 'list' && (
        <div className="campus-student-docs-list">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} hoverable className="campus-student-list-item">
              <div className="campus-student-list-item__left">
                <div className="campus-student-doc-icon">
                  <FileText size={22} />
                </div>
                <div className="campus-student-list-item__info">
                  <div className="campus-student-list-item__badges">
                    <Badge variant="navy" size="sm">{doc.subjectCode}</Badge>
                    <Badge variant="slate" size="sm">{doc.department}</Badge>
                    <Badge variant="slate" size="sm">{doc.year}</Badge>
                  </div>
                  <h3 className="campus-student-doc-title">{doc.title}</h3>
                  <p className="campus-student-doc-desc">{doc.description}</p>
                  <div className="campus-student-doc-faculty" style={{ marginTop: 4 }}>
                    <User size={14} />
                    <span>{doc.facultyName}</span>
                    <span className="campus-student-doc-time" style={{ marginLeft: 6 }}>• {doc.uploadedTime}</span>
                  </div>
                </div>
              </div>

              <div className="campus-student-list-item__right">
                <div className="campus-student-doc-fileinfo">
                  <Badge variant="amber" size="sm">{doc.fileType}</Badge>
                  <span className="campus-student-doc-size">{doc.fileSize}</span>
                </div>
                <div className="campus-student-doc-actions">
                  <button
                    className={`campus-student-bookmark-btn ${doc.isBookmarked ? 'campus-student-bookmark-btn--active' : ''}`}
                    title={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    aria-label={doc.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Bookmark size={16} />
                  </button>
                  <Button
                    variant="navy"
                    size="sm"
                    icon={Eye}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                  >
                    Open
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* AI Assistant Banner Card */}
      <Card className="campus-student-ai-banner">
        <div className="campus-student-ai-banner__content">
          <div className="campus-student-ai-banner__badge">
            <Sparkles size={16} />
            <span>AI Study Assistant Included</span>
          </div>
          <h3>Select text inside any document to get instant explanations & translations</h3>
          <p>Read faculty materials in Tamil, Hindi & English with context-aware learning tools.</p>
        </div>
        <div className="campus-student-ai-banner__cta">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/documents/doc-101')}
          >
            Try AI Document Reader
          </Button>
        </div>
      </Card>
    </div>
  );
};
