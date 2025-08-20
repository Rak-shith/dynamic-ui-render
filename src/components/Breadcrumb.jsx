import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
          <span 
            className={`${
              index === items.length - 1 
                ? 'text-orange-500 font-medium' 
                : 'text-gray-600 hover:text-gray-900 cursor-pointer'
            }`}
          >
            {item}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
