require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = require('./middleware/corsOption');
const matchesRouter = require('./routes/matches');
const teamsRouter = require('./routes/teams');
const drawRouter = require('./routes/draw');
const settingsRouter = require('./routes/settings');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// ✅ API Routes
app.use('/matches', matchesRouter);
app.use('/teams', teamsRouter);
app.use('/generate-matches', drawRouter);
app.use('/settings', settingsRouter);
app.use('/auth', authRouter);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/out')));

// ✅ Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
