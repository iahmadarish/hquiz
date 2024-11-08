import React, { useState, useEffect, useRef } from 'react';
import { Edit2 } from 'lucide-react';
import logo from "../Pages/utils/lgoo.svg"
import joy from "../Pages/utils/ai.png"
import man from "../Pages/utils/man.png"

type CountryQuestionProps = {
  grownUpCountry: string;
  currentCountry: string;
  onChange: (field: 'grownUpCountry' | 'currentCountry', value: string) => void;
  onContinue: () => void;
  isActive: boolean;
  onEdit: () => void;
};

const countries = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  // ... (rest of the countries)
];

const CountryQuestion: React.FC<CountryQuestionProps> = ({ grownUpCountry, currentCountry, onChange, onContinue, isActive, onEdit }) => {
  const [isEditing, setIsEditing] = useState(!grownUpCountry && !currentCountry);
  const [showGrownUpDropdown, setShowGrownUpDropdown] = useState(false);
  const [showCurrentDropdown, setShowCurrentDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGrownUpDropdown(false);
        setShowCurrentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCountryDisplay = (countryCode: string) => {
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
          <img src={joy} alt="Monkey Avatar" className="w-full h-full object-cover" />
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
              <img src={man} alt="User Avatar" className="w-8 h-8 object-cover rounded-full" />
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

export default CountryQuestion;