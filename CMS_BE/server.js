// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouters from './src/routers/authRoutes.js';
import contractRouters from './src/routers/contracts.js';
import accountRouter from './src/routers/Accounts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/api/contracts', contractRouters);
app.use('/api', authRouters);
app.use('/api/accounts', accountRouter);


app.listen(PORT, () => {
  process.stdout.write(`Server is running at http://localhost:${PORT}\n`);
});
