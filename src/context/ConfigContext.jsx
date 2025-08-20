import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchConfig } from '../services/api';

const ConfigContext = createContext();

const initialState = {
  config: null,
  loading: true,
  error: null,
};

const configReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CONFIG_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_CONFIG_SUCCESS':
      return { ...state, config: action.payload, loading: false, error: null };
    case 'FETCH_CONFIG_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET_CONFIG':
      return initialState;
    default:
      return state;
  }
};

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, initialState);

  const loadConfig = async () => {
    dispatch({ type: 'FETCH_CONFIG_START' });
    try {
      const config = await fetchConfig();
      dispatch({ type: 'FETCH_CONFIG_SUCCESS', payload: config });
    } catch (error) {
      dispatch({ type: 'FETCH_CONFIG_ERROR', payload: error.message });
    }
  };

  const resetConfig = () => {
    dispatch({ type: 'RESET_CONFIG' });
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const value = {
    ...state,
    loadConfig,
    resetConfig,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
