import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Logo.css';

export const Logo = ({
  variant = 'default', // 'default' (Dark text), 'light' (White text), 'compact'
  subtitle = 'Your intelligent academic companion',
  showSubtitle = false,
  className = ''
}) => {
  return (
    <Link to="/" className={`campus-logo campus-logo--${variant} ${className}`}>
      <div className="campus-logo__icon-box">
        <GraduationCap size={22} className="campus-logo__icon" />
      </div>
      <div className="campus-logo__text-group">
        <div className="campus-logo__title">
          Campus <span className="campus-logo__title-ai">AI</span>
        </div>
        {showSubtitle && subtitle && (
          <span className="campus-logo__subtitle">{subtitle}</span>
        )}
      </div>
    </Link>
  );
};
