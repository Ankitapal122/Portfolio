import express from 'express';
import { dbOperations } from '../db/database.js';

const router = express.Router();

// GET /api/skills - Retrieve all skill categories from database
router.get('/', (req, res) => {
  try {
    const skills = dbOperations.getAllSkills();
    return res.json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    console.error('❌ Error retrieving skills:', error);
    return res.status(500).json({ success: false, error: 'Database query failed.' });
  }
});

export default router;
