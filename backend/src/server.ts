import app from './app';
import { config } from './config/env';

const server = app.listen(config.port, () => {
  console.log(`===============================================`);
  console.log(`👑 ROYAL FEAST API Backend Server Initialized`);
  console.log(`⚡ Running in: ${config.nodeEnv} mode`);
  console.log(`🌐 Port: ${config.port}`);
  console.log(`🔗 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`===============================================`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

export default server;
