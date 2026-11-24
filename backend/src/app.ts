import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import rootRouter from './routes';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: [config.clientUrl, 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api', rootRouter);

// 404 Fallback
app.use(notFoundHandler);

// Centralized Error Handling
app.use(errorHandler);

export default app;
