import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';
import cors from 'cors';
import accountRoutes from './src/routes/accountRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use('/api/accounts', accountRoutes);
app.get('/', (req, res) => {
  res.status(200).send('Server running on ' + process.env.BACKEND_URL);
});

try {
  await sequelize.authenticate();
  app.listen(process.env.PORT || 4000);
} catch {}
