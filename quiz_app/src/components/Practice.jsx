import React, { useState } from 'react';
import quizData from '../assets/quiz_data.json';

export default function Practice({ setView }) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const currentWeekData = quizData.find((w) => w.week === selectedWeek);

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem' }}>Practice Mode</h2>
        <button className="btn-secondary" onClick={() => setView('landing')}>Back Home</button>
      </div>

      <div className="practice-layout" style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div className="glass-panel practice-sidebar" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Week</h3>
          {quizData.map((w) => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: selectedWeek === w.week ? 'var(--accent-primary)' : 'transparent',
                color: selectedWeek === w.week ? 'white' : 'var(--text-main)',
                border: '1px solid',
                borderColor: selectedWeek === w.week ? 'var(--accent-primary)' : 'var(--border-glass)',
                textAlign: 'left',
                fontWeight: selectedWeek === w.week ? '600' : '400',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              Week {w.week}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {currentWeekData ? (
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '32px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>Week {currentWeekData.week} Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {currentWeekData.questions.map((q, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '500' }}>{idx + 1}. {q.question}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.answer && q.answer.trim() === opt.trim();
                        return (
                          <div 
                            key={oIdx} 
                            style={{ 
                              padding: '12px 16px', 
                              borderRadius: '8px', 
                              background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.2)',
                              border: '1px solid',
                              borderColor: isCorrect ? 'var(--accent-success)' : 'transparent',
                              color: isCorrect ? '#fff' : 'var(--text-dim)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                          >
                            <span style={{ 
                              width: '24px', height: '24px', borderRadius: '50%', 
                              background: isCorrect ? 'var(--accent-success)' : 'transparent',
                              border: isCorrect ? 'none' : '1px solid var(--text-dim)',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '12px'
                            }}>
                              {isCorrect && '✓'}
                            </span>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Select a week to view questions.</p>
          )}
        </div>
      </div>
    </div>
  );
}
