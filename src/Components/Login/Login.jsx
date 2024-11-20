import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'; // Import axios
import login from '../Image/login.jpeg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the login request
            const res = await axios.post('http://localhost:8000/api/v1/user/log-in', {
                email,
                password,
            });

            if (res.data && res.data.token) {
                  // Save the email/user_id in local storage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('token', res.data.token);
                // console.log("success ke upar");
                toast.success('Login successful');
                navigate('/twitterauth'); // Redirect to OTP page if login is successful
            } else {
                console.log("success ke neche");
                toast.error(res.data.message); // Show error message from server
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Something went wrong, please try again');
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90 flex justify-center items-center'>
            <img className='absolute inset-0 w-full h-full object-cover mix-blend-overlay' src={login} alt="login-background" />

            <div className='flex justify-center items-center h-full z-10'>
                <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg shadow-lg'>
                    <h2 className='text-4xl font-bold text-center py-4'>Mano Vision</h2>

                    <div className='flex flex-col mb-4'>
                        <label className='mb-1'>Email</label>
                        <input 
                            className='border p-2 bg-gray-100 rounded' 
                            type="text"  
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label className='mb-1'>Password</label>
                        <input 
                            className='border p-2 bg-gray-100 rounded' 
                            type="password"  
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className='w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded'>
                        Sign In
                    </button>
                    <div className='flex items-center mt-4'>
                        <input className='mr-2' type="checkbox" />
                        <span>Remember Me</span>
                    </div>
                    <p className='text-center mt-6'>
                        Not a member?{' '}
                        <span className="text-indigo-600 hover:underline cursor-pointer">
                            <Link to='/signup'>Signup here</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
