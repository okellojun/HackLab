import React, { useState } from 'react';
import { Calendar, Users, Trophy, Plus, Edit, Eye, Clock, MapPin } from 'lucide-react';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'Virtual' | 'In-person' | 'Hybrid';
  participants: number;
  maxParticipants: number;
  prize: number;
  status: 'Upcoming' | 'Active' | 'Completed';
  location?: string;
}

interface HackathonManagementProps {
  userRole: 'company' | 'hacker';
}

export const HackathonManagement: React.FC<HackathonManagementProps> = ({ userRole }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [hackathons] = useState<Hackathon[]>([
    {
      id: '1',
      title: 'AI Innovation Challenge',
      description: 'Build innovative AI solutions for real-world problems. Focus on practical applications that can make a difference.',
      startDate: '2025-02-01',
      endDate: '2025-02-03',
      type: 'Virtual',
      participants: 245,
      maxParticipants: 500,
      prize: 10000,
      status: 'Upcoming'
    },
    {
      id: '2',
      title: 'Blockchain Solutions Summit',
      description: 'Develop cutting-edge blockchain applications and smart contracts. Showcase your skills in decentralized technologies.',
      startDate: '2025-02-10',
      endDate: '2025-02-12',
      type: 'Hybrid',
      participants: 156,
      maxParticipants: 300,
      prize: 5000,
      status: 'Upcoming',
      location: 'San Francisco, CA'
    },
    {
      id: '3',
      title: 'Mobile Innovation Week',
      description: 'Create next-generation mobile applications with focus on user experience and performance optimization.',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      type: 'Virtual',
      participants: 189,
      maxParticipants: 400,
      prize: 7500,
      status: 'Completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Virtual': return 'bg-purple-100 text-purple-800';
      case 'In-person': return 'bg-orange-100 text-orange-800';
      case 'Hybrid': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'company' ? 'Hackathon Management' : 'Hackathons'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'company' 
              ? 'Create and manage hackathons to engage with the developer community'
              : 'Join exciting hackathons and compete for amazing prizes'
            }
          </p>
        </div>
        {userRole === 'company' && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Hackathon</span>
          </button>
        )}
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hackathon.status)}`}>
                    {hackathon.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(hackathon.type)}`}>
                    {hackathon.type}
                  </span>
                </div>
                {userRole === 'company' && (
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{hackathon.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{hackathon.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{hackathon.participants} / {hackathon.maxParticipants} participants</span>
                </div>
                {hackathon.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{hackathon.location}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-1 text-green-600">
                  <Trophy className="w-4 h-4" />
                  <span className="font-semibold">${hackathon.prize.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {userRole === 'hacker' && hackathon.status === 'Upcoming' && (
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      Join Hackathon
                    </button>
                  )}
                  {userRole === 'hacker' && hackathon.status === 'Active' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Hackathon Modal */}
      {showCreateForm && userRole === 'company' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Hackathon</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hackathon Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter hackathon title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe the hackathon theme, goals, and what you're looking for"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Virtual</option>
                      <option>In-person</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prize Pool ($)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Hackathon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};