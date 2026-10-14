import React, { useState } from 'react';
import { Sparkles, RotateCcw, Copy, Check, Volume2, AlertCircle } from 'lucide-react';

export const AIResponseCard = ({
  title = 'AI Response',
  badge = 'Generated',
  content = '',
  summary = '',
  example = '',
  isLoading = false,
  onRegenerate,
  error = null,
  learningLevel,
  preserveTechnicalTerms,
  prompt
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `${summary ? summary + '\n\n' : ''}${content}${example ? '\n\n' + example : ''}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      const textToSpeak = content.replace(/[#*`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) {
    return (
      <div className="campus-ai-result-card campus-ai-result-card--loading">
        <div className="campus-ai-loading-header">
          <div className="campus-ai-pulsing-dot" />
          <span className="campus-ai-loading-text">Analyzing text & generating AI response...</span>
        </div>
        <div className="campus-ai-skeleton-line" style={{ width: '85%' }} />
        <div className="campus-ai-skeleton-line" style={{ width: '95%' }} />
        <div className="campus-ai-skeleton-line" style={{ width: '70%' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="campus-ai-result-card campus-ai-result-card--error">
        <div className="campus-ai-error-header">
          <AlertCircle size={18} className="campus-ai-error-icon" />
          <strong>Generation Failed</strong>
        </div>
        <p className="campus-ai-error-msg">{error}</p>
        {onRegenerate && (
          <button type="button" className="campus-ai-retry-btn" onClick={onRegenerate}>
            <RotateCcw size={14} /> Retry Generation
          </button>
        )}
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="campus-ai-result-card">
      <div className="campus-ai-result-header">
        <div className="campus-ai-result-title">
          <Sparkles size={16} className="campus-ai-sparkle-icon" />
          <strong>{title}</strong>
          {badge && <span className="campus-ai-badge-pill">{badge}</span>}
          {learningLevel && (
            <span className={`campus-ai-level-pill campus-ai-level-pill--${learningLevel.toLowerCase()}`}>
              {learningLevel}
            </span>
          )}
          {preserveTechnicalTerms && (
            <span className="campus-ai-terms-pill" title="English Technical Terms Preserved">
              Terms Preserved (EN)
            </span>
          )}
        </div>
        <div className="campus-ai-header-actions">
          {onRegenerate && (
            <button
              type="button"
              className="campus-ai-tool-btn"
              title="Regenerate this response"
              onClick={onRegenerate}
            >
              <RotateCcw size={13} />
              <span>Regenerate</span>
            </button>
          )}
          <button
            type="button"
            className="campus-ai-tool-btn"
            title="Copy response"
            onClick={handleCopy}
          >
            {copied ? <Check size={13} className="campus-copy-success" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            type="button"
            className={`campus-ai-tool-btn ${isPlayingAudio ? 'campus-ai-tool-btn--active' : ''}`}
            title={isPlayingAudio ? 'Stop audio' : 'Listen with text-to-speech'}
            onClick={handleSpeak}
          >
            <Volume2 size={13} />
          </button>
        </div>
      </div>

      {summary && <p className="campus-ai-result-summary">{summary}</p>}

      <div className="campus-ai-result-content">
        {content.split('\n\n').map((para, i) => (
          <p key={i} className="campus-ai-result-paragraph">
            {para.split('\n').map((line, j) => {
              // Simple bold formatter
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <span key={j} style={{ display: 'block' }}>
                  {parts.map((p, k) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return <strong key={k}>{p.slice(2, -2)}</strong>;
                    }
                    if (p.startsWith('`') && p.endsWith('`')) {
                      return <code key={k} className="campus-inline-code">{p.slice(1, -1)}</code>;
                    }
                    return p;
                  })}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {example && (
        <div className="campus-ai-example-box">
          <div className="campus-ai-example-label">PRACTICAL EXAMPLE / ANALOGY</div>
          <p className="campus-ai-example-text">{example}</p>
        </div>
      )}
    </div>
  );
};
