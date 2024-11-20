// Testimonials.jsx
import React from 'react';
import testimonialBg from '../Image/testimonialBg.jpeg';
import user1 from '../Image/user1.jpg';
import user2 from '../Image/user2.png';
import user3 from '../Image/user3.webp';
import user4 from '../Image/user4.webp';
import user5 from '../Image/user5.jpg';
import user6 from '../Image/user6.webp';

const Testimonials = () => {
  const testimonialsData = [
    {
      image: user1,
      name: 'Hritik Roshan',
      position: 'Director of Adobe',
      description: 'Mano Vision offers an exceptional mental health analysis platform that provides accurate results and precise insights. Their dedicated research team brings trustworthy, science-backed analysis to every user.',
    },
    {
      image: user2,
      name: 'Shreya Ghosal',
      position: 'Director at KPMG Ltd',
      description: 'With Mano Vision, you receive thorough mental health insights that are both reliable and precise. Their expert research team ensures that every analysis is tailored to help you achieve a balanced mind.',
    },
    {
      image: user3,
      name: 'Vikrant Masey',
      position: 'Managing Director of JIIT Global',
      description: 'Mano Vision’s commitment to mental health is outstanding. Their data-driven approach and knowledgeable research team provide meaningful, accurate analysis.',
    },
    {
      image: user4,
      name: 'Punnet Superstar',
      position: 'Psychologist at MindCare',
      description: 'The Mano Vision platform’s high-precision analysis has greatly impressed me. Their team’s research quality guarantees valuable insights that make a true difference in mental health care.',
    },
    {
      image: user5,
      name: 'Nakul Dhal',
      position: 'Head of Wellness at HealthFirst',
      description: 'At Mano Vision, users experience dependable and accurate mental health assessments. The team’s dedication to research helps deliver relevant, meaningful insights every time.',
    },
    {
      image: user6,
      name: 'Chandrika Gera Dixit',
      position: 'CEO of Goli Vada Pav',
      description: 'With Mano Vision’s expert-backed analysis, users gain access to clear, scientifically-grounded mental health insights. The platform’s consistency and quality make it a standout choice.',
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-auto pt-16"
      style={{ backgroundImage: `url(${testimonialBg})` }}
    >
      <div className="absolute inset-0 bg-zinc-900/90"></div> {/* Overlay */}
      
      <div className="relative z-10 flex flex-wrap justify-center gap-8 p-8">
        <h2 className="text-4xl font-bold text-white mb-8 text-center w-full">Testimonials</h2>
        
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={testimonial.image} alt={testimonial.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4">{testimonial.description}</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
