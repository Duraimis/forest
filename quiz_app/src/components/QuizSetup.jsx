import React, { useState } from 'react';
import quizData from '../assets/quiz_data.json';

export default function QuizSetup({ setView, startQuiz }) {
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [randomize, setRandomize] = useState(false);

  const allWeeks = quizData.map((w) => w.week);

  const toggleWeek = (week) => {
    setSelectedWeeks((prev) => 
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const handleSelectAll = () => {
    if (selectedWeeks.length === allWeeks.length) {
      setSelectedWeeks([]);
    } else {
      setSelectedWeeks(allWeeks);
    }
  };

  const handleStart = () => {
    if (selectedWeeks.length === 0) {
      alert('Please select at least one week to start the quiz.');
      return;
    }
    
    // Gather all questions from selected weeks
    let questions = [];
    quizData.forEach((w) => {
      if (selectedWeeks.includes(w.week)) {
        questions = [...questions, ...w.questions.map(q => ({ ...q, week: w.week }))];
      }
    });

    if (randomize) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    startQuiz(questions);
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Configure Quiz</h2>
          <button className="btn-secondary" onClick={() => setView('landing')}>Cancel</button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-dim)' }}>Select Weeks</h3>
            <button 
              onClick={handleSelectAll}
              style={{ background: 'transparent', color: 'var(--accent-primary)', fontSize: '0.9rem', border: '1px solid var(--accent-primary)', padding: '4px 12px', borderRadius: '4px' }}
            >
              {selectedWeeks.length === allWeeks.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
            {allWeeks.map((week) => {
              const isSelected = selectedWeeks.includes(week);
              return (
                <div 
                  key={week}
                  onClick={() => toggleWeek(week)}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '8px', 
                    background: isSelected ? 'rgba(124, 58, 237, 0.2)' : 'rgba(0,0,0,0.2)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-glass)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: isSelected ? '600' : '400', color: isSelected ? '#fff' : 'var(--text-dim)' }}>
                    Week {week}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <input 
            type="checkbox" 
            id="randomize" 
            checked={randomize} 
            onChange={(e) => setRandomize(e.target.checked)} 
            style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
          <label htmlFor="randomize" style={{ fontSize: '1.1rem', cursor: 'pointer' }}>Randomize Questions</label>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
          onClick={handleStart}
        >
          Begin Quiz ({selectedWeeks.length > 0 ? selectedWeeks.length * 10 : 0} Questions)
        </button>
      </div>
    </div>
  );
}
