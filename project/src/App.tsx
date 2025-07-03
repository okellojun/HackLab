import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CompanyProblems } from './components/CompanyProblems';
import { HackerBrowse } from './components/HackerBrowse';
import { HackathonManagement } from './components/HackathonManagement';
import { Analytics } from './components/Analytics';
import { HackerProfile } from './components/HackerProfile';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState<'company' | 'hacker'>('company');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        setUserRole={setUserRole}
      />
      <main className="min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;