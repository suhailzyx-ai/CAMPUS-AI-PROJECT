import React, { useRef, useEffect } from 'react';
import { Send, Sparkles, User, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';

export const ChatPanel = ({
  messages = [],
  inputQuestion = '',
  setInputQuestion,
  onSendMessage,
  isLoading = false,
  error = null,
  onRetryLast
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const exampleQuestions = [
    'Explain the main concept of this unit.',
    'Give me a practical example.',
    'What are the important topics?',
    'Explain this topic in simple language.'
  ];

  // Auto-scroll when new messages arrive or loading begins
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputQuestion.trim() || isLoading) return;
    onSendMessage(inputQuestion.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = (question) => {
    onSendMessage(question);
  };

  return (
    <div className="campus-chat-panel">
      {/* Scrollable Messages Area */}
      <div className="campus-chat-panel__messages">
        {messages.length === 0 ? (
          <div className="campus-chat-empty-state">
            <div className="campus-chat-empty-icon">
              <Sparkles size={24} />
            </div>
            <h4 className="campus-chat-empty-title">Ask anything about this document</h4>
            <p className="campus-chat-empty-desc">
              Have questions about definitions, code snippets, or exam revision? Type your query below or pick a suggested starter:
            </p>

            <div className="campus-chat-suggestions">
              <span className="campus-chat-suggestions-title">Example questions:</span>
              <div className="campus-chat-suggestions-list">
                {exampleQuestions.map((eq, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="campus-chat-suggestion-chip"
                    onClick={() => handleExampleClick(eq)}
                  >
                    <span>{eq}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="campus-chat-thread">
            {messages.map((msg, index) => (
              <ChatMessageItem
                key={index}
                message={msg}
                onSelectSuggestion={(sug) => onSendMessage(sug)}
              />
            ))}

            {isLoading && (
              <div className="campus-chat-msg campus-chat-msg--assistant campus-chat-msg--loading">
                <div className="campus-chat-msg__avatar">
                  <Sparkles size={16} />
                </div>
                <div className="campus-chat-msg__bubble">
                  <div className="campus-chat-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="campus-chat-typing-text">AI is reading document & thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="campus-chat-error-card">
                <AlertCircle size={16} />
                <span>{error}</span>
                {onRetryLast && (
                  <button type="button" onClick={onRetryLast} className="campus-chat-retry-btn">
                    <RotateCcw size={12} /> Retry
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Input Form at Bottom */}
      <div className="campus-chat-panel__footer">
        <form onSubmit={handleSubmit} className="campus-chat-input-form">
          <input
            ref={inputRef}
            type="text"
            className="campus-chat-input"
            placeholder="Ask anything about this document..."
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="campus-chat-send-btn"
            disabled={!inputQuestion.trim() || isLoading}
            title="Send message (Enter)"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatMessageItem = ({ message, onSelectSuggestion }) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard?.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`campus-chat-msg ${isUser ? 'campus-chat-msg--user' : 'campus-chat-msg--assistant'}`}>
      <div className="campus-chat-msg__avatar">
        {isUser ? <User size={15} /> : <Sparkles size={15} />}
      </div>

      <div className="campus-chat-msg__body">
        <div className="campus-chat-msg__bubble">
          {message.text.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="campus-chat-para">
              {paragraph.split('\n').map((line, lIdx) => {
                const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
                return (
                  <span key={lIdx} style={{ display: 'block' }}>
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

        {!isUser && (
          <div className="campus-chat-msg__meta">
            <span className="campus-chat-msg__time">{message.time || 'Just now'}</span>
            <button
              type="button"
              className="campus-chat-copy-btn"
              onClick={handleCopy}
              title="Copy answer"
            >
              {copied ? <Check size={12} className="campus-copy-success" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="campus-chat-followups">
            <span className="campus-chat-followups-label">Suggested follow-ups:</span>
            <div className="campus-chat-followups-chips">
              {message.suggestions.map((sug, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  className="campus-chat-followup-chip"
                  onClick={() => onSelectSuggestion(sug)}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
