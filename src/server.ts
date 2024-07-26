import express from 'express';
import { Sequelize } from 'sequelize';
import { initModels } from './models';
import {indexRoute} from './routes/indexRoute';
import {userRoutes} from './routes/userRoutes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import {postRoutes} from './routes/postRoutes';
import {categoryRoutes} from './routes/categoryRoutes';  
import {commentRoutes} from './routes/commentRoutes'; 
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Use the logger middleware

// Routes
app.use('/', indexRoute);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware (should be after all other middleware and routes)
app.use(errorHandler); 

// Sync database and start server
const startServer = async () => {
  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      define: {
        // Ensure table names are not pluralized
        freezeTableName: true,
      },
    });

    const models = initModels(sequelize);

    await sequelize.sync({ force: true }); // { force: true } for development only to drop and recreate tables    console.log('Database synchronized');
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();
