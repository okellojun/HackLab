import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Trophy, DollarSign, Calendar, Star, Code, Target } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ComponentType<any> | string;
  color: string;
}

interface Activity {
  action: string;
  title: string;
  hacker: string;
  bounty: string;
  time: string;
}

interface Event {
  id: string;
  name: string;
  start_date: string;
  prize: string;
}

interface DashboardProps {
  userRole: 'company' | 'hacker';
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [companyStats, setCompanyStats] = useState<Stat[]>([]);
  const [hackerStats, setHackerStats] = useState<Stat[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();

        // Map icon strings to actual components
        const iconMap: { [key: string]: React.ComponentType<any> } = {
          Code,
          Users,
          Trophy,
          DollarSign,
          Target,
          Star,
          Calendar,
        };

        const mapStats = (stats: any[]) =>
          stats.map((stat) => ({
            ...stat,
            icon: iconMap[stat.icon] || Code,
          }));

        setCompanyStats(mapStats(data.companyStats));
        setHackerStats(mapStats(data.hackerStats));
        setRecentActivity(data.recentActivity);
        setUpcomingEvents(data.upcomingEvents);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  const stats = userRole === 'company' ? companyStats : hackerStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userRole === 'company' ? 'TechCorp' : 'Alex'}! 👋
        </h1>
        <p className="text-gray-600">
          {userRole === 'company'
            ? "Here's an overview of your hackathon activities and problem-solving progress."
            : "Ready to tackle some exciting challenges? Here's your latest activity."}
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
            {recentActivity.map((activity, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg`}>
                <div className={`w-2 h-2 rounded-full ${index % 3 === 0 ? 'bg-green-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}: {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.hacker} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex-shrink-0">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{event.name}</h4>
                  <p className="text-xs text-gray-600">
                    Starting on {new Date(event.start_date).toLocaleDateString()} • Prize: {event.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
