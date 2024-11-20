import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import signup from '../Image/signup.jpeg';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.verifiedEmail) {
            setEmail(location.state.verifiedEmail);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/sign-up', {
                name,
                email,
                password,
                age,
                gender
               
            });
    
            if (res.data && res.data.message) {
                toast.success('Registration successful');
                navigate("/login");
            } else {
                toast.error(res.data?.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('Something went wrong, please try again');
        }
    };
    
    return (
        <div className="relative w-full h-screen bg-zinc-900/90 flex justify-center items-center">
            <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" src={signup} alt="signup-background" />
            <div className="flex justify-center items-center h-full z-10">
                <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center py-1">Sign Up</h2>

                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Name</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* <div className="flex flex-col mb-2">
                        <label className="mb-1">User ID (Verified Email)</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="text"
                            value={user_id}
                            readOnly
                        />
                    </div> */}
                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Email (Verified Email)</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="text"
                            value={email}
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Age</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="number"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Gender</label>
                        <select
                            className="border p-1 bg-gray-100 rounded"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Create Password</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="password"
                            placeholder="Enter a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="mb-1">Confirm Password</label>
                        <input
                            className="border p-1 bg-gray-100 rounded"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded" type="submit">
                        Sign Up
                    </button>

                    <p className="text-center mt-4 text-gray-500">
                        Already have an account? <Link to="/login" className="text-indigo-600">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
