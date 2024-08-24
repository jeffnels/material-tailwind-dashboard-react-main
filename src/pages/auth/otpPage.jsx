import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toast } from 'flowbite-react';

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const inputRefs = useRef([]);
  const location = useLocation();

  // Extract the email parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    // Show the toast on page load
    setShowToast(true);
    setToastMessage(`OTP has been sent to ${email}, verify your email to continue.`);

    // Hide the toast after 5 seconds
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    // Timer for OTP resend
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsResendEnabled(true);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(toastTimeout);
    };
  }, [email, timeLeft]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit OTP.');
    } else {
      setError('');
      setLoading(true); // Set loading state to true

      try {
        const response = await fetch('https://tradesphere-backend.onrender.com/api/users/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otpValue,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('OTP verified successfully:', result);

          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(result.user));

          // Show success message
          setToastMessage('Email verified successfully!');
          setShowToast(true);

          // Hide the toast after 5 seconds
          setTimeout(() => {
            setShowToast(false);
          }, 5000);

          // Redirect or handle success (e.g., navigate to another page)
        } else {
          console.error('OTP verification failed:', result);
          setError(result.message || 'OTP verification failed.');
        }
      } catch (err) {
        console.error('An error occurred:', err);
        setError('An error occurred while verifying OTP.');
      } finally {
        setLoading(false); // Set loading state to false
      }

      setOtp(new Array(6).fill(''));
      inputRefs.current[0].focus();
    }
  };

  const handleResendOtp = async () => {
    setLoading(true); // Set loading state to true
    setOtp(new Array(6).fill(''));
    setTimeLeft(60);
    setIsResendEnabled(false);

    try {
      // Call your API to resend OTP
      console.log('OTP Resent');
    } catch (err) {
      console.error('An error occurred while resending OTP:', err);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4 space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 text-sm">
            Resend OTP in: {timeLeft} seconds
          </p>
          <button
            onClick={handleResendOtp}
            disabled={!isResendEnabled || loading} // Disable button when loading or resend is not enabled
            className={`text-blue-500 text-sm font-bold ${(!isResendEnabled || loading) ? 'opacity-50' : 'hover:text-blue-700'}`}
          >
            {loading ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast className="fixed bottom-4 right-4 bg-blue-300 text-white rounded-lg shadow-lg p-4">
          <div className="text-sm font-medium">
            {toastMessage}
          </div>
        </Toast>
      )}
    </div>
  );
};

export default OtpPage;
