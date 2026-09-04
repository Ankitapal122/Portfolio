import express from 'express';
import { dbOperations } from '../db/database.js';

const router = express.Router();

// POST /api/analytics/view - Log page view
router.post('/view', (req, res) => {
  try {
    const { page, referrer } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    dbOperations.recordPageView({
      page: page || '/',
      userAgent: String(userAgent).substring(0, 255),
      referrer: String(referrer || '').substring(0, 255),
      ip: String(ip)
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Error recording page view:', error);
    return res.status(500).json({ success: false });
  }
});

// GET /api/analytics/stats - Retrieve metrics
router.get('/stats', (req, res) => {
  try {
    const stats = dbOperations.getAnalyticsSummary();
    return res.json({ success: true, stats });
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    return res.status(500).json({ success: false, error: 'Database query failed.' });
  }
});

export default router;
