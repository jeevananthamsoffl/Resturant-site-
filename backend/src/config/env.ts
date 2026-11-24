import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_royal_feast_jwt_secret_key_12345',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_placeholder',
  },
};
