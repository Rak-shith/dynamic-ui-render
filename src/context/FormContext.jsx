import React, { createContext, useContext, useReducer } from 'react';

const FormContext = createContext();

const initialState = {
  formData: {},
  errors: {},
  touched: {},
  isSubmitting: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.field]: null,
        },
      };
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: true,
        },
      };
    case 'SET_MULTIPLE_VALUES':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'RESET_FORM':
      return initialState;
    case 'RESET_SECTION':
      const sectionFields = action.payload;
      const newFormData = { ...state.formData };
      const newErrors = { ...state.errors };
      const newTouched = { ...state.touched };
      
      sectionFields.forEach(field => {
        delete newFormData[field];
        delete newErrors[field];
        delete newTouched[field];
      });
      
      return {
        ...state,
        formData: newFormData,
        errors: newErrors,
        touched: newTouched,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setFieldValue = (field, value) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { field, value } });
  };

  const setFieldError = (field, error) => {
    dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
  };

  const setFieldTouched = (field) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', payload: { field } });
  };

  const setMultipleValues = (values) => {
    dispatch({ type: 'SET_MULTIPLE_VALUES', payload: values });
  };

  const setSubmitting = (isSubmitting) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const resetSection = (sectionFields) => {
    dispatch({ type: 'RESET_SECTION', payload: sectionFields });
  };

  const getFieldValue = (field) => {
    return state.formData[field] || '';
  };

  const getFieldError = (field) => {
    return state.errors[field];
  };

  const isFieldTouched = (field) => {
    return state.touched[field] || false;
  };

  const value = {
    ...state,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setMultipleValues,
    setSubmitting,
    resetForm,
    resetSection,
    getFieldValue,
    getFieldError,
    isFieldTouched,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
