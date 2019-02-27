import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Logger, ExpressLogger } from './logger';
import apiRoutes from './api/';

const app = express();

if (ExpressLogger) {
    app.use(ExpressLogger);
    Logger.info('ExpressLogger middleware enabled, logging routes!');
}

// MongoDB
if (!process.env.DB_BACKEND) {
    throw new Error('DB_BACKEND env var not set, unable to continue');
}

mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => Logger.info(`Connected to MongoDB host ${process.env.DB_BACKEND}`));
mongoose.connection.on('disconnect', () => Logger.warning(`Disconnected from MongoDB host ${process.env.DB_BACKEND}`));
mongoose.connection.on('error', (err) => Logger.error(`MongoDB error: ${err}`));

mongoose.connect(process.env.DB_BACKEND, { useNewUrlParser: true, connectTimeoutMS: 2000 })
    .catch((err) => {
        Logger.error(`Unable to connect to the MongoDB host ${process.env.DB_BACKEND}: ${err}`);
    });

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

app.use(bodyParser.json());
app.use(compression());

// Routes
app.use('/api', apiRoutes());
app.use('/', express.static('dist'));

app.listen(process.env.APP_PORT, () => {
    Logger.info(`Express server listening on port ${process.env.APP_PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        Logger.warning(`App received SIGINT, disconnected from MongoDB host ${process.env.DB_BACKEND}`);
        process.exit(0);
    });
});
