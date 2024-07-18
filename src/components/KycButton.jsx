import React, { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';

const KycButton = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [country, setCountry] = useState('');
  const [countrySuggestions, setCountrySuggestions] = useState([]);

  useEffect(() => {
    if (address.length >= 3) {
      fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`)
        .then(response => response.json())
        .then(data => setAddressSuggestions(data));
    } else {
      setAddressSuggestions([]);
    }
  }, [address]);

  useEffect(() => {
    if (country.length >= 3) {
      fetch(`https://nominatim.openstreetmap.org/search?country=${country}&format=json&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
          const countries = data.map((item) => item.address.country).filter((value, index, self) => self.indexOf(value) === index);
          setCountrySuggestions(countries);
        });
    } else {
      setCountrySuggestions([]);
    }
  }, [country]);

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
            <h2 className="text-lg font-semibold mb-4"> Verify Identity</h2>
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
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {countrySuggestions.length > 0 && (
                    <div className="border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto bg-white">
                      {countrySuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setCountry(suggestion);
                            setCountrySuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressSuggestions.length > 0 && (
                    <div className="border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto bg-white">
                      {addressSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setAddress(suggestion.display_name);
                            setAddressSuggestions([]);
                          }}
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (front)</label>
                  <input
                    type="file"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Upload Document Image (back)</label>
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
