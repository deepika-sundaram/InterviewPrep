import { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: (string)[];
  onChange: (values: (string)[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search query
  const filteredOptions = options.filter((option: Option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle selection of an option
  const toggleOption = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(
        selectedValues.filter(
          (val: string | number) => val !== optionValue
        )
      );
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  // Remove individual badge
  const removeTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionValue: string | number
  ) => {
    e.stopPropagation();

    onChange(
      selectedValues.filter(
        (val: string | number) => val !== optionValue
      )
    );
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer min-h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1 overflow-hidden">
          {selectedValues.length === 0 && (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}

          {selectedValues.map((val: string | number) => {
            const option = options.find(
              (o: Option) => o.value === val
            );

            return option ? (
              <span
                key={val}
                className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
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
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
              <li className="px-4 py-2 text-sm text-gray-400">
                No results found
              </li>
            ) : (
              filteredOptions.map((option: Option) => {
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
                      onChange={() => {}}
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