import React from 'react';
import { shouldRenderDependentFields } from '../../utils/validation';
import { useForm } from '../../context/FormContext';

// Import all form components
import TextField from './TextField';
import RadioButton from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import Dropdown from './Dropdown';
import MultiDropdown from './MultiDropdown';
import TextAreaSmall from './TextAreaSmall';
import ImageUploader from './ImageUploader';
import DynamicImages from './DynamicImages';
import LocationComponent from './LocationComponent';

const ComponentFactory = ({ element, className = '' }) => {
  const { getFieldValue } = useForm();

  if (!element || !element.visible) {
    return null;
  }

  const renderComponent = () => {
    switch (element.component) {
      case 'textfield':
        return <TextField element={element} className={className} />;
      
      case 'radioButton':
        return <RadioButton element={element} className={className} />;
      
      case 'radioButtonGroup':
        return <RadioButtonGroup element={element} className={className} />;
      
      case 'dropdown':
        return <Dropdown element={element} className={className} />;
      
      case 'multidropdown':
        return <MultiDropdown element={element} className={className} />;
      
      case 'textAreaSmall':
        return <TextAreaSmall element={element} className={className} />;
      
      case 'image':
        return <ImageUploader element={element} className={className} />;
      
      case 'dynamicImages':
        return <DynamicImages element={element} className={className} />;
      
      case 'LocationComponnet': // Note: keeping the typo from the config
      case 'LocationComponent':
        return <LocationComponent element={element} className={className} />;
      
      case 'pincode':
        // Pincode is essentially a text field with specific validation
        return <TextField element={{...element, type: 'text', validation: {...element.validation, pattern: '^[0-9]{6}$', patternMessage: 'Please enter a valid 6-digit pincode'}}} className={className} />;
      
      case 'label':
        // Render info labels
        return (
          <div className={`mb-4 ${className}`}>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">{element.label}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        console.warn(`Unknown component type: ${element.component}`);
        return (
          <div className={`mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md ${className}`}>
            <p className="text-sm text-yellow-700">
              Unknown component type: <code className="font-mono">{element.component}</code>
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              API Key: {element.apiKey} | Label: {element.label}
            </p>
          </div>
        );
    }
  };

  const renderDependentFields = () => {
    if (!element.dependentFields) return null;

    const currentValue = getFieldValue(element.apiKey);
    const shouldRender = shouldRenderDependentFields(element, currentValue);

    if (!shouldRender) return null;

    return (
      <div className="ml-6 mt-4 pl-4 border-l-2 border-gray-200">
        {element.dependentFields.map((dependentElement, index) => (
          <ComponentFactory
            key={`${dependentElement.apiKey || index}`}
            element={dependentElement}
            className="mb-4"
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderComponent()}
      {renderDependentFields()}
    </div>
  );
};

export default ComponentFactory;
