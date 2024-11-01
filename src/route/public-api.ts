import express from 'express';
import { UserController } from '../controller/user';

export const publicRouter = express.Router();

publicRouter.post('/auth/register', UserController.register);
publicRouter.post('/auth/login', UserController.login);
