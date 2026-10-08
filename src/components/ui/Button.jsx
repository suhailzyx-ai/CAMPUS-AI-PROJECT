import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary' (Amber CTA), 'secondary' (Slate), 'navy' (Deep Navy), 'outline', 'destructive', 'ghost'
  size = 'md',          // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`campus-btn campus-btn--${variant} campus-btn--${size} ${fullWidth ? 'campus-btn--full' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="campus-btn__icon" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span className="campus-btn__text">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="campus-btn__icon" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
};
