import { body } from "express-validator";

export const UserValidation:any = {};

UserValidation.create = [
    body('name').notEmpty().withMessage('name is required').bail(),
    body('email').notEmpty().withMessage('email is required').bail().normalizeEmail().isEmail().withMessage('invalid email').bail(),
    body('password').notEmpty().withMessage('password is required')
]