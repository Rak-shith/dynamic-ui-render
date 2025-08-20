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
      
      <select
        id={element.apiKey}
        value={value || ''}
        onChange={handleChange}
        disabled={isDisabled || loading}
        className={`form-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
      >
        <option value="">
          {loading ? 'Loading...' : `Select ${element.label}`}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Dropdown;
