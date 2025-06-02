import express from 'express';
import cors from './middlewares/corsMiddleware.js';
import dotenv from 'dotenv';
import sequelize from './db.js';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors);
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/', authRoutes);
app.use('/file', fileRoutes);

sequelize.sync().then(() => {
  if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
  app.listen(process.env.PORT, () => console.log('Server started on port', process.env.PORT));
});
