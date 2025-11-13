import React from 'react';
import './Header.css';

const Header = ({ user, onLogout, onShowSubmit, onShowHome }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="logo-btn" onClick={onShowHome}>
            <span className="logo-icon">💡</span>
            <span className="logo-text">IdeaBoard</span>
          </button>
        </div>

        <nav className="header-nav">
          <button className="nav-btn" onClick={onShowHome}>
            Home
          </button>
          <button className="nav-btn" onClick={onShowSubmit}>
            Submit
          </button>
        </nav>

        <div className="header-right">
          {user ? (
            <div className="user-section">
              <span className="user-greeting">Hello, {user.name}!</span>
              <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-secondary">Login</button>
              <button className="btn btn-primary">Register</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;