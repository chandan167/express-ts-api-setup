import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import createError from 'http-errors';
import  {StatusCodes, ReasonPhrases} from 'http-status-codes';


import './database';
import ApiResponse from './utils/api-response';
import router from './routes';
const app:Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

app.get('/health-check', (req:Request, res:Response, next:NextFunction) =>{
    return new ApiResponse(res).setMessage("good health").sendToJson();
})

app.use('/api', router);


app.use(function(req:Request, res:Response, next:NextFunction){
    next(createError(StatusCodes.NOT_FOUND));
});

app.use((err:any, req:Request, res:Response, next:NextFunction) =>{
    const stack:any = {};
    if(process.env.NODE_ENV == 'development'){
        stack.stack = err.stack;
    }
    if(err instanceof createError.HttpError || process.env.NODE_ENV == 'development'){
        return new ApiResponse(res).setMessage(err.message).setStatusCode(err.status || StatusCodes.INTERNAL_SERVER_ERROR).setData(stack).sendToJson();
    }

    if(process.env.NODE_ENV == 'production'){
        return new ApiResponse(res).setMessage(ReasonPhrases.INTERNAL_SERVER_ERROR).setStatusCode(err.status || StatusCodes.INTERNAL_SERVER_ERROR).sendToJson();
    }
})


export default app;