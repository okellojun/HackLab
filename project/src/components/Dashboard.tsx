import React from 'react';
import { TrendingUp, Users, Trophy, DollarSign, Calendar, Star, Code, Target } from 'lucide-react';

interface DashboardProps {
  userRole: 'company' | 'hacker';
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const companyStats = [
    { label: 'Active Problems', value: '24', icon: Code, color: 'bg-blue-500' },
    { label: 'Total Hackers', value: '1,247', icon: Users, color: 'bg-green-500' },
    { label: 'Hackathons Hosted', value: '15', icon: Trophy, color: 'bg-purple-500' },
    { label: 'Bounty Paid', value: '$45,230', icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const hackerStats = [
    { label: 'Problems Solved', value: '12', icon: Target, color: 'bg-green-500' },
    { label: 'Reputation Score', value: '4.8', icon: Star, color: 'bg-yellow-500' },
    { label: 'Hackathons Won', value: '3', icon: Trophy, color: 'bg-purple-500' },
    { label: 'Earnings', value: '$2,340', icon: DollarSign, color: 'bg-blue-500' }
  ];

  const stats = userRole === 'company' ? companyStats : hackerStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userRole === 'company' ? 'TechCorp' : 'Alex'}! 👋
        </h1>
        <p className="text-gray-600">
          {userRole === 'company' 
            ? 'Here\'s an overview of your hackathon activities and problem-solving progress.'
            : 'Ready to tackle some exciting challenges? Here\'s your latest activity.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {userRole === 'company' ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New solution submitted for "API Rate Limiting"
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Hackathon "Mobile Innovation" started
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Problem "Data Visualization" posted
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Won 1st place in "AI Innovation Challenge"
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Submitted solution for "Database Optimization"
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Joined team for "Cybersecurity Challenge"
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  Global AI Hackathon
                </h4>
                <p className="text-xs text-gray-600">
                  Starting in 2 days • Prize: $10,000
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex-shrink-0">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  Blockchain Solutions
                </h4>
                <p className="text-xs text-gray-600">
                  Starting in 5 days • Prize: $5,000
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex-shrink-0">
                <Code className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  Mobile Innovation
                </h4>
                <p className="text-xs text-gray-600">
                  Starting in 1 week • Prize: $7,500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};