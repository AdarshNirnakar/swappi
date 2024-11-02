import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/requests');
        const data = response.data;
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const toggleShowAllRequests = () => {
    setShowAllRequests(!showAllRequests);
  };

  const handlePostRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRequest = Object.fromEntries(formData);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/request', newRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const data = response.data;
        setRequests((prevRequests) => [...prevRequests, data]);
        setPostSuccess(true);
        setTimeout(() => setPostSuccess(false), 3000);
      } else {
        console.error("Error posting request:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  const displayedRequests = requests.slice(0, showAllRequests ? requests.length : 6);

  const handleCardClick = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Swappi</h1>
            <div className="relative flex-1 max-w-xl">
              <input 
                type="search"
                placeholder="Search for requests"
                className="w-full bg-white text-black pl-4 pr-10 py-1.5 rounded-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
            </button>
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            <div onClick={() => navigate('/profile')} className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
              <span className="text-gray-600">U</span>
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-4 py-4">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>My Requests</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Saved Requests</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help Center</span>
            </a>
            <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              Show More
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold mb-4">Post a New Request</h3>
            <form onSubmit={handlePostRequest}>
              <div className="space-y-4">
                <input name="title" placeholder="Request Title" required className="w-full p-2 border border-gray-300 rounded-md" />
                <input name="type" placeholder="Type (e.g., Assignment, Project)" required className="w-full p-2 border border-gray-300 rounded-md" />
                <input name="reward" placeholder="Reward" required className="w-full p-2 border border-gray-300 rounded-md" />
                <textarea
                  name="description"
                  placeholder="Describe your request in detail..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  required
                ></textarea>
                <input name="additionalField1" placeholder="Additional Field 1" className="w-full p-2 border border-gray-300 rounded-md" />
                <input name="additionalField2" placeholder="Additional Field 2" className="w-full p-2 border border-gray-300 rounded-md" />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">Post Request</button>
              </div>
            </form>
            {postSuccess && (
              <p className="mt-4 text-green-500 text-center bg-green-100 p-2 rounded-md">
                Request posted successfully!
              </p>
            )}
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Existing Requests</h3>
            <button onClick={toggleShowAllRequests} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              {showAllRequests ? 'Show Less' : 'Show All'}
            </button>
          </div>

          <div className="space-y-4">
            {displayedRequests.map((request) => (
              <div key={request.id} className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick(request.id)}>
                <h4 className="text-lg font-semibold mb-2">{request.title}</h4>
                <p className="text-gray-600 mb-2">{request.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Type: {request.type}</span>
                  <span>Reward: {request.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">John posted a new request</li>
              <li className="text-sm text-gray-600">Sarah completed a task</li>
              <li className="text-sm text-gray-600">New reward added: $50 Amazon gift card</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Top Helpers</h3>
            <div className="space-y-3">
              {['Alice', 'Bob', 'Charlie', 'David'].map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">{name[0]}</span>
                  </div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

