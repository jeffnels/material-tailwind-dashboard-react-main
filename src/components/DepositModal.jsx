// components/DepositModal.js

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

        {loading ? (
          <Loader />
        ) : (
          children
        )}
      </div>
    </animated.div>
  );
};

const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const packages = [
    'Basic Portfolio Plan',
    'Standard Portfolio Plan',
    'Premium Portfolio Plan',
    'Elite Portfolio Plan',
    'VIP Portfolio Plan',
  ];

  const paymentMethods = [
    'bank',
    'cashapp',
    'crypto',
  ];

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const transactionData = {
      amount: parseFloat(amount),
      type: 'credit',
      package: selectedPackage,
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch('http://tradesphere-backend.onrender.com/api/users/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNzE4NTkwMzEyLCJleHAiOjE3MTg2MjYzMTJ9.GqblDA4JqHCMJT5mRjSUPLqqaEp0YX6OTMdJMsznxY8',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
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
        <select
          value={selectedPackage}
          onChange={handlePackageChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="" disabled>Select Package</option>
          {packages.map((pkg, index) => (
            <option key={index} value={pkg}>{pkg}</option>
          ))}
        </select>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="" disabled>Select Payment Method</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>
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
