import express  from 'express';
import mongoose from 'mongoose';
import dotenv   from 'dotenv';
import cors     from 'cors';

import authRoute   from './routes/auth.js';
import serialRoute from './routes/serials.js';

const app = express();
dotenv.config();

// Constants
const PORT        = process.env.PORT || 3001;
const DB_USER     = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME     = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute)
app.use('/api/serials', serialRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.8zph6a2.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )

        app.listen(PORT, error => {
            if (error) {
                console.log(`Сервер не стартував сталась помилка: ${error}`);
            }

            console.log('Сервер стартував');
        })
    } catch (error) {
        console.log(`Сервер не стартував сталась помилка: ${error}`);
    }
}

start();