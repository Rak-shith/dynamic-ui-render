import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';

const LocationComponent = ({ element, className = '' }) => {
  const { getFieldValue, setFieldValue, getFieldError, setFieldTouched } = useForm();
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  const value = getFieldValue(element.apiKey) || {};
  const error = getFieldError(element.apiKey);
  const isDisabled = element.alwaysDisabled || false;

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setLocationError(null);
    setFieldTouched(element.apiKey);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
        };
        
        setFieldValue(element.apiKey, locationData);
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const clearLocation = () => {
    setFieldValue(element.apiKey, {});
    setLocationError(null);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="form-label">
        {element.label || 'Current Location'}
        {element.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="mt-2 p-4 border border-gray-300 rounded-md">
        {value.latitude && value.longitude ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Location Captured</span>
              </div>
              {!isDisabled && (
                <button
                  type="button"
                  onClick={clearLocation}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Latitude:</span>
                <p className="font-mono">{value.latitude?.toFixed(6)}</p>
              </div>
              <div>
                <span className="text-gray-500">Longitude:</span>
                <p className="font-mono">{value.longitude?.toFixed(6)}</p>
              </div>
              <div>
                <span className="text-gray-500">Accuracy:</span>
                <p>{value.accuracy ? `±${Math.round(value.accuracy)}m` : 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Captured:</span>
                <p>{value.timestamp ? new Date(value.timestamp).toLocaleTimeString() : 'N/A'}</p>
              </div>
            </div>

            {/* Google Maps Link */}
            <a
              href={`https://maps.google.com/?q=${value.latitude},${value.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm"
            >
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
              </svg>
              View on Google Maps
            </a>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No location captured</p>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={isDisabled || loading}
              className="mt-3 btn-primary"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Getting Location...
                </>
              ) : (
                'Get Current Location'
              )}
            </button>
          </div>
        )}
      </div>
      
      {(error || locationError) && (
        <p className="form-error">{error || locationError}</p>
      )}
    </div>
  );
};

export default LocationComponent;
