// Suggestions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../Image/userlogo.jpeg';
import suggestionbg from '../Image/suggestionbg.jpeg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import s1 from '../Image/s1.jpeg';
import s2 from '../Image/s2.jpeg';
import s3 from '../Image/s3.jpeg';
import s4 from '../Image/s4.jpeg';
import s5 from '../Image/s5.jpeg';
import s6 from '../Image/s6.jpeg';

const Suggestions = () => {
  const cardData = [
    { image: s1, title: 'Nurture your passions', link: 'https://dralisonblock.com/discover-your-passion-and-improve-your-mental-health/#:~:text=You%20are%20more%20resilient%20because,in%20and%20lift%20you%20up.' },
    { image: s2, title: 'Connect and thrive', link: 'https://www.healthline.com/health-news/how-one-conversation-with-friends-per-day-can-help-your-mental-health#1' },
    { image: s3, title: 'Take Proper Rest', link: 'https://integrishealth.org/resources/on-your-health/2021/april/why-its-important-to-allow-yourself-to-rest#:~:text=About%2033%20percent%20of%20people,and%20even%20a%20better%20metabolism.' },
    { image: s4, title: 'Take Balanced Diet', link: 'https://www.sutterhealth.org/health/nutrition/eating-well-for-mental-health#:~:text=From%20a%20young%20age%2C%20we,improve%20concentration%20and%20attention%20span.' },
    { image: s5, title: 'Consult a Professional', link: 'https://www.chenmed.com/blog/prescribing-positivity-physicians-role-mental-health-support' },
    { image: s6, title: 'Do Regular Exercise', link: 'https://www.helpguide.org/wellness/fitness/the-mental-health-benefits-of-exercise' },
  ];
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists
        if (!token) {
          toast.error("You need to log in first!");
          navigate('/login'); // Redirect to login page if not logged in
          return;
        }
    const fetchUserProfileImage = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const response = await axios.post('http://localhost:8000/api/v1/user/details', {
                    email: userEmail,
                });
                const imageUrl = response.data.user.image_url;
                setProfileImageUrl(imageUrl);
            } else {
                console.error('User email not found in local storage.');
            }
        } catch (error) {
            console.error("Error fetching user's profile image:", error);
        }
    };

    fetchUserProfileImage();
}, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-auto pt-16"
      style={{ backgroundImage: `url(${suggestionbg})` }}
    >
      {/* Navbar */}
      <header className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
        <button onClick={() => (window.location.href = '/headersidebar')} className="px-4 py-2 border rounded-full text-xl text-teal-700 bg-white">
          Dashboard
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-mono">General Suggestions</h1>
        </div>
        <div className="flex items-center">
          <a href="/profile" className="mr-4">
            <img src={profileImageUrl || profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
          </a>
          <button
             onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userEmail');
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="absolute inset-0 bg-zinc-900/70"></div> {/* Overlay */}
      
      <div className="relative z-10 flex flex-wrap justify-center gap-8 p-8 mt-20">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-center">{card.title}</h2>
              <a href={card.link} className="text-indigo-600 hover:underline font-medium text-center block">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
