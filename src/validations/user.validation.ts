import { body } from "express-validator";
export class UserValidation{
    static create = [
        body('name').notEmpty().withMessage('name is required').bail(),
        body('email').notEmpty().withMessage('email is required').bail().normalizeEmail().isEmail().withMessage('invalid email').bail(),
        body('password').notEmpty().withMessage('password is required')
    ];

    static login = [
        body('email').notEmpty().withMessage('email is required').bail().normalizeEmail().isEmail().withMessage('invalid email').bail(),
        body('password').notEmpty().withMessage('password is required')
    ]
}