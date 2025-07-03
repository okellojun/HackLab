import React, { useState } from 'react';
import { Star, Trophy, Code, DollarSign, Calendar, Edit, Github, Linkedin, Globe } from 'lucide-react';

export const HackerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: 'Alex Rodriguez',
    title: 'Full Stack Developer',
    location: 'San Francisco, CA',
    joinDate: '2024-03-15',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.8,
    problemsSolved: 12,
    hackathonsWon: 3,
    totalEarnings: 2340,
    bio: 'Passionate full-stack developer with 5 years of experience in React, Node.js, and cloud technologies. Love solving complex problems and building scalable applications.',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'TypeScript'],
    achievements: [
      { title: 'AI Innovation Challenge Winner', date: '2024-12-15', prize: '$5,000' },
      { title: 'Mobile App Excellence Award', date: '2024-11-20', prize: '$2,500' },
      { title: 'Best API Design', date: '2024-10-10', prize: '$1,500' }
    ],
    recentProblems: [
      { title: 'API Rate Limiting Implementation', status: 'Completed', bounty: '$1,500', company: 'TechCorp' },
      { title: 'Real-time Chat System', status: 'In Progress', bounty: '$2,000', company: 'MessageFlow' },
      { title: 'Database Query Optimization', status: 'Completed', bounty: '$1,800', company: 'DataPro' }
    ],
    social: {
      github: 'https://github.com/alexrodriguez',
      linkedin: 'https://linkedin.com/in/alexrodriguez',
      website: 'https://alexrodriguez.dev'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-purple-100">{profile.title}</p>
                <p className="text-purple-100 text-sm">{profile.location}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{profile.rating}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{profile.problemsSolved}</p>
              <p className="text-sm text-gray-500">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{profile.hackathonsWon}</p>
              <p className="text-sm text-gray-500">Hackathons Won</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${profile.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Problems */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Problems</h3>
                <div className="space-y-3">
                  {profile.recentProblems.map((problem, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{problem.title}</h4>
                          <p className="text-sm text-gray-500">{problem.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">{problem.bounty}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            problem.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {problem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
                <div className="space-y-2">
                  <a href={profile.social.github} className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a href={profile.social.linkedin} className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a href={profile.social.website} className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                    <Globe className="w-5 h-5" />
                    <span>Website</span>
                  </a>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Achievements</h3>
                <div className="space-y-3">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <Trophy className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                          <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                          <p className="text-sm font-semibold text-green-600">{achievement.prize}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Member since {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={profile.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      defaultValue={profile.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue={profile.bio}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    defaultValue={profile.skills.join(', ')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="React, Node.js, Python, etc."
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Save Changes
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