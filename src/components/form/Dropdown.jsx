import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import { fetchDropdownOptions } from '../../services/api';

const Dropdown = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const [options, setOptions] = useState(element.options || []);
  const [loading, setLoading] = useState(false);
  
  const value = getFieldValue(element.apiKey);
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

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(element.apiKey, newValue === '' ? null : newValue);
    setFieldTouched(element.apiKey);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={element.apiKey} className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={element.apiKey}
          value={value || ''}
          onChange={handleChange}
          disabled={isDisabled || loading}
          className={`
            w-full px-4 py-3 pr-10 text-sm bg-white border rounded-lg shadow-sm appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
            transition-colors duration-200
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <option value="" disabled className="text-gray-500">
            {loading ? 'Loading options...' : `Select ${element.label}`}
          </option>
          {options.map((option, index) => (
            <option 
              key={index} 
              value={option.value}
              className="py-2 px-4 text-gray-900 bg-white hover:bg-orange-50"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-colors ${
              error ? 'text-red-500' : 'text-gray-400'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="absolute inset-y-0 right-8 flex items-center pr-3">
            <svg className="animate-spin h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Dropdown;
