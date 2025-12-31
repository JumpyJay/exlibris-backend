
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

router.get('/register', function(req, res, next) {
  const getQuery = 'SELECT * FROM users';
  db.query(getQuery, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(result.rows);
  });
});

router.post('/register', async function(req, res, next) {
  // extract parameters from request body
  const { username, email, password } = req.body;

  // parameters validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    // (Optional) You might also want to check if the username is taken here, 
    // similar to how we check the email.

    // Check if email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // CHANGE 3: Update INSERT query to include username
    const insertQuery = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    
    // Note the order matches the $1, $2, $3 above
    const result = await db.query(insertQuery, [username, email, hash]);

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0]
    });

  } catch (err) {
    // If you set the username column to UNIQUE in SQL, 
    // this catch block will handle the "duplicate username" error automatically.
    console.error(err);
    next(err);
  }
});

module.exports = router;