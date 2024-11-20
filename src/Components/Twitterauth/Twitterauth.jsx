import React, { useEffect, useState } from 'react';
import axios from 'axios';
import twbg from '../Image/twitterbg.jpeg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Twitterauth = () => {
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not logged in. Please log in first.');
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  const handleVerify = async () => {
    if (!username.trim()) {
      alert('Please enter a valid username.');
      return;
    }

    const userEmail = localStorage.getItem('userEmail'); // Retrieve the email from local storage
    if (!userEmail) {
      alert('User email not found in local storage.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Call the first API to add Twitter username
      const api1Response = await axios.put(
        'http://localhost:8000/api/v1/user/add-twitter-username',
        {
          email: userEmail, // Pass userEmail from localStorage
          user_id: username,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Explicitly set the Content-Type
          },
        }
      );
      console.log('API 1 Response:', api1Response.data);

      // Step 2: Call the second API to fetch user info
      const api2Response = await axios.post(
        'http://localhost:8000/api/v1/twitter/userapi_info',
        {
          username,
          email: userEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Explicitly set JSON Content-Type
          },
        }
      );
      console.log('API 2 Response:', api2Response.data);

      toast.success('Twitter ID Successfully Verified');
      navigate('/questions');
    } catch (err) {
      console.error('Error during API calls:', err);
      setError('An error occurred while verifying. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/60 flex justify-center items-center">
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        src={twbg}
        alt="otp-background"
      />

      <div className="flex justify-center items-center h-full z-10">
        <div className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center py-4">Twitter Authentication</h2>
          <p className="text-center mb-6">
            Please click on this button and grant your Twitter data access for precise analysis 😊
          </p>

          <div className="flex flex-col mb-4">
            <label className="mb-1">Enter username of your Twitter ID</label>
            <input
              className="border p-2 bg-gray-100 rounded"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full py-2 mb-4 bg-blue-600 hover:bg-blue-500 text-white rounded"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Now'}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Twitterauth;
