import { Parallax } from 'react-parallax';
import V2Video from '../Image/v2.mov';
// import two from '../Image/two.jpg'

const ImageTwo = () => (
    <Parallax strength={500}>
        <div className='video-container'>
            <video className="background-video" src={V2Video} autoPlay loop muted playsInline></video>
            <div className='content'>
                {/* <span className="img-txt bg-zinc-900/90">Your Mental Health Matters...</span> */}
            </div>
        </div>
    </Parallax>
);

export default ImageTwo