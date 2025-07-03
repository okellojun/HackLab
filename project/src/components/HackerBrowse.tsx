import React, { useState } from 'react';
import { Search, Filter, DollarSign, Clock, Users, Star, Code, Trophy } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bounty: number;
  deadline: string;
  company: string;
  submissions: number;
  skills: string[];
  rating: number;
}

export const HackerBrowse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const problems: Problem[] = [
    {
      id: '1',
      title: 'API Rate Limiting Implementation',
      description: 'Need to implement efficient rate limiting for our REST API to prevent abuse while maintaining performance. The solution should handle burst traffic and provide clear error messages.',
      category: 'Backend',
      difficulty: 'Medium',
      bounty: 1500,
      deadline: '2025-02-15',
      company: 'TechCorp',
      submissions: 12,
      skills: ['Node.js', 'Redis', 'API Design'],
      rating: 4.8
    },
    {
      id: '2',
      title: 'Real-time Data Visualization Dashboard',
      description: 'Create an interactive dashboard for visualizing real-time analytics data with custom filtering options, responsive design, and export capabilities.',
      category: 'Frontend',
      difficulty: 'Hard',
      bounty: 2500,
      deadline: '2025-02-20',
      company: 'DataFlow Inc',
      submissions: 8,
      skills: ['React', 'D3.js', 'WebSocket'],
      rating: 4.9
    },
    {
      id: '3',
      title: 'Mobile App Performance Optimization',
      description: 'Optimize our React Native app to reduce startup time and improve overall performance metrics. Focus on memory management and rendering efficiency.',
      category: 'Mobile',
      difficulty: 'Medium',
      bounty: 2000,
      deadline: '2025-02-10',
      company: 'MobileFirst',
      submissions: 15,
      skills: ['React Native', 'Performance', 'iOS/Android'],
      rating: 4.7
    },
    {
      id: '4',
      title: 'Machine Learning Model Deployment',
      description: 'Deploy a trained ML model to production with proper scaling, monitoring, and A/B testing capabilities. Experience with cloud platforms required.',
      category: 'AI/ML',
      difficulty: 'Hard',
      bounty: 3000,
      deadline: '2025-02-25',
      company: 'AI Solutions',
      submissions: 5,
      skills: ['Python', 'TensorFlow', 'AWS/GCP'],
      rating: 4.6
    },
    {
      id: '5',
      title: 'Cybersecurity Vulnerability Assessment',
      description: 'Conduct a comprehensive security audit of our web application and provide detailed recommendations for improving security posture.',
      category: 'Cybersecurity',
      difficulty: 'Hard',
      bounty: 2800,
      deadline: '2025-02-18',
      company: 'SecureWeb',
      submissions: 3,
      skills: ['Security Audit', 'Penetration Testing', 'OWASP'],
      rating: 4.9
    },
    {
      id: '6',
      title: 'Database Query Optimization',
      description: 'Optimize slow-running database queries and improve overall database performance. Focus on indexing strategies and query restructuring.',
      category: 'Database',
      difficulty: 'Medium',
      bounty: 1800,
      deadline: '2025-02-12',
      company: 'DataBase Pro',
      submissions: 9,
      skills: ['SQL', 'PostgreSQL', 'Query Optimization'],
      rating: 4.5
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'AI/ML', 'Cybersecurity', 'Database'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Problems</h1>
        <p className="text-gray-600">Discover exciting challenges and earn bounties by solving real-world problems</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems, skills, or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProblems.length} of {problems.length} problems
        </p>
      </div>

      {/* Problems List */}
      <div className="space-y-6">
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{problem.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4" />
                      <span>{problem.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{problem.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{problem.submissions} submissions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600 font-semibold">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-lg">{problem.bounty.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(problem.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{problem.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Skills:</span>
                  <div className="flex flex-wrap gap-2">
                    {problem.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};