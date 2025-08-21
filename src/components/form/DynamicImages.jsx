import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { uploadFile } from '../../services/api';

const DynamicImages = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const [uploading, setUploading] = useState(false);
  
  const value = getFieldValue(element.apiKey) || [];
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setFieldTouched(element.apiKey);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not a valid image file`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is too large (max 5MB)`);
        }

        const result = await uploadFile(file);
        return {
          url: result.fileUrl,
          name: file.name,
          id: Date.now() + Math.random()
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const currentImages = Array.isArray(value) ? value : [];
      setFieldValue(element.apiKey, [...currentImages, ...uploadedImages]);
    } catch (error) {
      setFieldError(element.apiKey, error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (imageId) => {
    const updatedImages = value.filter(img => img.id !== imageId);
    setFieldValue(element.apiKey, updatedImages);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="form-label">
        {element.label}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="mt-2">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
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
          <div className="mt-4">
            <label
              htmlFor={`files-${element.apiKey}`}
              className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </label>
            <input
              id={`files-${element.apiKey}`}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isDisabled || uploading}
              className="sr-only"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            PNG, JPG, GIF up to 5MB each. Select multiple files.
          </p>
        </div>

        {/* Image Gallery */}
        {value.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {value.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                {!isDisabled && (
                  <button
                    type="button"
                    onClick={() => handleRemove(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
                <p className="mt-1 text-xs text-gray-500 truncate">{image.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default DynamicImages;
