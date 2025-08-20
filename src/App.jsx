import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { FormProvider } from './context/FormContext';
import Navigation from './components/Navigation';
import TabPage from './components/TabPage';

function App() {
  return (
    <ConfigProvider>
      <FormProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/applicant" replace />} />
                <Route path="/:tabKey" element={<TabPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FormProvider>
    </ConfigProvider>
  );
}

export default App;
