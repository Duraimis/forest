import React, { useState, useEffect } from 'react';

export default function ActiveQuiz({ questions, setView, finishQuiz }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleSelect = (qIndex, option) => {
    // qIndex is the global index in the questions array
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    finishQuiz(answers);
  };

  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / questions.length) * 100;
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', height: '100vh', padding: '24px 0' }}>
      {/* Top Bar */}
      <div className="glass-panel quiz-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: '16px', zIndex: 10 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Active Quiz</h2>
          <div style={{ color: 'var(--text-dim)' }}>
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
        <div className="quiz-topbar-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
            Answered: {Object.keys(answers).length} / {questions.length}
          </div>
          <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${calculateProgress()}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s' }}></div>
          </div>
        </div>
        <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setView('landing')}>Quit</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {currentQuestions.map((q, idx) => {
          const globalIdx = currentPage * questionsPerPage + idx;
          const selectedOption = answers[globalIdx];
          
          return (
            <div key={globalIdx} className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Question {globalIdx + 1}</span>
                {q.week && <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Week {q.week}</span>}
              </div>
              <p style={{ fontSize: '1.3rem', marginBottom: '24px', lineHeight: '1.5' }}>{q.question}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <div 
                      key={oIdx}
                      onClick={() => handleSelect(globalIdx, opt)}
                      style={{ 
                        padding: '16px 20px', 
                        borderRadius: '12px', 
                        background: isSelected ? 'rgba(124, 58, 237, 0.15)' : 'rgba(0,0,0,0.2)',
                        border: '2px solid',
                        borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                        color: isSelected ? '#fff' : 'var(--text-dim)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div style={{ 
                        width: '20px', height: '20px', borderRadius: '50%', 
                        border: `2px solid ${isSelected ? 'var(--accent-primary)' : 'var(--text-dim)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
                      </div>
                      <span style={{ fontSize: '1.1rem' }}>{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', padding: '16px 0', borderTop: '1px solid var(--border-glass)' }}>
        <button 
          className="btn-secondary" 
          onClick={handlePrev}
          disabled={currentPage === 0}
          style={{ opacity: currentPage === 0 ? 0.5 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        
        {currentPage === totalPages - 1 ? (
          <button className="btn-primary" style={{ background: 'var(--accent-success)' }} onClick={handleSubmit}>
            Submit Quiz
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
