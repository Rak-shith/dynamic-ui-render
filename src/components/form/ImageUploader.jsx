import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { uploadFile } from '../../services/api';

const ImageUploader = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const value = getFieldValue(element.apiKey);
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setFieldError(element.apiKey, 'Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFieldError(element.apiKey, 'File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setFieldTouched(element.apiKey);

    try {
      const result = await uploadFile(file);
      setFieldValue(element.apiKey, result.fileUrl);
      setPreview(result.fileUrl);
    } catch (error) {
      setFieldError(element.apiKey, 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFieldValue(element.apiKey, null);
    setPreview(null);
  };

  const imageStyle = element.imageStyle || {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    border: '2px solid #f97316'
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="mt-2">
        {(value || preview) ? (
          <div className="relative inline-block">
            <img
              src={preview || value}
              alt={element.label}
              style={imageStyle}
              className="object-cover"
            />
            {!isDisabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center" style={imageStyle}>
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-2">
                <label
                  htmlFor={`file-${element.apiKey}`}
                  className={`cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <input
                  id={`file-${element.apiKey}`}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isDisabled || uploading}
                  className="sr-only"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default ImageUploader;
