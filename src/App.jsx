import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ImageOne from './Components/ImageOne/ImageOne';
import TextBox from './Components/TextBox/TextBox';
import ImageTwo from './Components/ImageTwo/ImageTwo';
import ImageThree from './Components/ImageThree/ImageThree';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Testimonials from './Components/Testimonals/Testimonals';
import OtpVerification from './Components/OtpVerification/OtpVerification';
import Questions from './Components/Questions/Questions';
import { Loading } from './Components/Loading/Loading';
import HeaderSidebar from './Components/Headersidebar/Headersidebar';
import Results from './Components/Results/Results';
import Suggestions from './Components/Suggestions/Suggestions';
import Twitterauth from './Components/Twitterauth/Twitterauth';
import Imgb from './Components/Imgb/Imgb';
import TextBox2 from './Components/Textbox2/Textbox2';
import TextBox3 from './Components/TextBox3/TextBox3';
import Demo from './Components/Demo/Demo'
import Chatbot from './Components/Chatbot/Chatbot'
import Userprofile from './Components/Userprofile/Userprofile';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <ImageOne />
        <TextBox />
        <ImageTwo />
        <TextBox2/>
        <Imgb/>
        <TextBox3/>
        <ImageThree />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/testimonals",
    element: (
      <>
        <Navbar />
        <Testimonials />
      </>
    ),
  },
  {
    path: "/otp",
    element: (
      <>
        <Navbar />
        <OtpVerification />
      </>
    ),
  },
  {
    path: "/questions",
    element: (
      <>
        <Navbar />
        <Questions />
      </>
    ),
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/headersidebar",
    element: <HeaderSidebar />,
  },
  {
    path: "/result",
    element: (
      <>
        <Results/>
      </>
    ),
  },
  {
    path: "/demo",
    element: (
      <>
        <Navbar/>
        <Demo/>
      </>
    ),
  },
  {
    path: "/suggestions",
    element: (
      <>
        <Suggestions/>
      </>
    ),
  },
  {
    path: "/twitterauth",
    element: (
      <>
        <Navbar/>
        <Twitterauth/>
      </>
    ),
  },
  {
    path:"/chatbot",
    element:(
      <>
      <Chatbot/>
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Userprofile/>
      </>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
