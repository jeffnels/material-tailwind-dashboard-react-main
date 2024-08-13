import React, { useState, useEffect } from 'react';
import { Toast } from 'flowbite-react';
import DepositModal from './DepositModal'; // Import your DepositModal component

const DepositButton = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage('');
      }, 3000); // 3 seconds timeout
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleDepositClick = () => {
    setIsDepositOpen(true);
  };

  const handleCloseModal = () => {
    setIsDepositOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDepositClick}
        className="bg-green-400 text-white px-4 py-2 rounded mb-6 transition duration-500 ease-in-out hover:bg-blue-gray-700 min-w-[150px] text-sm"
      >
        Deposit
      </button>

      {isDepositOpen && (
        <DepositModal
          isOpen={isDepositOpen}
          onClose={handleCloseModal}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
        />
      )}

      {toastMessage && (
        <div className={`z-10 fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-700'}`}>
          <Toast
            color={toastType === 'error' ? 'failure' : 'success'}
            onClose={() => setToastMessage('')}
            style={{ backgroundColor: toastType === 'error' ? 'red' : 'green', color: 'white' }}
          >
            {toastMessage}
          </Toast>
        </div>
      )}
    </div>
  );
};

export default DepositButton;
