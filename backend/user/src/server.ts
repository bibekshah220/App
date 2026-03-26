import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDb from './config/db';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDb();

        const redisClient = createClient({
            url: process.env.REDIS_URL || '',
        });

        redisClient.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        await redisClient.connect();
        console.log('Connected to Redis');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

