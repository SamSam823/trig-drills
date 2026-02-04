# Trig Drill Generator with Global Leaderboard

This is a trigonometry quiz game with a global leaderboard.

## Quick Deploy (Free)

### Option 1: Render.com (Recommended)
1. Create a free account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Your leaderboard will be live at your-render-url.onrender.com

### Option 2: Railway.app
1. Create a free account at [railway.app](https://railway.app)
2. Deploy from GitHub repo
3. Add environment variables if needed
4. Your app will be live automatically

### Option 3: Glitch.com
1. Create a new project on [glitch.com](https://glitch.com)
2. Upload the files
3. The app will work immediately with a glitch.app URL

## Local Development

```bash
cd trig-drills
npm install
npm start
```

Then open http://localhost:3000

## Project Structure

```
trig-drills/
├── package.json
├── server.js           # Express server with leaderboard API
├── public/
│   └── drills.html     # The quiz game
└── README.md
```

## Features

- **Quiz Mode**: Complete trigonometry problems against the clock
- **Global Leaderboard**: Scores are shared across all users
- **Fallback**: Works offline using localStorage if server unavailable
- **Responsive**: Works on desktop and mobile

## API Endpoints

- `GET /api/leaderboard` - Get top scores
- `POST /api/scores` - Submit a new score

## Technologies

- Node.js + Express (backend)
- Vanilla JavaScript (frontend)
- In-memory storage (can upgrade to Firebase for persistence)

