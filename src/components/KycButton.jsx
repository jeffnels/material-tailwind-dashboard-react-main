import avatar from '../images/avatar.png';
import React, { useState } from 'react';

const KycButton = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-black text-white px-4 py-2 rounded mb-6"
        onClick={() => setIsFirstModalOpen(true)}
      >
        KYC Verification
      </button>

      {isFirstModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white flex items-center justify-between rounded-lg shadow-lg p-8 flex-col relative w-full max-w-md h-[300px]">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-700 text-2xl"
              onClick={() => setIsFirstModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">KYC Verification</h2>
            <img
              src={avatar}
              alt="Placeholder"
              className="w-20 mb-6"
            />
            <button
              className="bg-black text-white px-4 py-2 rounded w-full max-w-xs"
              onClick={() => {
                setIsFirstModalOpen(false);
                setIsSecondModalOpen(true);
              }}
            >
              Verify Identity
            </button>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 relative max-w-3xl w-full mx-4 h-[90%]">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-700 text-2xl"
              onClick={() => setIsSecondModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Identity Verification</h2>
            <div className="overflow-y-auto max-h-[75vh]">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ID Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type of ID</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Social Security Number (SSN)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image</label>
                  <input
                    type="file"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Selfie</label>
                  <input
                    type="file"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSecondModalOpen(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycButton;
