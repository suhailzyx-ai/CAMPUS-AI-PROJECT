import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Languages,
  Feather,
  BookOpen,
  Globe2,
  X,
  Search,
  ArrowRight,
  GraduationCap,
  Code2
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { AIResponseCard } from './AIResponseCard';

export const ACTIONS_CONFIG = [
  { id: 'Explain', label: 'Explain', icon: Sparkles, desc: 'Clear student-friendly explanation' },
  { id: 'Meaning', label: 'Meaning', icon: HelpCircle, desc: 'Author intent & semantic meaning' },
  { id: 'Translate', label: 'Translate', icon: Languages, desc: 'Accurate regional translation' },
  { id: 'Simplify', label: 'Simplify', icon: Feather, desc: 'Plain language with key terms' },
  { id: 'Word Definition', label: 'Word Definition', icon: BookOpen, desc: 'Define difficult terms with examples' },
  { id: 'Multilingual Explanation', label: 'Multilingual Explanation', icon: Globe2, desc: 'Deep concept explanation in mother tongue' },
  { id: 'Technical Term Preservation', label: 'Technical Term Preservation', icon: Code2, desc: 'Preserve English technical terms (Inheritance, Polymorphism, etc.)' }
];

export const SelectedTextPanel = ({
  selectedText,
  onClearSelectedText,
  onSelectSampleText,
  currentAction,
  onTriggerAction,
  activeResult,
  isLoading,
  error,
  selectedLanguage,
  onChangeLanguage,
  learningLevel = 'Beginner',
  onChangeLearningLevel,
  preserveTechnicalTerms = true,
  onTogglePreserveTechnicalTerms,
  onRegenerate
}) => {
  const [targetWord, setTargetWord] = useState('');
  const [customWordInput, setCustomWordInput] = useState('');

  // Fallback internal state in case parent doesn't provide handlers
  const [internalLevel, setInternalLevel] = useState('Beginner');
  const [internalPreserveTerms, setInternalPreserveTerms] = useState(true);

  const effectiveLevel = learningLevel !== undefined ? learningLevel : internalLevel;
  const effectivePreserveTerms = preserveTechnicalTerms !== undefined ? preserveTechnicalTerms : internalPreserveTerms;

  const hasSelection = Boolean(selectedText && selectedText.trim().length > 0);

  // Extract individual words from selected passage for Word Definition suggestions
  const wordsInPassage = React.useMemo(() => {
    if (!selectedText) return [];
    const tokens = selectedText
      .split(/[\s,.;:()"'`\n]+/)
      .map((w) => w.trim().replace(/[^a-zA-Z-]/g, ''))
      .filter((w) => w.length > 2);
    return Array.from(new Set(tokens)).slice(0, 8);
  }, [selectedText]);

  // Synchronize targetWord whenever the selected text changes
  const prevSelectedTextRef = React.useRef(selectedText);
  React.useEffect(() => {
    if (prevSelectedTextRef.current !== selectedText) {
      prevSelectedTextRef.current = selectedText;
      if (wordsInPassage.length > 0) {
        setTargetWord(wordsInPassage[0]);
        setCustomWordInput(wordsInPassage[0]);
      } else {
        setTargetWord('');
        setCustomWordInput('');
      }
    }
  }, [selectedText, wordsInPassage]);

  const handleActionClick = (actionId) => {
    if (!hasSelection) return;
    if (actionId === 'Technical Term Preservation') {
      const nextVal = !effectivePreserveTerms;
      if (onTogglePreserveTechnicalTerms) {
        onTogglePreserveTechnicalTerms(nextVal);
      } else {
        setInternalPreserveTerms(nextVal);
      }
      onTriggerAction('Technical Term Preservation', {
        language: selectedLanguage,
        targetWord,
        learningLevel: effectiveLevel,
        preserveTechnicalTerms: nextVal
      });
      return;
    }
    const word = actionId === 'Word Definition' ? (targetWord || wordsInPassage[0] || '') : targetWord;
    onTriggerAction(actionId, {
      language: selectedLanguage,
      targetWord: word,
      learningLevel: effectiveLevel,
      preserveTechnicalTerms: effectivePreserveTerms
    });
  };

  const handleLevelChange = (newLevel) => {
    if (onChangeLearningLevel) {
      onChangeLearningLevel(newLevel);
    } else {
      setInternalLevel(newLevel);
    }

    if (hasSelection) {
      const word = currentAction === 'Word Definition' ? (targetWord || wordsInPassage[0] || '') : targetWord;
      onTriggerAction(currentAction || 'Explain', {
        language: selectedLanguage,
        targetWord: word,
        learningLevel: newLevel,
        preserveTechnicalTerms: effectivePreserveTerms
      });
    }
  };

  const handleToggleTerms = () => {
    const nextVal = !effectivePreserveTerms;
    if (onTogglePreserveTechnicalTerms) {
      onTogglePreserveTechnicalTerms(nextVal);
    } else {
      setInternalPreserveTerms(nextVal);
    }

    if (hasSelection) {
      const word = currentAction === 'Word Definition' ? (targetWord || wordsInPassage[0] || '') : targetWord;
      onTriggerAction(currentAction || 'Explain', {
        language: selectedLanguage,
        targetWord: word,
        learningLevel: effectiveLevel,
        preserveTechnicalTerms: nextVal
      });
    }
  };

  const handleLanguageChange = (newLang) => {
    onChangeLanguage(newLang);
    // If current action is Translate, Multilingual Explanation, or Technical Term Preservation, regenerate immediately
    if (currentAction === 'Translate' || currentAction === 'Multilingual Explanation' || currentAction === 'Technical Term Preservation') {
      onTriggerAction(currentAction, {
        language: newLang,
        targetWord,
        learningLevel: effectiveLevel,
        preserveTechnicalTerms: effectivePreserveTerms
      });
    }
  };

  const handleWordSelect = (word) => {
    setTargetWord(word);
    setCustomWordInput(word);
    onTriggerAction('Word Definition', {
      language: selectedLanguage,
      targetWord: word,
      learningLevel: effectiveLevel,
      preserveTechnicalTerms: effectivePreserveTerms
    });
  };

  const handleWordSubmit = (e) => {
    e.preventDefault();
    if (!customWordInput.trim()) return;
    setTargetWord(customWordInput.trim());
    onTriggerAction('Word Definition', {
      language: selectedLanguage,
      targetWord: customWordInput.trim(),
      learningLevel: effectiveLevel,
      preserveTechnicalTerms: effectivePreserveTerms
    });
  };

  return (
    <div className="campus-selected-text-panel">
      {/* Selected Passage Header / Box */}
      <div className={`campus-selected-snippet-card ${!hasSelection ? 'campus-selected-snippet-card--empty' : ''}`}>
        <div className="campus-selected-snippet-header">
          <div className="campus-selected-snippet-title-row">
            <span className="campus-selected-snippet-tag">SELECTED PASSAGE</span>
            {hasSelection && (
              <span className="campus-selected-char-count">
                {selectedText.trim().split(/\s+/).length} words
              </span>
            )}
          </div>
          {hasSelection && (
            <button
              type="button"
              className="campus-selected-clear-btn"
              onClick={onClearSelectedText}
              title="Clear selection"
            >
              <X size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {hasSelection ? (
          <p className="campus-selected-snippet-quote">
            "{selectedText}"
          </p>
        ) : (
          <div className="campus-selected-empty-state">
            <p className="campus-selected-empty-hint">
              Select text in your document to explain, translate, simplify, or understand difficult concepts.
            </p>
            {onSelectSampleText && (
              <button
                type="button"
                className="campus-select-sample-btn"
                onClick={onSelectSampleText}
              >
                <span>Try sample text from document</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="campus-selected-actions-section">
        <div className="campus-selected-actions-header">
          <span className="campus-selected-actions-title">Contextual AI Actions</span>
          {!hasSelection && <span className="campus-disabled-hint">(Highlight text to enable)</span>}
        </div>

        <div className="campus-selected-action-grid">
          {ACTIONS_CONFIG.map((act) => {
            const Icon = act.icon;
            const isTermPreserve = act.id === 'Technical Term Preservation';
            const isActive = currentAction === act.id && hasSelection;
            return (
              <button
                key={act.id}
                type="button"
                className={`campus-selected-action-btn ${isActive ? 'campus-selected-action-btn--active' : ''} ${isTermPreserve ? 'campus-selected-action-btn--term-preserve' : ''}`}
                disabled={!hasSelection || isLoading}
                onMouseDown={(e) => {
                  // Prevent document selection collapse on click
                  e.preventDefault();
                }}
                onClick={() => handleActionClick(act.id)}
                title={act.desc}
              >
                <div className="campus-selected-action-content">
                  <Icon size={14} className="campus-selected-action-icon" />
                  <span className="campus-selected-action-label">{act.label}</span>
                </div>
                {isTermPreserve && (
                  <span className={`campus-action-toggle-tag ${effectivePreserveTerms ? 'campus-action-toggle-tag--on' : 'campus-action-toggle-tag--off'}`}>
                    {effectivePreserveTerms ? 'ON' : 'OFF'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Personalized Learning Level Selector Card (Beginner / Intermediate / Advanced) */}
        <div className="campus-selected-preferences-card">
          <div className="campus-pref-group">
            <div className="campus-pref-header">
              <div className="campus-pref-label-row">
                <GraduationCap size={14} className="campus-pref-icon" />
                <span className="campus-pref-title">Personalized Learning Level</span>
              </div>
              <span className="campus-pref-current-desc">
                {effectiveLevel === 'Beginner' && 'Beginner: Simple words & basic examples'}
                {effectiveLevel === 'Intermediate' && 'Intermediate: Clear technical details & examples'}
                {effectiveLevel === 'Advanced' && 'Advanced: In-depth explanations & complex examples'}
              </span>
            </div>

            <div className="campus-level-segmented-control" role="group" aria-label="Personalized Learning Level">
              {[
                { id: 'Beginner', label: 'Beginner', tip: 'Beginner: simple words and basic examples' },
                { id: 'Intermediate', label: 'Intermediate', tip: 'Intermediate: clear explanations with technical details and examples' },
                { id: 'Advanced', label: 'Advanced', tip: 'Advanced: in-depth explanations, technical accuracy, and complex examples' }
              ].map((lvl) => {
                const isSelected = effectiveLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    className={`campus-level-btn ${isSelected ? 'campus-level-btn--active' : ''}`}
                    onClick={() => handleLevelChange(lvl.id)}
                    title={lvl.tip}
                  >
                    <span className="campus-level-btn-text">{lvl.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-controls based on active action */}
      {hasSelection && (currentAction === 'Translate' || currentAction === 'Multilingual Explanation' || currentAction === 'Technical Term Preservation') && (
        <div className="campus-selected-subcontrol-box">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelectLanguage={handleLanguageChange}
            compact={true}
          />
        </div>
      )}

      {hasSelection && currentAction === 'Word Definition' && (
        <div className="campus-selected-subcontrol-box">
          <span className="campus-subcontrol-title">Choose or enter word to define:</span>
          {wordsInPassage.length > 0 && (
            <div className="campus-word-chips">
              {wordsInPassage.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`campus-word-chip ${(targetWord || '').toLowerCase() === w.toLowerCase() ? 'campus-word-chip--active' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => handleWordSelect(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleWordSubmit} className="campus-word-input-form">
            <input
              type="text"
              placeholder="Or enter any technical word..."
              value={customWordInput}
              onChange={(e) => setCustomWordInput(e.target.value)}
              className="campus-word-input"
            />
            <button type="submit" className="campus-word-submit-btn" disabled={!customWordInput.trim()}>
              <Search size={13} /> Define
            </button>
          </form>
        </div>
      )}

      {/* AI Response Display Area */}
      {hasSelection && (activeResult || isLoading || error) && (
        <div className="campus-selected-response-container">
          <AIResponseCard
            title={activeResult?.title || `AI ${currentAction || 'Analysis'}`}
            badge={activeResult?.badge || currentAction}
            content={activeResult?.content}
            summary={activeResult?.summary}
            example={activeResult?.example}
            isLoading={isLoading}
            error={error}
            onRegenerate={onRegenerate}
            learningLevel={activeResult?.learningLevel || effectiveLevel}
            preserveTechnicalTerms={activeResult?.preserveTechnicalTerms !== undefined ? activeResult?.preserveTechnicalTerms : effectivePreserveTerms}
            prompt={activeResult?.prompt}
          />
        </div>
      )}
    </div>
  );
};
