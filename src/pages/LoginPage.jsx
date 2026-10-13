import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { switchRole } from '../services/authService';
import './AuthPages.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Frontend demo routing logic based on mock input
    setTimeout(() => {
      setLoading(false);
      if (email.includes('admin')) {
        switchRole('admin');
        navigate('/admin');
      } else if (email.includes('faculty')) {
        switchRole('faculty');
        navigate('/faculty');
      } else {
        switchRole('student');
        navigate('/student');
      }
    }, 400);
  };

  return (
    <div className="campus-auth-container">
      <div className="campus-auth-card">
        <div className="campus-auth-header">
          <Logo showSubtitle={true} />
          <h1 className="campus-auth-title">Welcome Back</h1>
          <p className="campus-auth-subtitle">
            Log in to access your official academic materials & AI assistant.
          </p>
        </div>

        <form onSubmit={handleLogin} className="campus-auth-form">
          <Input
            label="College Email Address"
            type="email"
            placeholder="student@college.edu"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            rightElement={
              <button
                type="button"
                className="campus-auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="campus-auth-row">
            <label className="campus-auth-remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot" className="campus-auth-link">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={LogIn}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login to Workspace'}
          </Button>
        </form>

        {/* Demo Quick Navigation Helper */}
        <div className="campus-auth-demo-bar">
          <span className="campus-auth-demo-label">Demo Role Shortcuts:</span>
          <div className="campus-auth-demo-buttons">
            <button type="button" onClick={() => { switchRole('student'); navigate('/student'); }}>Student</button>
            <button type="button" onClick={() => { switchRole('faculty'); navigate('/faculty'); }}>Faculty</button>
            <button type="button" onClick={() => { switchRole('admin'); navigate('/admin'); }}>Admin</button>
          </div>
        </div>

        <div className="campus-auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="campus-auth-link campus-auth-link--highlight">
              Sign Up <ArrowRight size={14} style={{ display: 'inline' }} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
