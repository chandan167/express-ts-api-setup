import { NextFunction, Request, Response } from "express";
import { validationResult, ErrorFormatter }  from 'express-validator';
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/api-response";
import {UserValidation} from './user.validation';






function validate(req:Request, res:Response, next:NextFunction){
    const errorFormatter = (err:any) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${err.msg}`;
      };
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
      return (new ApiResponse(res)).setStatusCode(StatusCodes.UNPROCESSABLE_ENTITY).setMessage(error).sendToJson();
    }
    next();
}


export {UserValidation}
export default validate;