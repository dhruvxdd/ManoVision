import React, { useState, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import otpimg from '../Image/otp.jpeg';

const OtpVerification = () => {
    const [user_id, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpSent, setOtpSent] = useState(false);
    const otpInputRefs = useRef([]);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendOtp = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/user/send-otp', { user_id });
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleOtpChange = (value, index) => {
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < otp.length - 1) {
                otpInputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                otpInputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOtpSubmit = async () => {
        const otpCode = otp.join('');
        try {
            await axios.post('http://localhost:8000/api/v1/user/verify-otp', { user_id, otp: otpCode });
            toast.success("OTP verified");
            navigate("/signup", { state: { verifiedEmail: user_id } });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="relative w-full h-screen bg-zinc-900/90 flex justify-center items-center">
            <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" src={otpimg} alt="otp-background" />

            <div className="flex justify-center items-center h-full z-10">
                <div className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center py-4">OTP Verification</h2>
                    <p className="text-center mb-6">Enter Gmail ID to verify</p>
                    
                    <input
                        className="w-full border p-2 mb-4 bg-gray-100 rounded"
                        type="email"
                        placeholder="Enter Gmail linked to Twitter account"
                        value={user_id}
                        onChange={handleEmailChange}
                    />

                    <button
                        className="w-full py-2 mb-4 bg-blue-600 hover:bg-blue-500 text-white rounded"
                        onClick={handleSendOtp}
                        disabled={!user_id}
                    >
                        Send OTP
                    </button>

                    {otpSent && (
                        <>
                            <div className="flex justify-between space-x-2 mb-4">
                                {otp.map((_, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (otpInputRefs.current[index] = el)}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center border bg-gray-100 rounded"
                                        value={otp[index]}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>

                            <button
                                className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                                onClick={handleOtpSubmit}
                            >
                                Verify Now
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
