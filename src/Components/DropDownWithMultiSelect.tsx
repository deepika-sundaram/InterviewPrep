import React, { useState, useRef, useEffect } from 'react';
 type  MultiSelectProps={
    options:any,
    selectedValues:any,
    onChange:any,
    placeholder:String
 }

const MultiSelectDropdown = ({ options, selectedValues, onChange, placeholder = "Select options..." }:MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle selection of an option
  const toggleOption = (optionValue:any) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter(val => val !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  // Remove individual badge
  const removeTag = (e:any, optionValue:any) => {
    e.stopPropagation();
    onChange(selectedValues.filter(val => val !== optionValue));
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Dropdown Header / Trigger */}
      <div
        className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer min-h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center max-w-[8%] overflow-hidden">
          {selectedValues.length === 0 && (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
          {selectedValues.map(val => {
            const option = options.find(o => o.value === val);
            return option ? (
              <span key={val} className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                {option.label}
                <button
                  type="button"
                  onClick={(e) => removeTag(e, val)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ) : null;
          })}
        </div>
        <svg 
  className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
  style={{ width: '2%', height: '4%' }}
  fill="none" 
  stroke="currentColor" 
  viewBox="0 0 24 24"
>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              className="w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-400">No results found</li>
            ) : (
              filteredOptions.map(option => {
                const isChecked = selectedValues.includes(option.value);
                return (
                  <li
                    key={option.value}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // Controlled by li click
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2 pointer-events-none"
                    />
                    <span>{option.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;