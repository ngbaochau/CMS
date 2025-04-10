const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const authRoutes = require('./src/routers/auth'); 

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', authRoutes); 

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
