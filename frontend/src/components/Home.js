// frontend/src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/login', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/requests');
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchUserInfo();
    fetchRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handlePostRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRequest = Object.fromEntries(formData);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/request', newRequest, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        setRequests([response.data, ...requests]); // Immediately add new request to top
        setPostSuccess(true);
        setTimeout(() => setPostSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/auth/request/${id}`);
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const displayedRequests = requests.slice(0, showAllRequests ? requests.length : 6);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white w-full py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Swappi</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">{userName}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Post Request Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Post a New Request</h2>
          <form onSubmit={handlePostRequest} className="space-y-4">
            <input name="title" placeholder="Request Title" required className="w-full p-2 border rounded-md" />
            <input name="type" placeholder="Type" required className="w-full p-2 border rounded-md" />
            <input name="reward" placeholder="Reward" required className="w-full p-2 border rounded-md" />
            <textarea name="description" placeholder="Description" rows="4" required className="w-full p-2 border rounded-md"></textarea>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
              Post Request
            </button>
          </form>
          {postSuccess && (
            <p className="mt-4 text-green-600 text-center bg-green-100 p-2 rounded-md">
              Request posted successfully!
            </p>
          )}
        </div>

        {/* Existing Requests */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">Existing Requests</h2>
            <button onClick={() => setShowAllRequests(!showAllRequests)} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
              {showAllRequests ? 'Show Less' : 'Show All'}
            </button>
          </div>

          <div className="space-y-4">
            {displayedRequests.map((request) => (
              <div key={request._id} className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-2 text-indigo-800">{request.title}</h3>
                <p className="text-gray-700 mb-2">{request.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Type: {request.type}</span>
                  <span>Reward: {request.reward}</span>
                </div>
                <button onClick={() => handleDeleteRequest(request._id)} className="mt-2 text-red-500 hover:text-red-700 transition">
                  Delete Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
