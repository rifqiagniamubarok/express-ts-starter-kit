import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { setupSwagger } from './swagger';

export const web = express();

web.use(express.json());
setupSwagger(web);

web.use(publicRouter);
web.use(errorMiddleware);
