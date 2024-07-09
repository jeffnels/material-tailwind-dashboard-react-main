import React, { useState } from 'react';
import { Button, Typography } from "@material-tailwind/react";

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
    return: "20% daily",
    duration: "7 days",
  },
  {
    name: "Premium Portfolio Plan",
    amount: "$10000-$99999",
    return: "30% daily",
    duration: "7 days",
  },
  {
    name: "Elite Portfolio Plan",
    amount: "$100000-$999999",
    return: "45% daily",
    duration: "14 days",
  },
  {
    name: "VIP Portfolio Plan",
    amount: "$1000000-$10000000",
    return: "55% daily",
    duration: "28 days",
  },
];

const Pricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPaymentModalOpen(false);
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

  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-center font-bold mb-12">
            Our Pricing Plans
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <Typography variant="h4" className="font-bold mb-4 text-center">
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
                    className="mt-4"
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

      {/* Main Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-md max-w-md mx-auto p-6">
            <Typography variant="h4" className="text-center font-bold mb-4">
              {selectedPlan.name}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Amount: {selectedPlan.amount}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Return: {selectedPlan.return}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Duration: {selectedPlan.duration}
            </Typography>
            <div className="flex justify-center mb-4">
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
            </div>
            <div className="flex justify-center">
              <Button variant="outlined" color="blue" onClick={handleSelectPlan}>
                Select Plan
              </Button>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outlined" color="blue" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {paymentModalOpen && paymentMethod === "bank" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-md max-w-md mx-auto p-6">
            <Typography variant="h4" className="text-center font-bold mb-4">
              Bank Payment
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              {selectedPlan.name}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Please proceed with the bank payment instructions.
            </Typography>
            <div className="flex justify-center mt-4">
              <Button variant="outlined" color="blue" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {paymentModalOpen && paymentMethod === "cashapp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-md max-w-md mx-auto p-6">
            <Typography variant="h4" className="text-center font-bold mb-4">
              CashApp Payment
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              {selectedPlan.name}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Please proceed with the CashApp payment instructions.
            </Typography>
            <div className="flex justify-center mt-4">
              <Button variant="outlined" color="blue" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {paymentModalOpen && paymentMethod === "crypto" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-md max-w-md mx-auto p-6">
            <Typography variant="h4" className="text-center font-bold mb-4">
              Crypto Payment
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              {selectedPlan.name}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              Please proceed with the crypto payment instructions.
            </Typography>
            <div className="flex justify-center mt-4">
              <Button variant="outlined" color="blue" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pricing;
