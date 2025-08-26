import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import { fetchDropdownOptions } from '../../services/api';

const MultiDropdown = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const [options, setOptions] = useState(element.options || []);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const value = getFieldValue(element.apiKey) || [];
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  useEffect(() => {
    const loadOptions = async () => {
      if (element.api && !element.options) {
        setLoading(true);
        try {
          const fetchedOptions = await fetchDropdownOptions(element.api);
          setOptions(fetchedOptions);
        } catch (error) {
          console.error('Failed to load dropdown options:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadOptions();
  }, [element.api, element.options]);

  const handleOptionToggle = (optionValue) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    setFieldValue(element.apiKey, newValues);
    setFieldTouched(element.apiKey);
  };

  const getSelectedLabels = () => {
    if (!Array.isArray(value) || value.length === 0) {
      return `Select ${element.label}`;
    }
    
    const labels = value.map(val => {
      const option = options.find(opt => opt.value === val);
      return option ? option.label : val;
    });
    
    return labels.length > 2 
      ? `${labels.slice(0, 2).join(', ')} +${labels.length - 2} more`
      : labels.join(', ');
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !isDisabled && !loading && setIsOpen(!isOpen)}
          disabled={isDisabled || loading}
          className={`form-input text-sm text-left flex items-center justify-between ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
        >
          <span className={`block truncate ${value.length === 0 ? 'text-gray-500' : ''}`}>
            {loading ? 'Loading...' : getSelectedLabels()}
          </span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {isOpen && !loading && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => handleOptionToggle(option.value)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}} // Handled by onClick
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 block font-normal truncate">
                    {option.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <p className="form-error">{error}</p>}
      
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {value.map((val, index) => {
            const option = options.find(opt => opt.value === val);
            return (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {option ? option.label : val}
                <button
                  type="button"
                  onClick={() => handleOptionToggle(val)}
                  className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none focus:bg-primary-500 focus:text-white"
                >
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
