import React from 'react';
import { Menu, X, Search, Bell, User, Code, Trophy, Briefcase } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userRole: 'company' | 'hacker';
  setUserRole: (role: 'company' | 'hacker') => void;
  isAuthenticated: boolean;
  user: { username: string; role: 'company' | 'hacker' } | null;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeView,
  setActiveView,
  userRole,
  setUserRole,
  isAuthenticated,
  user,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const companyNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: Search }
  ];

  const hackerNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'browse', label: 'Browse Problems', icon: Search },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const navItems = userRole === 'company' ? companyNavItems : hackerNavItems;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              RebornTechHackLab
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      activeView === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveView('login')}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveView('register')}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-700 font-medium mr-4">
                  Hello, {user?.username}
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
                <button
                  onClick={() => setUserRole(userRole === 'company' ? 'hacker' : 'company')}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Switch to {userRole === 'company' ? 'Hacker' : 'Company'}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <User className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                    activeView === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-gray-200">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setActiveView('login')}
                    className="w-full px-3 py-2 bg-purple-600 text-white rounded-md text-base font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveView('register')}
                    className="w-full mt-1 px-3 py-2 bg-purple-600 text-white rounded-md text-base font-medium"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <span className="block px-3 py-2 text-gray-700 font-medium">
                    Hello, {user?.username}
                  </span>
                  <button
                    onClick={onLogout}
                    className="w-full mt-1 px-3 py-2 bg-red-600 text-white rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setUserRole(userRole === 'company' ? 'hacker' : 'company')}
                    className="w-full mt-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md text-base font-medium"
                  >
                    Switch to {userRole === 'company' ? 'Hacker' : 'Company'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
