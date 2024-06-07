import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoDetails, setRepoDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Fetching details for repository URL: ${repoUrl}`);
    try {
      const response = await axios.post('http://localhost:3000/api/repo-details', { repoUrl });
      console.log('Response from backend:', response.data);
      setRepoDetails(response.data);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch repository details');
      setRepoDetails(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive NFT App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub Repository URL"
          />
          <button type="submit">Fetch Details</button>
        </form>
        {error && <p>{error}</p>}
        {repoDetails && (
          <div>
            <h2>Repository Details</h2>
            <p><strong>Name:</strong> {repoDetails.name}</p>
            <p><strong>Description:</strong> {repoDetails.description}</p>
            <p><strong>Owner:</strong> {repoDetails.owner.login}</p>
            <p><strong>Stars:</strong> {repoDetails.stargazers_count}</p>
            <p><strong>Forks:</strong> {repoDetails.forks_count}</p>
            <p><strong>Open Issues:</strong> {repoDetails.open_issues_count}</p>
            <p><strong>Last Push:</strong> {new Date(repoDetails.pushed_at).toLocaleString()}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
