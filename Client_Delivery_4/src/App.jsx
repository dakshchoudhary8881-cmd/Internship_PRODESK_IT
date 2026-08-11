import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Spinner from './components/ui/Spinner';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Flyers = lazy(() => import('./pages/Flyers'));
import { initialFlyers } from './data/mockFlyers';
import { getStoredFlyers, setStoredFlyers } from './utils/storage';
import { logAnalytics } from './utils/analytics';

function App() {
  const [currentPath, setCurrentPath] = useState('dashboard');
  const [flyers, setFlyers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const storedData = getStoredFlyers(initialFlyers);
    setFlyers(storedData);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever flyers change
    if (isInitialized) {
      setStoredFlyers(flyers);
    }
  }, [flyers, isInitialized]);

  const handleNavigate = (path) => {
    setCurrentPath(path);
  };

  const handleAddFlyer = (newFlyer) => {
    setFlyers(prev => [newFlyer, ...prev]);
    logAnalytics('member_created', { memberId: newFlyer.id });
  };

  const handleUpdateFlyer = (updatedFlyer) => {
    setFlyers(prev => prev.map(f => f.id === updatedFlyer.id ? updatedFlyer : f));
    logAnalytics('member_updated', { memberId: updatedFlyer.id });
  };

  const handleDeleteFlyer = (flyerId) => {
    setFlyers(prev => prev.filter(f => f.id !== flyerId));
    logAnalytics('member_deleted', { memberId: flyerId });
  };

  if (!isInitialized) return null;

  return (
    <div className="app-container">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="main-content">
        <Header />
        <main style={{ padding: 'var(--space-4)', overflowY: 'auto' }}>
          <Suspense fallback={<Spinner center={true} />}>
            {currentPath === 'dashboard' && <Dashboard flyers={flyers} />}
            {currentPath === 'flyers' && (
              <Flyers 
                flyers={flyers} 
                onAddFlyer={handleAddFlyer}
                onUpdateFlyer={handleUpdateFlyer}
                onDeleteFlyer={handleDeleteFlyer}
              />
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
