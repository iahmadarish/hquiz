import React, { useRef, useState, useEffect } from 'react';
import { Check } from "lucide-react";
import { RiCheckboxBlankFill } from "react-icons/ri";

type QuizProgressBarProps = {
  currentStep: number;
  completedTasks: number;
};

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ currentStep, completedTasks }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
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

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if ('pageX' in e) {
      setStartX(e.pageX - scrollRef.current!.offsetLeft);
    } else {
      setStartX(e.touches[0].pageX - scrollRef.current!.offsetLeft);
    }
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX!) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
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
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center border-2 
                    ${step.number <= currentStep ? 'bg-[#8B4513] border-[#8B4513]' : 'border-gray-300'}`}
                  >
                    {step.number <= currentStep ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-gray-400">
                       <RiCheckboxBlankFill />
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
        className="md:hidden w-full bg-white px-4 py-8 overflow-x-scroll scrollbar-hide"
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
        onTouchStart={(e) => handleDragStart(e)}
        onTouchEnd={handleDragEnd}
        onTouchMove={(e) => handleDragMove(e)}
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
                <div className={`w-6 h-6 rounded-[4px] flex items-center justify-center border-2 
                  ${step.number <= currentStep ? 'bg-[#8B4513] border-[#8B4513]' : 'border-gray-300'}`}
                >
                  {step.number <= currentStep ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-gray-400">
                    <RiCheckboxBlankFill />
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

export default QuizProgressBar;