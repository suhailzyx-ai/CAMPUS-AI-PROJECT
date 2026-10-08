import React from 'react';
import './Input.css';

export const Input = ({
  label,
  id,
  type = 'text',
  error,
  helperText,
  icon: Icon,
  rightElement,
  fullWidth = true,
  required = false,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`campus-input-group ${fullWidth ? 'campus-input-group--full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="campus-input__label">
          {label} {required && <span className="campus-input__required">*</span>}
        </label>
      )}
      <div className="campus-input__wrapper">
        {Icon && <Icon className="campus-input__left-icon" size={18} />}
        <input
          id={inputId}
          type={type}
          className={`campus-input ${Icon ? 'campus-input--has-left-icon' : ''} ${rightElement ? 'campus-input--has-right-element' : ''} ${error ? 'campus-input--error' : ''}`}
          {...props}
        />
        {rightElement && <div className="campus-input__right-element">{rightElement}</div>}
      </div>
      {error && <p className="campus-input__error-msg">{error}</p>}
      {!error && helperText && <p className="campus-input__helper-text">{helperText}</p>}
    </div>
  );
};

export const Select = ({
  label,
  id,
  options = [],
  error,
  helperText,
  icon: Icon,
  required = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`campus-input-group ${fullWidth ? 'campus-input-group--full' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="campus-input__label">
          {label} {required && <span className="campus-input__required">*</span>}
        </label>
      )}
      <div className="campus-input__wrapper">
        {Icon && <Icon className="campus-input__left-icon" size={18} />}
        <select
          id={selectId}
          className={`campus-input campus-select ${Icon ? 'campus-input--has-left-icon' : ''} ${error ? 'campus-input--error' : ''}`}
          {...props}
        >
          {options.map((opt, idx) => {
            const isObj = typeof opt === 'object';
            const value = isObj ? opt.value : opt;
            const optLabel = isObj ? opt.label : opt;
            return (
              <option key={idx} value={value}>
                {optLabel}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className="campus-input__error-msg">{error}</p>}
      {!error && helperText && <p className="campus-input__helper-text">{helperText}</p>}
    </div>
  );
};
