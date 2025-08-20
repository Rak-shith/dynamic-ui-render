import React from 'react';
import { useForm } from '../../context/FormContext';

const TextAreaSmall = ({ element, className = '' }) => {
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

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={element.apiKey} className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={element.apiKey}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isDisabled}
        rows={3}
        placeholder={element.placeholder || `Enter ${element.label}`}
        maxLength={element.validation?.maxLength}
        className={`form-input resize-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
      />
      
      {error && <p className="form-error">{error}</p>}
      
      {element.validation?.maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {(value || '').length}/{element.validation.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextAreaSmall;
