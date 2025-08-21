import React from 'react';
import { useForm } from '../../context/FormContext';

const TextField = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  
  const value = getFieldValue(element.apiKey);
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Apply maxLength validation during typing
    if (element.validation?.maxLength && newValue.length > element.validation.maxLength) {
      return;
    }
    
    setFieldValue(element.apiKey, newValue);
  };

  const handleBlur = () => {
    setFieldTouched(element.apiKey);
  };

  const inputProps = {
    id: element.apiKey,
    type: element.type || 'text',
    value: value || '',
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: isDisabled,
    autoFocus: element.autoFocus || false,
    placeholder: element.placeholder || `Enter ${element.label}`,
    className: `w-full px-4 py-3 text-sm border rounded-lg text-gray-900 placeholder-gray-500 
                transition-all duration-200 ease-in-out focus:outline-none
                ${error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                }
                ${isDisabled 
                  ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                  : 'bg-white hover:bg-gray-50 focus:bg-white'
                }
                ${element.prefix ? 'pl-12' : ''}
                ${className}`,
  };

  // Add maxLength if specified
  if (element.validation?.maxLength) {
    inputProps.maxLength = element.validation.maxLength;
  }

  return (
    <div className="mb-6">
      <label htmlFor={element.apiKey} className="block text-sm font-semibold text-gray-700 mb-2">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {element.prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-gray-500 text-sm font-medium">{element.prefix}</span>
          </div>
        )}
        
        <input
          {...inputProps}
        />
        
        {/* Focus ring overlay for better visual feedback */}
        <div className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 ${
          error ? 'ring-2 ring-red-200 opacity-100' : 'ring-0 opacity-0'
        }`} />
      </div>
      
      {error && (
        <div className="mt-2 flex items-center">
          <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
      
      {element.validation?.maxLength && (
        <div className="mt-2 flex justify-between items-center">
          <div className="flex-1" />
          <p className={`text-xs font-medium ${
            (value || '').length > element.validation.maxLength * 0.9 
              ? 'text-orange-600' 
              : 'text-gray-500'
          }`}>
            {(value || '').length}/{element.validation.maxLength} characters
          </p>
        </div>
      )}
    </div>
  );
};

export default TextField;
