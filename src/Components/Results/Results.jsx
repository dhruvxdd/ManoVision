import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import resimg from '../Image/resultimg.jpeg';
import profileImage from '../Image/userlogo.jpeg'; // Import profile image for navbar
import './Celebrations.css' // Separate CSS file for additional styling
import axios from 'axios';
import { toast } from "react-toastify";

const Results = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check if token exists
    if (!token) {
      toast.error("You need to log in first!");
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
        const userEmail = localStorage.getItem('userEmail');
        const fetchUserProfileImage = async () => {
            try {
                
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
        

        // Fetch mental health score from the API
        axios.post('http://localhost:8000/api/v1/user/result', { email: userEmail })
            .then(response => {
                const result = response.data.result; // Assuming API response contains { result: floatValue }
                setScore(result);

                // Update box styling based on score
                // if (result >= 60) {
                //     setBoxStyle({
                //         backgroundColor: 'lightgreen',
                //         borderColor: 'darkgreen',
                //         borderWidth: '2px',
                //         borderStyle: 'solid',
                //     });
                // } else if (result >= 40) {
                //     setBoxStyle({
                //         backgroundColor: 'lightyellow',
                //         borderColor: 'darkyellow',
                //         borderWidth: '2px',
                //         borderStyle: 'solid',
                //     });
                // } else {
                //     setBoxStyle({
                //         backgroundColor: 'lightcoral',
                //         borderColor: 'darkred',
                //         borderWidth: '2px',
                //         borderStyle: 'solid',
                //     });
                // }
            })
            .catch(error => {
                console.error('Error fetching the result:', error);
            });

        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        const maxConfettis = 150;
        const particles = [];
        const possibleColors = [
            "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue",
            "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"
        ];

        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function confettiParticle() {
            this.x = Math.random() * W;
            this.y = Math.random() * H - H;
            this.r = randomFromTo(11, 33);
            this.d = Math.random() * maxConfettis + 11;
            this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
            this.tilt = Math.floor(Math.random() * 33) - 11;
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
            this.tiltAngle = 0;

            this.draw = function() {
                context.beginPath();
                context.lineWidth = this.r / 2;
                context.strokeStyle = this.color;
                context.moveTo(this.x + this.tilt + this.r / 3, this.y);
                context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
                return context.stroke();
            };
        }

        function Draw() {
            requestAnimationFrame(Draw);
            context.clearRect(0, 0, W, H);

            particles.forEach((particle, i) => {
                particle.draw();
                particle.tiltAngle += particle.tiltAngleIncremental;
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
                particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

                if (particle.y > H) {
                    particle.x = Math.random() * W;
                    particle.y = -30;
                    particle.tilt = Math.floor(Math.random() * 10) - 20;
                }
            });
        }

        window.addEventListener("resize", () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });

        for (let i = 0; i < maxConfettis; i++) {
            particles.push(new confettiParticle());
        }

        Draw();

        // Stop animation after 8 seconds
        const timer = setTimeout(() => {
            context.clearRect(0, 0, W, H);
            canvas.style.display = "none"; // Hide canvas after animation
        }, 12000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-zinc-900/90 flex justify-center items-center">
            <canvas id="canvas" className="absolute inset-0"></canvas>

            {/* // Navbar Start */}
            <header className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
                <button onClick={() => (window.location.href = '/headersidebar')} className="px-4 py-2 border rounded-full text-xl text-teal-700 bg-white">
                    Dashboard
                </button>
                <div className="flex-1 flex justify-center">
                    <h1 className="text-lg font-mono">Data Analysis Result</h1>
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
            {/* // Navbar End */}

            <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" src={resimg} alt="otp-background" />

            <div className="flex justify-center items-center h-full z-10">
                <div className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center py-4 text-black">Result</h2>
                    <p className="text-center mb-6">Your Mental Health Score is </p>

                    <p className="w-full border p-2 mb-4 bg-gray-200 rounded">
                    <p className="w-full border p-4 rounded text-center font-bold text-xl font-mono" >
                        {score !== null ? score : 'Loading...'}
                    </p> </p>

                    <button
                        className="w-full py-2 mb-4 bg-blue-600 hover:bg-blue-500 text-white rounded font-mono"
                        onClick={() => navigate("/chatbot")}
                    >
                        Chatbot Assistance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
