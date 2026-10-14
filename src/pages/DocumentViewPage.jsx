import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Download,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MessageSquare,
  Highlighter,
  FileText,
  Info,
  X
} from 'lucide-react';
import { Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MOCK_DOCUMENT_CONTENT } from '../data/mockData';

// Specialized AI Assistant Panels & Components
import { ChatPanel } from '../components/study/ChatPanel';
import { SelectedTextPanel } from '../components/study/SelectedTextPanel';
import { DocumentInsightsPanel } from '../components/study/DocumentInsightsPanel';
import { TextSelectionToolbar } from '../components/study/TextSelectionToolbar';

// AI Services
import {
  sendChatMessage,
  processSelectedTextAction,
  generateDocumentInsights
} from '../services/aiStudyService';
import { getDocumentById } from '../services/documentStorageService';

import './DocumentViewPage.css';

export const DocumentViewPage = ({ role: roleProp }) => {
  const { id, documentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const activeDocId = id || documentId || 'doc-101';
  const isFaculty = roleProp === 'faculty' || location.pathname.startsWith('/faculty');

  const [doc, setDoc] = useState(MOCK_DOCUMENT_CONTENT);

  useEffect(() => {
    async function fetchDoc() {
      if (activeDocId) {
        try {
          const item = await getDocumentById(activeDocId);
          if (item) {
            setDoc((prev) => ({
              ...prev,
              id: item.id,
              title: item.title,
              departmentTag: item.department,
              department: item.department,
              academicYear: item.year,
              subjectCode: item.subjectCode || item.subject,
              subjectName: item.subjectName || item.subject,
              lastUpdated: item.lastUpdated || item.publishedDate || prev.lastUpdated
            }));
          }
        } catch (e) {
          console.warn('Failed to fetch doc metadata:', e);
        }
      }
    }
    fetchDoc();
  }, [activeDocId]);

  // Header & Reader states
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentPage, setCurrentPage] = useState(doc.currentPage || 1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Active AI Tab State: 'chat' | 'selectedText' | 'insights'
  const [activeAiTab, setActiveAiTab] = useState('selectedText');

  // ==========================================
  // TAB 1: CHAT TAB STATE
  // ==========================================
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  // ==========================================
  // TAB 2: SELECTED TEXT TAB STATE
  // ==========================================
  const [selectedText, setSelectedText] = useState('');
  const [currentSelectedAction, setCurrentSelectedAction] = useState('Explain');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [learningLevel, setLearningLevel] = useState('Beginner');
  const [preserveTechnicalTerms, setPreserveTechnicalTerms] = useState(true);
  const [selectedTextResult, setSelectedTextResult] = useState(null);
  const [isSelectedTextLoading, setIsSelectedTextLoading] = useState(false);
  const [selectedTextError, setSelectedTextError] = useState(null);

  // Floating Selection Toolbar State & Selection Lifecycle Refs
  const [toolbarPosition, setToolbarPosition] = useState({ visible: false, top: 0, left: 0, placement: 'above' });
  const readerBodyRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const activeSelectionRef = useRef('');
  const requestIdRef = useRef(0);

  // ==========================================
  // TAB 3: DOCUMENT INSIGHTS TAB STATE
  // ==========================================
  const [insightsData, setInsightsData] = useState(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState(null);
  const [insightsLanguage, setInsightsLanguage] = useState('English');

  // Cache insights per document ID
  const insightsCacheRef = useRef({});

  // ==========================================
  // MOBILE BOTTOM-SHEET POPUP STATE & GESTURES
  // ==========================================
  const [isMobileAiOpen, setIsMobileAiOpen] = useState(false);
  const sheetTouchStartY = useRef(0);
  const sheetTouchCurrentY = useRef(0);

  const handleSheetTouchStart = (e) => {
    sheetTouchStartY.current = e.touches[0].clientY;
  };

  const handleSheetTouchMove = (e) => {
    sheetTouchCurrentY.current = e.touches[0].clientY;
  };

  const handleSheetTouchEnd = () => {
    if (sheetTouchStartY.current && sheetTouchCurrentY.current) {
      const diffY = sheetTouchCurrentY.current - sheetTouchStartY.current;
      // Swipe down threshold: 70px
      if (diffY > 70) {
        setIsMobileAiOpen(false);
      }
    }
    sheetTouchStartY.current = 0;
    sheetTouchCurrentY.current = 0;
  };

  // Lock background scrolling while mobile bottom-sheet popup is open (< 768px)
  useEffect(() => {
    if (isMobileAiOpen && typeof window !== 'undefined' && window.innerWidth < 768) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileAiOpen]);

  // Synchronize on window resize: ensure document scrolling is restored if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        document.body.style.overflow = '';
      } else if (isMobileAiOpen) {
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileAiOpen]);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileAiOpen) {
        setIsMobileAiOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileAiOpen]);

  // ----------------------------------------------------
  // Chat Handlers
  // ----------------------------------------------------
  const handleSendMessage = async (questionText) => {
    if (!questionText?.trim() || isChatLoading) return;

    const userMessage = {
      sender: 'user',
      text: questionText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await sendChatMessage({
        question: questionText,
        conversationHistory: chatMessages,
        documentContext: doc
      });

      const aiMessage = {
        sender: 'assistant',
        text: response.text,
        suggestions: response.suggestions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setChatError('Failed to generate AI response. Please try again.');
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRetryLastChat = () => {
    const lastUserMsg = [...chatMessages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  // ----------------------------------------------------
  // Selected Text Handlers
  // ----------------------------------------------------
  const handleTriggerSelectedAction = useCallback(async (actionId, options = {}) => {
    // 1. Immediately capture the latest selected text (from options, state, or active ref)
    const textToProcess = (options.text || selectedText || activeSelectionRef.current || '').trim();
    if (!textToProcess) return;

    // Immediately synchronize selectedText state if needed
    if (textToProcess !== selectedText) {
      setSelectedText(textToProcess);
    }

    const lang = options.language || selectedLanguage;
    const word = options.targetWord || '';
    const level = options.learningLevel || learningLevel;
    const preserveTerms = options.preserveTechnicalTerms !== undefined ? options.preserveTechnicalTerms : preserveTechnicalTerms;

    // Race condition prevention: assign request counter ID
    const currentRequestId = ++requestIdRef.current;

    setCurrentSelectedAction(actionId);
    setIsSelectedTextLoading(true);
    setSelectedTextError(null);

    try {
      const result = await processSelectedTextAction({
        action: actionId,
        text: textToProcess,
        language: lang,
        targetWord: word,
        learningLevel: level,
        preserveTechnicalTerms: preserveTerms
      });

      // Discard stale responses if a newer request was dispatched in the meantime
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setSelectedTextResult(result);
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setSelectedTextError(err?.message || 'Unable to analyze selected text. Please retry.');
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsSelectedTextLoading(false);
      }
    }
  }, [selectedText, selectedLanguage, learningLevel, preserveTechnicalTerms]);

  const handleClearSelection = () => {
    activeSelectionRef.current = '';
    setSelectedText('');
    setSelectedTextResult(null);
    setSelectedTextError(null);
    setToolbarPosition({ visible: false, top: 0, left: 0, placement: 'above' });
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  const handleSelectSampleText = () => {
    const sample = doc.selectedTextSnippet;
    activeSelectionRef.current = sample;
    setSelectedText(sample);
    handleTriggerSelectedAction('Explain', {
      text: sample,
      learningLevel,
      preserveTechnicalTerms
    });
  };

  // ----------------------------------------------------
  // Document Insights Handlers
  // ----------------------------------------------------
  const handleGenerateInsights = async (lang = insightsLanguage) => {
    setIsGeneratingInsights(true);
    setInsightsError(null);

    try {
      const result = await generateDocumentInsights(doc, lang);
      setInsightsData(result);
      insightsCacheRef.current[doc.id + '_' + lang] = result;
    } catch (err) {
      setInsightsError('Could not synthesize document insights. Check network connection and retry.');
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const handleAskInChatFromInsights = (question) => {
    setActiveAiTab('chat');
    handleSendMessage(question);
  };

  // ----------------------------------------------------
  // Single Source of Truth Text Selection Handler
  // ----------------------------------------------------
  const checkAndApplySelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    if (selection.isCollapsed) {
      // Hide toolbar if selection is collapsed
      setToolbarPosition((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }

    const rawText = selection.toString().trim();
    if (rawText.length < 2) {
      setToolbarPosition((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }

    // Verify selection is within reader body
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    if (
      !readerBodyRef.current ||
      (!readerBodyRef.current.contains(anchorNode) && !readerBodyRef.current.contains(focusNode))
    ) {
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const readerRect = readerBodyRef.current.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) return;

      const topOffset = rect.top - readerRect.top;
      const leftOffset = rect.left - readerRect.left + rect.width / 2;

      const placement = topOffset < 65 ? 'below' : 'above';
      const computedTop = placement === 'above' ? topOffset - 12 : topOffset + rect.height + 10;

      // Keep toolbar safely within reader body horizontal boundaries
      const halfToolbarWidth = Math.min(260, (readerRect.width - 32) / 2);
      const clampedLeft = Math.max(
        halfToolbarWidth + 16,
        Math.min(readerRect.width - halfToolbarWidth - 16, leftOffset)
      );

      activeSelectionRef.current = rawText;

      setSelectedText((prevText) => {
        // If passage changed, clear stale response immediately
        if (prevText !== rawText) {
          setSelectedTextResult(null);
          setSelectedTextError(null);
        }
        return rawText;
      });

      setToolbarPosition({
        visible: true,
        top: Math.max(10, computedTop),
        left: clampedLeft,
        placement
      });
    } catch {
      // Ignored if range is detached
    }
  }, []);

  // Set up robust pointer, keyboard, scroll, and selectionchange event listeners
  useEffect(() => {
    const readerEl = readerBodyRef.current;
    if (!readerEl) return;

    const handlePointerDown = () => {
      isPointerDownRef.current = true;
    };

    const handlePointerUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        // On pointer release, evaluate and show toolbar cleanly on the first attempt
        checkAndApplySelection();
      }
    };

    let rafId = null;
    const handleSelectionChange = () => {
      if (isPointerDownRef.current) {
        // While student is dragging across text, only record text into ref
        // DO NOT call setState during active drag: prevents re-render thrashing that breaks drag selection!
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed) {
          activeSelectionRef.current = sel.toString().trim();
        }
        return;
      }

      // Not dragging: keyboard selection (Shift+Arrows), programmatic, or click release
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        checkAndApplySelection();
      });
    };

    const handleScrollOrResize = () => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && toolbarPosition.visible) {
        checkAndApplySelection();
      }
    };

    readerEl.addEventListener('mousedown', handlePointerDown);
    readerEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      readerEl.removeEventListener('mousedown', handlePointerDown);
      readerEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [checkAndApplySelection, toolbarPosition.visible]);

  const handleFloatingToolbarAction = (actionId) => {
    // Capture latest selected text from browser or state
    const currentSelText = window.getSelection()?.toString()?.trim();
    const textToUse = currentSelText || selectedText || activeSelectionRef.current;
    if (!textToUse) return;

    setSelectedText(textToUse);
    setActiveAiTab('selectedText');

    if (actionId === 'Technical Term Preservation') {
      const nextPreserve = !preserveTechnicalTerms;
      setPreserveTechnicalTerms(nextPreserve);
      handleTriggerSelectedAction('Technical Term Preservation', {
        text: textToUse,
        learningLevel,
        preserveTechnicalTerms: nextPreserve
      });
    } else {
      handleTriggerSelectedAction(actionId, {
        text: textToUse,
        learningLevel,
        preserveTechnicalTerms
      });
    }

    // Open bottom-sheet popup on mobile screens
    setIsMobileAiOpen(true);

    // Dismiss toolbar smoothly once action is activated
    setToolbarPosition((prev) => ({ ...prev, visible: false }));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="campus-docview-container">
      {/* Top Breadcrumb & Document Header */}
      <div className="campus-docview-header">
        <div className="campus-docview-header__left">
          <button
            type="button"
            onClick={() => {
              if (isFaculty) {
                navigate('/faculty', { state: { viewDocId: activeDocId } });
              } else if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/student/documents');
              }
            }}
            className="campus-docview-back"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
            title={isFaculty ? 'Back to Faculty Document View' : 'Back to Documents'}
          >
            <ArrowLeft size={16} /> {isFaculty ? 'Back to Faculty Document' : 'Back to Documents'}
          </button>
          <span className="campus-docview-crumb">
            &gt; {isFaculty ? 'Faculty Portal > ' : ''}{doc.departmentTag || doc.department} Repository
          </span>

          <div className="campus-docview-title-row">
            <h1 className="campus-docview-title">{doc.title}</h1>
            <div className="campus-docview-badges">
              <Badge variant="navy" size="sm">{doc.subjectCode}</Badge>
              <Badge variant="slate" size="sm">{doc.departmentTag}</Badge>
              <Badge variant="slate" size="sm">{doc.academicYear}</Badge>
              <Badge variant="amber" size="sm">{doc.categoryTag}</Badge>
            </div>
          </div>
        </div>

        <div className="campus-docview-header__right">
          <Button
            variant={isBookmarked ? 'primary' : 'outline'}
            size="md"
            icon={Bookmark}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? 'Saved' : 'Bookmark'}
          </Button>
          <Button variant="navy" size="md" icon={Download}>
            Download PDF
          </Button>
          <button className="campus-docview-icon-btn" title="Share Document">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Main Reading Split Area */}
      <div className="campus-docview-split">
        {/* Left Side: Document Reading Container */}
        <div className="campus-docview-reader-card">
          <div className="campus-docview-meta-banner">
            <div className="campus-docview-faculty-meta">
              <strong>{doc.department.toUpperCase()}</strong>
              <span>|</span>
              <span>{doc.faculty.toUpperCase()}</span>
            </div>
            <div className="campus-docview-status-meta">
              <Badge variant="success" size="sm">• {doc.alignedStatus}</Badge>
              <span>Updated: {doc.lastUpdated}</span>
            </div>
          </div>

          {/* Interactive Document Body with natural text selection */}
          <div
            ref={readerBodyRef}
            className="campus-docview-body"
          >
            {/* Floating Contextual Toolbar on text selection */}
            <TextSelectionToolbar
              position={toolbarPosition}
              onActionClick={handleFloatingToolbarAction}
              preserveTechnicalTerms={preserveTechnicalTerms}
              onClose={() => setToolbarPosition({ visible: false, top: 0, left: 0, placement: 'above' })}
            />

            {/* Contextual Helper notice for students and faculty */}
            <div className="campus-docview-reader-tip">
              <Info size={14} className="campus-docview-tip-icon" />
              <span>
                {isFaculty
                  ? 'Faculty AI Workspace: Select any passage to generate contextual study explanations, definitions, and AI summaries for your students.'
                  : 'Select any text in the reading pane to trigger instant contextual AI explanations, definitions, and translations.'}
              </span>
            </div>

            {doc.contentSections.map((sec, idx) => (
              <div key={idx} className="campus-docview-section">
                <span className="campus-docview-module-tag">LECTURE MODULE 01</span>
                <h2 className="campus-docview-sec-h1">{sec.title}</h2>
                <p className="campus-docview-sec-sub">{sec.subtitle}</p>

                <h3 className="campus-docview-sec-h2">{sec.heading1}</h3>
                <p className="campus-docview-para">{sec.body1}</p>

                {/* Interactive Focus Passage: styled clearly as an academic excerpt that can be highlighted */}
                <div
                  className={`campus-docview-sample-excerpt ${selectedText === doc.selectedTextSnippet ? 'campus-docview-sample-excerpt--selected' : ''}`}
                >
                  <div className="campus-excerpt-tag">
                    <span>KEY EXCERPT</span>
                    {selectedText !== doc.selectedTextSnippet && (
                      <button
                        type="button"
                        className="campus-excerpt-select-btn"
                        onClick={() => {
                          setSelectedText(doc.selectedTextSnippet);
                          setActiveAiTab('selectedText');
                          handleTriggerSelectedAction('Explain', { text: doc.selectedTextSnippet });
                          setIsMobileAiOpen(true);
                        }}
                      >
                        <Highlighter size={12} /> Select this text
                      </button>
                    )}
                  </div>
                  <p className="campus-docview-highlighted-text">
                    "{doc.selectedTextSnippet}"
                  </p>
                </div>

                <p className="campus-docview-para">{sec.body2}</p>

                <h3 className="campus-docview-sec-h2">{sec.heading2}</h3>
                <p className="campus-docview-para">{sec.body3}</p>

                {/* Table representation */}
                <div className="campus-docview-table-wrapper">
                  <table className="campus-table">
                    <thead>
                      <tr>
                        <th>Classification</th>
                        <th>Memory Model</th>
                        <th>Primary Examples</th>
                        <th>Typical Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sec.tableData.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td><strong>{row.classification}</strong></td>
                          <td>{row.memoryModel}</td>
                          <td>{row.primaryExamples}</td>
                          <td>{row.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Code block representation */}
                <div className="campus-docview-code-block">
                  <div className="campus-docview-code-header">
                    <span>{sec.codeSnippetName}</span>
                    <button
                      type="button"
                      className="campus-docview-code-copy"
                      onClick={() => handleCopyCode(sec.codeSnippet)}
                    >
                      {copiedCode ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="campus-docview-code-content">
                    <code>{sec.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Reader Footer Controls */}
          <div className="campus-docview-reader-footer">
            <div className="campus-docview-page-nav">
              <button
                type="button"
                className="campus-docview-page-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <span>Page {currentPage} of {doc.totalPages}</span>
              <button
                type="button"
                className="campus-docview-page-btn"
                disabled={currentPage >= doc.totalPages}
                onClick={() => setCurrentPage((p) => Math.min(doc.totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="campus-docview-zoom-controls">
              <button
                type="button"
                className="campus-docview-page-btn"
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
              >
                -
              </button>
              <span>{zoomLevel}%</span>
              <button
                type="button"
                className="campus-docview-page-btn"
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              >
                +
              </button>
              <button
                type="button"
                className="campus-docview-page-btn"
                title="Reset Zoom"
                onClick={() => setZoomLevel(100)}
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile bottom-sheet popup */}
        {isMobileAiOpen && (
          <div
            className="campus-docview-mobile-backdrop"
            onClick={() => setIsMobileAiOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />
        )}

        {/* Right Side / Mobile Bottom Sheet: AI Study Assistant Drawer */}
        <div
          className={`campus-docview-ai-drawer ${isMobileAiOpen ? 'campus-docview-ai-drawer--mobile-open' : ''}`}
          role="region"
          aria-label="AI Study Assistant"
        >
          {/* Mobile Sheet Drag Handle & Close Header (Visible only on mobile) */}
          <div
            className="campus-docview-sheet-mobile-bar"
            onTouchStart={handleSheetTouchStart}
            onTouchMove={handleSheetTouchMove}
            onTouchEnd={handleSheetTouchEnd}
          >
            <div className="campus-docview-sheet-handle-track">
              <span className="campus-docview-sheet-drag-handle" />
            </div>
            <button
              type="button"
              className="campus-docview-sheet-close-btn"
              onClick={() => setIsMobileAiOpen(false)}
              aria-label="Close AI Study Assistant"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="campus-docview-ai-header">
            <div className="campus-docview-ai-title-group">
              <div className="campus-docview-ai-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="campus-docview-ai-title">AI Study Assistant</h3>
                <span className="campus-docview-ai-status">• Active on this document</span>
              </div>
            </div>

            {/* AI Mode Tabs - Clean Distinct Navigation */}
            <div className="campus-docview-ai-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeAiTab === 'chat'}
                className={`campus-docview-ai-tab ${activeAiTab === 'chat' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('chat')}
              >
                <MessageSquare size={13} className="campus-ai-tab-icon" />
                <span>Chat</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeAiTab === 'selectedText'}
                className={`campus-docview-ai-tab ${activeAiTab === 'selectedText' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('selectedText')}
              >
                <Highlighter size={13} className="campus-ai-tab-icon" />
                <span>Selected Text</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeAiTab === 'insights'}
                className={`campus-docview-ai-tab ${activeAiTab === 'insights' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('insights')}
              >
                <FileText size={13} className="campus-ai-tab-icon" />
                <span>Document Insights</span>
              </button>
            </div>
          </div>

          {/* AI Drawer Body - Renders ONLY the active tab component */}
          <div className="campus-docview-ai-body">
            {activeAiTab === 'chat' && (
              <ChatPanel
                messages={chatMessages}
                inputQuestion={chatInput}
                setInputQuestion={setChatInput}
                onSendMessage={handleSendMessage}
                isLoading={isChatLoading}
                error={chatError}
                onRetryLast={handleRetryLastChat}
              />
            )}

            {activeAiTab === 'selectedText' && (
              <SelectedTextPanel
                selectedText={selectedText}
                onClearSelectedText={handleClearSelection}
                onSelectSampleText={handleSelectSampleText}
                currentAction={currentSelectedAction}
                onTriggerAction={handleTriggerSelectedAction}
                activeResult={selectedTextResult}
                isLoading={isSelectedTextLoading}
                error={selectedTextError}
                selectedLanguage={selectedLanguage}
                onChangeLanguage={setSelectedLanguage}
                learningLevel={learningLevel}
                onChangeLearningLevel={(newLevel) => {
                  setLearningLevel(newLevel);
                  if (selectedText) {
                    handleTriggerSelectedAction(currentSelectedAction || 'Explain', {
                      learningLevel: newLevel,
                      preserveTechnicalTerms
                    });
                  }
                }}
                preserveTechnicalTerms={preserveTechnicalTerms}
                onTogglePreserveTechnicalTerms={(newToggle) => {
                  setPreserveTechnicalTerms(newToggle);
                  if (selectedText) {
                    handleTriggerSelectedAction(currentSelectedAction || 'Explain', {
                      learningLevel,
                      preserveTechnicalTerms: newToggle
                    });
                  }
                }}
                onRegenerate={() => handleTriggerSelectedAction(currentSelectedAction, {
                  language: selectedLanguage,
                  learningLevel,
                  preserveTechnicalTerms
                })}
              />
            )}

            {activeAiTab === 'insights' && (
              <DocumentInsightsPanel
                insightsData={insightsData}
                isGenerating={isGeneratingInsights}
                error={insightsError}
                onGenerateInsights={handleGenerateInsights}
                onAskChatQuestion={handleAskInChatFromInsights}
                documentTitle={doc.title}
                selectedLanguage={insightsLanguage}
                onChangeLanguage={setInsightsLanguage}
              />
            )}
          </div>
        </div>

        {/* Mobile Floating Action Button to launch AI Assistant (Visible only on mobile when sheet is closed) */}
        {!isMobileAiOpen && (
          <button
            type="button"
            className="campus-docview-mobile-fab"
            onClick={() => setIsMobileAiOpen(true)}
            aria-label="Open AI Study Assistant"
          >
            <Sparkles size={16} />
            <span>AI Assistant</span>
          </button>
        )}
      </div>
    </div>
  );
};
