import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import RequestCard from './RequestCard'; 
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
    const title = event.target.title.value; 
    const type = event.target.type.value; 
    const reward = event.target.reward.value; 
    const description = event.target.description.value; 
    const additionalField1 = event.target.additionalField1.value; 
    const additionalField2 = event.target.additionalField2.value; 

    const newRequest = { title, type, reward, description, additionalField1, additionalField2 }; 

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
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Swappi</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Swappi</h2>
          <p className="text-xl text-gray-600">
            Get help with your assignments and projects, or offer your skills to help others.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Post a New Request</h3>
          <form onSubmit={handlePostRequest} className="bg-white p-6 rounded-lg shadow-md">
            <input
              name="title"
              type="text"
              placeholder="Request Title"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Describe your request..."
              className="w-full p-2 mb-4 border rounded"
              rows="4"
              required
            ></textarea>
            <div className="flex space-x-4 mb-4">
              <input
                name="type"
                type="text"
                placeholder="Type (e.g., Assignment, Project)"
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                name="reward"
                type="text"
                placeholder="Reward (e.g., Money, Help with another task)"
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
              Post Request
            </button>
            {postSuccess && <p className="text-green-500">Request posted successfully!</p>} 
          </form>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Existing Requests</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShowAllRequests}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {showAllRequests ? 'Show Less' : 'Show All'}
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedRequests.map((request) => (
              <RequestCard key={request.id} request={request} onClick={() => handleCardClick(request.id)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}