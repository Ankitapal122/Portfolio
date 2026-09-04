import express from 'express';
import { dbOperations } from '../db/database.js';

const router = express.Router();

// GET /api/projects - Retrieve all projects from database
router.get('/', (req, res) => {
  try {
    const projects = dbOperations.getAllProjects();
    return res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    console.error('❌ Error retrieving projects:', error);
    return res.status(500).json({ success: false, error: 'Database query failed.' });
  }
});

// POST /api/projects - Add a new project
router.post('/', (req, res) => {
  try {
    const { title, category, description, tags, match, episode, liveUrl, githubUrl } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Title, category, and description are required.' });
    }

    const result = dbOperations.insertProject({
      title, category, description, tags, match, episode, liveUrl, githubUrl
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('❌ Error adding project:', error);
    return res.status(500).json({ success: false, error: 'Failed to insert project.' });
  }
});

export default router;
