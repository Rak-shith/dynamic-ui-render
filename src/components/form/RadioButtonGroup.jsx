import React from 'react';
import { useForm } from '../../context/FormContext';

const RadioButtonGroup = ({ element }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const { apiKey, label, validation, options = ['Yes', 'No', 'NA'] } = element;
  
  const value = getFieldValue(apiKey) || '';
  const error = getFieldError(apiKey);

  const handleChange = (selectedValue) => {
    setFieldValue(apiKey, selectedValue);
    setFieldTouched(apiKey);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={apiKey}
              value={String(option)}
              checked={String(value) === String(option)}
              onChange={() => handleChange(option)}
              className="sr-only"
            />
            <div className={`
              flex items-center justify-center w-12 h-8 rounded-md border-2 text-sm font-medium transition-all
              ${String(value) === String(option) 
                ? 'border-orange-500 bg-orange-50 text-orange-700' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }
            `}>
              {option}
            </div>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RadioButtonGroup;
