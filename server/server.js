import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/database.js';
import { seedDatabaseIfEmpty } from './seeds/seedData.js';

import contactRoutes from './routes/contact.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & seed default data if first run
initDatabase();
seedDatabaseIfEmpty();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root route — shows a status page and redirects to the portfolio frontend
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="3;url=http://localhost:5173" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ankita Pal — Portfolio Backend</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050505; color: #fff; font-family: 'Courier New', monospace;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; flex-direction: column; gap: 20px; }
    h1 { color: #E50914; font-size: 2rem; letter-spacing: 0.2em; }
    p  { color: rgba(255,255,255,0.6); font-size: 0.85rem; }
    a  { color: #E50914; text-decoration: none; }
    .badge { padding: 6px 16px; border: 1px solid #E50914; border-radius: 6px;
             color: #E50914; font-size: 0.75rem; letter-spacing: 0.15em; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
           display: inline-block; margin-right: 8px; animation: ping 1s infinite; }
    @keyframes ping { 0%,100%{opacity:1} 50%{opacity:0.3} }
  </style>
</head>
<body>
  <span class="badge">BACKEND ENGINE // PORT 5000</span>
  <h1>ANKITA PAL</h1>
  <p><span class="dot"></span>SQLite Database Online &bull; API Server Running</p>
  <p style="margin-top:8px">Redirecting to portfolio in <strong style="color:#fff">3 seconds</strong>…</p>
  <p>Or open manually: <a href="http://localhost:5173">http://localhost:5173</a></p>
  <p style="margin-top:24px;color:rgba(255,255,255,0.3);font-size:0.72rem">
    API Endpoints: /api/health &nbsp;|&nbsp; /api/contact &nbsp;|&nbsp; /api/projects &nbsp;|&nbsp; /api/skills
  </p>
</body>
</html>`);
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'Ankita Pal Portfolio Engine',
    database: 'SQLite 3.x (Active)',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Portfolio Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 SQLite Database loaded successfully`);
  console.log(`📡 Ready to receive contact dispatches & API requests`);
  console.log(`======================================================\n`);
});

export default app;
