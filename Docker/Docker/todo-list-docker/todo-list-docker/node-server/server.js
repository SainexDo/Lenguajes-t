// Import required packages
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of express
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'mysql', // Replace with your MySQL host
  user: 'root',      // Replace with your MySQL username
  password: 'root',  // Replace with your MySQL password
  database: 'todo_db',    // Replace with your database name
  port: 3306 // Replace with the assigned port
});

// Create the users table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err, result) => {
  if (err) throw err;
  console.log('Users table created or already exists');
});

// Create the tasks table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    content VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )
`, (err, result) => {
  if (err) throw err;
  console.log('Tasks table created or already exists');
});

// Unified endpoint
app.get('/api', (req, res) => {
  const sql = `
    SELECT users.id AS userId, username, password, tasks.id AS taskId, content, completed
    FROM users
    LEFT JOIN tasks ON users.id = tasks.userId
  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    // Transform the result into a more structured format
    const users = {};
    result.forEach(row => {
      if (!users[row.userId]) {
        users[row.userId] = {
          id: row.userId,
          username: row.username,
          password: row.password, // Include password here
          tasks: []
        };
      }
      if (row.taskId) {
        users[row.userId].tasks.push({
          id: row.taskId,
          content: row.content,
          completed: row.completed
        });
      }
    });
    res.json(Object.values(users));
  });
});

// Handle POST requests to /api to create a new user
app.post('/api', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'User created', id: result.insertId });
  });
});

// Handle PUT requests to /api to create a new task
app.post('/api/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { content } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  if (!content) {
    return res.status(400).json({ message: 'Task content is required' });
  }

  const sql = 'INSERT INTO tasks (userId, content, completed) VALUES (?, ?, false)';

  db.query(sql, [userId, content], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed', details: err });
    }
    res.json({ message: 'Task created', id: result.insertId });
  });
});


app.get('/api/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const sql = `
    SELECT users.id AS userId, username, password, tasks.id AS taskId, content, completed
    FROM users
    LEFT JOIN tasks ON users.id = tasks.userId
    WHERE users.id = ?
  `;
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Transform the result into a structured format
    const user = {
      id: result[0].userId,
      username: result[0].username,
      password: result[0].password, // Include password here
      tasks: []
    };

    result.forEach(row => {
      if (row.taskId) {
        user.tasks.push({
          id: row.taskId,
          content: row.content,
          completed: row.completed
        });
      }
    });

    res.json(user);
  });
});

app.use((req, res) => {
  res.status(405).json({ message: 'Method not allowed' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
