import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Download,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  RotateCcw,
  Check,
  Send
} from 'lucide-react';
import { Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MOCK_DOCUMENT_CONTENT } from '../data/mockData';
import './DocumentViewPage.css';

export const DocumentViewPage = () => {
  const { id } = useParams();
  const doc = MOCK_DOCUMENT_CONTENT;

  const [activeAiTab, setActiveAiTab] = useState('selectedText'); // 'chat', 'selectedText', 'insights'
  const [selectedAction, setSelectedAction] = useState('Explain'); // 'Explain', 'Meaning', 'Summarize', 'Translate', 'Simplify'
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // 'English', 'Tamil', 'Hindi'
  const [aiQuestion, setAiQuestion] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(true);

  const actionsList = ['Explain', 'Meaning', 'Summarize', 'Translate', 'Simplify', 'Ask AI'];

  return (
    <div className="campus-docview-container">
      {/* Top Breadcrumb & Document Header matching reference screenshot */}
      <div className="campus-docview-header">
        <div className="campus-docview-header__left">
          <Link to="/student" className="campus-docview-back">
            <ArrowLeft size={16} /> Back to Documents
          </Link>
          <span className="campus-docview-crumb">&gt; {doc.departmentTag} Repository</span>

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
          <button className="campus-docview-icon-btn" title="Share">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Main Reading Split Area */}
      <div className="campus-docview-split">
        {/* Left Side: Document Reading Container matching screenshot */}
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

          {/* Document Content View */}
          <div className="campus-docview-body">
            {doc.contentSections.map((sec, idx) => (
              <div key={idx} className="campus-docview-section">
                <span className="campus-docview-module-tag">LECTURE MODULE 01</span>
                <h2 className="campus-docview-sec-h1">{sec.title}</h2>
                <p className="campus-docview-sec-sub">{sec.subtitle}</p>

                <h3 className="campus-docview-sec-h2">{sec.heading1}</h3>
                <p className="campus-docview-para">{sec.body1}</p>

                {/* HIGHLIGHTED SELECTED TEXT STATE MATCHING SCREENSHOT */}
                <div className="campus-docview-selected-text-box">
                  <p className="campus-docview-highlighted-text">
                    "{doc.selectedTextSnippet}"
                  </p>
                  
                  {/* Floating Action Menu above selected text */}
                  <div className="campus-docview-floating-actions">
                    {actionsList.map((act) => (
                      <button
                        key={act}
                        className={`campus-docview-float-btn ${selectedAction === act ? 'campus-docview-float-btn--active' : ''}`}
                        onClick={() => setSelectedAction(act)}
                      >
                        {act === 'Explain' && <Sparkles size={12} />}
                        {act}
                      </button>
                    ))}
                  </div>
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
                    <button className="campus-docview-code-copy">Copy</button>
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
              <button className="campus-docview-page-btn"><ChevronLeft size={16} /></button>
              <span>Page {doc.currentPage} of {doc.totalPages}</span>
              <button className="campus-docview-page-btn"><ChevronRight size={16} /></button>
            </div>
            <div className="campus-docview-zoom-controls">
              <button className="campus-docview-page-btn">-</button>
              <span>100%</span>
              <button className="campus-docview-page-btn">+</button>
              <button className="campus-docview-page-btn" title="Fit Width"><Maximize2 size={14} /></button>
            </div>
          </div>
        </div>

        {/* Right Side: AI Study Assistant Drawer matching screenshot */}
        <div className="campus-docview-ai-drawer">
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

            {/* AI Mode Tabs matching screenshot */}
            <div className="campus-docview-ai-tabs">
              <button
                className={`campus-docview-ai-tab ${activeAiTab === 'chat' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('chat')}
              >
                Chat
              </button>
              <button
                className={`campus-docview-ai-tab ${activeAiTab === 'selectedText' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('selectedText')}
              >
                Selected Text
              </button>
              <button
                className={`campus-docview-ai-tab ${activeAiTab === 'insights' ? 'campus-docview-ai-tab--active' : ''}`}
                onClick={() => setActiveAiTab('insights')}
              >
                Document Insights
              </button>
            </div>
          </div>

          <div className="campus-docview-ai-body">
            {/* Selected Text Preview Container */}
            <div className="campus-docview-ai-snippet-box">
              <div className="campus-docview-ai-snippet-header">
                <span className="campus-docview-ai-label">SELECTED TEXT</span>
                <button className="campus-docview-ai-clear">Clear</button>
              </div>
              <p className="campus-docview-ai-snippet-content">
                "{doc.selectedTextSnippet}"
              </p>
            </div>

            {/* Quick AI Action Pills */}
            <div className="campus-docview-ai-action-pills">
              {['Explain', 'Meaning', 'Summarize', 'Translate', 'Simplify'].map((act) => (
                <button
                  key={act}
                  className={`campus-docview-ai-pill ${selectedAction === act ? 'campus-docview-ai-pill--active' : ''}`}
                  onClick={() => setSelectedAction(act)}
                >
                  {act}
                </button>
              ))}
            </div>

            {/* AI Output Card matching screenshot */}
            <div className="campus-docview-ai-result-card">
              <div className="campus-docview-ai-result-header">
                <div className="campus-docview-ai-result-title">
                  <Sparkles size={16} className="campus-docview-sparkle-icon" />
                  <strong>AI Explanation</strong>
                </div>
                <button className="campus-docview-ai-regen-btn">
                  <RotateCcw size={12} /> Regenerate
                </button>
              </div>

              <p className="campus-docview-ai-result-text">
                Data structures are systematic ways of organizing and storing data in a computer so that operations like searching, inserting, deleting, and updating can be performed efficiently. They help manage large volumes of data in a structured format, making programs faster, more organized, and easier to maintain.
              </p>

              {/* Multilingual Explanation Tabs - CRITICAL REQUIREMENT */}
              <div className="campus-docview-multilingual-box">
                <div className="campus-docview-lang-label">
                  <span>Multilingual Explanation</span>
                </div>
                <div className="campus-docview-lang-tabs">
                  <button
                    className={`campus-docview-lang-btn ${selectedLanguage === 'English' ? 'campus-docview-lang-btn--active' : ''}`}
                    onClick={() => setSelectedLanguage('English')}
                  >
                    English
                  </button>
                  <button
                    className={`campus-docview-lang-btn ${selectedLanguage === 'Tamil' ? 'campus-docview-lang-btn--active' : ''}`}
                    onClick={() => setSelectedLanguage('Tamil')}
                  >
                    தமிழ் (Tamil)
                  </button>
                  <button
                    className={`campus-docview-lang-btn ${selectedLanguage === 'Hindi' ? 'campus-docview-lang-btn--active' : ''}`}
                    onClick={() => setSelectedLanguage('Hindi')}
                  >
                    हिन्दी (Hindi)
                  </button>
                </div>

                <div className="campus-docview-lang-output">
                  <p>
                    {selectedLanguage === 'Tamil'
                      ? 'தரவு அமைப்புகள் என்பது கணிப்பொறியில் தரவுகளை திறம்பட ஒழுங்கமைத்து சேமிக்கும் முறையாகும்...'
                      : selectedLanguage === 'Hindi'
                      ? 'डेटा संरचनाएं कंप्यूटर में डेटा को कुशलतापूर्वक व्यवस्थित और संग्रहीत करने का एक तरीका हैं...'
                      : 'Data structures are systematic ways of organizing and storing data in a computer so that operations can be performed efficiently.'}
                  </p>
                  <button className="campus-docview-audio-btn" title="Listen Audio">
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggested Prompts */}
            <div className="campus-docview-ai-prompts">
              <span className="campus-docview-prompts-label">Suggested Prompts</span>
              <div className="campus-docview-prompts-list">
                <button type="button">+ Give real-world example</button>
                <button type="button">+ Exam key points</button>
                <button type="button">+ Compare with algorithms</button>
              </div>
            </div>
          </div>

          {/* AI Chat Input Footer */}
          <div className="campus-docview-ai-footer">
            <div className="campus-docview-chat-input-wrapper">
              <input
                type="text"
                placeholder="Ask something about this section..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
              />
              <button className="campus-docview-send-btn" title="Send question">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
