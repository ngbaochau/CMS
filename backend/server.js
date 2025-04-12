import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './src/config/db.js';
import authRoutes from './src/routers/auth.js';

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
