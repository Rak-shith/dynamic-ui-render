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
    className: `form-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`,
  };

  // Add maxLength if specified
  if (element.validation?.maxLength) {
    inputProps.maxLength = element.validation.maxLength;
  }

  return (
    <div className="mb-4">
      <label htmlFor={element.apiKey} className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {element.prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{element.prefix}</span>
          </div>
        )}
        
        <input
          {...inputProps}
          className={`${inputProps.className} ${element.prefix ? 'pl-12' : ''}`}
        />
      </div>
      
      {error && <p className="form-error">{error}</p>}
      
      {element.validation?.maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {(value || '').length}/{element.validation.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextField;
