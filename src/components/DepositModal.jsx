import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSpring, animated } from '@react-spring/web';
import Loader from '@/components/Loader';
import emailjs from '@emailjs/browser';
import { Toast } from 'flowbite-react';

// Reusable Modal Component
const Modal = ({ isOpen, children, onClose, loading }) => {
  const fade = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 220, friction: 20 },
  });

  return (
    <animated.div
      style={fade}
      className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'} bg-black bg-opacity-50 transition-all`}
    >
      <div className="relative bg-white rounded-xl shadow-lg max-w-xl mx-auto w-[35rem] p-6">
        <div style={{ display: loading ? 'none' : 'block' }}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-red-700 absolute right-2 top-2 cursor-pointer" onClick={onClose} />
        </div>
        {loading ? <Loader /> : children}
      </div>
    </animated.div>
  );
};

// Payment Methods Modal Component
const PaymentMethodsModal = ({ isOpen, onClose, onSelectPaymentMethod }) => (
<Modal isOpen={isOpen} onClose={onClose}>
  <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg">
    <Typography variant="h4" className="text-center font-bold mb-4">
      Select Payment Method
    </Typography>
    <div className="flex flex-col space-y-4">
      <Button variant="outlined" color="blue" onClick={() => onSelectPaymentMethod('crypto')}>
        Pay with Crypto
      </Button>
      <Button variant="outlined" color="blue" onClick={() => onSelectPaymentMethod('cashapp')}>
        Pay with CashApp
      </Button>
      <Button variant="outlined" color="blue" onClick={() => onSelectPaymentMethod('bank')}>
        Pay with Bank
      </Button>
    </div>
  </div>
</Modal>


);

// Payment Details Modal Component
const PaymentDetailsModal = ({ isOpen, onClose, paymentMethod }) => {
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });

  const handleCopyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setToastMessage({ message: 'Address copied to clipboard!', type: 'success' });
  };

  const cryptoAddresses = {
    BTC: 'bc1qg7les2474fxy7xg2lu4mtpewn9hd9jk35kwjkg',
    ETH: '0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7',
    LTC: 'ltc1q8cxd7q2wsqjfd94nah0twhrf33w9ktelpynujx',
    SOL: 'EdqhXJfAUjHPW17AZdB3DNTFPhRgrevsA3KveEorRXQ',
    USDT_ETH: '0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7',
    USDT_TRON: 'TKCSNZgDWbnVLAndat8b8nPFi8rjLxbvPZ',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[90%]  p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto mx-auto">
        <Typography variant="h5" className="text-center font-bold mb-4">
          {`Payment Details for ${paymentMethod}`}
        </Typography>
        {paymentMethod !== 'crypto' && (
          <Typography variant="h5" className="text-center font-bold mb-4">
           Please check your email for further instructions on how to complete your payment.
          </Typography>
        )}
        <div className="flex flex-col space-y-3">
          {paymentMethod === 'crypto' && (
            <>
              {Object.keys(cryptoAddresses).map((key) => (
                <div
                  key={key}
                  className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all break-words text-xs sm:text-sm md:text-base "
                  onClick={() => handleCopyToClipboard(cryptoAddresses[key])}
                >
                  <Typography variant="paragraph" className="font-semibold flex flex-col">
                   <p>{key.replace('_', ' ')} :</p> <span className=' text-[1rem] font-thin'> {cryptoAddresses[key]}</span>
                  </Typography>
                </div>
              ))}
            </>
          )}
          <Button
            variant="outlined"
            color="blue"
            className="w-full sm:w-auto self-center"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
        {toastMessage.message && (
          <Toast
            variant={toastMessage.type === 'success' ? 'success' : 'error'}
            onDismiss={() => setToastMessage({ message: '', type: '' })}
            className=' absolute'
            style={{}}
          >
            {toastMessage.message}
          </Toast>
        )}
      </div>
    </Modal>
  );
};


// Main Deposit Modal Component
const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });
  const [isPaymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [shouldSubmit, setShouldSubmit] = useState(false); // New state for submission

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethodsOpen(false);
    setShouldSubmit(true); // Set to true to indicate submission should happen
  };

  const handleFinalSubmit = async () => { // New function to handle final submission
    setLoading(true);

    const transactionData = {
      amount: parseFloat(amount),
      type: 'credit',
    };

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://tradesphere-backend.onrender.com/api/users/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Transaction created:', data);

      const emailParams = {
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        amount: amount,
      };

      try {
        await emailjs.send('service_xdjtb2c', 'template_9zbpz93', emailParams, '9bXpg4hf2_c33w3kf');
        console.log('Email sent successfully!');
      } catch (emailError) {
        console.error('Email sending failed...', emailError);
      }

      setToastMessage({ message: 'Transaction successful!', type: 'success' });
    } catch (error) {
      console.error('Error creating transaction or sending email:', error);
      setToastMessage({ message: 'Error creating transaction!', type: 'error' });
    } finally {
      setLoading(false);
      setShouldSubmit(false); // Reset submission state
      
    }
  };

  useEffect(() => {
    if (shouldSubmit) {
      handleFinalSubmit(); // Trigger submission when "Done" button is clicked
    }
  }, [shouldSubmit]);

  return (
    <>
      {toastMessage.message && (
        <Toast
          variant={toastMessage.type === 'success' ? 'success' : 'error'}
          onDismiss={() => setToastMessage({ message: '', type: '' })}
        >
          {toastMessage.message}
        </Toast>
      )}

      <Modal isOpen={isOpen && !isPaymentMethodsOpen && !selectedPaymentMethod} onClose={onClose} loading={loading}>
        <Typography variant="h4" className="text-center font-bold mb-4">
          Deposit Funds
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          Please provide the details for your deposit.
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-4">
            {user && (
              <>
                <input
                  type="text"
                  value={user.firstname}
                  disabled
                  className="border border-gray-300 rounded-lg p-2 bg-gray-100"
                  name="first_name"
                />
                <input
                  type="text"
                  value={user.lastname}
                  disabled
                  className="border border-gray-300 rounded-lg p-2 bg-gray-100"
                  name="last_name"
                />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="border border-gray-300 rounded-lg p-2 bg-gray-100"
                  name="email"
                />
              </>
            )}
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="border border-gray-300 rounded-lg p-2"
            />
            <Button variant="outlined" color="blue" onClick={() => setPaymentMethodsOpen(true)}>
              Select Payment Method
            </Button>
          </div>
        </form>
      </Modal>

      <PaymentMethodsModal
        isOpen={isPaymentMethodsOpen}
        onClose={() => setPaymentMethodsOpen(false)}
        onSelectPaymentMethod={handleSelectPaymentMethod}
      />

      {selectedPaymentMethod && (
        <PaymentDetailsModal
          isOpen={!!selectedPaymentMethod}
          onClose={() => setSelectedPaymentMethod(null)}
          paymentMethod={selectedPaymentMethod}
        />
      )}
    </>
  );
};

export default DepositModal;
