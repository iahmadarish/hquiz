import React from 'react';
import { QuizProgressProvider } from './QuizProgressContext';
import Quiz from './Quiz';

const QuizPage = () => {
  return (
    <QuizProgressProvider>
      <Quiz />
    </QuizProgressProvider>
  );
};

export default QuizPage;