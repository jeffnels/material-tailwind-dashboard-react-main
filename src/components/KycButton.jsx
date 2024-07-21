import React, { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';
import { Toast } from 'flowbite-react';

const KycButton = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    idNumber: '',
    idType: '',
    address: '',
    expiryDate: '',
    frontImage: null,
    backImage: null,
  });
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage('');
      }, 3000); // 3 seconds timeout
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      address: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Example validation and submission handling
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.idNumber) {
      setToastMessage('Please fill in all required fields.');
      setToastType('error');
      return;
    }

    // Simulate form submission success
    setToastMessage('Form submitted successfully!');
    setToastType('success');
console.log('success');
    // Clear form inputs on successful submission
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      idNumber: '',
      idType: '',
      address: '',
      expiryDate: '',
      frontImage: null,
      backImage: null,
    });
    setAddress('');
    setCountry('');
    setIsSecondModalOpen(false);
  };

  return (
    <div>
      
      <button
        className="bg-black text-white px-4 py-2 rounded mb-6"
        onClick={() => setIsFirstModalOpen(true)}
      >
        Verify Identity
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
            <h2 className="text-lg font-semibold mb-4">Verify Identity</h2>
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
{toastMessage && (
              <div className={` z-10  fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                <Toast color={toastType === 'error' ? 'failure' : 'success'} onClose={() => setToastMessage('')} style={{background : toastType === 'error' ? 'red' : 'green' , color: 'white'}}>
                  {toastMessage}
                </Toast>
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
            {toastMessage && (
              <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-black ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                <Toast color={toastType === 'error' ? 'failure' : 'success'} style={{background : toastType === 'error' ? 'red' : 'green' , color: 'white'}} onClose={() => setToastMessage('')}>
                  {toastMessage}
                </Toast>
              </div>
            )}
            <div className="overflow-y-auto max-h-[75vh]">
  <form className="space-y-4 p-4 max-w-md mx-auto bg-white rounded-md shadow-md" onSubmit={handleSubmit}>                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.idNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type of ID</label>
                  <select
                    name="idType"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.idType}
                    onChange={handleChange}
                  >
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <select
                    name="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {/* List of countries */}
                    <option value="Afghanistan">Afghanistan</option>
                    {/* Add more countries here */}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (front)</label>
                  <input
                    type="file"
                    name="frontImage"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (back)</label>
                  <input
                    type="file"
                    name="backImage"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded w-full"
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
