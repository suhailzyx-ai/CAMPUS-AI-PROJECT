import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  HelpCircle,
  Languages,
  Feather,
  BookOpen,
  Globe2,
  Code2,
  MoreHorizontal,
  X
} from 'lucide-react';

export const TextSelectionToolbar = ({
  position,
  onActionClick,
  onClose,
  preserveTechnicalTerms = true
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const toolbarRef = useRef(null);

  // Close more menu if toolbar visibility is toggled off
  useEffect(() => {
    if (!position || !position.visible) {
      setIsMoreOpen(false);
    }
  }, [position?.visible]);

  // Close more menu when clicking outside
  useEffect(() => {
    if (!isMoreOpen) return;
    const handleOutsideClick = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMoreOpen]);

  if (!position || !position.visible) return null;

  const handleAction = (e, actionId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMoreOpen(false);
    onActionClick(actionId);
  };

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMoreOpen((prev) => !prev);
  };

  return (
    <div
      ref={toolbarRef}
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
          {/* 1. Explain */}
          <button
            type="button"
            className="campus-floating-action-btn"
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onTouchStart={(e) => { e.stopPropagation(); }}
            onClick={(e) => handleAction(e, 'Explain')}
            title="Explain selected text"
          >
            <Sparkles size={13} className="campus-floating-btn-icon" />
            <span className="campus-floating-btn-label">Explain</span>
          </button>

          {/* 2. Translate */}
          <button
            type="button"
            className="campus-floating-action-btn"
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onTouchStart={(e) => { e.stopPropagation(); }}
            onClick={(e) => handleAction(e, 'Translate')}
            title="Translate selected text"
          >
            <Languages size={13} className="campus-floating-btn-icon" />
            <span className="campus-floating-btn-label">Translate</span>
          </button>

          {/* 3. Simplify (Compact screen friendly) */}
          <button
            type="button"
            className="campus-floating-action-btn campus-floating-btn--hide-compact"
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onTouchStart={(e) => { e.stopPropagation(); }}
            onClick={(e) => handleAction(e, 'Simplify')}
            title="Simplify selected text"
          >
            <Feather size={13} className="campus-floating-btn-icon" />
            <span className="campus-floating-btn-label">Simplify</span>
          </button>

          {/* 4. Technical Term Preservation (Shown in toolbar, hides on compact screens where More menu holds it) */}
          <button
            type="button"
            className="campus-floating-action-btn campus-floating-action-btn--term-preserve campus-floating-btn--hide-compact"
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onTouchStart={(e) => { e.stopPropagation(); }}
            onClick={(e) => handleAction(e, 'Technical Term Preservation')}
            title={`Technical Term Preservation is ${preserveTechnicalTerms ? 'Enabled (Click to toggle)' : 'Disabled (Click to toggle)'}`}
          >
            <Code2 size={13} className="campus-floating-btn-icon" />
            <span className="campus-floating-btn-label">Technical Terms</span>
            <span className={`campus-floating-toggle-tag ${preserveTechnicalTerms ? 'campus-floating-toggle-tag--on' : 'campus-floating-toggle-tag--off'}`}>
              {preserveTechnicalTerms ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* 5. More / Overflow Menu Button */}
          <div className="campus-floating-more-wrapper">
            <button
              type="button"
              className={`campus-floating-action-btn campus-floating-more-btn ${isMoreOpen ? 'campus-floating-action-btn--active' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onTouchStart={(e) => { e.stopPropagation(); }}
              onClick={toggleMoreMenu}
              title="More AI Actions"
              aria-expanded={isMoreOpen}
            >
              <MoreHorizontal size={14} className="campus-floating-btn-icon" />
              <span className="campus-floating-btn-label">More</span>
            </button>

            {/* Overflow Dropdown Menu */}
            {isMoreOpen && (
              <div
                className="campus-floating-more-menu"
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onTouchStart={(e) => { e.stopPropagation(); }}
              >
                <div className="campus-floating-menu-header">More AI Actions</div>
                <button
                  type="button"
                  className="campus-floating-menu-item"
                  onClick={(e) => handleAction(e, 'Meaning')}
                >
                  <div className="campus-floating-menu-item-left">
                    <HelpCircle size={13} className="campus-floating-btn-icon" />
                    <span>Meaning</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-floating-menu-item"
                  onClick={(e) => handleAction(e, 'Simplify')}
                >
                  <div className="campus-floating-menu-item-left">
                    <Feather size={13} className="campus-floating-btn-icon" />
                    <span>Simplify</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-floating-menu-item"
                  onClick={(e) => handleAction(e, 'Word Definition')}
                >
                  <div className="campus-floating-menu-item-left">
                    <BookOpen size={13} className="campus-floating-btn-icon" />
                    <span>Word Definition</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-floating-menu-item"
                  onClick={(e) => handleAction(e, 'Multilingual Explanation')}
                >
                  <div className="campus-floating-menu-item-left">
                    <Globe2 size={13} className="campus-floating-btn-icon" />
                    <span>Multilingual Explanation</span>
                  </div>
                </button>

                <div className="campus-floating-menu-divider" />

                {/* Technical Term Preservation inside More menu */}
                <button
                  type="button"
                  className="campus-floating-menu-item campus-floating-menu-item--highlight"
                  onClick={(e) => handleAction(e, 'Technical Term Preservation')}
                  title="Toggle English Technical Term Preservation"
                >
                  <div className="campus-floating-menu-item-left">
                    <Code2 size={13} className="campus-floating-btn-icon" />
                    <span>Technical Term Preservation</span>
                  </div>
                  <span className={`campus-floating-toggle-tag ${preserveTechnicalTerms ? 'campus-floating-toggle-tag--on' : 'campus-floating-toggle-tag--off'}`}>
                    {preserveTechnicalTerms ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            )}
          </div>
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
