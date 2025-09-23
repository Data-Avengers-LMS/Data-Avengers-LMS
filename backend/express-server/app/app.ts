import express from 'express';
import morgan from 'morgan';
import { type Application } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

export { app };
