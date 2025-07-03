import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CompanyProblems } from './components/CompanyProblems';
import { HackerBrowse } from './components/HackerBrowse';
import { HackathonManagement } from './components/HackathonManagement';
import { Analytics } from './components/Analytics';
import { HackerProfile } from './components/HackerProfile';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState<'company' | 'hacker'>('company');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; role: 'company' | 'hacker' } | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLogin = (username: string, password: string) => {
    // Mock login logic: accept any username/password
    // Assign role based on username for demo purposes
    const role = username.toLowerCase().includes('company') ? 'company' : 'hacker';
    setUser({ username, role });
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLoginWithGitHub = () => {
    // Mock GitHub login
    const username = 'githubUser';
    const role = 'hacker';
    setUser({ username, role });
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLoginWithGoogle = () => {
    // Mock Google login
    const username = 'googleUser';
    const role = 'company';
    setUser({ username, role });
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleRegister = (username: string, password: string) => {
    // Mock register logic: simply log in after registration
    setUser({ username, role: 'hacker' }); // default to hacker role on register
    setUserRole('hacker');
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveView('dashboard');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'problems':
        return userRole === 'company' ? <CompanyProblems /> : <HackerBrowse />;
      case 'browse':
        return <HackerBrowse />;
      case 'hackathons':
        return <HackathonManagement userRole={userRole} />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <HackerProfile />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login
        onLogin={handleLogin}
        switchToRegister={() => setAuthView('register')}
        onLoginWithGitHub={handleLoginWithGitHub}
        onLoginWithGoogle={handleLoginWithGoogle}
      />
    ) : (
      <Register onRegister={handleRegister} switchToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        setUserRole={setUserRole}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main className="min-h-screen">{renderContent()}</main>
    </div>
  );
}

export default App;
