import { Router } from "express";
import { UserController } from "../controllers";
import validate, { UserValidation } from "../validations";

const userRoutes:Router = Router();

userRoutes.post('/user/signup', UserValidation.create, validate, UserController.signUp);

export default userRoutes;