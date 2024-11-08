import React, { createContext, useState, useEffect, useContext } from 'react';

type QuizProgressContextType = {
  currentStep: number;
  completedTasks: number;
  completeTask: (questionIndex: number) => void;
  resetProgress: () => void;
  answeredQuestions: Record<number, boolean>;
};

const QuizProgressContext = createContext<QuizProgressContextType | undefined>(undefined);

export const QuizProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('quizCurrentStep');
    return saved ? parseInt(saved) : 1;
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('quizCompletedTasks');
    return saved ? parseInt(saved) : 0;
  });

  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem('answeredQuestions');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('quizCurrentStep', currentStep.toString());
    localStorage.setItem('quizCompletedTasks', completedTasks.toString());
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
  }, [currentStep, completedTasks, answeredQuestions]);

  const completeTask = (questionIndex: number) => {
    if (!answeredQuestions[questionIndex]) {
      const tasksPerStep = 7;
      setAnsweredQuestions((prev: any) => ({
        ...prev,
        [questionIndex]: true
      }));

      if (completedTasks + 1 >= tasksPerStep) {
        if (currentStep < 3) {
          setCurrentStep(prev => prev + 1);
          setCompletedTasks(0);
        }
      } else {
        setCompletedTasks(prev => prev + 1);
      }
    }
  };

  const resetProgress = () => {
    setCurrentStep(1);
    setCompletedTasks(0);
    setAnsweredQuestions({});
  };

  return (
    <QuizProgressContext.Provider
      value={{
        currentStep,
        completedTasks,
        completeTask,
        resetProgress,
        answeredQuestions
      }}
    >
      {children}
    </QuizProgressContext.Provider>
  );
};

export const useQuizProgress = () => {
  const context = useContext(QuizProgressContext);
  if (context === undefined) {
    throw new Error('useQuizProgress must be used within a QuizProgressProvider');
  }
  return context;
};