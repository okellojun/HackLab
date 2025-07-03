import React from 'react';
import { TrendingUp, Users, DollarSign, Trophy, Target, Calendar, Star, Code } from 'lucide-react';

export const Analytics: React.FC = () => {
  const stats = [
    { label: 'Total Problems Posted', value: '47', change: '+12%', icon: Code, color: 'bg-blue-500' },
    { label: 'Active Hackers', value: '1,247', change: '+8%', icon: Users, color: 'bg-green-500' },
    { label: 'Hackathons Hosted', value: '15', change: '+25%', icon: Trophy, color: 'bg-purple-500' },
    { label: 'Total Bounty Paid', value: '$78,450', change: '+18%', icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const recentActivity = [
    { action: 'Problem solved', title: 'API Rate Limiting', hacker: 'Sarah Chen', bounty: '$1,500', time: '2 hours ago' },
    { action: 'New submission', title: 'Data Visualization', hacker: 'Alex Rodriguez', bounty: '$2,500', time: '4 hours ago' },
    { action: 'Hackathon winner', title: 'AI Innovation Challenge', hacker: 'Team ByteForce', bounty: '$5,000', time: '1 day ago' },
    { action: 'Problem posted', title: 'Mobile Optimization', hacker: 'Internal', bounty: '$2,000', time: '2 days ago' }
  ];

  const topHackers = [
    { name: 'Sarah Chen', solved: 15, earnings: '$8,500', rating: 4.9 },
    { name: 'Alex Rodriguez', solved: 12, earnings: '$6,200', rating: 4.8 },
    { name: 'Mike Johnson', solved: 10, earnings: '$5,800', rating: 4.7 },
    { name: 'Lisa Wang', solved: 8, earnings: '$4,500', rating: 4.6 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your hackathon performance and community engagement</p>
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
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
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
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}: {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.hacker} • {activity.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">
                        {activity.bounty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hackers */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Hackers</h3>
          <div className="space-y-4">
            {topHackers.map((hacker, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{hacker.name}</p>
                      <p className="text-xs text-gray-500">
                        {hacker.solved} problems solved
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">
                        {hacker.earnings}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">{hacker.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-64 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <p className="text-gray-600">Performance chart visualization would go here</p>
            <p className="text-sm text-gray-500">Integration with charting library like Chart.js or D3.js</p>
          </div>
        </div>
      </div>
    </div>
  );
};