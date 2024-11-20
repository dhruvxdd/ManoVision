import React from 'react';
import { Parallax } from 'react-parallax';
import V3Video from '../Image/v3.mov';

const Imgb = () => (
    <Parallax strength={500}>
        <div className='video-container'>
            <video className="background-video" src={V3Video} autoPlay loop muted playsInline></video>
            <div className='content'>
                {/* <span className="img-txt bg-zinc-900/90">Your Mental Health Matters...</span> */}
            </div>
        </div>
    </Parallax>
);

export default Imgb;
