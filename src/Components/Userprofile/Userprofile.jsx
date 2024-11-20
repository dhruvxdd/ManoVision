import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileBackground from '../Image/profileBackground.jpeg';
import userImage from '../Image/userprofileimg.jpeg'; // Placeholder if no user image is available.
import profileImage from "../Image/userlogo.jpeg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Userprofile = () => {
    const navigate=useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [userDetails, setUserDetails] = useState({
        user_id: '',
        email: '',
        age: '',
        gender: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check if token exists
    if (!token) {
      toast.error("You need to log in first!");
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
        const fetchUserProfile = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (userEmail) {
                    const response = await axios.post('http://localhost:8000/api/v1/user/details', {
                        email: userEmail,
                    });
                    const { user_id, email, age, gender, image_url } = response.data.user;
                    setUserDetails({ user_id, email, age, gender });
                    if (image_url) {
                        setProfileImageUrl(image_url);
                    }
                } else {
                    console.error('User email not found in localStorage.');
                }
            } catch (error) {
                console.error("Error fetching user's profile details:", error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div
            className="relative w-full h-screen bg-cover bg-fixed"
            style={{ backgroundImage: `url(${profileBackground})` }}
        >
            {/* Transparent overlay */}
            <div className="absolute inset-0 bg-zinc-900/70"></div>

            {/* Navbar */}
            <header className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
                <button
                    onClick={() => (window.location.href = '/headersidebar')}
                    className="px-4 py-2 border rounded-full text-xl text-teal-700 bg-white"
                >
                    Dashboard
                </button>
                <div className="flex-1 flex justify-center">
                    <h1 className="text-lg font-mono">User Profile</h1>
                </div>
                <div className="flex items-center">
                    <a href="/profile" className="mr-4">
                        <img
                            src={profileImageUrl || profileImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                    </a>
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Profile Card */}
            <div className="relative flex justify-center items-center h-full pt-20">
                <div className="bg-white shadow-lg shadow-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full mx-4">
                    {/* Profile Image */}
                    <div className="w-full h-96 md:h-auto">
                        <img
                            className="w-full h-full object-cover rounded-l-lg"
                            src={userImage || profileImageUrl }
                            alt="User Profile"
                        />
                    </div>

                    {/* User Details */}
                    <div className="p-8 flex flex-col justify-around">
                        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
                        <div className="space-y-4">
                            {/* Username */}
                            <div className="flex items-center">
                                <label className="w-32 font-medium">Username:</label>
                                <input
                                    className="flex-1 p-2 border rounded"
                                    type="text"
                                    value={userDetails.user_id}
                                    readOnly
                                />
                            </div>

                            {/* Email */}
                            <div className="flex items-center">
                                <label className="w-32 font-medium">Email:</label>
                                <input
                                    className="flex-1 p-2 border rounded"
                                    type="email"
                                    value={userDetails.email}
                                    readOnly
                                />
                            </div>

                            {/* Age */}
                            <div className="flex items-center">
                                <label className="w-32 font-medium">Age:</label>
                                <input
                                    className="flex-1 p-2 border rounded"
                                    type="text"
                                    value={userDetails.age}
                                    readOnly
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex items-center">
                                <label className="w-32 font-medium">Gender:</label>
                                <input
                                    className="flex-1 p-2 border rounded"
                                    type="text"
                                    value={userDetails.gender}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userprofile;
