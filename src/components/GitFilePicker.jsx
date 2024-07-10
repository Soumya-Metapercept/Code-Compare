import React, { useState } from 'react';
import axios from 'axios';

const GitHubFilePicker = ({ onFileSelect }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [files, setFiles] = useState([]);

  const fetchRepoContents = async () => {
    try {
      const urlParts = new URL(repoUrl);
      const [ , user, repo ] = urlParts.pathname.split('/').slice(-2);

      const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents`;

      const headers = githubToken ? { Authorization: `token ${githubToken}` } : {};

      const response = await axios.get(apiUrl, { headers });

      console.log('GitHub API response:', response); // Log the response for debugging

      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      alert('Failed to fetch repository contents. Please check the URL.');
    }
  };

  const fetchFileContent = async (file) => {
    try {
      const response = await axios.get(file.download_url);
      onFileSelect(response.data);
    } catch (error) {
      console.error('Error fetching file content:', error);
      alert('Failed to fetch file content.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repository URL"
      />
      <input
        type="text"
        value={githubToken}
        onChange={(e) => setGithubToken(e.target.value)}
        placeholder="Enter GitHub token (optional)"
      />
      <button onClick={fetchRepoContents}>Fetch Repository Contents</button>

      {files.length > 0 && (
        <div>
          <h3>Select a file:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.sha}>
                <button onClick={() => fetchFileContent(file)}>{file.name}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubFilePicker;
