import React from 'react';

export default function Landing({ setView }) {
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="header">
        <h1>Forest Management</h1>
        <p>Master your NPTEL Course with Interactive Learning</p>
      </div>

      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '800px', margin: '0 auto', gap: '32px' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 32px', cursor: 'pointer' }} onClick={() => setView('practice')}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
          <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>Practice Mode</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '24px', lineHeight: '1.6' }}>
            Browse through all 12 weeks of questions. Review the answers and explanations at your own pace.
          </p>
          <button className="btn-secondary" style={{ width: '100%' }}>Start Practice</button>
        </div>

        <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 32px', cursor: 'pointer', borderColor: 'rgba(124, 58, 237, 0.4)' }} onClick={() => setView('setup')}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>Take Quiz</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '24px', lineHeight: '1.6' }}>
            Test your knowledge. Select specific weeks or take a randomized grand test with all 120 questions.
          </p>
          <button className="btn-primary" style={{ width: '100%' }}>Setup Quiz</button>
        </div>
      </div>
    </div>
  );
}
