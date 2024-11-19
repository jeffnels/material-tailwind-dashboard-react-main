import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';
import Loader from '@/components/Loader';
import { Toast } from 'flowbite-react';
import DepositModal from '@/components/DepositModal';
import { XMarkIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    name: "Basic Portfolio Plan",
    amount: "$200-$999",
    return: "10% daily",
    duration: "7 days",
  },
  {
    name: "Standard Portfolio Plan",
    amount: "$1000-$9999",
    return: "15% daily",
    duration: "7 days",
  },
  {
    name: "Premium Portfolio Plan",
    amount: "$10000-$99999",
    return: "20% daily",
    duration: "7 days",
  },
  {
    name: "Elite Portfolio Plan",
    amount: "$100000-$999999",
    return: "25% daily",
    duration: "14 days",
  },
  {
    name: "VIP Portfolio Plan",
    amount: "$1000000-$10000000",
    return: "30% daily",
    duration: "28 days",
  },
];
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
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-red-700 absolute right-2 top-2 cursor-pointer" onClick={onClose} />
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


export const Plans = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPaymentModalOpen(false);
    setDepositModalOpen(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSelectPlan = () => {
    if (paymentMethod) {
      setIsOpen(false);
      setPaymentModalOpen(true);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

const handleDone = async () => {
  setLoading(true);

  // Retrieve token and user data from localStorage
  const authToken = localStorage.getItem('authToken'); 
  const user = JSON.parse(localStorage.getItem('user')); // Ensure the user object is retrieved

  if (!authToken || !user) {
    setToastMessage('User or token not found, please login.');
    setToastType('error');
    setShowToast(true);
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('https://tradesphere-backend.onrender.com/api/users/buy-package', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken, // Attach the token in the header
      },
      body: JSON.stringify({
        userId: user.id,  // Use user.id from localStorage
        packageType: selectedPlan.name.toLowerCase(),
        packageAmount: amount,  // Make sure you're using the correct variable name for the entered amount
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setToastMessage('Package purchased successfully!');
      setToastType('success');
    } else {
      throw new Error(data.msg || 'Error processing your request.');
    }
  } catch (error) {
    setToastMessage(`Error: ${error.message}`);
    setToastType('error');
  } finally {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setAmount('');
      setPaymentMethod('');
    }, 3000);
    setLoading(false);
    closeModal();
  }
};






  useEffect(() => {
    // Simulate fetching transactions
    const fetchedTransactions = [
      { id: 1, amount: "$500", type: "credit", package: "Standard Portfolio Plan" },
    ];
    setTransactions(fetchedTransactions);
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/sign-in");
    }
  }, [authenticated, navigate]);

  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <Typography variant="h3" className="text-center font-bold mb-12">
            Our Pricing 
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <Typography variant="h5" className="font-bold mb-4 text-center">
                  {plan.name} 
                </Typography>
                <Typography variant="paragraph" className="text-center mb-4">
                  Amount: {plan.amount}
                </Typography>
                <Typography variant="paragraph" className="text-center mb-4">
                  Return: {plan.return}
                </Typography>
                <Typography variant="paragraph" className="text-center mb-4">
                  Duration: {plan.duration}
                </Typography>
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    color="blue"
                    className="mt-4 w-full"
                    onClick={() => openModal(plan)}
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={closeModal} loading={loading}>
        {selectedPlan && (
          <>
            <Typography variant="h4" className="text-center font-bold mb-4">
              {selectedPlan.name}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4 font-semibold">
              Amount: {selectedPlan.amount}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4 font-semibold">
              Return: {selectedPlan.return}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4 font-semibold">
              Duration: {selectedPlan.duration}
            </Typography>
            <div className="flex justify-center mb-4">
              <input
                type="number"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter Amount"
              />
            </div>
            {/* <div className="flex justify-center mb-4">
              <select
                className="border border-gray-300 rounded-lg p-2"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="bank">Bank</option>
                <option value="cashapp">CashApp</option>
                <option value="crypto">Crypto</option>
              </select>
            </div> */}
            <div className="flex justify-center">
              <Button variant="outlined" color="blue" onClick={handleDone} className='w-full'>
                Select Plan
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal isOpen={paymentModalOpen && paymentMethod === "bank"} onClose={closeModal} loading={loading}>
        <Typography variant="h4" className="text-center font-bold mb-4">
          Bank Payment
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          {selectedPlan?.name}
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          Please proceed with the bank payment instructions.
        </Typography>
        <div className="flex justify-center mt-4">
          <Button variant="outlined" color="blue" onClick={handleDone}>
            Done
          </Button>
        </div>
      </Modal>

      <Modal isOpen={paymentModalOpen && paymentMethod === "cashapp"} onClose={closeModal} loading={loading}>
        <Typography variant="h4" className="text-center font-bold mb-4">
          CashApp Payment
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          {selectedPlan?.name}
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          Please proceed with the CashApp payment instructions.
        </Typography>
        <div className="flex justify-center mt-4">
          <Button variant="outlined" color="blue" onClick={handleDone}>
            Done
          </Button>
        </div>
      </Modal>

      <Modal isOpen={paymentModalOpen && paymentMethod === "crypto"} onClose={closeModal} loading={loading}>
        <Typography variant="h4" className="text-center font-bold mb-4">
          Crypto Payment
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          {selectedPlan?.name}
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          Please proceed with the crypto payment instructions.
        </Typography>
        <div className="flex justify-center mt-4">
          <Button variant="outlined" color="blue" onClick={handleDone} className='w-full'>
            Done
          </Button>
        </div>
      </Modal>

      <DepositModal isOpen={depositModalOpen} onClose={closeModal} />

      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          color={toastType}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <div className="flex items-center">
            <span className="mr-2">{toastType === 'success' ? '✓' : '✗'}</span>
            <span>{toastMessage}</span>
          </div>
        </Toast>
      )}
    </>
  );
};