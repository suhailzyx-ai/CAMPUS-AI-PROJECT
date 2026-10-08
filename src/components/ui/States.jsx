import React from 'react';
import { Loader2, AlertTriangle, CheckCircle2, Inbox } from 'lucide-react';
import { Button } from './Button';
import './States.css';

export const LoadingState = ({ message = 'Loading campus resources...' }) => (
  <div className="campus-state-container">
    <Loader2 className="campus-state-spinner" size={36} />
    <p className="campus-state-text">{message}</p>
  </div>
);

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No materials found',
  description = 'There are currently no items to display here.',
  actionLabel,
  onAction
}) => (
  <div className="campus-state-container">
    <div className="campus-state-icon-wrapper">
      <Icon size={32} />
    </div>
    <h3 className="campus-state-title">{title}</h3>
    <p className="campus-state-description">{description}</p>
    {actionLabel && onAction && (
      <Button variant="primary" onClick={onAction} style={{ marginTop: 12 }}>
        {actionLabel}
      </Button>
    )}
  </div>
);

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Unable to load the requested content. Please try again.',
  onRetry
}) => (
  <div className="campus-state-container campus-state-container--error">
    <div className="campus-state-icon-wrapper campus-state-icon-wrapper--error">
      <AlertTriangle size={32} />
    </div>
    <h3 className="campus-state-title">{title}</h3>
    <p className="campus-state-description">{description}</p>
    {onRetry && (
      <Button variant="outline" onClick={onRetry} style={{ marginTop: 12 }}>
        Retry
      </Button>
    )}
  </div>
);

export const SuccessState = ({
  title = 'Success!',
  description = 'Your operation was completed successfully.',
  onContinue
}) => (
  <div className="campus-state-container">
    <div className="campus-state-icon-wrapper campus-state-icon-wrapper--success">
      <CheckCircle2 size={32} />
    </div>
    <h3 className="campus-state-title">{title}</h3>
    <p className="campus-state-description">{description}</p>
    {onContinue && (
      <Button variant="navy" onClick={onContinue} style={{ marginTop: 12 }}>
        Continue
      </Button>
    )}
  </div>
);
