'use client'

import { useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Traveler. Photographer. Food lover.',
    requestsPosted: 15,
    requestsAccepted: 8
  })

  const [activeTab, setActiveTab] = useState('posted')

  const [postedRequests, setPostedRequests] = useState([
    { id: 1, title: 'Need a ride to the airport', date: '2023-05-15' },
    { id: 2, title: 'Looking for a study partner', date: '2023-05-10' },
    { id: 3, title: 'Help moving furniture', date: '2023-05-05' },
  ])

  const [acceptedRequests, setAcceptedRequests] = useState([
    { id: 1, title: 'Dog sitting for the weekend', date: '2023-05-12' },
    { id: 2, title: 'Volunteer for local food drive', date: '2023-05-08' },
  ])

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="/placeholder.svg?height=80&width=80"
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-sm mt-1">{user.bio}</p>
          </div>
        </div>
        
        <div className="flex justify-around py-4 border-t border-b">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.requestsPosted}</p>
            <p className="text-sm text-gray-600">Requests Posted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.requestsAccepted}</p>
            <p className="text-sm text-gray-600">Requests Accepted</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'posted'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('posted')}
            >
              Posted Requests
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'accepted'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('accepted')}
            >
              Accepted Requests
            </button>
          </div>

          <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
            {activeTab === 'posted'
              ? postedRequests.map((request) => (
                  <div key={request.id} className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">{request.title}</h3>
                    <p className="text-sm text-gray-600">{request.date}</p>
                  </div>
                ))
              : acceptedRequests.map((request) => (
                  <div key={request.id} className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">{request.title}</h3>
                    <p className="text-sm text-gray-600">{request.date}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}