import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/api-response"
import { User } from '../models';
import { UserService } from '../services/user.service';

export class UserController{
    static async signUp(req:Request, res:Response, next:NextFunction ){
        const {email, name, password} = req.body;
        const data:User|any= {email, name, password};
        const user:User = await UserService.signUp(data)
        return (new ApiResponse(res)).setData({user}).setStatusCode(StatusCodes.CREATED).sendToJson();
    }


    static async login(req:Request, res:Response, next:NextFunction ){
        const {email, password} = req.body;
        const token = await UserService.login(email,password);
        return (new ApiResponse(res)).setData({token}).sendToJson();
    }
}

