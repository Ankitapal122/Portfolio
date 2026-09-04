// Centralized API Service for Ankita Pal Portfolio

const API_BASE = '/api';

export const api = {
  // Submit Contact Form inquiry to backend database
  submitMessage: async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message to server.');
      }
      return { success: true, data: data.data };
    } catch (err) {
      console.warn('Backend API submission warning:', err.message);
      // Return structured response
      return { success: false, error: err.message };
    }
  },

  // Retrieve stored messages for Admin Terminal
  getMessages: async () => {
    try {
      const response = await fetch(`${API_BASE}/contact`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      return data.messages || [];
    } catch (err) {
      console.warn('Could not fetch messages from backend:', err.message);
      return [];
    }
  },

  // Update status of a message
  updateMessageStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Delete message from database
  deleteMessage: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/contact/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Log page view in SQLite telemetry
  logPageView: async (page = '/') => {
    try {
      await fetch(`${API_BASE}/analytics/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, referrer: document.referrer })
      });
    } catch {
      // Silently ignore telemetry failure if offline
    }
  }
};

export default api;
