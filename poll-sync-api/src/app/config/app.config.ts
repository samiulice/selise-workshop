import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'API Server',
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpire:process.env.JWT_EXPIRE as string,
  mongoURI:process.env.MONGO_URI as string
};
