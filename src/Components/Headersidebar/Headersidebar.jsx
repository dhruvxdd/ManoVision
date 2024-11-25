import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../Image/userlogo.jpeg";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import backgroundImg from "../Image/resultbg.jpeg";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Import toast for error notifications

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeaderSidebar = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();

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

    const fetchGraphData = async () => {
      try {
        if (!userEmail) {
          console.error("No userEmail found in local storage");
          return;
        }

        const response = await axios.post(
          "http://localhost:8000/api/v1/user/graph",
          { email: userEmail },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        // Debug API response
        console.log("API Response:", { dates: data.dates, scores: data.scores });

        const { dates, scores } = data;

        if (!Array.isArray(dates) || !Array.isArray(scores) || dates.length !== scores.length) {
          console.error("Invalid data format");
          return;
        }

        setChartData({
          labels: dates, // X-axis labels (dates)
          datasets: [
            {
              label: "Mental Health",
              data: scores, // Y-axis values (scores)
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 182, 193, 0.4)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [navigate]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score of Social Data",
        },
      },
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        position: "relative",
      }}
    >
      <div className="absolute inset-0 bg-zinc-900/50 opacity-40 z-0"></div>

      <header className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
        <button
          onClick={() => (window.location.href = "/headersidebar")}
          className="px-4 py-2 border rounded-full text-xl text-teal-700 bg-white"
        >
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

      <main className="flex mt-24">
        <div className="fixed left-0 top-28 w-64 h-[78vh] bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-4 ml-2 flex flex-col shadow-xl shadow-zinc-900/50">
          <h1 className="text-center font-mono">मनो Vision</h1>
          <Link to="/result" className="py-3 font-mono hover:bg-blue-50">
            Result
          </Link>
          
          <Link
            to="https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response"
            className="py-3 font-mono hover:bg-blue-50"
          >
            Seek Professional Help
          </Link>
          <Link to="/suggestions" className="py-3 font-mono hover:bg-blue-50">
            Suggestions
          </Link>
          <Link to="/" className="py-3 font-mono hover:bg-blue-50"  onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      }}>
            Home
          </Link>
        </div>

        <div className="flex-1 ml-72 p-5 flex items-center justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : chartData ? (
            <div className="w-full p-5 bg-white rounded-xl shadow-lg">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HeaderSidebar;
