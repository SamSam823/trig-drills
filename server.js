const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin with your service account
// You'll need to replace this with your actual service account key
const serviceAccount = {
  type: "service_account",
  project_id: "YOUR_PROJECT_ID",
  private_key_id: "YOUR_PRIVATE_KEY_ID",
  private_key: "YOUR_PRIVATE_KEY",
  client_email: "YOUR_CLIENT_EMAIL",
  client_id: "YOUR_CLIENT_ID",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/YOUR_CLIENT_EMAIL"
};

// For development, we'll use a simpler in-memory storage
// Replace with Firebase setup for production
const inMemoryLeaderboard = [];

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Get top leaderboard entries
app.get('/api/leaderboard', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const sorted = [...inMemoryLeaderboard].sort((a, b) => a.time - b.time);
  res.json(sorted.slice(0, limit));
});

// Submit a new score
app.post('/api/scores', (req, res) => {
  const { name, time, problemCount } = req.body;
  
  if (!name || typeof time !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name: name.substring(0, 20), // Limit name length
    time,
    problemCount: problemCount || 0,
    timestamp: Date.now()
  };
  
  inMemoryLeaderboard.push(entry);
  
  // Keep only top 1000 entries to prevent memory bloat
  if (inMemoryLeaderboard.length > 1000) {
    inMemoryLeaderboard.sort((a, b) => a.time - b.time);
    inMemoryLeaderboard.length = 1000;
  }
  
  res.json({ success: true, entry });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

