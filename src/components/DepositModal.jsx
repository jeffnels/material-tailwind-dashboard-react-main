import React, { useState } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSpring, animated } from '@react-spring/web';
import Loader from '@/components/Loader';


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

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
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
      toast.success('Transaction created successfully!');
      console.log('Transaction created:', data);
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} loading={loading}>
      <Typography variant="h4" className="text-center font-bold mb-4">
        Deposit Funds
      </Typography>
      <Typography variant="paragraph" className="text-center mb-4">
        Please provide the details for your deposit.
      </Typography>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Amount"
          className="border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button variant="outlined" color="blue" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </Modal>
  );
};

export default DepositModal;
