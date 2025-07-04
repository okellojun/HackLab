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

  const API_BASE_URL = 'http://localhost:4000';

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        alert('Login failed: ' + (await response.json()).message);
        return;
      }
      const data = await response.json();
      setUser(data.user);
      setUserRole(data.user.role);
      setIsAuthenticated(true);
      setActiveView('dashboard');
      localStorage.setItem('token', data.token);
    } catch (error) {
      alert('Login error: ' + error);
    }
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

  const handleRegister = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: username + '@example.com', password, role: 'hacker' }),
      });
      if (!response.ok) {
        alert('Registration failed: ' + (await response.json()).message);
        return;
      }
      const data = await response.json();
      setUser(data.user);
      setUserRole(data.user.role);
      setIsAuthenticated(true);
      setActiveView('dashboard');
      localStorage.setItem('token', data.token);
    } catch (error) {
      alert('Registration error: ' + error);
    }
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
