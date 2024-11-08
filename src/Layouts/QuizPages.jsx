import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Check, Edit2 } from 'lucide-react';
import lgoai from "../Pages/utils/ai.png"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import human from "../Pages/utils/man.png"
import logo from "../Pages/utils/lgoo.svg"
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosCheckmark } from "react-icons/io";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { ChevronLeft, ChevronRight } from "lucide-react";
import checkimage from "../Pages/utils/check.svg"
import checkimage2 from "../Pages/utils/check2.svg"
import { img } from 'framer-motion/client';

// Context
const QuizProgressContext = createContext(undefined);
// All country 
const countries = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
];
// provider 
export const QuizProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('quizCurrentStep');
    return saved ? parseInt(saved) : 1;
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('quizCompletedTasks');
    return saved ? parseInt(saved) : 0;
  });

  // Keep track of which questions have been answered
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem('answeredQuestions');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('quizCurrentStep', currentStep.toString());
    localStorage.setItem('quizCompletedTasks', completedTasks.toString());
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
  }, [currentStep, completedTasks, answeredQuestions]);

  const completeTask = (questionIndex) => {
    // Only increment progress if this question hasn't been answered before
    if (!answeredQuestions[questionIndex]) {
      const tasksPerStep = 7;
      setAnsweredQuestions(prev => ({
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
// use case progress quiz section 
export const useQuizProgress = () => {
  const context = useContext(QuizProgressContext);
  if (context === undefined) {
    throw new Error('useQuizProgress must be used within a QuizProgressProvider');
  }
  return context;
};
// All quiz Question Components
// Date of birth components 
const DateOfBirthQuestion = ({ value, onChange, onContinue, isActive, onEdit }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEditing, setIsEditing] = useState(!value);

  const handleDateChange = (date) => {
    onChange(date);
    setShowCalendar(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  return (
    <div className="max-w-3xl mx-auto mt-[32px] pt-[32px] md:lg:pt=0 px-4">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 flex-shrink-0">
          <img src={lgoai} alt="Monkey Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-white rounded-r-[8px] rounded-b-[8px] p-4 shadow-sm border">
          <p className="text-gray-800 text-lg">
            Now, may I know your age please? <span className="text-gray-600">(Keep this a secret between us. I'll be sending you a gift on your day)</span> 😉
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end space-x-4">
        {value && !isActive && !isEditing ? (
          <div className="flex items-center space-x-[28px] bg-[#F8F8F8] px-4 md:lg:py-[48px] py-[24px] rounded-full">

            <button
              onClick={handleEdit}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <span className='bg-[#f5db8e] px-[24px] py-[12px] rounded-l-[12px] rounded-t-[12px]'>I was born on {value.toLocaleDateString('en-GB')}</span>

          </div>
        ) : (
          isActive && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 ">I was born on</span>
              <div className="relative">
                <input
                  type="text"
                  value={value ? value.toLocaleDateString('en-GB') : ''}
                  onClick={() => setShowCalendar(true)}
                  readOnly
                  placeholder="dd / mm / year"
                  className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent cursor-pointer"
                />
                {showCalendar && (
                  <div className="absolute top-full left-0 mt-1 z-10">
                    <Calendar
                      onChange={handleDateChange}
                      value={value}
                      maxDate={new Date()}
                      minDetail="decade"
                      className="border rounded shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        )}
        <img src={human} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
      </div>
      {isActive && value && isEditing && (
        <div className="mt-4 flex items-center justify-end space-x-4">
          <div className="flex items-center text-gray-500">
            <span className="mr-2">⌨️</span>
            <span>Or Press Enter</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              onContinue();
            }}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
// Gender conversataion 
const GenderQuestion = ({ value, onChange, onContinue, isActive, onEdit }) => {
  const [isEditing, setIsEditing] = useState(!value);
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 flex-shrink-0">
          <img src={lgoai} alt="Monkey Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-white rounded-r-[8px] rounded-b-[8px] p-4 shadow-sm border">
          <p className="text-gray-800 text-lg">
            I’m not one to assume - how do you identify, Imam ? No pressure if you’d rather not say.
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end space-x-4">
        {value && !isActive && !isEditing ? (
          <div className="flex gap-x-[28px] lg:md:py-[48px] py-[24px]">

            <button
              onClick={handleEdit}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <span className='bg-[#f5db8e] px-[24px] py-[12px] rounded-l-[12px] rounded-t-[12px]'>I am {value}</span>
          </div>
        ) : (
          isActive && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">I am</span>
              <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              >
                <option value="" disabled>select your gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
          )
        )}
        <img src={human} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
      </div>
      {isActive && value && isEditing && (
        <div className="mt-4 flex items-center justify-end space-x-4">
          <button
            onClick={() => {
              setIsEditing(false);
              onContinue();
            }}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
// Counttry converstaio 
const CountryQuestion = ({ grownUpCountry, currentCountry, onChange, onContinue, isActive, onEdit }) => {
  const [isEditing, setIsEditing] = useState(!grownUpCountry && !currentCountry);
  const [showGrownUpDropdown, setShowGrownUpDropdown] = useState(false);
  const [showCurrentDropdown, setShowCurrentDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGrownUpDropdown(false);
        setShowCurrentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCountryDisplay = (countryCode) => {
    const country = countries.find(c => c.code === countryCode);
    return country ? `${country.flag} ${country.name}` : 'select your country';
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">

      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 flex-shrink-0">
          <img src={lgoai} alt="Monkey Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-white rounded-r-[8px] rounded-b-[8px] p-4 shadow-sm border">
          <p className="text-gray-800 text-lg">
            Which country did you grow up in, and where are you currently living?
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-end space-y-4" ref={dropdownRef}>
        {isActive && (
          isEditing ? (
            <>
              <div className="flex items-center space-x-2 w-full max-w-md relative">
                <span className="text-gray-600 whitespace-nowrap">I grew up in</span>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setShowGrownUpDropdown(!showGrownUpDropdown)}
                    className="w-full text-left border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white"
                  >
                    {grownUpCountry ? getCountryDisplay(grownUpCountry) : 'select your country'}
                  </button>
                  {showGrownUpDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            onChange('grownUpCountry', country.code);
                            setShowGrownUpDropdown(false);
                          }}
                        >
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full max-w-md relative">
                <span className="text-gray-600 whitespace-nowrap">I currently live in</span>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setShowCurrentDropdown(!showCurrentDropdown)}
                    className="w-full text-left border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white"
                  >
                    {currentCountry ? getCountryDisplay(currentCountry) : 'select your country'}
                  </button>
                  {showCurrentDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            onChange('currentCountry', country.code);
                            setShowCurrentDropdown(false);
                          }}
                        >
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-x-[28px] md:lg:py-[48px] py-[24px]">
              <button
                onClick={handleEdit}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <span className='bg-[#f5db8e] flex px-[24px] py-[12px] rounded-l-[12px] rounded-t-[12px]'>
                I grew up in {getCountryDisplay(grownUpCountry)} and currently live in {getCountryDisplay(currentCountry)}
              </span>
              <img src={human} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
            </div>
          )
        )}
      </div>
      {isActive && isEditing && grownUpCountry && currentCountry && (
        <div className="mt-4 flex items-center justify-end space-x-4">
          <button
            onClick={() => {
              setIsEditing(false);

              onContinue();
            }}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

    </div>
  );
};
// Progress Bar Component
const QuizProgressBar = ({ currentStep, completedTasks }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);


  const steps = [
    { number: 1, title: 'Take Scent Quiz' },
    { number: 2, title: 'Build Your Set' },
    { number: 3, title: 'Complete Payment' }
  ];

  const tasksPerStep = 7;
  const taskCompletionPercentage = Math.min(100, (completedTasks / tasksPerStep) * 100);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollPosition = (currentStep - 1) * scrollRef.current.offsetWidth / 2;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

return (
  <div className="w-full bg-white shadow-sm fixed top-[46px] left-0 right-0 z-30">
  {/* Desktop View */}
  <div className="hidden md:block max-w-3xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col mx-auto items-center relative">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center border-2`}
              >
                {step.number < currentStep ? (
                  <img src={checkimage2} alt="checkimg" />
                ) : (
                  <span className={`text-sm font-medium ${step.number === currentStep ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                    {step.number}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">STEP {step.number}</span>
                <span className={`text-sm font-medium ${step.number <= currentStep ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="flex-1 h-[0.9px] w-[293px] mx-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B4513] transition-all duration-300"
                style={{
                  width: `${step.number < currentStep ? '100%' :
                    (step.number === currentStep ? taskCompletionPercentage : '0')}%`
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>

  {/* Mobile View */}
  <div 
    ref={scrollRef}
    className="md:hidden w-full bg-white px-4 py-3 overflow-x-scroll scrollbar-hide"
    style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      cursor: isDragging ? 'grabbing' : 'grab'
    }}
    onMouseDown={handleDragStart}
    onMouseUp={handleDragEnd}
    onMouseLeave={handleDragEnd}
    onMouseMove={handleDragMove}
    onTouchStart={(e) => handleDragStart(e.touches[0])}
    onTouchEnd={handleDragEnd}
    onTouchMove={(e) => handleDragMove(e.touches[0])}
  >
    <style jsx global>{`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <div className="flex items-center" style={{ width: '200%' }}>
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center" style={{ width: '50%' }}>
          <div className="md:flex flex-col md:items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
              ${step.number < currentStep ? 'bg-[#8B4513] border-[#8B4513]' : 
                step.number === currentStep ? 'border-[#8B4513]' : 'border-gray-300'}`}
            >
              {step.number < currentStep ? (
                <img src={checkimage} alt="checkimg" />              ) : (
                <span className={`text-sm font-medium
                  ${step.number === currentStep ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                  {step.number}
                </span>
              )}
            </div>
            
            <div className="">
              <span className={`text-sm font-medium 
                ${step.number <= currentStep ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                STEP {step.number}
              </span>
              <p className={`text-xs 
                ${step.number <= currentStep ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="flex-1 h-[2px] mx-4 bg-gray-200 rounded">
              <div 
                className="h-full bg-[#8B4513] transition-all duration-300"
                style={{
                  width: `${currentStep > step.number ? '100%' : 
                    currentStep === step.number ? taskCompletionPercentage : '0'}%`
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
  );
};
// Main Quiz Component
const Quiz = () => {
  const { currentStep, completedTasks, completeTask } = useQuizProgress();

  const [questions, setQuestions] = useState(() => {
    // Initialize from localStorage if available
    const savedQuestions = localStorage.getItem('quizQuestions');
    if (savedQuestions) {
      const parsed = JSON.parse(savedQuestions);
      // Convert date string back to Date object
      return parsed.map(question => {
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

  const questionsContainerRef = useRef(null);

  // Save questions state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
  }, [questions]);

  // Save currentQuestionIndex to localStorage whenever it changes
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
      // If it's the last question, just complete the task
      completeTask(currentQuestionIndex);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...value };
    setQuestions(newQuestions);
  };

  const handleEdit = (index) => {
    setCurrentQuestionIndex(index);
  };

  const renderQuestion = (question, index) => {
    const isActive = index === currentQuestionIndex;

    switch (question.type) {
      case 'dateOfBirth':
        return (
          <DateOfBirthQuestion
            key={index}
            value={question.value}
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
            value={question.value}
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
            grownUpCountry={question.grownUpCountry}
            currentCountry={question.currentCountry}
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
        <div className="bg-white  shadow-sm">
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
// Main component 
export default function QuizPage() {
  return (
    <QuizProgressProvider>
      <Quiz />
    </QuizProgressProvider>
  );
}