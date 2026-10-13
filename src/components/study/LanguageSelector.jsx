import React from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../services/aiStudyService';

export const LanguageSelector = ({ selectedLanguage, onSelectLanguage, compact = false }) => {
  return (
    <div className={`campus-lang-selector ${compact ? 'campus-lang-selector--compact' : ''}`}>
      <div className="campus-lang-selector__label">
        <Globe size={14} className="campus-lang-icon" />
        <span>Select Language:</span>
      </div>
      <div className="campus-lang-selector__chips">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = selectedLanguage === lang.name;
          return (
            <button
              key={lang.code}
              type="button"
              className={`campus-lang-chip ${isActive ? 'campus-lang-chip--active' : ''}`}
              onClick={() => onSelectLanguage(lang.name)}
              title={`${lang.name} (${lang.native})`}
            >
              <span className="campus-lang-chip__name">{lang.name}</span>
              {lang.native !== lang.name && (
                <span className="campus-lang-chip__native">({lang.native})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
