import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/Router';
import { MongoClient } from "./mongoDB/MongooseClient";

const app: Express = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

const mongoClient = MongoClient.getInstance();
try {
  mongoClient.connect(process.env.MONGO_DB_URL || '');
} catch (error) {
  process.exit(1);
}

export { app };