import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [isAuthMode, setIsAuthMode] = useState('login');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ideas');
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (err) {
      console.error('Error fetching ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleIdeaSubmitted = (newIdea) => {
    setIdeas([newIdea, ...ideas]);
    setCurrentView('home');
  };

  const handleIdeaLiked = (updatedIdea) => {
    setIdeas(ideas.map(idea => 
      idea._id === updatedIdea._id ? updatedIdea : idea
    ));
  };

  const switchToLogin = () => setIsAuthMode('login');
  const switchToRegister = () => setIsAuthMode('register');

  const renderContent = () => {
    if (!user) {
      if (isAuthMode === 'login') {
        return <Login onLogin={handleLogin} switchToRegister={switchToRegister} />;
      } else {
        return <Register switchToLogin={switchToLogin} />;
      }
    }

    switch (currentView) {
      case 'submit':
        return <IdeaForm onIdeaSubmitted={handleIdeaSubmitted} user={user} />;
      default:
        return (
          <div className="home-content">
            <div className="hero-section">
              <div className="hero-content">
                <h1>IdeaBoard</h1>
                <p>Share your ideas, vote for favourites, and discover top-ranked suggestions from the community. Jump in by submitting an idea or browsing existing ones.</p>
                <button 
                  className="btn btn-primary hero-btn"
                  onClick={() => setCurrentView('submit')}
                >
                  Submit an idea
                </button>
              </div>
            </div>
            <IdeaList ideas={ideas} onIdeaLiked={handleIdeaLiked} user={user} />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading IdeaBoard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {user && (
        <Header
          user={user}
          onLogout={handleLogout}
          onShowSubmit={() => setCurrentView('submit')}
          onShowHome={() => setCurrentView('home')}
        />
      )}
      <main className="main-content">
        {renderContent()}
      </main>
      
      {user && (
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 IdeaBoard — Built with care</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;