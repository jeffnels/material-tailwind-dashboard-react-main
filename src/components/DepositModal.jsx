import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSpring, animated } from '@react-spring/web';
import Loader from '@/components/Loader';
import emailjs from '@emailjs/browser';
import { Toast } from 'flowbite-react';

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
      <div className="relative bg-white rounded-xl shadow-md max-w-md mx-auto w-[22rem] p-6">
        <div style={{ display: loading ? 'none' : 'block' }}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-red-700 absolute right-2 top-2" onClick={onClose} />
        </div>
        {loading ? <Loader /> : children}
      </div>
    </animated.div>
  );
};

const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });

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
    } catch (error) {
      console.error('Error creating transaction or sending email:', error);
      setToastMessage({ message: 'Error creating transaction!', type: 'error' });
    } finally {
      setLoading(false);
      onClose();
    }
  };

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
      <Modal isOpen={isOpen} onClose={onClose} loading={loading}>
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
                  name="user"
                />
              </>
            )}
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter Amount"
              className="border border-gray-300 rounded-lg p-2"
              name="amount"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outlined" color="blue" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DepositModal;
