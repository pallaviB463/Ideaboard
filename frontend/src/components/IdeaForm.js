import React, { useState } from 'react';
import './IdeaForm.css';

const IdeaForm = ({ onIdeaSubmitted, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ title: '', description: '' });
        onIdeaSubmitted(data);
      } else {
        setError(data.message || 'Failed to submit idea');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="idea-form-container">
      <div className="idea-form-card">
        <div className="form-header">
          <h3>Share Your Idea</h3>
          <p>What brilliant idea do you want to share with the community?</p>
        </div>

        <form onSubmit={handleSubmit} className="idea-form">
          <div className="input-group">
            <label>Idea Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy title for your idea..."
              maxLength={100}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your idea in detail..."
              rows={4}
              maxLength={500}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Idea'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdeaForm;