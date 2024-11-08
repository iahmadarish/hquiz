import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Edit2 } from 'lucide-react';
import logo from "../Pages/utils/lgoo.svg"
import joy from "../Pages/utils/ai.png"
import man from "../Pages/utils/man.png"

type DateOfBirthQuestionProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  onContinue: () => void;
  isActive: boolean;
  onEdit: () => void;
};

const DateOfBirthQuestion: React.FC<DateOfBirthQuestionProps> = ({ value, onChange, onContinue, isActive, onEdit }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEditing, setIsEditing] = useState(!value);

  const handleDateChange = (date: Date) => {
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
          <img src={joy} alt="Monkey Avatar" className="w-full h-full object-cover" />
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
        <img src={man} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
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

export default DateOfBirthQuestion;