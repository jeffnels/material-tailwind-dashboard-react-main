import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Toast } from 'flowbite-react';

const DepositButton = () => {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [amount, setAmount] = useState('');
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

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      setToastMessage('Please input an amount');
      setToastType('error');
      return;
    }

    setIsWithdrawalOpen(false);
    setIsConfirmationOpen(true);
    setToastMessage('Withdrawal request submitted');
    setToastType('success');
  };

  return (
    <div className="relative">
      <button onClick={() => setIsWithdrawalOpen(true)} className="bg-black text-white px-4 py-2 rounded mb-6 transition duration-500 ease-in-out hover:bg-blue-gray-700">
        Deposit
      </button>

      {isWithdrawalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <animated.div style={withdrawalSpring} className="modal bg-white p-6 rounded-lg shadow-lg">
            <div className="modal-content">
              <h2 className="text-2xl mb-4">Withdraw Funds</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input mb-4 p-2 border rounded"
              />
              <div className="flex space-x-4">
                <button onClick={handleWithdrawalSubmit} className="btn-primary">Submit</button>
                <button onClick={() => setIsWithdrawalOpen(false)} className="btn-secondary">Close</button>
              </div>
            </div>
          </animated.div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <animated.div style={confirmationSpring} className="modal bg-white p-6 rounded-lg shadow-lg">
            <div className="modal-content">
              <h2 className="text-2xl mb-4">Confirmation</h2>
              <p>{amount} is processing for withdrawal</p>
              <button onClick={() => setIsConfirmationOpen(false)} className="btn-secondary mt-4">Close</button>
            </div>
          </animated.div>
        </div>
      )}

      {toastMessage && (
        <div className={`z-10 fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-700'}`}>
          <Toast color={toastType === 'error' ? 'failure' : 'success'} onClose={() => setToastMessage('')} style={{ backgroundColor: toastType === 'error' ? 'red' : 'green', color: 'white' }}>
            {toastMessage}
          </Toast>
        </div>
      )}
    </div>
  );
};

export default DepositButton;
