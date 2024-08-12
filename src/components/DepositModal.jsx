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
      <div className="relative bg-white rounded-xl shadow-md max-w-md mx-auto w-[30rem] p-6">
        <div style={{ display: loading ? 'none' : 'block' }}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-red-700 absolute right-2 top-2" onClick={onClose} />
        </div>
        {loading ? <Loader /> : children}
      </div>
    </animated.div>
  );
};

// Payment Methods Modal Component
const PaymentMethodsModal = ({ isOpen, onClose, onSelectPaymentMethod }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
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
  </Modal>
);

// Payment Details Modal Component
const PaymentDetailsModal = ({ isOpen, onClose, paymentMethod }) => {
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });

  const handleCopyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setToastMessage({ message: 'Address copied to clipboard!', type: 'success' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h4" className="text-center font-bold mb-4">
        {`Payment Details for ${paymentMethod}`}
      </Typography>
      <div className="flex flex-col space-y-4">
        {paymentMethod === 'crypto' && (
          <>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('bc1qg7les2474fxy7xg2lu4mtpewn9hd9jk35kwjkg')}
            >
              BTC: <strong>bc1qg7les2474fxy7xg2lu4mtpewn9hd9jk35kwjkg</strong>
            </Typography>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7')}
            >
              ETH: <strong>0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7</strong>
            </Typography>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('ltc1q8cxd7q2wsqjfd94nah0twhrf33w9ktelpynujx')}
            >
              LTC: <strong>ltc1q8cxd7q2wsqjfd94nah0twhrf33w9ktelpynujx</strong>
            </Typography>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('EdqhXJfAUjHPW17AZdB3DNTFPhRgrevsA3KveEorRXQ')}
            >
              SOL: <strong>EdqhXJfAUjHPW17AZdB3DNTFPhRgrevsA3KveEorRXQ</strong>
            </Typography>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7')}
            >
              USDT(Eth): <strong>0xBa498F96215d799e6145C4DAeA3887e2D65EE8a7</strong>
            </Typography>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
              onClick={() => handleCopyToClipboard('TKCSNZgDWbnVLAndat8b8nPFi8rjLxbvPZ')}
            >
              USDT(Tron): <strong>TKCSNZgDWbnVLAndat8b8nPFi8rjLxbvPZ</strong>
            </Typography>
          </>
        )}
        <Button variant="outlined" color="blue" onClick={onClose}>
          Done
        </Button>
      </div>
      {toastMessage.message && (
        <Toast
          variant={toastMessage.type === 'success' ? 'success' : 'error'}
          onDismiss={() => setToastMessage({ message: '', type: '' })}
        >
          {toastMessage.message}
        </Toast>
      )}
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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        await emailjs.send('service_a22wsja', 'template_plna47o', emailParams, 'XZlvx_sjG-iimKEdS');
        console.log('Email sent successfully!');
      } catch (emailError) {
        console.error('Email sending failed...', emailError);
      }

      setToastMessage({ message: 'Transaction successful!', type: 'success' });

      // Open the Payment Methods modal after successful transaction
      setPaymentMethodsOpen(true);

    } catch (error) {
      console.error('Error creating transaction or sending email:', error);
      setToastMessage({ message: 'Error creating transaction!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethodsOpen(false);
  };

  return (
    <>
      {toastMessage.message && (
        <Toast className=''
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
        <form onSubmit={handleSubmit}>
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
              required
              placeholder="Enter amount"
              className="border border-gray-300 rounded-lg p-2"
              name="amount"
            />
            <Button type="submit" variant="filled" color="blue">
              Deposit
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
