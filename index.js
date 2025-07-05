const express = require("express")
const dotenv = require("dotenv")
const pool = require("./db")

//Load env variables
dotenv.config()

const app = express()
app.use(express.json())


//Home route
app.get('/api/v1', async (req, res) => {
  return res.send('Postgresql is connected')
})

// GET /users — fetch all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json({ success: true, users: result.rows }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /users/:id — fetch one user
app.get('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user: result.rows[0] }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /users — create new
app.post('/api/v1/users', async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || age == null) {
    return res
      .status(400)
      .json({ success: false, error: 'name, email and age are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /users/:id — update existing
app.put('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  if (!name || !email || age == null) {
    return res
      .status(400)
      .json({ success: false, error: 'name, email and age are required' });
  }
  try {
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *',
      [name, email, age, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user: result.rows[0] }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /users/:id — remove one
app.delete('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted' }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


//404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

