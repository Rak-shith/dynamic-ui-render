import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { validateSection } from '../utils/validation';
import { saveSectionData } from '../services/api';
import ComponentFactory from './form/ComponentFactory';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Section = ({ section, className = '', defaultExpanded = false }) => {
  const { formData, setSubmitting, setFieldError } = useForm();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleSave = async () => {
    if (!section.webSectionAttributes?.saveApiEndPoint) {
      console.warn('No save endpoint configured for section:', section.sectionName);
      return;
    }

    // Validate section before saving
    const validation = validateSection(formData, section.elements || []);
    if (!validation.isValid) {
      Object.keys(validation.errors).forEach(field => {
        setFieldError(field, validation.errors[field]);
      });
      setSaveStatus({ type: 'error', message: 'Please fix validation errors before saving' });
      return;
    }

    setSaving(true);
    setSubmitting(true);
    setSaveStatus(null);

    try {
      // Extract only the fields relevant to this section
      const sectionData = {};
      section.elements?.forEach(element => {
        if (element.apiKey && formData[element.apiKey] !== undefined) {
          sectionData[element.apiKey] = formData[element.apiKey];
        }
        // Include dependent fields
        if (element.dependentFields) {
          element.dependentFields.forEach(depElement => {
            if (depElement.apiKey && formData[depElement.apiKey] !== undefined) {
              sectionData[depElement.apiKey] = formData[depElement.apiKey];
            }
          });
        }
      });

      await saveSectionData(section.webSectionAttributes.saveApiEndPoint, sectionData);
      setSaveStatus({ type: 'success', message: 'Section saved successfully' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: error.message || 'Failed to save section' });
    } finally {
      setSaving(false);
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-4 ${className}`}>
      {/* Section Header */}
      <div 
        className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-base font-medium text-gray-900">{section.sectionName}</h3>
            {/* {section.fromPreviousStage && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                Previous Stage
              </span>
            )} */}
          </div>
          
          <div className="flex items-center space-x-3">
            {section.webSectionAttributes?.saveApiEndPoint && isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                disabled={saving}
                className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            )}
            
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Save Status */}
        {saveStatus && (
          <div className={`mt-3 p-2 rounded-md text-sm ${
            saveStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {saveStatus.message}
          </div>
        )}
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="px-6 py-6">
          {section.elements && section.elements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.elements.map((element, index) => (
                <ComponentFactory
                  key={element.apiKey || index}
                  element={element}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No form elements in this section</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Section;
