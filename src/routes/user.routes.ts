import { Router } from "express";
import { UserController } from "../controllers";
import validate, { UserValidation } from "../validations";
import asyncResolver from '../utils/asyncResolver';

const userRoutes:Router = Router();

userRoutes.post('/user/signup', UserValidation.create, validate, asyncResolver(UserController.signUp));
userRoutes.post('/user/login', UserValidation.login, validate, asyncResolver(UserController.login));

export default userRoutes;