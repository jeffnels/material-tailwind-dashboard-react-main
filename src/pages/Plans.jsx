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

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

      {/* Modal */}
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
            <div className="flex justify-center">
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
