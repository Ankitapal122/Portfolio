import express from 'express';
import { dbOperations } from '../db/database.js';

const router = express.Router();

// POST /api/contact - Save a new contact message inquiry
router.post('/', (req, res) => {
  try {
    const { firstName, lastName, email, message, permission } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, lastName, email, message are required.'
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format.'
      });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    const savedRecord = dbOperations.saveMessage({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      permission: Boolean(permission),
      ip: String(ip)
    });

    console.log(`📩 New message saved from ${firstName} ${lastName} (${email}) [ID: ${savedRecord.id}]`);

    return res.status(201).json({
      success: true,
      message: 'Transmission received and safely stored in database.',
      data: savedRecord
    });
  } catch (error) {
    console.error('❌ Error saving contact message:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while storing message.'
    });
  }
});

// GET /api/contact - Retrieve all contact messages (for Admin terminal)
router.get('/', (req, res) => {
  try {
    const messages = dbOperations.getAllMessages();
    return res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('❌ Error retrieving messages:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages from database.'
    });
  }
});

// PATCH /api/contact/:id/status - Update message status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Status must be one of: unread, read, archived'
      });
    }

    dbOperations.updateMessageStatus(id, status);
    return res.json({ success: true, message: `Message ${id} status updated to ${status}` });
  } catch (error) {
    console.error('❌ Error updating message status:', error);
    return res.status(500).json({ success: false, error: 'Database update failed.' });
  }
});

// DELETE /api/contact/:id - Delete a message
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    dbOperations.deleteMessage(id);
    return res.json({ success: true, message: `Message ${id} deleted successfully.` });
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
});

export default router;
