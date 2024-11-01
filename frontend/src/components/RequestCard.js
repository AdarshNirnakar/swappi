import React from 'react';

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-2">{request.title}</h4>
      <p className="text-gray-600 mb-2">Type: {request.type}</p>
      <p className="mb-4">Reward: {request.reward}</p>
      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
        See Details
      </button>
    </div>
  );
};

export default RequestCard;