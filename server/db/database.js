import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path in the server directory
const dbPath = path.resolve(__dirname, '../portfolio.db');
const db = new DatabaseSync(dbPath);

// Initialize Tables
export const initDatabase = () => {
  // 1. Messages / Inquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      permission INTEGER DEFAULT 1,
      status TEXT DEFAULT 'unread',
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT NOT NULL,
      match_rate TEXT DEFAULT '99%',
      episode TEXT DEFAULT 'S01 E01',
      live_url TEXT DEFAULT '',
      github_url TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Skills table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category_tag TEXT NOT NULL,
      description TEXT NOT NULL,
      skills_list TEXT NOT NULL,
      order_num INTEGER DEFAULT 0
    );
  `);

  // 4. Analytics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT DEFAULT '/',
      user_agent TEXT,
      referrer TEXT,
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ SQLite Database schema verified at:', dbPath);
};

// Database Query Helpers
export const dbOperations = {
  // --- Contact Message Operations ---
  saveMessage: ({ firstName, lastName, email, message, permission, ip }) => {
    const insert = db.prepare(`
      INSERT INTO messages (first_name, last_name, email, message, permission, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(firstName, lastName, email, message, permission ? 1 : 0, ip || '127.0.0.1');
    return { id: result.lastInsertRowid, firstName, lastName, email, message, createdAt: new Date() };
  },

  getAllMessages: () => {
    const query = db.prepare(`
      SELECT id, first_name, last_name, email, message, permission, status, created_at
      FROM messages
      ORDER BY id DESC
    `);
    return query.all();
  },

  updateMessageStatus: (id, status) => {
    const update = db.prepare(`UPDATE messages SET status = ? WHERE id = ?`);
    return update.run(status, id);
  },

  deleteMessage: (id) => {
    const del = db.prepare(`DELETE FROM messages WHERE id = ?`);
    return del.run(id);
  },

  // --- Projects Operations ---
  getAllProjects: () => {
    const query = db.prepare(`SELECT * FROM projects ORDER BY id ASC`);
    const rows = query.all();
    return rows.map((row) => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : row.tags
    }));
  },

  insertProject: (project) => {
    const insert = db.prepare(`
      INSERT INTO projects (title, category, description, tags, match_rate, episode, live_url, github_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return insert.run(
      project.title,
      project.category,
      project.description,
      JSON.stringify(project.tags || []),
      project.match || '98%',
      project.episode || 'S01 E01',
      project.liveUrl || '',
      project.githubUrl || ''
    );
  },

  // --- Skills Operations ---
  getAllSkills: () => {
    const query = db.prepare(`SELECT * FROM skills ORDER BY order_num ASC, id ASC`);
    const rows = query.all();
    return rows.map((row) => ({
      ...row,
      skills: typeof row.skills_list === 'string' ? JSON.parse(row.skills_list || '[]') : row.skills_list
    }));
  },

  insertSkill: (skill, orderNum = 0) => {
    const insert = db.prepare(`
      INSERT INTO skills (title, category_tag, description, skills_list, order_num)
      VALUES (?, ?, ?, ?, ?)
    `);
    return insert.run(
      skill.title,
      skill.tag,
      skill.desc,
      JSON.stringify(skill.skills || []),
      orderNum
    );
  },

  // --- Analytics Operations ---
  recordPageView: ({ page, userAgent, referrer, ip }) => {
    const insert = db.prepare(`
      INSERT INTO analytics (page, user_agent, referrer, ip)
      VALUES (?, ?, ?, ?)
    `);
    return insert.run(page || '/', userAgent || '', referrer || '', ip || '127.0.0.1');
  },

  getAnalyticsSummary: () => {
    const countQuery = db.prepare(`SELECT COUNT(*) as total_views FROM analytics`);
    const recentQuery = db.prepare(`SELECT * FROM analytics ORDER BY id DESC LIMIT 10`);
    const totalViews = countQuery.get().total_views;
    const recentViews = recentQuery.all();
    return { totalViews, recentViews };
  }
};

export default db;
