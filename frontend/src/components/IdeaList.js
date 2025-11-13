import React, { useState, useEffect } from 'react';
import './IdeaList.css';

const IdeaList = ({ ideas, onIdeaLiked, user }) => {
  const handleLike = async (ideaId) => {
    if (!user) {
      console.log('User must be logged in to like ideas');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/ideas/${ideaId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        onIdeaLiked(data);
      } else {
        console.error('Failed to like idea:', response.status);
      }
    } catch (err) {
      console.error('Error liking idea:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!ideas.length) {
    return (
      <div className="no-ideas">
        <div className="no-ideas-content">
          <h3>No ideas yet</h3>
          <p>Be the first to share your brilliant idea!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ideas-container">
      <div className="ideas-header">
        <h2>Community Ideas</h2>
        <p>Discover and vote for amazing ideas from the community</p>
      </div>
      
      <div className="ideas-grid">
        {ideas.map((idea) => (
          <div key={idea._id} className="idea-card">
            <div className="idea-content">
              <h3 className="idea-title">{idea.title}</h3>
              <p className="idea-description">{idea.description}</p>
              
              <div className="idea-meta">
                <span className="idea-author">by {idea.author.name}</span>
                <span className="idea-date">{formatDate(idea.createdAt)}</span>
              </div>
            </div>
            
            <div className="idea-actions">
              <button
                onClick={() => handleLike(idea._id)}
                className={`like-btn ${Array.isArray(idea.likes) && idea.likes.includes(user?._id) ? 'liked' : ''}`}
                disabled={!user}
              >
                <span className="like-icon">👍</span>
                <span className="like-count">{Array.isArray(idea.likes) ? idea.likes.length : (idea.likesCount || 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaList;