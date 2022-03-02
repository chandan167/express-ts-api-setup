import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/api-response"

export const UserController:any = {}

UserController.signUp = function(req:Request, res:Response, next:NextFunction ){
    return (new ApiResponse(res)).setData(req.body).setStatusCode(StatusCodes.CREATED).sendToJson();
}