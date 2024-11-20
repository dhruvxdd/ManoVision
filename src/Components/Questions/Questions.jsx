import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../Image/background.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';

const Questions = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState(Array(9).fill(null)); // Array to store responses for 9 questions
    const userEmail = localStorage.getItem('userEmail'); // Fetch userEmail from localStorage

    // Check for token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Not logged in. Please log in to continue.');
            navigate('/login'); // Redirect to login page
        }
    }, [navigate]);

    // Mapping options to scores
    const scoreMapping = {
        'Not at all': 0,
        'Several days': 1,
        'More than half the days': 2,
        'Nearly every day': 3,
    };

    const handleOptionChange = (index, score) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = score; // Set the score for the selected question
        setResponses(updatedResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that all questions have been answered
        if (responses.includes(null)) {
            toast.error('Please answer all the questions.');
            return;
        }

        // Prepare the data payload
        const data = {
            email: userEmail,
            q1: responses[0],
            q2: responses[1],
            q3: responses[2],
            q4: responses[3],
            q5: responses[4],
            q6: responses[5],
            q7: responses[6],
            q8: responses[7],
            q9: responses[8],
        };

        try {
            // Send the data to the API
            console.log(data);
            const response = await axios.post('http://localhost:8000/api/v1/user/form', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('API Response:', response.data);
            toast.success('Your responses have been submitted successfully.');
            navigate('/loading');
        } catch (error) {
            console.error('Error submitting responses:', error);
            toast.error('An error occurred while submitting your responses. Please try again.');
        }
    };

    return (
        <div
            className='relative w-full min-h-screen bg-zinc-900/90 bg-cover bg-fixed'
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className='flex justify-center items-start bg-zinc-900/70 pt-20 z-10'>
                <form
                    className='max-w-[500px] w-full mx-auto bg-white p-8 rounded-lg shadow-xl bg-zinc-700/80'
                    onSubmit={handleSubmit}
                >
                    <h2 className='text-4xl font-bold text-center py-4 text-white'>मनो-Vision Gauge (MVG)</h2>

                    <div className='space-y-6 text-zinc-200'>
                        {[
                            'Little interest or pleasure in doing things',
                            'Feeling down, depressed, or hopeless',
                            'Trouble falling or staying asleep, or sleeping too much',
                            'Feeling tired or having little energy',
                            'Poor appetite or overeating',
                            'Feeling bad about oneself or feeling like a failure',
                            'Trouble concentrating on things',
                            'Moving or speaking slowly or being fidgety/restless',
                            'Thoughts of being better off dead or self-harm',
                        ].map((question, index) => (
                            <div key={index}>
                                <label className='block mb-2 text-xl'>{`${index + 1}. ${question}`}</label>
                                <div className='flex space-x-4'>
                                    {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'].map(
                                        (option) => (
                                            <div key={option} className='flex items-center'>
                                                <input
                                                    type='radio'
                                                    id={`question-${index}-${option}`}
                                                    name={`question-${index}`}
                                                    className='mr-2'
                                                    onChange={() =>
                                                        handleOptionChange(index, scoreMapping[option])
                                                    }
                                                />
                                                <label
                                                    htmlFor={`question-${index}-${option}`}
                                                    className='text-sm'
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}

                        <button
                            type='submit'
                            className='w-full py-3 mt-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded'
                        >
                            Submit for Analysis
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Questions;
