import React, { useEffect } from 'react';

export default function Results({ questions, answers, setView }) {
  let score = 0;
  
  const results = questions.map((q, idx) => {
    const userAnswer = answers[idx];
    const isCorrect = userAnswer && userAnswer.trim() === q.answer.trim();
    if (isCorrect) score += 1;
    return { ...q, userAnswer, isCorrect };
  });

  const percentage = Math.round((score / questions.length) * 100);
  
  // Confetti or scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', padding: '40px 0' }}>
      
      {/* Score Summary */}
      <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(180deg, rgba(30, 27, 46, 0.8) 0%, rgba(124, 58, 237, 0.1) 100%)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Quiz Results</h2>
        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(var(--accent-primary) ${percentage}%, rgba(255,255,255,0.05) ${percentage}%)` }}>
          <div style={{ width: '150px', height: '150px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--text-main)' }}>{percentage}%</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Score</span>
          </div>
        </div>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>
          You answered <span style={{ color: '#fff', fontWeight: 'bold' }}>{score}</span> out of <span style={{ color: '#fff', fontWeight: 'bold' }}>{questions.length}</span> questions correctly!
        </p>
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button className="btn-secondary" onClick={() => setView('setup')}>Take Another Quiz</button>
          <button className="btn-primary" onClick={() => setView('landing')}>Back to Home</button>
        </div>
      </div>

      {/* Review Section */}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', paddingLeft: '16px', borderLeft: '4px solid var(--accent-primary)' }}>Review Answers</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {results.map((res, idx) => (
          <div key={idx} className="glass-panel" style={{ borderColor: res.isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: res.isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: 'white', fontWeight: 'bold'
              }}>
                {res.isCorrect ? '✓' : '✕'}
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}><strong>Q{idx + 1}:</strong> {res.question}</p>
            </div>
            
            <div style={{ paddingLeft: '48px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #A1A1AA' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Your Answer:</span>
                <span style={{ color: res.isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                  {res.userAnswer || <em>Not answered</em>}
                </span>
              </div>
              
              {!res.isCorrect && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-success)' }}>
                  <span style={{ color: 'var(--accent-success)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Correct Answer:</span>
                  <span style={{ color: '#fff' }}>{res.answer}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
