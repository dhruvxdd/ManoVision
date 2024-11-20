// import { Parallax } from 'react-parallax';
// import One from '../Image/one.jpg'

// const ImageOne = () => (
//     <Parallax className='image' blur={0} bgImage={One} strength={800} bgImageStyle={{minHeight:"100vh"}}>
//     <div className='content'>
//         {/* <span className="img-txt bg-zinc-900/90 ">Your Mental Health Maters...</span> */}
//     </div>
// </Parallax>
// );

// export default ImageOne
import { Parallax } from 'react-parallax';
import V1Video from '../Image/v1.mov';

const ImageOne = () => (
    <Parallax strength={500}>
        <div className='video-container'>
            <video className="background-video" src={V1Video} autoPlay loop muted playsInline></video>
            <div className='content'>
                {/* <span className="img-txt bg-zinc-900/90">Your Mental Health Matters...</span> */}
            </div>
        </div>
    </Parallax>
);

export default ImageOne;
