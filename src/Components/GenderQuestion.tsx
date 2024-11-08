import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import logo from "../Pages/utils/lgoo.svg"
import joy from "../Pages/utils/ai.png"
import man from "../Pages/utils/man.png"


type GenderQuestionProps = {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  isActive: boolean;
  onEdit: () => void;
};

const GenderQuestion: React.FC<GenderQuestionProps> = ({ value, onChange, onContinue, isActive, onEdit }) => {
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
          <img src={joy} alt="Monkey Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 bg-white rounded-r-[8px] rounded-b-[8px] p-4 shadow-sm border">
          <p className="text-gray-800 text-lg">
            I'm not one to assume - how do you identify, Imam ? No pressure if you'd rather not say.
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
        <img src={man} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
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

export default GenderQuestion;