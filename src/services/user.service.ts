import { UserModel, User } from "../models";
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export class UserService {
    static async signUp(user: User) {
        return await UserModel.create(user);
    }

    static async login(email: string, password: string) {
        const user = await UserModel.login(email, password);
        if (!user) {
            throw createError(StatusCodes.UNAUTHORIZED, 'wrong credential');
        }
        return user.createToken();
    }
}

