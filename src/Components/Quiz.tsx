import React, { useState, useEffect, useRef } from 'react';
import { useQuizProgress } from './QuizProgressContext';
import DateOfBirthQuestion from './DateOfBirthQuestion';
import GenderQuestion from './GenderQuestion';
import CountryQuestion from './CountryQuestion';
import QuizProgressBar from './QuizProgressBar';
import logo from "../Pages/utils/lgoo.svg"
import joy from "../Pages/utils/ai.png"

type Question = {
  type: 'dateOfBirth' | 'gender' | 'country';
  value?: Date | string | null;
  grownUpCountry?: string;
  currentCountry?: string;
};

const Quiz: React.FC = () => {
  const { currentStep, completedTasks, completeTask } = useQuizProgress();

  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('quizQuestions');
    if (savedQuestions) {
      const parsed = JSON.parse(savedQuestions);
      return parsed.map((question: Question) => {
        if (question.type === 'dateOfBirth' && question.value) {
          return {
            ...question,
            value: new Date(question.value)
          };
        }
        return question;
      });
    }
    return [
      { type: 'dateOfBirth', value: null },
      { type: 'gender', value: '' },
      { type: 'country', grownUpCountry: '', currentCountry: '' }
    ];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  const questionsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questionsContainerRef.current) {
      questionsContainerRef.current.scrollTop = questionsContainerRef.current.scrollHeight;
    }
  }, [currentQuestionIndex]);

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      completeTask(currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTask(currentQuestionIndex);
    }
  };

  const handleQuestionChange = (index: number, value: Partial<Question>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...value };
    setQuestions(newQuestions);
  };

  const handleEdit = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const renderQuestion = (question: Question, index: number) => {
    const isActive = index === currentQuestionIndex;

    switch (question.type) {
      case 'dateOfBirth':
        return (
          <DateOfBirthQuestion
            key={index}
            value={question.value as Date | null}
            onChange={(value) => handleQuestionChange(index, { value })}
            onContinue={handleContinue}
            isActive={isActive}
            onEdit={() => handleEdit(index)}
          />
        );
      case 'gender':
        return (
          <GenderQuestion
            key={index}
            value={question.value as string}
            onChange={(value) => handleQuestionChange(index, { value })}
            onContinue={handleContinue}
            isActive={isActive}
            onEdit={() => handleEdit(index)}
          />
        );
      case 'country':
        return (
          <CountryQuestion
            key={index}
            grownUpCountry={question.grownUpCountry || ''}
            currentCountry={question.currentCountry || ''}
            onChange={(field, value) => handleQuestionChange(index, { [field]: value })}
            onContinue={handleContinue}
            isActive={isActive}
            onEdit={() => handleEdit(index)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <div className="fixed top-0 left-0 right-0 z-20">
        <header className="bg-black w-full mx-auto flex mb-[64px] ">
          <div className="max-w-3xl py-[15px] mx-auto px-4">
            <img src={logo} alt="EVOKED" className="h-6" />
          </div>
        </header>
        <div className="bg-white shadow-sm">
          <QuizProgressBar
            currentStep={currentStep}
            completedTasks={completedTasks}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mt-[80px] md:lg:pb-0 pb:[32px] pt-[32px] md:lg:pt-[160px]" ref={questionsContainerRef}>
        <div className="max-w-3xl mx-auto">
          {questions.map((question, index) => (
            <div key={index} className="mb-8" style={{ display: index <= currentQuestionIndex ? 'block' : 'none' }}>
              {renderQuestion(question, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;