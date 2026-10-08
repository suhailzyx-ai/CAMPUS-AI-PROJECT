import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Building, GraduationCap, Lock, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Input, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../data/mockData';
import './AuthPages.css';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS_LIST[0]);
  const [academicYear, setAcademicYear] = useState(ACADEMIC_YEARS_LIST[1]);
  const [intendedRole, setIntendedRole] = useState('student'); // 'student' or 'faculty'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Frontend demo redirect to pending approval page
    navigate('/pending');
  };

  return (
    <div className="campus-auth-container">
      <div className="campus-auth-card campus-auth-card--wide">
        <div className="campus-auth-header">
          <Logo showSubtitle={true} />
          
          {/* Tab Control Matching Screenshot */}
          <div className="campus-auth-tabs">
            <Link to="/login" className="campus-auth-tab">
              Login
            </Link>
            <div className="campus-auth-tab campus-auth-tab--active">
              <span className="campus-auth-tab-dot"></span> Sign Up
            </div>
          </div>

          <h1 className="campus-auth-title">Create your account</h1>
          <p className="campus-auth-subtitle">
            Register to access your personalized academic learning space.
          </p>
        </div>

        <form onSubmit={handleSignup} className="campus-auth-form">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your college or personal email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="College / Institution"
            type="text"
            placeholder="Enter your college name"
            icon={Building}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />

          <div className="campus-auth-form-grid">
            <Select
              label="Department"
              options={DEPARTMENTS_LIST}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <Select
              label="Academic Year"
              options={ACADEMIC_YEARS_LIST}
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              required
            />
          </div>

          {/* Intended Role Radio Selector - CRITICAL BUSINESS RULE */}
          <div className="campus-auth-role-selector">
            <label className="campus-input__label">I am a *</label>
            <div className="campus-auth-role-options">
              <label
                className={`campus-auth-role-card ${intendedRole === 'student' ? 'campus-auth-role-card--active' : ''}`}
                onClick={() => setIntendedRole('student')}
              >
                <div className="campus-auth-role-radio">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={intendedRole === 'student'}
                    onChange={() => setIntendedRole('student')}
                  />
                </div>
                <div className="campus-auth-role-content">
                  <strong>Student</strong>
                  <p>Access study materials and learn with AI</p>
                </div>
              </label>

              <label
                className={`campus-auth-role-card ${intendedRole === 'faculty' ? 'campus-auth-role-card--active' : ''}`}
                onClick={() => setIntendedRole('faculty')}
              >
                <div className="campus-auth-role-radio">
                  <input
                    type="radio"
                    name="role"
                    value="faculty"
                    checked={intendedRole === 'faculty'}
                    onChange={() => setIntendedRole('faculty')}
                  />
                </div>
                <div className="campus-auth-role-content">
                  <strong>Faculty</strong>
                  <p>Upload study materials for students</p>
                </div>
              </label>
            </div>
          </div>

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="At least 8 characters."
            required
            rightElement={
              <button
                type="button"
                className="campus-auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Admin Review Notice Banner */}
          <div className="campus-auth-notice">
            <ShieldAlert size={20} className="campus-auth-notice-icon" />
            <p>
              Your account will be reviewed by the administrator. Your access role will be assigned after approval.
            </p>
          </div>

          <label className="campus-auth-remember">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />{' '}
            I agree to the <a href="#terms" className="campus-auth-link">Terms of Service</a> and{' '}
            <a href="#privacy" className="campus-auth-link">Privacy Policy</a>.
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
          >
            Create Account
          </Button>
        </form>

        <div className="campus-auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="campus-auth-link campus-auth-link--highlight">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const PendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="campus-auth-container">
      <div className="campus-auth-card" style={{ textAlign: 'center' }}>
        <div className="campus-auth-notice-badge">
          <ShieldAlert size={40} className="campus-notice-big-icon" />
        </div>
        <h1 className="campus-auth-title" style={{ marginTop: 16 }}>Registration Pending</h1>
        <p className="campus-auth-subtitle" style={{ marginTop: 8, marginBottom: 24 }}>
          Your registration request has been submitted successfully and is under review by your institution's Administrator.
        </p>

        <div className="campus-pending-box">
          <div className="campus-pending-item">
            <span>Requested Intended Role:</span>
            <strong>Student / Faculty</strong>
          </div>
          <div className="campus-pending-item">
            <span>Account Status:</span>
            <span className="campus-status-pill">Pending Verification</span>
          </div>
        </div>

        <p className="campus-pending-help">
          Once an Administrator approves your request and verifies your academic credentials, you will gain access to your role-based dashboard.
        </p>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="outline" onClick={() => navigate('/login')}>
            Back to Login
          </Button>
          <Button variant="navy" onClick={() => navigate('/admin/pending-registrations')}>
            Simulate Admin Approval UI
          </Button>
        </div>
      </div>
    </div>
  );
};
