import React from 'react';
import { useForm } from '../../context/FormContext';

const RadioButton = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  
  const value = getFieldValue(element.apiKey);
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  const handleChange = (optionValue) => {
    setFieldValue(element.apiKey, optionValue);
    setFieldTouched(element.apiKey);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <fieldset>
        <legend className="form-label">
          {element.label}
          {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        
        <div className="mt-2 space-y-2">
          {element.options?.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`${element.apiKey}_${index}`}
                name={element.apiKey}
                type="radio"
                value={String(option.value)}
                checked={String(value) === String(option.value)}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 disabled:opacity-50"
              />
              <label
                htmlFor={`${element.apiKey}_${index}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      
      {error && <p className="form-error">{error}</p>}
      
      {/* Render restricted label details if option matches */}
      {element.restrictedLabelDetails && 
       String(value) === String(element.optionToRestrictDependents) && 
       element.restrictedLabelDetails.map((labelDetail, index) => (
        <div key={index} className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">{labelDetail.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
