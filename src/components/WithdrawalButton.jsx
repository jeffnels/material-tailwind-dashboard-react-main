import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Toast } from 'flowbite-react';

const WithdrawalButton = () => {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCryptoOpen, setIsCryptoOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
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

  const withdrawalSpring = useSpring({
    opacity: isWithdrawalOpen ? 1 : 0,
    transform: isWithdrawalOpen ? 'translateY(0)' : 'translateY(-50%)',
    config: { tension: 200, friction: 15 },
  });

  const confirmationSpring = useSpring({
    opacity: isConfirmationOpen ? 1 : 0,
    transform: isConfirmationOpen ? 'translateY(0)' : 'translateY(-50%)',
    config: { tension: 200, friction: 15 },
  });

  const cryptoSpring = useSpring({
    opacity: isCryptoOpen ? 1 : 0,
    transform: isCryptoOpen ? 'translateY(0)' : 'translateY(-50%)',
    config: { tension: 200, friction: 15 },
  });

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();

    if (!amount || !method) {
      setToastMessage('Please input an amount and select a method');
      setToastType('error');
      return;
    }

    setIsWithdrawalOpen(false);

    if (method === 'Crypto') {
      setIsCryptoOpen(true);
    } else {
      setIsConfirmationOpen(true);
    }

    setToastMessage('Withdrawal request submitted');
    setToastType('success');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessage('Address copied to clipboard');
    setToastType('success');
  };

  return (
    <div className="relative">
      <button onClick={() => setIsWithdrawalOpen(true)} className="bg-red-400 text-white px-4 py-2 rounded mb-6 transition duration-500 ease-in-out hover:bg-blue-700 min-w-[150px] text-sm">
        Withdraw
      </button>

      {isWithdrawalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <animated.div style={withdrawalSpring} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={() => setIsWithdrawalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl mb-4">Withdraw Funds</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mb-4 p-2 border rounded w-full"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            >
              <option value="">Select Method</option>
              <option value="Bank">Bank</option>
              <option value="CashApp">CashApp</option>
              <option value="Crypto">Crypto</option>
            </select>
            <div className="flex space-x-4">
              <button onClick={handleWithdrawalSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Submit</button>
            </div>
          </animated.div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <animated.div style={confirmationSpring} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={() => setIsConfirmationOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl mb-4">Confirmation</h2>
            <p>Your withdrawal request is being processed. More info will be sent to your email.</p>
          </animated.div>
        </div>
      )}

      {isCryptoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <animated.div style={cryptoSpring} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={() => setIsCryptoOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl mb-4">Crypto Modal</h2>
            <p>Your withdrawal request is being processed. More info will be sent to your email.</p>
          </animated.div>
        </div>
      )}

      {toastMessage && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-700'}`}>
          <Toast color={toastType === 'error' ? 'failure' : 'success'} onClose={() => setToastMessage('')} style={{ backgroundColor: toastType === 'error' ? 'red' : 'green', color: 'white' }}>
            {toastMessage}
          </Toast>
        </div>
      )}
    </div>
  );
};

export default WithdrawalButton;
