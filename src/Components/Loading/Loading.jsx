import React, { useEffect, useState } from "react";
import { ScatterBoxLoader } from "react-awesome-loaders";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for error notifications

export const Loading = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if the token is in localStorage
    if (!token) {
      toast.error('Not logged in. Please log in to continue.');
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    // Set a timer to hide the loader and navigate after 10 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      navigate("/headersidebar"); // Navigate after hiding the loader
    }, 10000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [navigate]);

  if (!visible) return null; // If timer completes, hide the loader

  return (
    <div className="flex justify-center items-center h-screen">
      <ScatterBoxLoader
        primaryColor={"#6366F1"}
        background={"#FFFFFF"}
        size={100} // Adjust size (larger value for bigger loader)
      />
    </div>
  );
};
