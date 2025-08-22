// Validation utility functions
export const validateField = (value, validation, fieldType = 'text') => {
  const errors = [];

  if (!validation) return null;

  // Required validation
  if (validation.required) {
    if (value === null || value === undefined || value === '') {
      errors.push('This field is required');
    }
    if (fieldType === 'boolean' && validation.requiredTrue && value !== true) {
      errors.push('This field must be selected');
    }
  }

  // Skip other validations if field is empty and not required
  if (!validation.required && (value === null || value === undefined || value === '')) {
    return null;
  }

  // String length validations
  if (typeof value === 'string') {
    if (validation.minLength && value.length < validation.minLength) {
      errors.push(`Minimum length is ${validation.minLength} characters`);
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      errors.push(`Maximum length is ${validation.maxLength} characters`);
    }
  }

  // Number validations
  if (fieldType === 'number') {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      errors.push('Please enter a valid number');
    } else {
      if (validation.min !== undefined && numValue < validation.min) {
        errors.push(`Minimum value is ${validation.min}`);
      }
      if (validation.max !== undefined && numValue > validation.max) {
        errors.push(`Maximum value is ${validation.max}`);
      }
    }
  }

  // Pattern validation (regex)
  if (validation.pattern && typeof value === 'string') {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value)) {
      errors.push(validation.patternMessage || 'Invalid format');
    }
  }

  // Email validation
  if (fieldType === 'email' && typeof value === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push('Please enter a valid email address');
    }
  }

  // Phone number validation
  if (fieldType === 'tel' && typeof value === 'string') {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      errors.push('Please enter a valid 10-digit phone number');
    }
  }

  return errors.length > 0 ? errors[0] : null;
};

export const validateSection = (formData, elements) => {
  const errors = {};
  let isValid = true;

  elements.forEach(element => {
    if (!element.visible) return;

    const value = formData[element.apiKey];
    const error = validateField(value, element.validation, element.type);
    
    if (error) {
      errors[element.apiKey] = error;
      isValid = false;
    }

    // Validate dependent fields if they should be rendered
    if (element.dependentFields && shouldRenderDependentFields(element, value)) {
      const dependentErrors = validateSection(formData, element.dependentFields);
      Object.assign(errors, dependentErrors.errors);
      if (!dependentErrors.isValid) {
        isValid = false;
      }
    }
  });

  return { errors, isValid };
};

export const shouldRenderDependentFields = (element, currentValue) => {
  if (!element.dependentFields || element.optionToRenderDependentFields === null || element.optionToRenderDependentFields === undefined) {
    return false;
  }

  // For radio buttons and dropdowns, check if current value matches the trigger
  if (element.component === 'radioButton' || element.component === 'dropdown') {
    // Handle boolean values properly - convert both to same type for comparison
    const triggerValue = element.optionToRenderDependentFields;
    
    // If trigger is boolean, compare as boolean
    if (typeof triggerValue === 'boolean') {
      return currentValue === triggerValue;
    }
    
    // If trigger is string, convert current value to string for comparison
    if (typeof triggerValue === 'string') {
      return String(currentValue) === triggerValue;
    }
    
    // Direct comparison for other types
    return currentValue === triggerValue;
  }

  // For checkboxes, check if it's checked
  if (element.component === 'checkbox') {
    return currentValue === true;
  }

  return false;
};

export const getFieldDisplayValue = (value, element) => {
  if (value === null || value === undefined) return '';

  // For dropdowns, return the label instead of value
  if (element.component === 'dropdown' && element.options) {
    const option = element.options.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  // For multi-dropdowns, return comma-separated labels
  if (element.component === 'multidropdown' && Array.isArray(value) && element.options) {
    return value.map(val => {
      const option = element.options.find(opt => opt.value === val);
      return option ? option.label : val;
    }).join(', ');
  }

  // For radio buttons, return the label
  if (element.component === 'radioButton' && element.options) {
    const option = element.options.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  return value.toString();
};

export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    
    // Remove null, undefined, and empty strings
    if (value !== null && value !== undefined && value !== '') {
      // Trim strings
      if (typeof value === 'string') {
        sanitized[key] = value.trim();
      } else {
        sanitized[key] = value;
      }
    }
  });
  
  return sanitized;
};
