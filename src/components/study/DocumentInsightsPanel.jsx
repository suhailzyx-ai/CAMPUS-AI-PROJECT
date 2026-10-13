import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  BookMarked,
  ListOrdered,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
  Globe
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const DocumentInsightsPanel = ({
  insightsData,
  isGenerating,
  error,
  onGenerateInsights,
  onAskChatQuestion,
  documentTitle,
  selectedLanguage,
  onChangeLanguage
}) => {
  const [copied, setCopied] = useState(false);
  const [showLangSelector, setShowLangSelector] = useState(false);

  const handleCopySummary = () => {
    if (!insightsData?.summary) return;
    navigator.clipboard?.writeText(insightsData.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupportActionClick = (action) => {
    if (onAskChatQuestion && action.query) {
      onAskChatQuestion(action.query);
    }
  };

  const handleLanguageChange = (lang) => {
    onChangeLanguage(lang);
    if (insightsData) {
      onGenerateInsights(lang);
    }
  };

  return (
    <div className="campus-insights-panel">
      {/* Header matching exact prompt requirements */}
      <div className="campus-insights-header">
        <div className="campus-insights-title-row">
          <div className="campus-insights-icon-circle">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="campus-insights-title">Document Insights</h3>
            <p className="campus-insights-subtitle">Understand the key ideas in this document.</p>
          </div>
        </div>

        {insightsData && !isGenerating && (
          <div className="campus-insights-header-btns">
            <button
              type="button"
              className="campus-insights-action-btn"
              onClick={() => onGenerateInsights(selectedLanguage)}
              title="Refresh insights"
            >
              <RotateCcw size={13} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              className="campus-insights-action-btn"
              onClick={() => setShowLangSelector(!showLangSelector)}
              title="Change insights language"
            >
              <Globe size={13} />
              <span>{selectedLanguage}</span>
            </button>
          </div>
        )}
      </div>

      {showLangSelector && (
        <div className="campus-insights-lang-tray">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelectLanguage={handleLanguageChange}
            compact={true}
          />
        </div>
      )}

      {/* State 1: Error state */}
      {error && (
        <div className="campus-insights-error-card">
          <AlertCircle size={20} className="campus-insights-error-icon" />
          <div className="campus-insights-error-content">
            <strong>Document Extraction Failed</strong>
            <p>{error}</p>
            <button
              type="button"
              className="campus-insights-retry-btn"
              onClick={() => onGenerateInsights(selectedLanguage)}
            >
              <RotateCcw size={14} /> Retry Generation
            </button>
          </div>
        </div>
      )}

      {/* State 2: Un-generated Empty state */}
      {!insightsData && !isGenerating && !error && (
        <div className="campus-insights-initial-card">
          <div className="campus-insights-initial-graphic">
            <FileText size={36} />
          </div>
          <h4 className="campus-insights-initial-title">Comprehensive Learning Overview</h4>
          <p className="campus-insights-initial-desc">
            Generate an AI-driven analysis across the entire syllabus note, covering core document summary, key concepts, topic hierarchy, exam tips, and interactive study prompts.
          </p>
          <button
            type="button"
            className="campus-insights-generate-btn"
            onClick={() => onGenerateInsights(selectedLanguage)}
          >
            <Sparkles size={16} />
            <span>Generate Document Insights</span>
          </button>
        </div>
      )}

      {/* State 3: Loading Skeleton State */}
      {isGenerating && (
        <div className="campus-insights-loading-container">
          <div className="campus-insights-loading-banner">
            <div className="campus-ai-pulsing-dot" />
            <span>Analyzing entire document content & synthesizing insights...</span>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="campus-insights-skeleton-block">
              <div className="campus-ai-skeleton-line" style={{ width: '40%', height: '14px' }} />
              <div className="campus-ai-skeleton-line" style={{ width: '90%' }} />
              <div className="campus-ai-skeleton-line" style={{ width: '75%' }} />
            </div>
          ))}
        </div>
      )}

      {/* State 4: Generated Content (The 5 Required Sections) */}
      {insightsData && !isGenerating && (
        <div className="campus-insights-body">
          {/* A. Document Summary */}
          <section className="campus-insights-section">
            <div className="campus-insights-sec-header">
              <div className="campus-insights-sec-title">
                <FileText size={16} className="campus-insights-sec-icon" />
                <h4>A. Document Summary</h4>
              </div>
              <button
                type="button"
                className="campus-insights-copy-btn"
                onClick={handleCopySummary}
                title="Copy summary"
              >
                {copied ? <Check size={12} className="campus-copy-success" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="campus-insights-summary-text">
              {insightsData.summary}
            </p>
          </section>

          {/* B. Key Concepts */}
          <section className="campus-insights-section">
            <div className="campus-insights-sec-header">
              <div className="campus-insights-sec-title">
                <Lightbulb size={16} className="campus-insights-sec-icon" />
                <h4>B. Key Concepts</h4>
              </div>
              <span className="campus-insights-count-badge">
                {insightsData.keyConcepts?.length || 0} Concepts
              </span>
            </div>
            <ul className="campus-insights-concepts-list">
              {insightsData.keyConcepts?.map((item, idx) => (
                <li key={idx} className="campus-insights-concept-item">
                  <div className="campus-insights-concept-bullet" />
                  <div>
                    <strong className="campus-insights-concept-name">{item.concept}</strong>
                    <span className="campus-insights-concept-sep"> — </span>
                    <span className="campus-insights-concept-desc">{item.explanation}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* C. Chapter or Topic Breakdown */}
          <section className="campus-insights-section">
            <div className="campus-insights-sec-header">
              <div className="campus-insights-sec-title">
                <ListOrdered size={16} className="campus-insights-sec-icon" />
                <h4>C. Chapter or Topic Breakdown</h4>
              </div>
            </div>
            <div className="campus-insights-topics-container">
              {insightsData.topicBreakdown?.map((tb, idx) => (
                <div key={idx} className="campus-insights-topic-module">
                  <div className="campus-insights-module-heading">
                    <span className="campus-insights-module-tag">{tb.module}</span>
                    <span className="campus-insights-module-title">{tb.title}</span>
                  </div>
                  <ul className="campus-insights-subtopic-list">
                    {tb.sections?.map((sec, sIdx) => (
                      <li key={sIdx} className="campus-insights-subtopic-item">
                        <ChevronRight size={13} className="campus-subtopic-chevron" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* D. Important Exam Points */}
          <section className="campus-insights-section campus-insights-section--exam">
            <div className="campus-insights-sec-header">
              <div className="campus-insights-sec-title">
                <GraduationCap size={16} className="campus-insights-sec-icon campus-exam-icon" />
                <h4>D. Important Exam Points</h4>
              </div>
              <span className="campus-insights-disclaimer-pill">Revision Suggestions</span>
            </div>
            <p className="campus-insights-disclaimer-note">
              * The following are syllabus-derived revision suggestions and focus areas for study, not guaranteed exam questions.
            </p>
            <div className="campus-insights-exam-list">
              {insightsData.examPoints?.map((ep, idx) => (
                <div key={idx} className="campus-insights-exam-card">
                  <span className="campus-insights-exam-tag">{ep.tag}</span>
                  <p className="campus-insights-exam-text">{ep.point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* E. Learning Support */}
          <section className="campus-insights-section">
            <div className="campus-insights-sec-header">
              <div className="campus-insights-sec-title">
                <HelpCircle size={16} className="campus-insights-sec-icon" />
                <h4>E. Learning Support</h4>
              </div>
            </div>
            <p className="campus-insights-support-hint">
              Click an interactive prompt below to explore in Chat without losing document position:
            </p>
            <div className="campus-insights-support-actions">
              {insightsData.learningSupport?.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  className="campus-insights-support-btn"
                  onClick={() => handleSupportActionClick(act)}
                >
                  <Sparkles size={14} className="campus-support-icon" />
                  <span>{act.title}</span>
                  <ChevronRight size={14} className="campus-support-arrow" />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
