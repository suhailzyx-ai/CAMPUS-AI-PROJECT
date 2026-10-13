import React from 'react';
import {
  Sparkles,
  HelpCircle,
  Languages,
  Feather,
  BookOpen,
  Globe2,
  X
} from 'lucide-react';

const FLOATING_ACTIONS = [
  { id: 'Explain', label: 'Explain', icon: Sparkles },
  { id: 'Meaning', label: 'Meaning', icon: HelpCircle },
  { id: 'Translate', label: 'Translate', icon: Languages },
  { id: 'Simplify', label: 'Simplify', icon: Feather },
  { id: 'Word Definition', label: 'Word Definition', icon: BookOpen },
  { id: 'Multilingual Explanation', label: 'Multilingual Explanation', icon: Globe2 }
];

export const TextSelectionToolbar = ({ position, onActionClick, onClose }) => {
  if (!position || !position.visible) return null;

  return (
    <div
      className={`campus-floating-selection-toolbar campus-floating-selection-toolbar--${position.placement || 'above'}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      onMouseDown={(e) => {
        // Critical: Prevent selection collapse and focus stealing when interacting with toolbar
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="campus-floating-toolbar-inner">
        <span className="campus-floating-toolbar-tag">
          <Sparkles size={12} className="campus-floating-sparkle" /> AI
        </span>

        <div className="campus-floating-toolbar-buttons">
          {FLOATING_ACTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="campus-floating-action-btn"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onActionClick(item.id);
                }}
                title={item.id}
              >
                <Icon size={13} className="campus-floating-btn-icon" />
                <span className="campus-floating-btn-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {onClose && (
          <button
            type="button"
            className="campus-floating-close-btn"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            title="Dismiss toolbar"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <div
        className={`campus-floating-arrow ${position.placement === 'below' ? 'campus-floating-arrow--top' : 'campus-floating-arrow--bottom'}`}
      />
    </div>
  );
};
