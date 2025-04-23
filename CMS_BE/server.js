import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';
import projectRoutes from './src/routers/projectRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Server running on ' + process.env.BACKEND_URL);
});
app.use('/projects', projectRoutes);
try {
  await sequelize.authenticate();
  app.listen(process.env.PORT || 5000);
} catch {}
