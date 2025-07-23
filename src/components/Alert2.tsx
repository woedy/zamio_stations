import React from 'react';

const Alert2 = ({ message, type, onClose }) => {
  if (!message) return null;

  let alertClasses = 'fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg transition-opacity duration-300';
  let iconClasses = 'mr-2 inline-block';
  let textClasses = '';

  switch (type) {
    case 'success':
      alertClasses += ' bg-green text-white';
      iconClasses += ' text-green';
      textClasses = 'font-semibold';
      break;
    case 'error':
      alertClasses += ' bg-primary text-white';
      iconClasses += ' text-red-500';
      textClasses = 'font-semibold';
      break;
    default:
      alertClasses += ' bg-gray-100 text-gray-800';
      iconClasses += ' text-gray';
  }

  return (
    <div className={alertClasses}>
      <svg
        className={`w-5 h-5 ${iconClasses}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {type === 'success' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        )}
      </svg>
      <span className={textClasses}>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert2;
