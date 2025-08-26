import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import Section from './Section';
import ProfileCard from './ProfileCard';
import Breadcrumb from './Breadcrumb';
import { APPLICATION_DATA_PROFILE } from '../services/api';

const TabPage = () => {
  const { tabKey } = useParams();
  const { config, loading, error } = useConfig();
  const tabs = config?.data?.page?.tabs;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Configuration</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const currentTab = config?.data?.page?.tabs?.find(tab => tab.rbackey === tabKey);

  if (!currentTab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tab Not Found</h2>
          <p className="text-gray-600">The requested tab could not be found.</p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = ["Loan Applications", "Field Investigation", currentTab.tabName];

  // Check if this is profileCard tab
  const shouldShowProfileCard = currentTab.profileCardData === true;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6">
      {tabs.length > 1 && <Breadcrumb items={breadcrumbItems} />}
        
          <div className="space-y-4 rounded-lg shadow-sm border border-gray-200 p-6">
            {tabs.length > 1 && <div className="md:flex flex-wrap border-b border-gray-200 mb-4 hidden">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.rbackey}
                  to={`/${tab.rbackey}`}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                    tab.rbackey === tabKey
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.tabName}
                </NavLink>
              ))}
            </div>}
            {shouldShowProfileCard && <ProfileCard applicant={APPLICATION_DATA_PROFILE} />}
            {currentTab.sections?.map((section, index) => (
              <Section 
                key={section.rbackey || index} 
                section={section}
                defaultExpanded={index === 0} // Expand first section by default
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default TabPage;
