import React from 'react';
import './Card.css';

export const Card = ({
  children,
  className = '',
  padding = 'md', // 'none', 'sm', 'md', 'lg'
  bordered = true,
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`campus-card campus-card--pad-${padding} ${bordered ? 'campus-card--bordered' : ''} ${hoverable ? 'campus-card--hoverable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({
  children,
  variant = 'slate', // 'amber', 'navy', 'slate', 'student', 'faculty', 'admin', 'success', 'destructive'
  size = 'md', // 'sm', 'md'
  className = '',
  ...props
}) => {
  return (
    <span className={`campus-badge campus-badge--${variant} campus-badge--${size} ${className}`} {...props}>
      {children}
    </span>
  );
};
