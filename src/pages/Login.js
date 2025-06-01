import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

    const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  setMessage('');
    if (isSignup) {
      if (!formData.username) {
        setMessage('Username is required for signup');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match. Please check again.');
        return;
      }
    }

    if (!formData.email || !formData.password) {
      setMessage('Please fill all required fields');
      return;
    }

     const endpoint = isSignup ? '/auth/signup' : '/auth/login';
     try{
         
           const res = await API.post(`${endpoint}`, formData);
            if (isSignup) {
        setMessage(res.data.message || 'Signup successful');
      } else {
        setMessage('Login successful');
        localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
      }
         } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
    // Clear any previous error
};
   
    
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? 'IARI Sign Up' : 'IARI Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {message && (
            <p className="text-red-500 text-center">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup)
              setMessage('');
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
