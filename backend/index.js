const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/repo-details', async (req, res) => {
  const { repoUrl } = req.body;
  const repoPath = repoUrl.replace('https://github.com/', '');

  try {
    const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
    const repoDetails = response.data;
    res.json(repoDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repository details' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
