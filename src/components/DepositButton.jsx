import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Toast } from 'flowbite-react';

const DepositButton = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
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

  const depositSpring = useSpring({
    opacity: isDepositOpen ? 1 : 0,
    transform: isDepositOpen ? 'translateY(0)' : 'translateY(-50%)',
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

  const handleDepositSubmit = (e) => {
    e.preventDefault();

    if (!amount || !method) {
      setToastMessage('Please input an amount and select a method');
      setToastType('error');
      return;
    }

    setIsDepositOpen(false);

    if (method === 'Crypto') {
      setIsCryptoOpen(true);
    } else {
      setIsConfirmationOpen(true);
    }

    setToastMessage('Deposit request submitted');
    setToastType('success');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessage('Address copied to clipboard');
    setToastType('success');
  };

  return (
    <div className="relative">
      <button onClick={() => setIsDepositOpen(true)} className="bg-black text-white px-4 py-2 rounded mb-6 transition duration-500 ease-in-out hover:bg-blue-gray-700">
        Deposit
      </button>

      {isDepositOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <animated.div style={depositSpring} className="modal bg-white p-6 rounded-lg shadow-lg">
            <div className="modal-content">
              <h2 className="text-2xl mb-4">Deposit Funds</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input mb-4 p-2 border rounded"
              />
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="input mb-4 p-2 border rounded"
              >
                <option value="">Select Method</option>
                <option value="Bank Deposit">Bank Deposit</option>
                <option value="CashApp">CashApp</option>
                <option value="Crypto">Crypto</option>
              </select>
              <div className="flex space-x-4">
                <button onClick={handleDepositSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Submit</button>
                <button onClick={() => setIsDepositOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300">Close</button>
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
              <p>Transfer details have been sent to your email</p>
              <button onClick={() => setIsConfirmationOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 mt-4">Close</button>
            </div>
          </animated.div>
        </div>
      )}

     {isCryptoOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <animated.div
      style={cryptoSpring}
      className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-4 sm:mx-auto"
    >
      <div className="modal-content">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Crypto Addresses</h2>
        <div className="space-y-4">
          {[
            { label: 'Bitcoin', address: 'bc1qg7les2474fxy7xg2lu4mtpewn9hd9jk35kwjkg' },
            { label: 'Ethereum', address: '0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7' },
            { label: 'Litecoin', address: 'ltc1q8cxd7q2wsqjfd94nah0twhrf33w9ktelpynujx' },
            { label: 'Solana', address: 'EdqhXJfAUjHPW17AZdB3DNTFPhRgrevsA3KveEorRXQ' },
            { label: 'USDT (ETH)', address: '0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7' },
            { label: 'USDT (Tron)', address: 'TKCSNZgDWbnVLAndat8b8nPFi8rjLxbvPZ' },
          ].map(({ label, address }) => (
            <div key={label} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium">{label}:</p>
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => copyToClipboard(address)}
              >
                {address}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsCryptoOpen(false)}
          className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          Close
        </button>
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
