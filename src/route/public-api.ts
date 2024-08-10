import express from 'express';
import { UserController } from '../controller/user-controller';

export const publicRouter = express.Router();

publicRouter.post('/auth/register', UserController.register);
