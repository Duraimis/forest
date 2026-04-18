import React, { useState } from 'react';
import Landing from './components/Landing';
import Practice from './components/Practice';
import QuizSetup from './components/QuizSetup';
import ActiveQuiz from './components/ActiveQuiz';
import Results from './components/Results';

export default function App() {
  const [view, setView] = useState('landing');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});

  const startQuiz = (questions) => {
    setQuizQuestions(questions);
    setView('active_quiz');
  };

  const finishQuiz = (answers) => {
    setQuizAnswers(answers);
    setView('results');
  };

  return (
    <>
      {view === 'landing' && <Landing setView={setView} />}
      {view === 'practice' && <Practice setView={setView} />}
      {view === 'setup' && <QuizSetup setView={setView} startQuiz={startQuiz} />}
      {view === 'active_quiz' && <ActiveQuiz questions={quizQuestions} setView={setView} finishQuiz={finishQuiz} />}
      {view === 'results' && <Results questions={quizQuestions} answers={quizAnswers} setView={setView} />}
    </>
  );
}
