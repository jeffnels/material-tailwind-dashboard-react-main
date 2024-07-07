import React, { useState } from 'react';
import { Button, Typography } from "@material-tailwind/react";

const Pricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openModal = (planIndex) => {
    setSelectedPlan(planIndex);
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
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <Typography variant="h4" className="font-bold mb-4 text-center">
                  Plan {index + 1}
                </Typography>
                <Typography variant="paragraph" className="text-center mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                </Typography>
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    color="blue"
                    className="mt-4"
                    onClick={() => openModal(index + 1)}
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
              Plan {selectedPlan}
            </Typography>
            <Typography variant="paragraph" className="text-center mb-4">
              You have selected Plan {selectedPlan}. More details about the plan can go here.
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
