import { Parallax } from 'react-parallax';
import three from '../Image/three.jpg';

const ImageThree = () => (
    <Parallax
        className='relative h-screen'
        blur={0}
        bgImage={three}
        strength={100}
        bgImageStyle={{ objectFit: 'cover', height: '100vh', width: '100vw' }}
    >
        {/* Centered content */}
        <div className="flex justify-center items-center h-screen">
            <div className="bg-black bg-opacity-60 text-white rounded-lg p-6 max-w-lg text-center">
                <span className="font-mono text-lg md:text-2xl">
                    Trust the process and let's get started on the journey to a better you.
                </span>
            </div>
        </div>
    </Parallax>
);

export default ImageThree;
