import React from 'react';

function Home() {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={handleLogout} 
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center">Swappi</h1>
    </div>
  );
}

export default Home;