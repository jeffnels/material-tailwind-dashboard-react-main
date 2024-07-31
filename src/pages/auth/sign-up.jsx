import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import loginImg from '../../images/login-img.jpg';
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error message
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!formData.email || !formData.firstname || !formData.lastname || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading state to true

    const data = {
      ...formData,
      role: 'user', // Fixed role
    };

    try {
      const response = await fetch('https://tradesphere-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzE2NTUwMjQzLCJleHAiOjE3MTY1ODYyNDN9.MEaRX6BFluFiwTNsPqplTd2RYtvhpR3-XlnunvY784g'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Success:', result);

      // Save token to local storage
      localStorage.setItem('authToken', result.token);

      // Set success message
      setSuccessMessage('User registered successfully');
      navigate("/auth/sign-in");
      // Clear form data
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Reset states
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set network error message
      setLoading(false);
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError('');
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="flex h-[100vh]">
      <div className="w-[40%] h-full hidden lg:block relative" style={{ borderRadius: '3rem 0 0 3rem' }}>
        <img
          src={loginImg}
          className="h-full w-full object-cover"
          alt="Pattern"
          style={{ borderRadius: '0 3rem  3rem 0' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white bg-black bg-opacity-50 p-4 rounded-md" style={{ animation: "fadeIn 1s ease-in forwards" }}>
            <h1 className="text-3xl font-bold" style={{ animation: "fadeIn 1s ease-out .0s forwards" }}>Welcome to Tradespharehub</h1>
            <p className="text-lg mt-2" style={{ animation: "fadeIn 1s ease-in .0s  forwards" }}> <Link to="/auth/sign-in">Login</Link> or <Link to="/auth/sign-up">Register now</Link> </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="w-full lg:w-3/5 flex flex-col items-center justify-center rounded-3xl">
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your email
              </Typography>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                name="firstname"
                size="lg"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                name="lastname"
                size="lg"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                name="password"
                type="password"
                size="lg"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                name="confirmPassword"
                type="password"
                size="lg"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6" fullWidth type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register Now'}
            </Button>

            {error && (
              <Typography variant="paragraph" className="text-red-500 mt-4">
                {error}
              </Typography>
            )}

            

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Already have an account?
              <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
