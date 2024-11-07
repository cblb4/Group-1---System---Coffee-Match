const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'MySql0730*',
  database: 'userregistrationdb'
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO userregistrationdb.users_reg (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500);
    }
    res.status(200).send('User registered successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const query = 'SELECT * FROM userregistrationdb.users_reg WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Incorrect email or password');
    }
  });
});
