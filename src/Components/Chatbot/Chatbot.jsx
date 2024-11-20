import React, { useState, useEffect } from 'react';
import axios from 'axios';
import chatbotImage from '../Image/chatbotbg.jpeg';
import bgimg from '../Image/chatbotBack.jpeg';
import profileImage from '../Image/userlogo.jpeg';
import { toast } from "react-toastify"; 
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
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

        const fetchMentalHealthScore = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (userEmail) {
                    const response = await axios.post('http://localhost:8000/api/v1/user/result', { email: userEmail });
                    const score = response.data.result;

                    let advice = '';
                    if (score >= 0 && score <= 39) {
                        advice = "your mental health status is low and please consult a professional as soon as possible.";
                    } else if (score >= 40 && score <= 59) {
                        advice = "your mental health status is neither too low nor too high, but it can be improved if you pay attention to the matter seriously.";
                    } else if (score >= 60 && score <= 100) {
                        advice = "your mental health status is quite perfect keep maintaining it, but never forget there is always a scope for improvement.";
                    }

                    setMessages([
                        { type: 'bot', text: "Hey, my name is Mady, I am your Mental Health assistance bot." },
                        { type: 'bot', text: `I got to know that your mental health score is ${score}%. According to research, ${advice}` },
                        { type: 'bot', text: "Is there anything else I can help you with?" },
                    ]);
                } else {
                    console.error('User email not found in local storage.');
                }
            } catch (error) {
                console.error("Error fetching mental health score:", error);
                setMessages([
                    { type: 'bot', text: "Hey, my name is Mady, I am your Mental Health assistance bot." },
                    { type: 'bot', text: "Sorry, I couldn't fetch your mental health score right now. Please try again later." },
                    { type: 'bot', text: "Is there anything else I can help you with?" },
                ]);
            }
        };

        fetchMentalHealthScore();
    }, []);

    const handleSendMessage = async (userMessage) => {
        const newMessages = [...messages, { type: 'user', text: userMessage }];
        setMessages(newMessages);
        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/twitter/chatbot', { message: userMessage, session_id: null});
                const botResponse = response.data.response;

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'bot', text: botResponse },
                ]);
            } catch (error) {
                console.error("Error fetching response:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'bot', text: "Sorry, I couldn't fetch a response right now. Try again later." },
                ]);
            } finally {
                setLoading(false);
            }
        }, 3000); // Simulate typing delay
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-auto pt-16"
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <div className="relative w-full h-screen bg-zinc-900/70">
                <header className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
                    <button onClick={() => (window.location.href = '/headersidebar')} className="px-4 py-2 border rounded-full text-xl text-teal-700 bg-white">
                        Dashboard
                    </button>
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-lg font-mono">Chatbot Assistance</h1>
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

                <div className="flex h-full justify-center items-center pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
                        <div className="w-full h-[550px] hidden md:block">
                            <img className="w-full h-full object-cover" src={chatbotImage} alt="Chatbot Background" />
                        </div>

                        <div className="p-4 flex flex-col justify-between bg-white rounded-r-lg">
                            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Chatbot Assistance</h2>
                            <div className="overflow-y-auto flex-grow p-4 bg-gray-100 rounded space-y-4" style={{ maxHeight: '400px' }}>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`relative p-3 font-mono text-white rounded-lg max-w-xs ${
                                            msg.type === 'user' ? 'bg-blue-600 ml-auto' : 'bg-purple-500 mr-auto'
                                        }`}
                                    >
                                        <span>{msg.text}</span>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="text-gray-600 font-mono animate-pulse">Mady is typing...</div>
                                )}
                            </div>
                            <div className="mt-4 flex">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="border p-2 flex-grow rounded-l"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                            handleSendMessage(e.target.value.trim());
                                            e.target.value = '';
                                        }
                                    }}
                                />
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r"
                                    onClick={() => {
                                        const input = document.querySelector('input[type="text"]');
                                        if (input.value.trim()) {
                                            handleSendMessage(input.value.trim());
                                            input.value = '';
                                        }
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
