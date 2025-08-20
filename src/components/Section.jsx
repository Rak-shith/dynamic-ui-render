import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { validateSection } from '../utils/validation';
import { saveSectionData } from '../services/api';
import ComponentFactory from './form/ComponentFactory';

const Section = ({ section, className = '' }) => {
  const { formData, setSubmitting, setFieldError } = useForm();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

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
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{section.sectionName}</h3>
            {section.componentName && (
              <p className="text-sm text-gray-500 mt-1">Component: {section.componentName}</p>
            )}
            {section.fromPreviousStage && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                From Previous Stage
              </span>
            )}
          </div>
          
          {section.webSectionAttributes?.saveApiEndPoint && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Section'
              )}
            </button>
          )}
        </div>
        
        {/* Save Status */}
        {saveStatus && (
          <div className={`mt-3 p-3 rounded-md ${
            saveStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {saveStatus.type === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${
                  saveStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {saveStatus.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Content */}
      <div className="px-6 py-6">
        {section.elements && section.elements.length > 0 ? (
          <div className="space-y-6">
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
    </div>
  );
};

export default Section;
