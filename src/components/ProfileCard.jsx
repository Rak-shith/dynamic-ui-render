import React from 'react';

const ProfileCard = ({ applicant }) => {
  const { name, phone, applicationId, customerId, avatar } = applicant;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        
        {/* Avatar + Name Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
                {name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-600 break-words">{phone}</p>
          </div>
        </div>

        {/* Application + Customer IDs */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 text-left sm:text-right">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Application ID</p>
            <p className="text-sm font-medium text-gray-900">{applicationId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Customer ID</p>
            <p className="text-sm font-medium text-gray-900">{customerId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
